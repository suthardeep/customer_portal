import { cn } from "@/utils/cssHelpers";
import { Controller, useFormContext } from "react-hook-form";
import { CONTENT_NICHES } from "../../constants";
import type { EditProfileFormData } from "../schemas/editProfileFormSchema";

interface ContentNicheSelectorProps {
  isPending: boolean;
}

export function ContentNicheSelector({ isPending }: ContentNicheSelectorProps) {
  const { control } = useFormContext<EditProfileFormData>();

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-n-800">Content Niche</p>
      <Controller
        name="niches"
        control={control}
        render={({ field }) => (
          <div className="flex flex-wrap gap-2">
            {CONTENT_NICHES.map((niche) => {
              const selected = field.value.includes(niche);
              return (
                <button
                  key={niche}
                  type="button"
                  disabled={isPending}
                  onClick={() => {
                    const current = field.value;
                    field.onChange(
                      selected
                        ? current.filter((n) => n !== niche)
                        : [...current, niche],
                    );
                  }}
                  className={cn(
                    "rounded-full px-3 py-1 text-sm border font-medium cursor-pointer transition-colors",
                    selected
                      ? "bg-p-100 text-p-700 border-transparent"
                      : "border-n-400 text-n-800 bg-white hover:border-n-500",
                  )}
                >
                  {niche}
                </button>
              );
            })}
          </div>
        )}
      />
    </div>
  );
}
