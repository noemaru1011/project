import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/elements/Input";
import { Button } from "@/components/elements/Button";
import { validation } from "@shared/schemas/password";
import { usePassword } from "@/hooks/usePassword";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loading } from "@/components/elements/Loading";
import { ROUTES } from "@/constants/routes";

export const StudentChange = () => {
  const navigate = useNavigate();
  const { updatePassword, loading } = usePassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(validation),
  });

  // 送信処理
  const onSubmit = async (data: any) => {
    await updatePassword(data);
  };

  return (
    <Loading loading={loading}>
      <div className="mt-5 flex justify-center min-h-screen">
        <div className="w-full max-w-md space-y-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              id="oldPassword"
              label="古いパスワード"
              type="password"
              error={errors.oldPassword?.message}
              required
              {...register("oldPassword")}
            />
            <Input
              id="newPassword1"
              label="新しいパスワード"
              type="password"
              error={errors.newPassword1?.message}
              required
              {...register("newPassword1")}
            />
            <Input
              id="newPassword2"
              label="新しいパスワード(確認)"
              type="password"
              error={errors.newPassword2?.message}
              required
              {...register("newPassword2")}
            />

            <Button type="submit" variant="Update" className="w-full mt-4" />
          </form>
        </div>
      </div>
    </Loading>
  );
};
