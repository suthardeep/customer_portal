import type { TabSelectorItem } from "@/components/base/TabSelector";
import type { IconName } from "@/components/base/icon/iconRegistry";
import { AddressTypeEnum } from "./enums";

export const ADDRESS_TYPE_ITEMS: TabSelectorItem[] = [
  { value: AddressTypeEnum.HOME, label: "Home" },
  { value: AddressTypeEnum.WORK, label: "Work" },
  { value: AddressTypeEnum.OTHER, label: "Other" },
];

export const ADDRESS_TYPE_CONFIG: Record<string, { icon: IconName; label: string }> = {
  [AddressTypeEnum.HOME]: { icon: "Home", label: "Home" },
  [AddressTypeEnum.WORK]: { icon: "Briefcase", label: "Work" },
  [AddressTypeEnum.OTHER]: { icon: "Location", label: "Other" },
};
