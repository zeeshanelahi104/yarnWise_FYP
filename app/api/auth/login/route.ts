// api/auth/login.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { signIn } from 'next-auth/react';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { email, password } = req.body;

    // Authenticate user
    const response = await axios.post('http://localhost:3000/api/getUserRole', { email });
    const user = response.data.data[0];

    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Replace session to create a new one
    // await replaceSession(req, { ...user, id: user.id });

    // Sign in the user
    await signIn('credentials', { email, password, callbackUrl: '/' });

    return res.status(200).json({ message: 'Logged in successfully' });
  } catch (error) {
    console.error('Error logging in:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
