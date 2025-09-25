import * as SwitchPrimitive from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";

function Switch({ className, ...props }) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer inline-flex h-[1.3rem] w-10 shrink-0 items-center rounded-full border border-gray-300 bg-gray-200 shadow-sm transition-all outline-none",
        "focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-green-500 focus-visible:border-green-500",
        "data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500",
        "hover:shadow-md hover:scale-105 active:scale-95",
        "disabled:cursor-not-allowed disabled:opacity-60",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "pointer-events-none block size-5 rounded-full bg-white shadow transition-transform duration-300 ease-in-out",
          "data-[state=checked]:translate-x-[calc(100%-4px)] data-[state=unchecked]:translate-x-[2px]",
          "dark:bg-gray-800 dark:data-[state=checked]:bg-white"
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
