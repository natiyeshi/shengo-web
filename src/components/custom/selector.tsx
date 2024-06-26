import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import { SelectorData } from "../_types";
import { cn } from "@/lib/utils";
type Props = {
  defaultIndex?: number;
  selectorData: SelectorData[];
  placeholder?: string;
  className?: string;
};

const Selector = ({
  selectorData,
  defaultIndex = 0,
  placeholder = "Select",
  className,
}: Props) => {
  return (
    <Select defaultValue={selectorData[defaultIndex].value}>
      <SelectTrigger className={cn("", className)}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {selectorData.map((data) => (
          <SelectItem key={data.value} value={data.value}>
            {data.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default Selector;
