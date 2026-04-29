export function NoAddressPrompt({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-n-400 bg-n-50 p-4">
      <div>
        <p className="font-semibold text-n-900">No delivery address saved</p>
        <p className="mt-0.5 text-sm text-n-600">
          Add an address to continue checkout
        </p>
      </div>
      <button
        onClick={onAdd}
        className="shrink-0 text-sm font-semibold text-p-600 hover:underline"
      >
        Add Address
      </button>
    </div>
  );
}
