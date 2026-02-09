import {
  ChangeEvent,
  ClipboardEvent,
  forwardRef,
  KeyboardEvent,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Input } from "./input/Input";

// Define a handle type for the imperative methods
export interface OTPInputHandle {
  clearFields: () => void;
  focusFirstField: () => void;
}

interface OTPInputProps {
  length?: number;
  onComplete?: (otp: string) => void;
  autoFocus?: boolean;
}

const OTPInput = forwardRef<OTPInputHandle, OTPInputProps>(
  ({ length = 6, onComplete, autoFocus = true }, ref) => {
    const [otp, setOtp] = useState<string[]>(Array(length).fill(""));
    const inputRefs = useRef<Array<HTMLInputElement | null>>(
      Array(length).fill(null),
    );

    const setRef = (el: HTMLInputElement | null, index: number) => {
      if (el) {
        inputRefs.current[index] = el;
      }
    };

    // Expose methods to parent component
    useImperativeHandle(ref, () => ({
      clearFields: () => {
        setOtp(Array(length).fill(""));
        // Optionally focus the first input after clearing
        if (inputRefs.current[0]) {
          inputRefs.current[0].focus();
        }
      },
      focusFirstField: () => {
        if (inputRefs.current[0]) {
          inputRefs.current[0].focus();
        }
      },
    }));

    const focusInput = (index: number) => {
      if (index >= 0 && index < length) {
        inputRefs.current[index]?.focus();
      }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
      const value = e.target.value;

      // Only accept single digit
      if (value.length > 1) return;

      // Update OTP state
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Check if OTP is complete
      const otpValue = newOtp.join("");
      if (otpValue.length === length && onComplete) {
        onComplete(otpValue);
      }

      // Move focus to next input if value is entered
      if (value && index < length - 1) {
        focusInput(index + 1);
      }
    };

    const handleKeyDown = (
      e: KeyboardEvent<HTMLInputElement>,
      index: number,
    ) => {
      // Handle backspace - clear current field and move to previous
      if (e.key === "Backspace") {
        if (otp[index] === "") {
          // If current field is empty, move to previous field
          focusInput(index - 1);
        } else {
          // Clear current field but stay in place
          const newOtp = [...otp];
          newOtp[index] = "";
          setOtp(newOtp);
        }
      }
      // Handle arrow keys for navigation
      else if (e.key === "ArrowLeft") {
        focusInput(index - 1);
      } else if (e.key === "ArrowRight") {
        focusInput(index + 1);
      }
    };

    const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const clipboardData = e.clipboardData.getData("text").trim();

      // Check if pasted data matches expected format (numbers only, correct length)
      if (!/^\d+$/.test(clipboardData)) return;

      const pastedChars = clipboardData.split("").slice(0, length);

      // Fill OTP fields with pasted data
      const newOtp = [...otp];
      pastedChars.forEach((char, idx) => {
        newOtp[idx] = char;
      });

      setOtp(newOtp);

      // Focus last filled input or the next empty one
      const focusIndex = Math.min(pastedChars.length, length - 1);
      focusInput(focusIndex);

      // Check if OTP is complete after paste
      if (pastedChars.length === length && onComplete) {
        onComplete(pastedChars.join(""));
      }
    };

    return (
      <div className="flex items-center justify-center space-x-3">
        {Array.from({ length }, (_, index) => (
          <Input
            key={index}
            type="number"
            inputMode="numeric"
            maxLength={1}
            ref={(el) => setRef(el, index)}
            value={otp[index]}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={index === 0 ? handlePaste : undefined}
            autoFocus={autoFocus && index === 0}
            className="h-14 w-12 rounded-lg border border-gray-300 bg-gray-50 text-center text-base font-medium transition-all focus:border-primary-500 focus:outline-none"
            aria-label={`OTP digit ${index + 1}`}
          />
        ))}
      </div>
    );
  },
);

OTPInput.displayName = "OTPInput";

export default OTPInput;
