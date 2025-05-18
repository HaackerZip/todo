import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/modules/ui/button"
import { memo, useMemo } from "react";

interface CarouselButtonProps {
  direction: "left" | "right";
  onClick: () => void;
  disabled: boolean;
}

const CarouselButton = memo(function CarouselButton({
  direction,
  onClick,
  disabled
}: CarouselButtonProps) {
  const isLeft = direction === "left";

  // Memoize the icon to prevent re-renders
  const icon = useMemo(() => (
    isLeft ? (
      <ChevronLeft className="h-6 w-6 text-white" />
    ) : (
      <ChevronRight className="h-6 w-6 text-white" />
    )
  ), [isLeft]);

  return (
    <Button
      variant="ghost"
      size="icon"
      className={`absolute ${isLeft ? "left-0" : "right-0"} top-1/2 -translate-y-1/2 z-10 bg-deep-black/50 hover:bg-deep-black/70 ${disabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon}
    </Button>
  );
});

CarouselButton.displayName = "CarouselButton";

export default CarouselButton;