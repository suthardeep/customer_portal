import {
	useDeleteCartItemMutation,
	useUpdateCartItemMutation,
} from "../cartMutations";

export function useCartItemActions() {
	const updateMutation = useUpdateCartItemMutation();
	const deleteMutation = useDeleteCartItemMutation();

	const isAnyPending = updateMutation.isPending || deleteMutation.isPending;

	const handleDelete = (variantId: string) => {
		deleteMutation.mutate({ variantId });
	};

	const handleQuantityChange = (variantId: string, quantity: number) => {
		if (quantity === 0) {
			handleDelete(variantId);
		} else {
			updateMutation.mutate({ variantId, quantity });
		}
	};

	return { handleQuantityChange, handleDelete, isAnyPending };
}
