import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface ButtonRoundedProps {
  icon: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

export const ButtonRounded = ({
  icon,
  onClick,
  disabled,
  className,
}: ButtonRoundedProps) => {
  return (
    <Button
      variant="outline"
      size="icon"
      className={cn(
        "h-9 w-9 rounded-full border-white/40 bg-white/5 hover:bg-white/20 text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer",
        className
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {icon}
    </Button>
  );
};
