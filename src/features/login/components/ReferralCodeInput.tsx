import { Button } from "@/components/base/button/Button";
import { Input } from "@/components/base/input/Input";
import { useToggle } from "@/hooks/useToggle";
import { useValidateReferralMutation } from "../loginMutations";
import { useEffect } from "react";
import { IconButton } from "@/components/base/icon-button/IconButton";

interface ReferralCodeInputProps {
  defaultCode?: string;
  code: string;
  onCodeChange: (value: string) => void;
  onValidated?: (code: string | null) => void;
  autoVerify?: boolean;
}

const ReferralCodeInput = ({
  defaultCode = "",
  code,
  onCodeChange,
  onValidated,
  autoVerify,
}: ReferralCodeInputProps) => {
  const toggle = useToggle(!!defaultCode);
  const validateMutation = useValidateReferralMutation();

  useEffect(() => {
    if (defaultCode) {
      onCodeChange(defaultCode);
      if (autoVerify) {
        validateMutation.mutate(
          { code: defaultCode },
          {
            onSuccess: (data) => {
              onValidated?.(data?.data?.valid ? defaultCode : null);
            },
          },
        );
      }
    }
  }, []);

  const handleToggle = () => {
    toggle.toggle();
  };

  const handleVerify = () => {
    if (!code.trim()) return;
    validateMutation.mutate(
      { code },
      {
        onSuccess: (data) => {
          if (data?.data?.valid) {
            onValidated?.(code);
          } else {
            onValidated?.(null);
          }
        },
      },
    );
  };

  const isValid = validateMutation.data?.data?.valid;

  if (!toggle.isOpen) {
    return (
      <p
        className="text-p-600 font-medium cursor-pointer underline-offset-2 hover:underline"
        onClick={handleToggle}
      >
        Have a referral code?
      </p>
    );
  }

  const handleCancelReferral = () => {
    toggle.close();
    validateMutation.reset();
    onValidated?.(null);
  };

  return (
    <>
      {isValid ? (
        <div className="p-2 rounded-lg border border-success-500 bg-success-50 flex justify-between items-center">
          <p className="text-n-900">
            Referral code applied:{" "}
            <span className="text-sm font-semibold text-success-900">
              {" "}
              {code}
            </span>
          </p>
          <IconButton
            icon="X"
            aria-label="remove-referral-code"
            color="success"
            size="md"
            variant="ghost"
            onClick={handleCancelReferral}
          />
        </div>
      ) : (
        <Input
          label="Referral Code"
          placeholder="Enter referral code"
          value={code}
          onChange={(e) => onCodeChange(e.target.value)}
          fullWidth
          rightElement={
            <Button
              size="sm"
              onClick={handleVerify}
              isLoading={validateMutation.isPending}
              disabled={!code.trim() || validateMutation.isPending}
            >
              Verify
            </Button>
          }
        />
      )}
    </>
  );
};

export default ReferralCodeInput;
