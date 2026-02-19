import type { ReactNode } from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/utils/cssHelpers";

export interface Tab {
  value: string;
  label: string;
  content: ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultValue?: string;
  className?: string;
}

export function Tabs({ tabs, defaultValue, className }: TabsProps) {
  const firstTab = tabs[0]?.value;

  return (
    <TabsPrimitive.Root
      defaultValue={defaultValue || firstTab}
      className={cn("w-full", className)}
    >
      <TabsPrimitive.List className="flex border-b border-n-200">
        {tabs.map((tab) => (
          <TabsPrimitive.Trigger
            key={tab.value}
            value={tab.value}
            className={cn(
              "relative px-4 py-3 font-medium text-n-800 transition-colors w-full cursor-pointer",
              "hover:text-n-950",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-p-500 focus-visible:ring-offset-2",
              "data-[state=active]:text-p-600",
              "data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0",
              "data-[state=active]:after:h-0.5 data-[state=active]:after:bg-p-500",
              "data-[state=active]:after:transition-all",
            )}
          >
            {tab.label}
          </TabsPrimitive.Trigger>
        ))}
      </TabsPrimitive.List>

      {tabs.map((tab) => (
        <TabsPrimitive.Content
          key={tab.value}
          value={tab.value}
          className="focus-visible:outline-none"
        >
          {tab.content}
        </TabsPrimitive.Content>
      ))}
    </TabsPrimitive.Root>
  );
}
