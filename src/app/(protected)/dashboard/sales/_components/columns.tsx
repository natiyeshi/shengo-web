import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

const Columns = ({ children, className }: Props) => {
  return (
    <section
      className={cn(
        "grid gap-3 grid-cols-1 sm:grid-cols-2  md:grid-cols-3",
        className
      )}
    >
      {children}
    </section>
  );
};

export default Columns;
