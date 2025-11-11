import { useNavigate } from "react-router-dom";
import { Button } from "@/components/elements/Button";
import { toast } from "react-toastify";

// props で keyField と row データを受け取る
type ActionsProps<T> = {
  row: T;
  keyField: keyof T;
  basePath: string; // 例: "/Category"
  onDelete?: (id: string) => Promise<void>; // 削除用コールバック
};

export function TableActions<T>({
  row,
  keyField,
  basePath,
  onDelete,
}: ActionsProps<T>) {
  const navigate = useNavigate();
  const id = String(row[keyField]);

  const handleRead = () => navigate(`${basePath}/View/${id}`);
  const handleUpdate = () => navigate(`${basePath}/Update/${id}`);
  const handleDelete = async () => {
    if (!onDelete) return;
    if (!confirm("本当に削除しますか？")) return;

    try {
      await onDelete(id);
      toast.success("削除しました");
    } catch (err: any) {
      toast.error(err.message || "削除に失敗しました");
    }
  };

  return (
    <div className="flex justify-center gap-2">
      <Button variant="Read" onClick={handleRead} />
      <Button variant="Update" onClick={handleUpdate} />
      {onDelete && <Button variant="Delete" onClick={handleDelete} />}
    </div>
  );
}
