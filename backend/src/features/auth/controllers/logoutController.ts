import { BaseController } from '@/base/controllers/baseController';
import { tokenBlacklist } from '@/utils/tokenBlacklist';
import { APIMESSAGE } from '@shared/constants/apiMessage';
import jwt from 'jsonwebtoken';

export class LogoutController extends BaseController {
  constructor(private readonly blacklist: typeof tokenBlacklist) {
    super();
  }

  logout = this.asyncHandler<null>(async (req, res) => {
    const token = req.cookies.token;

    // トークンの無効化ロジック
    if (token) {
      const decoded = jwt.decode(token) as { exp?: number } | null;

      if (decoded?.exp) {
        const now = Math.floor(Date.now() / 1000);
        const expiresIn = decoded.exp - now;

        if (expiresIn > 0) {
          await this.blacklist.add(token, expiresIn);
        }
      }
    }

    const isProd = process.env.NODE_ENV === 'production';

    // Cookieのクリア
    res.clearCookie('token', {
      httpOnly: true,
      secure: isProd,
      sameSite: 'strict',
    });

    res.clearCookie('role', {
      httpOnly: false,
      secure: isProd,
      sameSite: 'strict',
    });

    res.clearCookie('csrf', {
      httpOnly: false,
      secure: isProd,
      sameSite: 'strict',
    });

    return this.ok(res, null, APIMESSAGE.LOGOUT_SUCCESS, 'LOGOUT_SUCCESS');
  });
}
