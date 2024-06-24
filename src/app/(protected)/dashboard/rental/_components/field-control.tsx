import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

type Props = {
  className?: string;
  children: ReactNode;
};

const FieldControl = ({ children, className }: Props) => {
  return <div className={cn("flex flex-col gap-2 w-full", className)}>{children}</div>;
};

export default FieldControl;
