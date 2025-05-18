import { Button } from "@/modules/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

type ButtonProps = {
  enabled: boolean;
  onClick: () => void;
}

export function PrevButton({ enabled, onClick }: ButtonProps) {
  return (
    <Button
      variant="ghost"
      className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full p-0 bg-black/50 hover:bg-black/70 text-vintage-gold hover:text-butterscotch transition-colors duration-300"
      onClick={onClick}
      disabled={!enabled}
      aria-label="Previous slide"
    >
      <ArrowLeft className="w-6 h-6" />
    </Button>
  );
}

export function NextButton({ enabled, onClick }: ButtonProps) {
  return (
    <Button
      variant="ghost"
      className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full p-0 bg-black/50 hover:bg-black/70 text-vintage-gold hover:text-butterscotch transition-colors duration-300"
      onClick={onClick}
      disabled={!enabled}
      aria-label="Next slide"
    >
      <ArrowRight className="w-6 h-6" />
    </Button>
  );
}

export function DotButton({
  selected,
  onClick
}: {
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      className={`w-3 h-3 rounded-full mx-1 transition-colors duration-300 ${selected ? "bg-vintage-gold" : "bg-dark-brown hover:bg-rustic-brown"}`}
      onClick={onClick}
      aria-label={`Navigate to ${selected ? "current" : "other"} slide`}
      type="button"
    />
  );
}