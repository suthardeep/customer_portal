export default function OrderSuccessSkeleton() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        {/* Check image */}
        <div className="flex justify-center">
          <div className="shimmer size-28 rounded-full" />
        </div>

        {/* Title & subtitle */}
        <div className="space-y-2 text-center">
          <div className="shimmer mx-auto h-8 w-48 rounded-md" />
          <div className="shimmer mx-auto h-5 w-72 rounded-md" />
        </div>

        {/* Deliver to card */}
        <div className="shimmer h-20 w-full rounded-xl" />

        {/* Coins earned card */}
        <div className="shimmer h-14 w-full rounded-xl" />

        {/* CTA buttons */}
        <div className="space-y-3">
          <div className="shimmer h-12 w-full rounded-xl" />
          <div className="shimmer h-12 w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
}
