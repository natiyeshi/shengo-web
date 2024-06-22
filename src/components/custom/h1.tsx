import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  className?: string;
  children: React.ReactNode;
};

const H1 = ({ children, className }: Props) => {
  return (
    <h1 className={cn("font-semibold text-2xl md:4xl", className)}>
      {children}
    </h1>
  );
};

export default H1;
