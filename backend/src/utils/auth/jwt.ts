import jwt, { SignOptions } from 'jsonwebtoken';
import type { JwtPayload } from '@/types/jwtPayload';
import type { Role } from '@shared/types/role';

//jwtの生成(idとroleを持ち1時間で切れる)
export const jwtUtil = {
  createToken: (id: string, role: Role) => {
    const JWT_SECRET: string = process.env.JWT_SECRET!;
    const payload: JwtPayload = { id, role };
    const options: SignOptions = { expiresIn: '1h' };
    return jwt.sign(payload, JWT_SECRET, options);
  },
};
