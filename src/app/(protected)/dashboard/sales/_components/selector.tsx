"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useEffect, useState } from "react";
import { SelectorData } from "../_types";
import { cn } from "@/lib/utils";
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { DefaultFieldValues } from "@/types";

type Props<SchemaType extends FieldValues = DefaultFieldValues> = {
  defaultIndex?: number;
  selectorData: SelectorData[];
  placeholder?: string;
  className?: string;
  name: Path<SchemaType>;
};

const Selector = <SchemaType extends FieldValues = DefaultFieldValues>({
  selectorData,
  defaultIndex = 0,
  placeholder = "Select",
  className,
  name,
}: Props<SchemaType>) => {
  const [data, setData] = useState<SelectorData[]>([]);
  const { control } = useFormContext<SchemaType>();

  useEffect(() => {
    setData(selectorData);
    console.log(selectorData);
  }, [selectorData]);

  return (
    <Controller
      name={name}
      control={control}
      render={({}) => (
        <Select defaultValue={data[defaultIndex].value}>
          <SelectTrigger className={cn("", className)}>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {data.map((data) => (
              <SelectItem key={data.value} value={data.value}>
                {data.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    />
  );
};

export default Selector;
