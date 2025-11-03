import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/elements/Input";
import Select from "@/components/elements/Select";
import Button from "@/components/elements/Button";
import { gradeOptions } from "@/domain/grade";
import { minorCategoryOptions } from "@/domain/minorCategory";
import { departmentOptions } from "@/domain/department";
import validation from "@shared/schemas/Student";
import type { Student } from "@shared/schemas/Student";
import { useStudent } from "@/hooks/StudentHooks";
import { LoadAndError } from "@/components/layouts/LoadAndError";
import { ROUTES } from "@/domain/routes";
import { toast } from "react-toastify";

const StudentUpdate = () => {
  const navigate = useNavigate();
  const { studentId } = useParams<{ studentId: string }>();
  const { view, update, loading, error } = useStudent(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(validation),
    defaultValues: {
      studentName: "",
      studentEmail: "",
      grade: "",
      minorCategoryId: "",
      departmentId: "",
    },
  });

  // 初期値をセット
  useEffect(() => {
    if (!studentId) return;
    view(studentId).then((student) => {
      if (!student) return;
      reset({
        studentName: student.studentName,
        studentEmail: student.studentEmail,
        grade: String(student.grade),
        minorCategoryId: String(student.minorCategoryId),
        departmentId: String(student.departmentId),
      });
    });
  }, []);

  const onSubmit = async (formData: Student) => {
    if (!studentId) return;

    try {
      await update(studentId, {
        ...formData,
        grade: Number(formData.grade),
        minorCategoryId: Number(formData.minorCategoryId),
        departmentId: Number(formData.departmentId),
      });
      toast.success("更新に成功しました！");
      navigate(ROUTES.Student.INDEX);
    } catch (err: any) {
      toast.error("更新に失敗しました。");
    }
  };

  return (
    <LoadAndError loading={loading} error={error}>
      <div className="mt-5 flex justify-center min-h-screen">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            id="studentName"
            label="学生名"
            type="text"
            required
            error={errors.studentName?.message}
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
            id="minorCategoryId"
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
            id="departmentId"
            label="学科名"
            options={departmentOptions}
            required
            error={errors.departmentId?.message}
            {...register("departmentId")}
          />

          <Button type="submit" variant="Update" className="w-full mt-4" />
        </form>
      </div>
    </LoadAndError>
  );
};

export default StudentUpdate;
