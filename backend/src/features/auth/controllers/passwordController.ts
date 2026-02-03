import { PasswordService } from '@/features/auth/services/passwordService';
import { TokenError } from '@/errors';
import { BaseController } from '@/base/controllers/baseController';

export class PasswordController extends BaseController {
  constructor(private readonly passwordService: PasswordService) {
    super();
  }

  updatePassword = this.asyncHandler<null>(async (req, res) => {
    if (!req.user) throw new TokenError();

    await this.passwordService.updatePassword(req.body, req.user.id);

    return this.updated(res, null);
  });
}
