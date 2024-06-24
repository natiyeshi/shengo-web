import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

type Props = {
  className?: string;
  children: ReactNode;
};

const Rows = ({ className, children }: Props) => {
  return <div className={cn("flex flex-col gap-5", className)}>{children}</div>;
};

export default Rows;
