import type { TabSelectorItem } from "@/components/base/TabSelector";
import { AddressTypeEnum } from "./enums";

export const ADDRESS_TYPE_ITEMS: TabSelectorItem[] = [
  { value: AddressTypeEnum.HOME, label: "Home" },
  { value: AddressTypeEnum.WORK, label: "Work" },
  { value: AddressTypeEnum.OTHER, label: "Other" },
];
