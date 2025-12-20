import { useNavigate } from "react-router-dom";
import { useUpdate } from "@/hooks/useUpdate";
import { handleApiError } from "@/utils/handleApiError";
import { studentApi } from "@/features/student";
import type { StudentUpdateForm } from "@shared/schemas/student";

export const useStudentUpdate = () => {
  const navigate = useNavigate();
  const { update, loading } = useUpdate<StudentUpdateForm>(studentApi.update);

  const updateStudent = async (id: string, data: StudentUpdateForm) => {
    try {
      return await update(id, data);
    } catch (err) {
      handleApiError(err, navigate);
      throw err;
    }
  };

  return { updateStudent, loading };
};
