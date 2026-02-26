export type { AddressFormData } from "../schemas/addressFormSchema";
import type { AddressType } from "../enums";

export interface Address {
  id: string;
  customerId: string;
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  addressType: AddressType;
  latitude?: number;
  longitude?: number;
  isDefault: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export type CreateAddressRequest = Pick<
  Address,
  | "fullName"
  | "phone"
  | "addressLine1"
  | "addressLine2"
  | "landmark"
  | "city"
  | "state"
  | "pincode"
  | "addressType"
  | "latitude"
  | "longitude"
  | "isDefault"
>;

export type UpdateAddressRequest = CreateAddressRequest & { id: string };
