import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ROUTES } from '@/routes/routes';
import { studentApi } from '@/features/student';
import type { StudentUpdateInput } from '@shared/models/student';
import { handleApiErrorWithUI } from '@/utils';

export const useUpdateStudent = (studentId: string) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['student', studentId],
    queryFn: () => studentApi.view(studentId),
    enabled: !!studentId,
    meta: {
      onError: (err: any) => handleApiErrorWithUI(err, navigate),
    },
  });

  const mutation = useMutation({
    mutationFn: (data: StudentUpdateInput) => studentApi.update(studentId, data),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
      queryClient.invalidateQueries({ queryKey: ['student', studentId] });

      toast.success(res.message);
      navigate(ROUTES.STUDENT.INDEX);
    },
    onError: (err) => handleApiErrorWithUI(err, navigate),
  });

  const student = query.data?.data;

  const defaultValues: StudentUpdateInput | undefined = student
    ? {
        studentName: student.studentName,
        email: student.email,
        grade: student.grade,
        minorCategoryId: student.minorCategoryId,
        departmentId: student.departmentId,
        updatedAt: student.updatedAt,
      }
    : undefined;

  return {
    student,
    defaultValues,
    isFetching: query.isLoading,
    updateStudent: mutation.mutate,
    isUpdating: mutation.isPending,
  };
};
