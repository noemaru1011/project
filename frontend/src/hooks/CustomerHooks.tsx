import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { validation, type Customer } from "@shared/schemas/Customer";
import { CustomerApi } from "@/api/customerApi";

export const useCreateCustomer = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Customer>({
    mode: "onChange",
    resolver: zodResolver(validation),
    defaultValues: { name: "", tel: "", email: "" },
  });

  const onSubmit = async (data: Customer) => {
    try {
      setLoading(true);
      await CustomerApi.create(data);
      alert("登録が完了しました");
      navigate("/Mst001/Create");
    } catch (error: any) {
      console.error(error);
      alert(error.message || "登録に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  return { register, handleSubmit, errors, onSubmit, loading };
};
