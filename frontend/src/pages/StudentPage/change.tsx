import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/elements/Input";
import { Button } from "@/components/elements/Button";
import { validation } from "@shared/schemas/password";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loading } from "@/components/elements/Loading";
import { ROUTES } from "@/constants/routes";

const StudentChange = () => {
  const navigate = useNavigate();
  const { create, loading } = useStudent();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(validation),
  });

  // 送信処理
  const onSubmit = async (data: any) => {
    try {
      await create(data);
      toast.success("更新に成功しました！");
      setTimeout(() => navigate(ROUTES.HOME), 1000);
    } catch (err: any) {
      toast.error(
        "更新に失敗しました：" +
          (err?.message || "予期せぬエラーが発生しました")
      );
    }
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
              id="newPassword"
              label="新しいパスワード"
              type="password"
              error={errors.newPassword?.message}
              required
              {...register("newPassword")}
            />

            <Button type="submit" variant="Update" className="w-full mt-4" />
          </form>
        </div>
      </div>
    </Loading>
  );
};

export default StudentChange;
