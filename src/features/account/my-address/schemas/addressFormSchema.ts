import { AddressTypeEnum } from "@/features/account/my-address/enums";
import { z } from "zod";

export const addressFormSchema = z.object({
  fullName: z.string().min(3, "Full name must be at least 3 characters").max(100, "Full name must be at most 100 characters"),
  phone: z
    .string()
    .regex(
      /^[6-9]\d{9}$/,
      "Phone must be a valid 10-digit Indian mobile number",
    ),
  addressLine1: z.string().min(10, "Address must be at least 10 characters").max(100, "Address must be at most 100 characters"),
  addressLine2: z
    .union([
      z.literal(""),
      z
        .string()
        .min(3, "Address line 2 must be at least 3 characters")
        .max(100, "Address line 2 must be at most 100 characters"),
    ])
    .optional(),
  landmark: z.string().max(100, "Landmark must be at most 100 characters").optional(),
  pincode: z.string().length(6, "Enter a valid 6-digit pincode"),
  city: z.string().min(2, "City must be at least 2 characters").max(100, "City must be at most 100 characters"),
  state: z.string().min(2, "State must be at least 2 characters").max(100, "State must be at most 100 characters"),
  addressType: z.enum([
    AddressTypeEnum.HOME,
    AddressTypeEnum.WORK,
    AddressTypeEnum.OTHER,
  ]),
  otherAddressLabel: z.string().optional(),
  isDefault: z.boolean(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
});

export type AddressFormData = z.infer<typeof addressFormSchema>;
