import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import Input from "@/components/elements/Input";
import Select from "@/components/elements/Select";
import Button from "@/components/elements/Button";
import { Loading } from "@/components/elements/Loading";
import { gradeOptions } from "@/constants/grade";
import { minorCategoryOptions } from "@/constants/minorCategory";
import { departmentOptions } from "@/constants/department";
import { ROUTES } from "@/constants/routes";
import { useStudent } from "@/hooks/StudentHooks";
import validation from "@shared/schemas/student";

const StudentUpdate = () => {
  const navigate = useNavigate();
  const { studentId } = useParams<{ studentId: string }>();
  const { view, update, loading } = useStudent();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(validation),
  });

  // 初期値をロード
  useEffect(() => {
    if (!studentId) return;

    const fetchStudent = async () => {
      try {
        const data: any = await view(studentId);
        if (!data) throw new Error("学生情報が取得できません");
        reset({
          studentName: data.studentName,
          email: data.email,
          grade: String(data.grade),
          minorCategoryId: String(data.minorCategoryId),
          departmentId: String(data.departmentId),
        });
      } catch (err: any) {
        toast.error(err.message || "学生情報の取得に失敗しました");
        navigate(ROUTES.Student.INDEX);
      }
    };

    fetchStudent();
  }, [studentId, view, reset, navigate]);

  // 更新処理
  const onSubmit = async (data: any) => {
    if (!studentId) return;
    try {
      const payload = {
        ...data,
        grade: String(data.grade),
        departmentId: String(data.departmentId),
        minorCategoryId: String(data.minorCategoryId),
      };
      await update(studentId, payload);
      toast.success("更新に成功しました！");
      setTimeout(() => navigate(ROUTES.Student.INDEX), 1000);
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
              disabled
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
            <Button type="submit" variant="Update" className="w-full mt-4" />
          </form>
        </div>
      </div>
    </Loading>
  );
};

export default StudentUpdate;
