import { useForm } from "react-hook-form";
import Input from "@/components/elements/Input";
import Button from "@/components/elements/Button";
import { validation } from "@shared/schemas/Auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/domain/routes";
import { toast } from "react-toastify";
import { useAuth } from "@/hooks/AuthHooks";

const Login = () => {
  const navigate = useNavigate();
  const { login, loading, error } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(validation),
  });

  const onSubmit = async (data: any) => {
    try {
      await login(data);
      toast.success("ログインに成功しました！");
      navigate(ROUTES.HOME);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "ログインに失敗しました。");
    }
  };

  return (
    <div className="mt-5 flex justify-center min-h-screen">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          id="studentEmail"
          type="email"
          label="メールアドレス"
          required
          error={errors.studentEmail?.message}
          {...register("studentEmail")}
        />
        <Input
          id="studentPassword"
          type="password"
          label="パスワード"
          required
          error={errors.studentPassword?.message}
          {...register("studentPassword")}
        />
        <Button
          type="submit"
          variant="Login"
          className="w-full mt-4"
          disabled={loading}
        />
      </form>
    </div>
  );
};

export default Login;
