import { AddressTypeEnum } from "@/features/account/my-address/enums";
import { z } from "zod";

export const addressFormSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  phone: z.string().length(10, "Enter a valid 10-digit mobile number"),
  addressLine1: z.string().min(1, "Address is required"),
  addressLine2: z.string().optional(),
  landmark: z.string().optional(),
  pincode: z.string().length(6, "Enter a valid 6-digit pincode"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
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
