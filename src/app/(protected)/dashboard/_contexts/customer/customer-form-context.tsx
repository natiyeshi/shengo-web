import { createFormContext } from "@mantine/form";
import { ReactNode } from "react";
import { isNotEmpty } from "@/lib/utils";
import { CUSTOMER_TITLES, CUSTOMER_TYPES } from "@/_utils/constants";

export type CustomerInfo = {
  _id: string;
  customerType: string;
  customerTitle: string;
  name: string;
  fatherName: string;
  grandFatherName: string;
  gender: string;
  nationality: string;
  origin: string;
  tin: number;
  foreign: boolean;
  region: string;
  city: string;
  subcity: string;
  houseNumber: number;
  phoneNumber: string;
  otherAddress: string;

  businessName: string;
  grantorName: string;
  jobPosition: string;
};

export const customerFormContextInitial: CustomerInfo = {
  _id: "",
  customerType: CUSTOMER_TYPES[0].value,
  customerTitle: CUSTOMER_TITLES[0].value,
  name: "nesru",
  fatherName: "doro",
  grandFatherName: "bela",
  gender: "male",
  nationality: "ethiopian",
  origin: "ethiopian",
  tin: 10,
  foreign: false,
  region: "addis ababa",
  city: "Addis Ababa",
  subcity: "Kilinto",
  houseNumber: 1234,
  phoneNumber: "097777777",
  otherAddress: "",

  businessName: "",
  grantorName: "",
  jobPosition: "",
};

const [FormProvider, useCustomerFormContext, useCustomerForm] =
  createFormContext<CustomerInfo>();

export { useCustomerFormContext };

type Props = { children: ReactNode };
export const CustomerFormProvider = ({ children }: Props) => {
  const form = useCustomerForm({
    mode: "uncontrolled",
    initialValues: customerFormContextInitial,
    validate: {
      customerType: (value) =>
        isNotEmpty(value) ? null : "Customer type is required",
      customerTitle: (value) =>
        isNotEmpty(value) ? null : "Customer title is required",
      name: (value): any =>
        form.getValues().customerType === "organization" || isNotEmpty(value)
          ? null
          : "Name is required",
      fatherName: (value): any =>
        form.getValues().customerType === "organization" || isNotEmpty(value)
          ? null
          : "Father name is required",
      grandFatherName: (value): any =>
        form.getValues().customerType === "organization" || isNotEmpty(value)
          ? null
          : "Grandfather name is required",
      gender: (value) => (isNotEmpty(value) ? null : "Gender is required"),
      nationality: (value) =>
        isNotEmpty(value) ? null : "Nationality is required",
      origin: (value): any =>
        form.getValues().customerType === "organization" || isNotEmpty(value)
          ? null
          : "Origin is required",
      tin: (value): any =>
        form.getValues().customerType === "organization" || value
          ? null
          : "TIN must be a number",
      region: (value) => (isNotEmpty(value) ? null : "Region is required"),
      city: (value) => (isNotEmpty(value) ? null : "City is required"),
      subcity: (value) => (isNotEmpty(value) ? null : "Subcity is required"),
      houseNumber: (value) =>
        value < 1 ? "House number must be a valid number" : null,
      phoneNumber: (value) =>
        value.trim().length > 8
          ? null
          : "Phone number is required and must be a valid number",
      // otherAddress: (value) =>
      //   isNotEmpty(value) ? null : "Other address is required",

      businessName: (value): any =>
        form.getValues().customerType === "individual" || isNotEmpty(value)
          ? null
          : "Business Name is required",
      grantorName: (value): any =>
        form.getValues().customerType === "individual" || isNotEmpty(value)
          ? null
          : "Grantor Name is required",
      jobPosition: (value): any =>
        form.getValues().customerType === "individual" || isNotEmpty(value)
          ? null
          : "Job Position is required",
    },
  });
  return <FormProvider form={form}>{children}</FormProvider>;
};
