import type { VercelRequest, VercelResponse } from '@vercel/node';
import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'public', 'data', 'publications.json');

// CORS 헤더
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

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

    // 인증 확인 (POST, PUT, DELETE)
    const authHeader = req.headers.authorization;
    const adminPassword = process.env.VITE_ADMIN_PASSWORD || 'admin123';
    
    if (!authHeader || authHeader !== `Bearer ${adminPassword}`) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // POST - 새 항목 추가
    if (req.method === 'POST') {
      const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
      const newItem = req.body;
      data.push(newItem);
      fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
      return res.status(201).json(newItem);
    }

    // PUT - 항목 수정
    if (req.method === 'PUT') {
      const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
      const updatedItem = req.body;
      const index = data.findIndex((item: any) => item.id === updatedItem.id);
      
      if (index === -1) {
        return res.status(404).json({ error: 'Item not found' });
      }
      
      data[index] = updatedItem;
      fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
      return res.status(200).json(updatedItem);
    }

    // DELETE - 항목 삭제
    if (req.method === 'DELETE') {
      const { id } = req.query;
      const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
      const filtered = data.filter((item: any) => item.id !== id);
      
      if (filtered.length === data.length) {
        return res.status(404).json({ error: 'Item not found' });
      }
      
      fs.writeFileSync(DATA_FILE, JSON.stringify(filtered, null, 2));
      return res.status(200).json({ success: true });
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
