import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Input from "@/components/elements/Input";
import Select from "@/components/elements/Select";
import Button from "@/components/elements/Button";
import { gradeOptions } from "@/domain/grade";
import { minorCategoryOptions } from "@/domain/minorCategory";
import { departmentOptions } from "@/domain/department";
import { useStudent } from "@/hooks/StudentHooks";
import { Loading } from "@/components/elements/Loading";
import { ROUTES } from "@/domain/routes";
import { toast } from "react-toastify";

const StudentView = () => {
  const navigate = useNavigate();
  const { studentId } = useParams<{ studentId: string }>();
  const { view, loading, error } = useStudent();

  useEffect(() => {
    if (studentId) view(studentId);
  }, [studentId, view]);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  return (
    <Loading loading={loading}>
      <div className="mt-5 flex justify-center min-h-screen">
        <div className="w-full max-w-md space-y-4">
          <Input
            id="studentName"
            label="学生名"
            type="text"
            value={student.studentName}
            disabled
          />
          <Select
            id="grade"
            label="学年"
            options={gradeOptions}
            value={String(student.grade)}
            disabled
          />
          <Select
            id="minorCategoryId"
            label="小分類名"
            options={minorCategoryOptions}
            value={String(student.minorCategoryId)}
            disabled
          />
          <Input
            id="studentEmail"
            label="メールアドレス"
            type="email"
            value={student.studentEmail}
            disabled
          />
          <Select
            id="departmentId"
            label="学科名"
            options={departmentOptions}
            value={String(student.departmentId)}
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
