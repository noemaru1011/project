import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Input from "@/components/elements/Input";
import Select from "@/components/elements/Select";
import Button from "@/components/elements/Button";
import { gradeOptions } from "@/domain/grade";
import { minorCategoryOptions } from "@/domain/minorCategory";
import { departmentOptions } from "@/domain/department";
import validation from "@shared/schemas/Student";
import { useStudent } from "@/hooks/StudentHooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loading } from "@/components/elements/Loading";
import { ROUTES } from "@/domain/routes";

const StudentCreate = () => {
  const navigate = useNavigate();
  const { create, loading, error } = useStudent();

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
      toast.success("登録に成功しました！");
      setTimeout(() => {
        navigate(ROUTES.Student.INDEX);
      }, 1000);
    } catch (err: any) {
      return;
      // エラーは useStudent() の error state で管理・toast表示される
    }
  };

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  return (
    <Loading loading={loading}>
      <div className="mt-5 flex justify-center min-h-screen">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            id="studentName"
            label="学生名"
            type="text"
            error={errors.studentName?.message}
            required
            {...register("studentName")}
          />
          <Select
            id="grade"
            label="学年"
            options={gradeOptions}
            required
            error={errors.grade?.message}
            {...register("grade")}
          />
          <Select
            id="minorCategory"
            label="小分類名"
            options={minorCategoryOptions}
            required
            error={errors.minorCategoryId?.message}
            {...register("minorCategoryId")}
          />
          <Input
            id="studentEmail"
            type="email"
            label="メールアドレス"
            required
            error={errors.studentEmail?.message}
            {...register("studentEmail")}
          />
          <Select
            id="department"
            label="学科名"
            options={departmentOptions}
            required
            error={errors.departmentId?.message}
            {...register("departmentId")}
          />

          <Button type="submit" variant="Create" className="w-full mt-4" />
        </form>
      </div>
    </Loading>
  );
};

export default StudentCreate;
