import { isNotEmpty } from "@/lib/utils";
import { createFormContext } from "@mantine/form";
import { ReactNode } from "react";

export interface Lease {
  _id: string;
  formNumber: string;
  leaseService: string;
  totalLeasePrice: number;
  paidLeasePrice: number;
  remainingLeasePrice: number;
  region: string;
  city: string;
  subcity: string;
  kebele: string;
  houseNumber: string;
  leaseArea: number;
  bookNumber: string;
  bankName: string;
  value: number;
  prePayment: number;
  penalty: number;
  penaltyToGovernment: number;
  paymentType: string;
  bookGivenDate: string;

}

const leaseInitialValues: Lease = {
  _id: "123456",
  formNumber: "F123",
  leaseService: "Residential",
  bankName : "",
  totalLeasePrice: 100000,
  paidLeasePrice: 40000,
  remainingLeasePrice: 60000,
  region: "Region 1",
  city: "City A",
  subcity: "Subcity B",
  kebele: "Kebele C",
  houseNumber: "H123",
  bookNumber: "B123",
  leaseArea: 1500,
  value: 100000,
  prePayment: 20000,
  penalty: 500,
  penaltyToGovernment: 300,
  paymentType: "Bank Transfer",
  bookGivenDate: "2023-01-01",
};

const [FormProvider, useLeaseFormContext, useLeaseForm] =
  createFormContext<Lease>();

export { useLeaseFormContext };

type Props = { children: ReactNode };
export const LeaseFormProvider = ({ children }: Props) => {
  const form = useLeaseForm({
    mode: "uncontrolled",
    initialValues: leaseInitialValues,
    validate: {
      formNumber: (value) => (value ? null : "Form Number is required"),
      leaseService: (value) => (value ? null : "Lease Service is required"),
      totalLeasePrice: (value) =>
        value > 0 ? null : "Total Lease Price must be greater than 0",
      paidLeasePrice: (value) =>
        value >= 0 ? null : "Paid Lease Price must be zero or greater",
      remainingLeasePrice: (value) =>
        value >= 0 ? null : "Remaining Lease Price must be zero or greater",
      region: (value) => (value ? null : "Region is required"),
      city: (value) => (value ? null : "City is required"),
      subcity: (value) => (value ? null : "Subcity is required"),
      kebele: (value) => (value ? null : "Kebele is required"),
      houseNumber: (value) => (value ? null : "House Number is required"),
      bookNumber: (value) => (value ? null : "Book Number is required"),
      leaseArea: (value) =>
        value > 0 ? null : "Lease Area must be greater than 0",
      value: (value) => (value > 0 ? null : "Value must be greater than 0"),
      prePayment: (value) =>
        value >= 0 ? null : "Pre Payment must be zero or greater",
      penalty: (value) =>
        value >= 0 ? null : "Penalty must be zero or greater",
      penaltyToGovernment: (value) =>
        value >= 0 ? null : "Penalty to Government must be zero or greater",
      paymentType: (value) => (value ? null : "Payment Type is required"),
      bookGivenDate: (value) => (value ? null : "Book Given Date is required"),
    },
  });

  return <FormProvider form={form}>{children}</FormProvider>;
};
