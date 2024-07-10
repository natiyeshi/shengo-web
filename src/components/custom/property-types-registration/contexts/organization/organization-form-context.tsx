import { isNotEmpty } from "@/lib/utils";
import { createFormContext } from "@mantine/form";
import { ReactNode } from "react";

export type Organization = {
  _id: string;
  companyName: string;
  businessRegNo: string;
  businessLincenseNo: string;
  tin: number;
  region: string;
  zone: string;
  city: string;

  subCity: string;
  woreda: string;
  houseNo: string;
  businessCatagory: string;
};
export const organizationInitialValues: Organization = {
  _id: "01234",
  companyName: "nanu.co",
  businessRegNo: "et11332",
  businessLincenseNo: "123445",
  tin: 1234567890,
  region: "Addis Ababa",
  zone: "01",
  city: "Kilinto",

  subCity: "AASTU",
  woreda: "woreda",
  houseNo: "23456",
  businessCatagory: "Education",
};

const [FormProvider, useOrganizationFormContext, useOrganizationForm] =
  createFormContext<Organization>();

export { useOrganizationFormContext };

type Props = { children: ReactNode };
export const OrganizationFormProvider = ({ children }: Props) => {
  const form = useOrganizationForm({
    mode: "uncontrolled",
    initialValues: organizationInitialValues,
    validate: {
      companyName: (value) =>
        isNotEmpty(value) ? null : "Company Name is required",
      businessRegNo: (value) =>
        isNotEmpty(value) ? null : "Business Registration Number is required",
      businessLincenseNo: (value) =>
        isNotEmpty(value) ? null : "Business License Number is required",
      tin: (value) =>
        isNotEmpty(value.toString()) && value.toString().length < 5
          ? null
          : "TIN is required and should be at least 5 digits",
      region: (value) => (isNotEmpty(value) ? null : "Region is required"),
      zone: (value) => (isNotEmpty(value) ? null : "Zone is required"),
      city: (value) => (isNotEmpty(value) ? null : "City is required"),
      subCity: (value) => (isNotEmpty(value) ? null : "Sub-City is required"),
      woreda: (value) => (isNotEmpty(value) ? null : "Woreda is required"),
      houseNo: (value) =>
        isNotEmpty(value) ? null : "House Number is required",
      businessCatagory: (value) =>
        isNotEmpty(value) ? null : "Business Category is required",
    },
  });

  return <FormProvider form={form}>{children}</FormProvider>;
};
