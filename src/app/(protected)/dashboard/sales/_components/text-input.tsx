import React, { ReactNode } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FieldValues, Path } from "react-hook-form";

import { DefaultFieldValues } from "@/types";
import { SelectorData } from "../_types";

import FieldControl from "./field-control";
import LabelMandatory from "./label-mandatory";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

import Selector from "./selector";

type Props<SchemaType extends FieldValues = DefaultFieldValues> = {
  className?: string;
  wrapperClassName?: string;
  name: Path<SchemaType>;
  mandatory?: ReactNode;
  label?: ReactNode;
  placeholder?: string;
} & (
  | ({ defaultValue?: string | number } & (
      | {
          variants: "input";
          type?: "text" | "email" | "number" | "password";
        }
      | { variants: "textarea" }
    ))
  | {
      variants: "select";
      selectorData: SelectorData[];
      defaultIndex?: number;
    }
);

const TextInput = <SchemaType extends FieldValues = DefaultFieldValues>(
  props: Props<SchemaType>,
) => {
  const { className, wrapperClassName, name, mandatory, label, placeholder } =
    props;
  const { control } = useFormContext<SchemaType>();
  return (
    <FieldControl className={cn("", wrapperClassName)}>
      {label && <Label>{label}</Label>}
      {mandatory && <LabelMandatory className="">{mandatory}</LabelMandatory>}
      {props.variants === "input" && (
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              type={props.type || "text"}
              className={cn("", className)}
              placeholder={placeholder}
              defaultValue={
                props.type === "number"
                  ? props.defaultValue && +props.defaultValue
                  : props.defaultValue
              }
            />
          )}
        />
      )}
      {props.variants === "textarea" && (
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Textarea
              {...field}
              className={cn("", className)}
              placeholder={placeholder}
              defaultValue={props.defaultValue}
            />
          )}
        />
      )}

      {props.variants === "select" && (
        <Selector<SchemaType>
          name={name}
          className={cn("", className)}
          placeholder={placeholder}
          selectorData={props.selectorData}
          defaultIndex={props.defaultIndex}
        />
      )}
    </FieldControl>
  );
};

export default TextInput;
