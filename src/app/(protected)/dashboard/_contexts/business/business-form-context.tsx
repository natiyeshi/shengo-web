import { isNotEmpty } from "@/lib/utils";
import { createFormContext } from "@mantine/form";
import { ReactNode } from "react";

export type Business = {
  _id: string;
  registrationNumber: string; 
  licenseNumber: string; 
  businessName: string; 
  tin: string; 
  businessType: string; 
  region: string; 
  city: string; 
  subcity: string; 
  kebele: string; 
  houseNumber: string; 
  value: string; 
  prePayment: string; 
  penalty: string; 
  penaltyToGovernment: string; 
  paymentType: string; 
  bankName?: string; 
  chequeNumber?: string; 
};
export const businessInitialValues: Business = {
  _id: "1323",
  licenseNumber: "L789012", 
  registrationNumber: "B123456", 
  businessName: "Tech Innovations", 
  businessType: "IT Services", 
  tin: "123456789", 
  kebele: "05", 
  houseNumber: "23", 
  region: "Addis Ababa", 
  city: "Addis", 
  subcity: "03", 
  value: "1000000", 
  prePayment: "10000", 
  penalty: "500", 
  penaltyToGovernment: "250", 
  paymentType: "Cheque", 
  bankName: "Commercial Bank", 
  chequeNumber: "CPO12345",
};

const [FormProvider, useBusinessFormContext, useBusinessForm] =
  createFormContext<Business>();

export { useBusinessFormContext };

type Props = { children: ReactNode };
export const BusinessFormProvider = ({ children }: Props) => {
  const form = useBusinessForm({
    mode: "uncontrolled",
    initialValues: businessInitialValues,
    validate: {},
  });

  return <FormProvider form={form}>{children}</FormProvider>;
};
