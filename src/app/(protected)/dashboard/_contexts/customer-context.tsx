import { createFormContext } from "@mantine/form";
import { ReactNode } from "react";
import { CUSTOMER_TITLES, CUSTOMER_TYPES } from "@/_utils/constants";
import { isNotEmpty } from "@/lib/utils";

export type PersonInfo = {
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

export const initialValues: PersonInfo = {
  customerType: CUSTOMER_TYPES[0].value,
  customerTitle: CUSTOMER_TITLES[0].value,
  name: "nesru",
  fatherName: "",
  grandFatherName: "",
  gender: "",
  nationality: "ethiopian",
  origin: "ethiopian",
  tin: 0,
  foreign: false,
  region: "",
  city: "",
  subcity: "",
  houseNumber: 0,
  phoneNumber: "",
  otherAddress: "",

  businessName: "",
  grantorName: "",
  jobPosition: "",
};

const [CustomerFormProvider, useCustomerFormContext, useCustomerForm] =
  createFormContext<PersonInfo>();

export { useCustomerFormContext };

type Props = { children: ReactNode };
export const CustomerIdentitryRegistrationProvider = ({ children }: Props) => {
  const form = useCustomerForm({
    mode: "uncontrolled",
    initialValues,
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
      otherAddress: (value) =>
        isNotEmpty(value) ? null : "Other address is required",

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
  return <CustomerFormProvider form={form}>{children}</CustomerFormProvider>;
};
