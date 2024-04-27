/** @type {import('next').NextConfig} */
import { config } from 'dotenv';
config();
const nextConfig = {
    env: {
      JWT_SECRET: process.env.JWT_SECRET,
      },
};

export default nextConfig;
