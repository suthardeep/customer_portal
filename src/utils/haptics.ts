import { WebHaptics } from "web-haptics";

const haptics = new WebHaptics();

const patterns = {
  medium: [{ duration: 40, intensity: 1 }],
  heavy: [{ duration: 30, intensity: 0.5 }, { delay: 60, duration: 40, intensity: 1 }], // same as "success"
  error: [
    { duration: 40, intensity: 0.9 },
    { delay: 40, duration: 40, intensity: 0.9 },
    { delay: 40, duration: 40, intensity: 0.9 },
  ],
} as const;

export function haptic(preset: "medium" | "heavy" | "error") {
  haptics.trigger([...patterns[preset]]);
}
