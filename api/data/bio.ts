import type { VercelRequest, VercelResponse } from '@vercel/node';
import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'public', 'data', 'bio.json');

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).json({});
  }

  try {
    // GET - 데이터 읽기
    if (req.method === 'GET') {
      const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
      return res.status(200).json(data);
    }

    // 인증 확인 (PUT)
    const authHeader = req.headers.authorization;
    const adminPassword = process.env.VITE_ADMIN_PASSWORD || 'admin123';
    
    if (!authHeader || authHeader !== `Bearer ${adminPassword}`) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // PUT - Bio 업데이트
    if (req.method === 'PUT') {
      const updatedBio = req.body;
      fs.writeFileSync(DATA_FILE, JSON.stringify(updatedBio, null, 2));
      return res.status(200).json(updatedBio);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export const config = {
  api: {
    bodyParser: true,
  },
};
