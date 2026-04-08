import { Icon } from "@/components/base/icon";
import { cn } from "@/utils/cssHelpers";
import { CREATE_REEL_STEPS } from "../constants";

interface StepIndicatorProps {
  currentStep: number;
  className?: string;
}

const StepIndicator = ({ currentStep, className }: StepIndicatorProps) => {
  return (
    <div className={cn("flex items-center justify-center gap-0", className)}>
      {CREATE_REEL_STEPS.map((step, index) => {
        const isCompleted = currentStep > step.number;
        const isActive = currentStep === step.number;
        const isLast = index === CREATE_REEL_STEPS.length - 1;

        return (
          <div key={step.number} className="flex items-center">
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  "flex size-7 items-center justify-center rounded-full text-sm font-semibold transition-colors",
                  isCompleted && "bg-success-500 text-white",
                  isActive && "bg-p-500 text-white",
                  !isCompleted && !isActive && "bg-n-200 text-n-600",
                )}
              >
                {isCompleted ? (
                  <Icon name="Check" size="sm" className="text-white" />
                ) : (
                  step.number
                )}
              </div>
              <span
                className={cn(
                  "text-sm font-medium",
                  isActive && "text-n-950",
                  isCompleted && "text-success-600",
                  !isCompleted && !isActive && "text-n-500",
                )}
              >
                {step.label}
              </span>
            </div>

            {!isLast && (
              <div
                className={cn(
                  "mx-3 h-0.5 w-12 rounded-full transition-colors",
                  currentStep > step.number ? "bg-success-500" : "bg-n-200",
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StepIndicator;
