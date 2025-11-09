import { useForm } from "react-hook-form";
import Input from "@/components/elements/Input";
import Button from "@/components/elements/Button";
import { Loading } from "@/components/elements/Loading";
import { validation } from "@shared/schemas/login";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { toast } from "react-toastify";
import { useAuth } from "@/hooks/AuthHooks";
import { useCsrf } from "@/hooks/contexts/CSRF";

const Login = () => {
  const navigate = useNavigate();
  const { login, loading } = useAuth();
  const { setCsrfToken } = useCsrf();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(validation),
  });

  const onSubmit = async (data: any) => {
    try {
      // ここでは email と password だけ送信
      const res: any = await login(data);

      // レスポンスに role を含めてもらうとフロントで画面遷移制御可能
      const { csrfToken, role } = res;
      setCsrfToken(csrfToken);
      sessionStorage.setItem("csrfToken", csrfToken);

      toast.success("ログインに成功しました！");

      // 管理者なら管理者ページ、学生ならホームページ
      if (role === "admin") {
        navigate(ROUTES.HOME);
      } else {
        navigate(ROUTES.HOME);
      }
    } catch (err: any) {
      toast.error(err.message || "ログインに失敗しました。");
    }
  };

  return (
    <Loading loading={loading}>
      <div className="mt-5 flex justify-center min-h-screen">
        <div className="w-full max-w-md space-y-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              id="email"
              type="email"
              label="メールアドレス"
              required
              error={errors.email?.message}
              {...register("email")}
            />
            <Input
              id="studentPassword"
              type="password"
              label="パスワード"
              required
              error={errors.password?.message}
              {...register("password")}
            />
            <Button
              type="submit"
              variant="Login"
              className="w-full mt-4"
              disabled={loading}
            />
          </form>
        </div>
      </div>
    </Loading>
  );
};

export default Login;
