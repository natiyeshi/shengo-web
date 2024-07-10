import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

type Props = {
  children?: ReactNode;
  className?: string;
};

const EmptyListMessage = ({children,className}: Props) => {
  return <p className={cn("text-zinc-400/90 my-3", className)}>{children}</p>;
};

export default EmptyListMessage;
