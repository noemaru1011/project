import { LoginService } from '@/features/auth/services/loginService';
import type { LoginResponse } from '@shared/models/auth';
import { BaseController } from '@/base/controllers/baseController';
import { APIMESSAGE } from '@shared/constants/apiMessage';

export class LoginController extends BaseController {
  constructor(private readonly loginService: LoginService) {
    super();
  }

  login = this.asyncHandler<LoginResponse>(async (req, res) => {
    const { email, password } = req.body;
    const result = await this.loginService.login(email, password);

    const isProd = process.env.NODE_ENV === 'production';
    const maxAge = 3600 * 1000;

    // Cookieの設定
    res.cookie('token', result.token, {
      httpOnly: true,
      secure: isProd,
      sameSite: 'strict',
      maxAge,
    });

    res.cookie('role', result.role, {
      httpOnly: false,
      secure: isProd,
      sameSite: 'strict',
      maxAge,
    });

    res.cookie('csrf', crypto.randomUUID(), {
      httpOnly: false,
      secure: isProd,
      sameSite: 'strict',
    });

    return this.ok(res, result, APIMESSAGE.LOGIN_SUCCESS, 'LOGIN_SUCCESS');
  });
}
