import { memo } from "react";
import CarouselButton from "./CarouselButton";

interface ControlsProps {
  onPrevClick: () => void;
  onNextClick: () => void;
  prevEnabled: boolean;
  nextEnabled: boolean;
  className?: string;
}

const Controls = memo(function Controls({
  onPrevClick,
  onNextClick,
  prevEnabled,
  nextEnabled,
  className,
}: ControlsProps) {
  return (
    <div className={`hidden sm:block ${className || ''}`}>
      <CarouselButton direction="left" onClick={onPrevClick} disabled={!prevEnabled} />
      <CarouselButton direction="right" onClick={onNextClick} disabled={!nextEnabled} />
    </div>
  );
});


Controls.displayName = "Controls";

export default Controls; 