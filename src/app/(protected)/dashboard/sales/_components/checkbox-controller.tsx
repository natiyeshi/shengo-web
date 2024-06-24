import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import React from "react";
import { Controller, FieldValues, Path } from "react-hook-form";

type Props<T extends FieldValues> = {
  name: Path<T>;
  className?: string;
};

const CheckboxController = <T extends FieldValues>({
  name,
  className,
}: Props<T>) => {
  return (
    <Controller
      name={name}
      render={({ field: { value, onChange } }) => (
        <Checkbox
          checked={value}
          onCheckedChange={(value) => onChange(value)}
          className={cn("rounded-sm", className)}
        />
      )}
    />
  );
};

export default CheckboxController;
