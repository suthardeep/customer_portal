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
  otherAddressLabel?: string;
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
  | "otherAddressLabel"
  | "latitude"
  | "longitude"
  | "isDefault"
>;

export type UpdateAddressRequest = CreateAddressRequest & { id: string };

/** City/state resolved from a pincode lookup. */
export interface PincodeLocation {
  city: string;
  state: string;
}

/** Shape of a single post office entry from the postalpincode.in API. */
interface PostOffice {
  Name: string;
  Block: string;
  District: string;
  State: string;
  Country: string;
}

/** Raw response array from https://api.postalpincode.in/pincode/{pincode} */
export type PostalPincodeResponse = Array<{
  Message: string;
  Status: "Success" | "Error";
  PostOffice: PostOffice[] | null;
}>;
