import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Student } from "@shared/schemas/Student";
import Input from "@/components/elements/Input";
import Select from "@/components/elements/Select";
import Button from "@/components/elements/Button";
import { gradeOptions } from "@/constants/grade";
import { minorCategoryOptions } from "@/constants/minorCategory";
import { departmentOptions } from "@/constants/department";
import { useStudent } from "@/hooks/StudentHooks";
import { Loading } from "@/components/elements/Loading";
import { ROUTES } from "@/constants/routes";
import { toast } from "react-toastify";

const StudentView = () => {
  const navigate = useNavigate();
  const { studentId } = useParams<{ studentId: string }>();
  const { view, loading } = useStudent();
  const [student, setStudent] = useState<Student | null>(null);

  useEffect(() => {
    if (!studentId) return;

    const fetchStudent = async () => {
      try {
        const data: any = await view(studentId);
        if (!data) throw new Error("学生情報が取得できません");
        setStudent(data);
      } catch (err: any) {
        toast.error(err.message || "学生情報の取得に失敗しました");
        navigate(ROUTES.Student.INDEX);
      }
    };

    fetchStudent();
  }, [studentId, view, navigate]);

  return (
    <Loading loading={loading}>
      <div className="mt-5 flex justify-center min-h-screen">
        <div className="w-full max-w-md space-y-4">
          <Input
            id="studentName"
            label="学生名"
            type="text"
            value={student ? student.studentName : ""}
            disabled
          />
          <Select
            id="grade"
            label="学年"
            options={gradeOptions}
            value={student ? String(student.grade) : ""}
            disabled
          />
          <Select
            id="minorCategoryId"
            label="小分類名"
            options={minorCategoryOptions}
            value={student ? String(student.minorCategoryId) : ""}
            disabled
          />
          <Input
            id="studentEmail"
            label="メールアドレス"
            type="email"
            value={student ? student.studentEmail : ""}
            disabled
          />
          <Select
            id="departmentId"
            label="学科名"
            options={departmentOptions}
            value={student ? String(student.departmentId) : ""}
            disabled
          />

          <Button
            type="button"
            variant="Back"
            className="w-full mt-4"
            onClick={() => navigate(ROUTES.Student.INDEX)}
          />
        </div>
      </div>
    </Loading>
  );
};

export default StudentView;
