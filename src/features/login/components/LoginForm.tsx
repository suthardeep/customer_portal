import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/base/input/Input";
import { Button } from "@/components/base/button/Button";
import { loginFormSchema, type LoginFormData } from "../types/types";

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
      className="w-full max-w-sm space-y-6"
    >
      <div>
        <h4>Login</h4>
        <p className="text-n-600">Enter your mobile number to continue</p>
      </div>

      <Input
        {...register("mobileNumber")}
        label="Mobile Number"
        placeholder="Enter 10-digit mobile number"
        leftElement={<span className="text-n-700">+91</span>}
        error={errors.mobileNumber?.message}
        type="tel"
        inputMode="numeric"
        maxLength={10}
        disabled={isLoading}
        fullWidth
      />

      <Button type="submit" fullWidth disabled={isLoading}>
        {isLoading ? "Sending OTP..." : "Continue"}
      </Button>
    </form>
  );
};

export default LoginForm;
