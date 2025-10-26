import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { validation, type Customer } from "@shared/schemas/Customer";
import { CustomerApi } from "@/api/CustomerApi";

export const useCreateCustomer = () => {
  const navigate = useNavigate();

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
      await CustomerApi.create(data);
      alert("登録が完了しました");
      navigate("/Mst001/Index");
    } catch (error: any) {
      alert("登録に失敗しました");
    }
  };

  return { register, handleSubmit, errors, onSubmit };
};
