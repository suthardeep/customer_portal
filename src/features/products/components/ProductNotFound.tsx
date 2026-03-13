import { Button } from "@/components/base/button/Button";
import { Icon } from "@/components/base/icon";
import { Link } from "@tanstack/react-router";

export function ProductNotFound() {
  return (
    <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4 py-16 text-center">
      <div className="relative mb-6">
        <div className="flex size-24 items-center justify-center rounded-full bg-n-100">
          <Icon name="Package" size="lg" className="size-10 text-n-400" />
        </div>
        <div className="absolute -right-1 -bottom-1 flex size-9 items-center justify-center rounded-full bg-danger-100">
          <Icon name="X" size="sm" className="text-danger-500" />
        </div>
      </div>

      <h4 className="text-n-900">Product Not Found</h4>
      <p className="mt-2 max-w-sm text-n-500">
        The product you're looking for may have been removed, is temporarily
        unavailable, or the link might be incorrect.
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link to="/">
          <Button variant="filled" color="primary" size="lg">
            Browse Products
          </Button>
        </Link>
        <Link to="/">
          <Button
            variant="outline"
            color="primary"
            size="lg"
            startIcon="Search"
          >
            Search Products
          </Button>
        </Link>
      </div>
    </div>
  );
}
