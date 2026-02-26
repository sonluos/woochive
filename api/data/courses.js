// Vercel Serverless Function for Courses
import { Octokit } from '@octokit/rest';

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
});

const REPO_OWNER = process.env.GITHUB_OWNER;
const REPO_NAME = process.env.GITHUB_REPO;
const FILE_PATH = 'public/data/courses.json';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method === 'GET') {
      const { data } = await octokit.repos.getContent({
        owner: REPO_OWNER,
        repo: REPO_NAME,
        path: FILE_PATH,
      });
      const content = Buffer.from(data.content, 'base64').toString('utf-8');
      return res.status(200).json(JSON.parse(content));
    }

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
    let courses = JSON.parse(currentContent);

    if (req.method === 'POST') {
      courses.push(req.body);
      await octokit.repos.createOrUpdateFileContents({
        owner: REPO_OWNER,
        repo: REPO_NAME,
        path: FILE_PATH,
        message: `Add course: ${req.body.name}`,
        content: Buffer.from(JSON.stringify(courses, null, 2)).toString('base64'),
        sha: fileData.sha,
      });
      return res.status(200).json(req.body);
    }

    if (req.method === 'PUT') {
      const index = courses.findIndex(c => c.id === req.body.id);
      if (index === -1) return res.status(404).json({ error: 'Not found' });
      courses[index] = req.body;
      await octokit.repos.createOrUpdateFileContents({
        owner: REPO_OWNER,
        repo: REPO_NAME,
        path: FILE_PATH,
        message: `Update course: ${req.body.name}`,
        content: Buffer.from(JSON.stringify(courses, null, 2)).toString('base64'),
        sha: fileData.sha,
      });
      return res.status(200).json(req.body);
    }

    if (req.method === 'DELETE') {
      const { id } = req.query;
      courses = courses.filter(c => c.id !== id);
      await octokit.repos.createOrUpdateFileContents({
        owner: REPO_OWNER,
        repo: REPO_NAME,
        path: FILE_PATH,
        message: `Delete course: ${id}`,
        content: Buffer.from(JSON.stringify(courses, null, 2)).toString('base64'),
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
