import { IconButton } from "@/components/base/icon-button/IconButton";
import { Icon } from "@/components/base/icon/Icon";
import MenuItem from "@/components/base/MenuItem";
import { Popover } from "@/components/base/popover/Popover";
import { useToggle } from "@/hooks/useToggle";
import type { Address } from "../types/types";
import { formatAddress } from "../utils";
import { Chip } from "@/components/base/chip/Chip";
import { ADDRESS_TYPE_CONFIG } from "../constants";
import { AddressTypeEnum } from "../enums";

interface AddressListItemProps {
  address: Address;
  onEdit: (address: Address) => void;
  onDelete: (address: Address) => void;
  onSetDefault: (address: Address) => void;
}

const AddressListItem = ({
  address,
  onEdit,
  onDelete,
  onSetDefault,
}: AddressListItemProps) => {
  const popover = useToggle();

  const config = ADDRESS_TYPE_CONFIG[address.addressType];
  const label =
    address.addressType === AddressTypeEnum.OTHER && address.otherAddressLabel
      ? address.otherAddressLabel
      : config.label;

  const handleEdit = () => {
    popover.close();
    onEdit(address);
  };

  const handleDelete = () => {
    popover.close();
    onDelete(address);
  };

  const handleSetDefault = () => {
    popover.close();
    onSetDefault(address);
  };

  return (
    <div className="flex items-center gap-3 rounded-xl border border-n-400 bg-n-50 p-4">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-p-100">
        <Icon
          name={config.icon}
          size="md"
          className="text-p-600"
          strokeWidth={2}
        />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="font-semibold text-n-900">{label}</p>
          {address.isDefault && <Chip>Default</Chip>}
        </div>
        <p className="mt-0.5 text-sm text-n-800 line-clamp-2">
          {formatAddress(address)}
        </p>
      </div>

      <Popover
        trigger={
          <IconButton
            icon="MoreVertical"
            size="sm"
            variant="ghost"
            color="neutral"
            aria-label="Address options"
          />
        }
        isOpen={popover.isOpen}
        onOpenChange={(open) => (open ? popover.open() : popover.close())}
      >
        <div>
          <MenuItem onClick={handleEdit}>Edit</MenuItem>
          {!address.isDefault && (
            <MenuItem onClick={handleSetDefault}>
              Set as default address
            </MenuItem>
          )}
          <MenuItem onClick={handleDelete}>Delete</MenuItem>
        </div>
      </Popover>
    </div>
  );
};

export default AddressListItem;
