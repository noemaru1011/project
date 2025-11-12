import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/elements/Input";
import { Select } from "@/components/elements/Select";
import { Button } from "@/components/elements/Button";
import { gradeOptions } from "@/constants/grade";
import { minorCategoryOptions } from "@/constants/minorCategory";
import { departmentOptions } from "@/constants/department";
import { validation } from "@shared/schemas/student";
import { useCrud } from "@/hooks/useCrud";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loading } from "@/components/elements/Loading";
import { ROUTES } from "@/constants/routes";
import { StudentApi } from "@/api/studentApi";
import type { Student } from "@shared/schemas/student";

export const StudentCreate = () => {
  const navigate = useNavigate();
  const { create, loading } = useCrud<Student>(StudentApi);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(validation),
  });

  // 送信処理
  const onSubmit = async (data: any) => {
    const payload = {
      ...data,
      grade: String(data.grade),
      departmentId: String(data.departmentId),
      minorCategoryId: String(data.minorCategoryId),
    };
    await create(payload);
    setTimeout(() => navigate(ROUTES.Student.INDEX), 1000);
  };

  return (
    <Loading loading={loading}>
      <div className="mt-5 flex justify-center min-h-screen">
        <div className="w-full max-w-md space-y-4">
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
              id="email"
              type="email"
              label="メールアドレス"
              required
              error={errors.email?.message}
              {...register("email")}
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
      </div>
    </Loading>
  );
};
