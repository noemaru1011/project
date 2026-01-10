import { Resend } from 'resend';

export const sendAccountEmail = async (email: string, password: string) => {
  try {
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    if (!RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY is not defined');
    }
    const resend = new Resend(RESEND_API_KEY);
    await resend.emails.send({
      from: 'no-reply@resend.dev',
      to: email,
      subject: 'アカウント作成通知',
      text: `学生アカウントが作成されました。\n
      ユーザー名: ${email}\n
      初回パスワード: ${password}\n
      心当たりがない場合はメールの削除をお願いします。\n
      本メールは送信専用のため返信できません。`,
    });
  } catch (error) {
    throw new Error('メール送信に失敗しました。');
  }
};
