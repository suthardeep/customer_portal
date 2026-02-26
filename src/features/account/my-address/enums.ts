export const AddressTypeEnum = {
  HOME: "home",
  WORK: "work",
  OTHER: "other",
} as const;

export type AddressType = (typeof AddressTypeEnum)[keyof typeof AddressTypeEnum];
