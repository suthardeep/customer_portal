import { Button } from "@/components/base/button/Button";
import Dialog from "@/components/base/Dialog";
import { IconButton } from "@/components/base/icon-button/IconButton";
import { Input } from "@/components/base/input/Input";
import { Popover } from "@/components/base/popover/Popover";
import { Select } from "@/components/base/select";
import Tooltip from "@/components/base/Tooltip";
import { useToggle } from "@/hooks/useToggle";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/_protected/")({ component: App });

function App() {
  const loading = useToggle();
  const [selectedProduct, setSelectedProduct] = useState<string>();
  const [selectedCategory, setSelectedCategory] = useState<string>();

  return (
    <div className="p-6">
      <h1>Hi</h1>
      <div className="flex items-center gap-2">
        <Button onClick={loading.toggle}>Button</Button>
        <Tooltip content="Hello there">
          <Button>Button</Button>
        </Tooltip>
        <Popover
          trigger={
            <IconButton
              isLoading={loading.isOpen}
              icon="Store"
              aria-label="icon-button"
              variant="ghost"
              size="lg"
            />
          }
        >
          <Input
            leftElement={
              <IconButton
                icon="Search"
                aria-label="search-input"
                variant="ghost"
              />
            }
            rightElement={
              <IconButton
                icon="Search"
                aria-label="search-input"
                variant="ghost"
              />
            }
          />
        </Popover>
      </div>
      <Select
        label="Product"
        placeholder="Choose..."
        options={[
          { value: "1", label: "Option 1" },
          { value: "2", label: "Option 2", disabled: true },
        ]}
        value={""}
        onValueChange={() => {}}
        helperText="Helper text here"
        error="Error message" // Overrides helperText
        size="md" // xs, sm, md, lg
        disabled={false}
        required={false}
        fullWidth={true}
      />
      <Dialog
        onClose={loading.close}
        isOpen={false}
        title="Dialog here"
        actions={{
          primary: {
            label: "Hello",
            onClick: () => {},
          },
          secondary: {
            label: "Hello",
            onClick: () => {},
          },
        }}
      >
        hi
      </Dialog>

      {/* Select Component Examples */}
      <div className="mt-8 space-y-6">
        <h2>Select Component Examples</h2>

        {/* Basic Select with Helper Text */}
        <Select
          label="Select a Product"
          placeholder="Choose a product..."
          options={[
            { value: "1", label: "Product 1" },
            { value: "2", label: "Product 2" },
            { value: "3", label: "Product 3" },
            { value: "4", label: "Product 4 (Disabled)", disabled: true },
            { value: "5", label: "Product 5" },
          ]}
          value={selectedProduct}
          onValueChange={setSelectedProduct}
          helperText="Pick your favorite product"
          size="md"
        />

        {/* Select with Error */}
        <Select
          label="Category"
          placeholder="Select a category..."
          options={[
            { value: "electronics", label: "Electronics" },
            { value: "clothing", label: "Clothing" },
            { value: "books", label: "Books" },
          ]}
          value={selectedCategory}
          onValueChange={setSelectedCategory}
          error="This field is required"
          size="md"
          required
        />
      </div>
    </div>
  );
}
