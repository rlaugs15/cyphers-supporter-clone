import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center group",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative w-full h-2 overflow-hidden *:transition rounded-full grow bg-neutral-100 dark:bg-neutral-800">
      <SliderPrimitive.Range className="absolute h-full bg-neutral-900 dark:bg-neutral-50" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block w-4 h-4 transition bg-white border-2 rounded-full opacity-0 group-hover:opacity-100 border-neutral-900 ring-offset-white focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-50 dark:bg-neutral-950 dark:ring-offset-neutral-950" />
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
