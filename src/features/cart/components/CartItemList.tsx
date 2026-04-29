import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/base/button/Button";
import { Checkbox } from "@/components/base/checkbox/Checkbox";
import {
  useDeleteCartItemMutation,
  useUpdateCartItemMutation,
} from "../cartMutations";
import { ClearCartButton } from "./ClearCartButton";
import type { CartItem } from "../types/types";
import { CartItemCard } from "./CartItemCard";

interface CartItemListProps {
  items: CartItem[];
}

export function CartItemList({ items }: CartItemListProps) {
  const updateMutation = useUpdateCartItemMutation();
  const deleteMutation = useDeleteCartItemMutation();
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const selectAllRef = useRef<HTMLInputElement>(null);

  const isAnyPending = updateMutation.isPending || deleteMutation.isPending;
  const selectedCount = selectedIds.size;
  const totalCount = items.length;
  const allSelected = totalCount > 0 && selectedCount === totalCount;
  const someSelected = selectedCount > 0 && selectedCount < totalCount;

  useEffect(() => {
    if (selectAllRef.current) {
      selectAllRef.current.indeterminate = someSelected;
    }
  }, [someSelected]);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(new Set(items.map((i) => i.variantId)));
    } else {
      setSelectedIds(new Set());
    }
  };

  const handleSelectItem = (id: string, checked: boolean) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (checked) {
        next.add(id);
      } else {
        next.delete(id);
      }
      return next;
    });
  };

  const handleQuantityChange = (id: string, quantity: number) => {
    if (quantity === 0) {
      handleDelete(id);
    } else {
      updateMutation.mutate({ variantId: id, quantity });
    }
  };

  const handleDelete = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
    deleteMutation.mutate({ variantId: id });
  };

  const handleBulkRemove = () => {
    selectedIds.forEach((id) => {
      deleteMutation.mutate({ variantId: id });
    });
    setSelectedIds(new Set());
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Selection header */}
      <div className="flex items-center gap-2 rounded-xl border border-n-400 bg-n-50 px-4 py-3 min-h-13.5">
        <Checkbox
          ref={selectAllRef}
          checked={allSelected}
          onChange={(e) => handleSelectAll(e.target.checked)}
          disabled={isAnyPending}
        />
        <p className="flex-1 font-medium text-n-800">
          {selectedCount}/{totalCount} Item{totalCount !== 1 ? "s" : ""}{" "}
          Selected
        </p>
        {selectedCount > 0 && (
          <Button
            variant="ghost"
            color="danger"
            size="sm"
            onClick={handleBulkRemove}
            disabled={isAnyPending}
          >
            Remove Selected
          </Button>
        )}
        <ClearCartButton />
      </div>

      {items.map((item) => (
        <CartItemCard
          key={item.id}
          item={item}
          isSelected={selectedIds.has(item.variantId)}
          onSelectChange={handleSelectItem}
          onQuantityChange={handleQuantityChange}
          onDelete={handleDelete}
          isUpdating={isAnyPending}
        />
      ))}
    </div>
  );
}
