type Props = {
  students: { id: string; name: string }[];
};

export const SelectedStudentsFloat = ({ students }: Props) => {
  if (students.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-white shadow-xl border rounded-lg p-4 text-sm max-w-xs animate-slide-up">
      <div className="font-bold mb-2 text-gray-700">選択中の学生（{students.length}）</div>
      <ul className="space-y-1 text-gray-600">
        {students.map((s) => (
          <li key={s.id}>{s.name}</li>
        ))}
      </ul>
    </div>
  );
};
