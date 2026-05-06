import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/base/input/Input";
import { Button } from "@/components/base/button/Button";
import ErrorText from "@/components/base/ErrorText";
import { cartQueries } from "../cartQueries";
import type { CartSummaryParams } from "../types/types";

const couponCodeSchema = z.object({
  code: z
    .string()
    .min(1, "Please enter a coupon code")
    .max(50, "Coupon code is too long")
    .trim(),
});

type CouponCodeFormData = z.infer<typeof couponCodeSchema>;

interface CouponCodeInputProps {
  summaryParams: CartSummaryParams;
  onApply: (code: string) => void;
}

export function CouponCodeInput({
  summaryParams,
  onApply,
}: CouponCodeInputProps) {
  const [pendingCode, setPendingCode] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CouponCodeFormData>({
    resolver: zodResolver(couponCodeSchema),
    defaultValues: { code: "" },
  });

  const verifyQuery = useQuery({
    ...cartQueries.summary({ ...summaryParams, couponCode: pendingCode }),
    enabled: pendingCode.length > 0,
    retry: false,
    staleTime: 0,
  });

  // Justified useEffect: reacting to async query completion cannot be done during render
  useEffect(() => {
    if (verifyQuery.isSuccess && pendingCode) {
      onApply(pendingCode);
      setPendingCode("");
      reset();
    }
  }, [verifyQuery.isSuccess, verifyQuery.data]);

  const onSubmit = (data: CouponCodeFormData) => {
    setPendingCode(data.code.toUpperCase());
  };

  const isVerifying = verifyQuery.isFetching;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
      <div className="flex gap-2 items-start">
        <Input
          {...register("code", { onChange: () => setPendingCode("") })}
          placeholder="Enter coupon code"
          error={errors.code?.message}
          disabled={isVerifying}
          fullWidth
        />
        <Button
          type="submit"
          variant="outline"
          color="primary"
          isLoading={isVerifying}
          disabled={isVerifying}
        >
          Apply
        </Button>
      </div>
      {verifyQuery.isError && pendingCode && (
        <ErrorText>{verifyQuery.error.message}</ErrorText>
      )}
    </form>
  );
}
