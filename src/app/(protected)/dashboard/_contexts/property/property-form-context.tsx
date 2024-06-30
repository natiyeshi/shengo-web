import { isNotEmpty } from "@/lib/utils";
import { createFormContext } from "@mantine/form";
import { ReactNode } from "react";

export type Property = {
  _id : string;
  
  propertyName: string;  

  value: number;         
  penality?: number;     
  penaltyGov?: number;  
  prePayment: number;    
  paymentType: string;   
  bankName?: string;     
  chequeOrCpoNo?: string;  
};

export const propertyInitialValues: Property = {
  _id: "01234",
  propertyName: 'Default Property',
  value: 100000,
  penality: 0,
  penaltyGov: 0,
  prePayment: 5000,
  paymentType: 'Credit',
  bankName: 'Default Bank',
  chequeOrCpoNo: '123456789',
};

const [FormProvider, usePropertyFormContext, usePropertyForm] =
  createFormContext<Property>();

export { usePropertyFormContext };

type Props = { children: ReactNode };
export const PropertyFormProvider = ({ children }: Props) => {
  const form = usePropertyForm({
    mode: "uncontrolled",
    initialValues: propertyInitialValues,
    validate: {
      propertyName: (value) => (value ? null : 'Property Name is required'),
      value: (value) => (value > 0 ? null : 'Value must be greater than 0'),
      prePayment: (value) => (value > 0 ? null : 'Pre Payment must be greater than 0'),
      paymentType: (value) => (value ? null : 'Payment Type is required'),
    },
  });

  return <FormProvider form={form}>{children}</FormProvider>;
};
