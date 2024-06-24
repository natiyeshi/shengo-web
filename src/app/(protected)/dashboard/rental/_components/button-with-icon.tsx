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
};

const ButtonWithIcon = ({ children, className, variant, size }: Props) => {
  return (
    <Button
      variant={variant}
      size={size}
      className={cn("flex items-center gap-3", className)}
    >
      {children}
    </Button>
  );
};

export default ButtonWithIcon;
