import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/layouts/Header";
import Button from "@/components/elements/Button";
import Input from "@/components/elements/Input";
import { validation } from "../../../../shared/schemas/Cutomer";

const CreatePage = () => {
  const navigate = useNavigate();

  // フォームの状態管理
  const [form, setForm] = useState({
    customername: "",
    customertel: "",
    customerrepemail: "",
  });

  // エラーの状態管理
  const [errors, setErrors] = useState({
    customername: "",
    customertel: "",
    customerrepemail: "",
  });

  // input の onChange
  const handleChange =
    (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  // フォーム送信 & バックエンド送信
  const handleCreate = async () => {
    // zodによるバリデーション
    const result = validation.safeParse({
      name: form.customername,
      email: form.customerrepemail,
      tel: form.customertel,
    });

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors({
        customername: fieldErrors.name?.[0] ?? "",
        customerrepemail: fieldErrors.email?.[0] ?? "",
        customertel: fieldErrors.tel?.[0] ?? "",
      });
      return;
    }

    // バックエンドへ送信
    try {
      const response = await fetch("http://localhost:3000/Mst001/Create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });

      if (!response.ok) throw new Error("Failed to create customer");

      const data = await response.json();
      console.log("✅ 登録成功:", data);
      navigate("/Mst001/Create");
    } catch (error) {
      console.error(error);
      alert("登録に失敗しました");
    }
  };

  return (
    <>
      <Header />
      <div className="flex flex-col items-center mt-4">
        <h2 className="text-xl font-bold mb-4">得意先マスタ登録</h2>

        <Input
          type="text"
          label="得意先名"
          id="CustomerName"
          value={form.customername}
          onChange={handleChange("customername")}
          error={errors.customername}
        />

        <Input
          type="tel"
          label="得意先電話番号"
          id="CustomerTel"
          value={form.customertel}
          onChange={handleChange("customertel")}
          error={errors.customertel}
        />

        <Input
          type="email"
          label="得意先メールアドレス"
          id="CustomerEmail"
          value={form.customerrepemail}
          onChange={handleChange("customerrepemail")}
          error={errors.customerrepemail}
        />

        <div className="mt-4">
          <Button variant="Create" onClick={handleCreate} />
        </div>
      </div>
    </>
  );
};

export default CreatePage;
