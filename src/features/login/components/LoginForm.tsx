import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/base/input/Input";
import { Button } from "@/components/base/button/Button";
import { loginFormSchema, type LoginFormData } from "../types/types";
import { Logo } from "@/components/compound/logo/Logo";

interface LoginFormProps {
  onSubmit: (data: LoginFormData) => void;
  isLoading?: boolean;
}

const LoginForm = ({ onSubmit, isLoading = false }: LoginFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      mobileNumber: "",
    },
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full space-y-6 mx-auto"
    >
      <div className="fall flex-col gap-4 mb-8">
        <Logo />
        <h6 className="font-semibold">Login</h6>
      </div>

      <Input
        {...register("mobileNumber", {
          onChange: (e) => {
            e.target.value = e.target.value.replace(/\D/g, "");
          },
        })}
        label="Mobile Number"
        placeholder="Enter 10-digit mobile number"
        leftElement={<span className="text-n-700">+91</span>}
        error={errors.mobileNumber?.message}
        type="tel"
        inputMode="numeric"
        disabled={isLoading}
        fullWidth
      />

      <Button
        type="submit"
        fullWidth
        disabled={isLoading}
        isLoading={isLoading}
      >
        Continue
      </Button>
    </form>
  );
};

export default LoginForm;
