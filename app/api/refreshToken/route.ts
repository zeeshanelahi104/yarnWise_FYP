import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { connectDB } from "@/lib/db";
import User from '@/models/user';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      await connectDB();
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({ error: 'Email is required' });
      }

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const token = jwt.sign({ email: user.email, id: user._id }, "your-secret-key", {
        expiresIn: '1h',
      });

      res.status(200).json({ accessToken: token });
    } catch (error) {
      console.error('Error refreshing token:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
