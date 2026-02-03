import type { StudentResponse, StudentSummary } from '@shared/models/student';

export const toStudentResponse = (student: any): StudentResponse => {
  return {
    studentId: student.studentId,
    studentName: student.studentName,
    grade: student.grade.toString(),
    departmentId: student.departmentId.toString(),
    email: student.email,
    minorCategoryId: student.minorCategoryId.toString(),
    createdAt: student.createdAt.toISOString(),
    updatedAt: student.updatedAt.toISOString(),
  };
};

export const toStudentSummary = (student: any): StudentSummary => {
  return {
    studentId: student.studentId.toString(),
    studentName: student.studentName,
    grade: student.grade.toString(),
    departmentName: student.department.departmentName,
    minorCategoryName: student.minorCategory.minorCategoryName,
  };
};
