import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null
    | undefined;
  size?: "default" | "sm" | "lg" | "icon" | null | undefined;
  onClick? : Function;
};

const ButtonWithIcon = ({ children, className, variant, size,onClick }: Props) => {
  return (
    <Button
      variant={variant}
      onClick={() => onClick && onClick()}
      size={size}
      className={cn("flex items-center gap-3", className)}
    >
      {children}
    </Button>
  );
};

export default ButtonWithIcon;
