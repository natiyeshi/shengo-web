"use client";
import { ReactNode } from "react";
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  DefaultValues,
  FieldValues,
  FormProvider,
  useForm,
} from "react-hook-form";

type Props<T extends FieldValues> = {
  children: ReactNode;
  resolver: any;
  defaultValues: DefaultValues<T>;
};

function RegistrationFormProvider<T extends FieldValues>({
  children,
  defaultValues,
  resolver,
}: Props<T>) {
  const methods = useForm<T>({
    mode: "all",
    defaultValues,
    resolver: zodResolver(resolver),
  });
  return (
    <FormProvider {...methods}>
      {children}
      <DevTool control={methods.control} />
    </FormProvider>
  );
}

export default RegistrationFormProvider;
