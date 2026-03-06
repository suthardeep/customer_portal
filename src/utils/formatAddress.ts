type AddressFields = {
  addressLine1: string;
  addressLine2?: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
};

export const formatAddress = (address: AddressFields): string =>
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
