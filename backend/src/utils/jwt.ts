import jwt, { SignOptions } from 'jsonwebtoken';
import type { JwtPayload } from '@/types/auth';

export const jwtUtil = {
  createToken: (id: string, role: 'ADMIN' | 'STUDENT') => {
    const JWT_SECRET: string = process.env.JWT_SECRET!;
    const payload = { id, role };
    const options: SignOptions = { expiresIn: '1h' };
    return jwt.sign(payload, JWT_SECRET, options);
  },
};
