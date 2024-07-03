import { isNotEmpty } from "@/lib/utils";
import { createFormContext } from "@mantine/form";
import { ReactNode } from "react";

export interface Loan {
  _id: string;
  loanType: string;
  loanAmount: number;
  paymentType: string;
  penaltyForOther: number;
  penaltyToGovernment: number;
  loanEndingDate: string;
  checkNumber: string;
}

const loanInitialValues: Loan = {
  _id: "7891011",
  loanType: "",
  loanAmount: 50000,
  paymentType: "Late Fee",
  penaltyForOther: 50,
  penaltyToGovernment: 30,
  loanEndingDate: "2024-12-31",
  checkNumber: "CHK123456",
};

const [FormProvider, useLoanFormContext, useLoanForm] =
  createFormContext<Loan>();

export { useLoanFormContext };

type Props = { children: ReactNode };
export const LoanFormProvider = ({ children }: Props) => {
  const form = useLoanForm({
    mode: "uncontrolled",
    initialValues: loanInitialValues,
    validate: {
      _id: (value) => (value ? null : "ID is required"),
      loanType: (value) => (value ? null : "Loan Type is required"),
      loanAmount: (value) =>
        value > 0 ? null : "Loan Amount must be greater than 0",
      paymentType: (value) => (value ? null : "Penalty Type is required"),
      penaltyForOther: (value) =>
        value >= 0 ? null : "Penalty for Other must be zero or greater",
      penaltyToGovernment: (value) =>
        value >= 0 ? null : "Penalty to Government must be zero or greater",
      loanEndingDate: (value) =>
        value ? null : "Loan Ending Date is required",
      checkNumber: (value) => (value ? null : "Check Number is required"),
    },
  });

  return <FormProvider form={form}>{children}</FormProvider>;
};
