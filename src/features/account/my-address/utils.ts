import type { Address } from "./types/types";

export const formatAddress = (address: Address): string =>
  [
    address.addressLine1,
    address.addressLine2,
    address.landmark,
    address.city,
    `${address.state} - ${address.pincode}`,
  ]
    .filter(Boolean)
    .map((part) => part!.replace(/,\s*$/, ""))
    .join(", ");
