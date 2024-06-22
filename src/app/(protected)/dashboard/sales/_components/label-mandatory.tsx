import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import React, { ReactNode } from "react";
import { Star } from "lucide-react";

type Props = {
  children: ReactNode;
  className?: string;
};

const LabelMandatory = ({ className, children }: Props) => {
  return (
    <Label className={cn("flex gap-1.5", className)}>
      <span>{children}</span>
      <span className="text-red-600">*</span>
    </Label>
  );
};

export default LabelMandatory;
