import Header from "@/components/layouts/Header";
import Button from "@/components/elements/Button";
import Input from "@/components/elements/Input";
import { useCreateCustomer } from "@/hooks/CustomerHooks";

const CreatePage = () => {
  const { register, handleSubmit, errors, onSubmit } = useCreateCustomer();

  return (
    <>
      <Header />
      <div className="flex flex-col items-center mt-4">
        <h2 className="text-xl font-bold mb-4">得意先マスタ登録</h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 w-80"
        >
          <Input
            type="text"
            label="得意先名"
            id="name"
            required
            {...register("name")}
            error={errors.name?.message}
          />

          <Input
            type="tel"
            label="得意先電話番号"
            id="tel"
            {...register("tel")}
            error={errors.tel?.message}
          />

          <Input
            type="email"
            label="得意先メールアドレス"
            id="email"
            {...register("email")}
            error={errors.email?.message}
          />

          <div className="mt-4 flex justify-center">
            <Button type="submit" variant="Create" />
          </div>
        </form>
      </div>
    </>
  );
};

export default CreatePage;
