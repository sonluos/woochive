// Vercel Serverless Function for Projects
import { Octokit } from '@octokit/rest';

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
});

const REPO_OWNER = process.env.GITHUB_OWNER || 'your-username';
const REPO_NAME = process.env.GITHUB_REPO || 'your-repo';
const FILE_PATH = 'public/data/projects.json';

export default async function handler(req, res) {
  // CORS 설정
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // GET: 데이터 읽기
    if (req.method === 'GET') {
      const { data } = await octokit.repos.getContent({
        owner: REPO_OWNER,
        repo: REPO_NAME,
        path: FILE_PATH,
      });

      const content = Buffer.from(data.content, 'base64').toString('utf-8');
      return res.status(200).json(JSON.parse(content));
    }

    // POST: 새 프로젝트 추가
    if (req.method === 'POST') {
      // 인증 확인
      const authHeader = req.headers.authorization;
      if (!authHeader || authHeader !== `Bearer ${process.env.ADMIN_PASSWORD}`) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      // 현재 파일 가져오기
      const { data: fileData } = await octokit.repos.getContent({
        owner: REPO_OWNER,
        repo: REPO_NAME,
        path: FILE_PATH,
      });

      const currentContent = Buffer.from(fileData.content, 'base64').toString('utf-8');
      const projects = JSON.parse(currentContent);

      // 새 프로젝트 추가
      projects.push(req.body);

      // GitHub에 업데이트
      await octokit.repos.createOrUpdateFileContents({
        owner: REPO_OWNER,
        repo: REPO_NAME,
        path: FILE_PATH,
        message: `Add project: ${req.body.title}`,
        content: Buffer.from(JSON.stringify(projects, null, 2)).toString('base64'),
        sha: fileData.sha,
      });

      return res.status(200).json(req.body);
    }

    // PUT: 프로젝트 수정
    if (req.method === 'PUT') {
      const authHeader = req.headers.authorization;
      if (!authHeader || authHeader !== `Bearer ${process.env.ADMIN_PASSWORD}`) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const { data: fileData } = await octokit.repos.getContent({
        owner: REPO_OWNER,
        repo: REPO_NAME,
        path: FILE_PATH,
      });

      const currentContent = Buffer.from(fileData.content, 'base64').toString('utf-8');
      const projects = JSON.parse(currentContent);

      // 프로젝트 찾아서 수정
      const index = projects.findIndex(p => p.id === req.body.id);
      if (index === -1) {
        return res.status(404).json({ error: 'Project not found' });
      }
      projects[index] = req.body;

      await octokit.repos.createOrUpdateFileContents({
        owner: REPO_OWNER,
        repo: REPO_NAME,
        path: FILE_PATH,
        message: `Update project: ${req.body.title}`,
        content: Buffer.from(JSON.stringify(projects, null, 2)).toString('base64'),
        sha: fileData.sha,
      });

      return res.status(200).json(req.body);
    }

    // DELETE: 프로젝트 삭제
    if (req.method === 'DELETE') {
      const authHeader = req.headers.authorization;
      if (!authHeader || authHeader !== `Bearer ${process.env.ADMIN_PASSWORD}`) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const { id } = req.query;

      const { data: fileData } = await octokit.repos.getContent({
        owner: REPO_OWNER,
        repo: REPO_NAME,
        path: FILE_PATH,
      });

      const currentContent = Buffer.from(fileData.content, 'base64').toString('utf-8');
      const projects = JSON.parse(currentContent);

      const filtered = projects.filter(p => p.id !== id);

      await octokit.repos.createOrUpdateFileContents({
        owner: REPO_OWNER,
        repo: REPO_NAME,
        path: FILE_PATH,
        message: `Delete project: ${id}`,
        content: Buffer.from(JSON.stringify(filtered, null, 2)).toString('base64'),
        sha: fileData.sha,
      });

      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: error.message });
  }
}
