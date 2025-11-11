import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Hooks } from "@/hooks/hooks";
import { StudentApi } from "@/api/studentApi";
import { validation } from "@shared/schemas/student";
import type { Student } from "@shared/schemas/student";
import { ROUTES } from "@/constants/routes";

export const useStudentCreate = () => {
  const navigate = useNavigate();
  const { create, loading } = Hooks<Student>(StudentApi);

  const form = useForm<Student>({
    resolver: zodResolver(validation),
  });

  const onSubmit = async (data: Student) => {
    const payload = {
      ...data,
      grade: String(data.grade),
      departmentId: String(data.departmentId),
      minorCategoryId: String(data.minorCategoryId),
    };

    await create(payload);

    // 1秒待って一覧へ遷移
    setTimeout(() => navigate(ROUTES.Student.INDEX), 1000);
  };

  return { form, onSubmit, loading };
};
