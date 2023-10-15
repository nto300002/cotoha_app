import axios, { AxiosError } from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next'


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { text } = req.body;

    const headers = {
      'Authorization': `Bearer ${process.env.COTOHA_ACCESS_TOKEN}`,
      'Content-Type': 'application/json;charset=UTF-8'
    };

    try {
      const response = await axios.post('https://api.xxx.cotoha.com/nlp/v1/user_attribute', { document: text }, { headers });
      res.status(200).json(response.data);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)){
      res.status(error.response?.status || 500).json(error.response?.data || {});
      }
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}

