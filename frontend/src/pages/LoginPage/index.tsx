import { validation, AuthLabels, type Auth } from "@shared/schemas/Auth";
import Input from "@/components/elements/Input";
import Button from "@/components/elements/Button";
import { AuthApi } from "@/api/authApi";

const LoginIndex = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useZodForm(validation);

  const onSubmit = async (data: Auth) => {
    try {
      const res = await AuthApi.login(data);
      console.log("ログイン成功:", res);
      // 例: localStorage.setItem("token", res.token);
      reset();
    } catch (err: any) {
      console.error("ログイン失敗:", err.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 max-w-sm mx-auto mt-8 p-4 border rounded-lg shadow"
    >
      <Input
        id="number"
        label={AuthLabels.number}
        {...register("number")}
        error={errors.number?.message}
      />

      <Input
        id="password"
        label={AuthLabels.password}
        {...register("password")}
        type="password"
        error={errors.password?.message}
      />

      <Button name="ログイン" variant="Other" type="submit" />
    </form>
  );
};

export default LoginIndex;
