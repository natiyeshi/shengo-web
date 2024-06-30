import { isNotEmpty } from "@/lib/utils";
import { createFormContext } from "@mantine/form";
import { ReactNode } from "react";

export type Motorcycle = {
  _id: string;
  engineNumber: string;
  chassisNumber: string;
  libreNumber: string;
  region: string;
  code: string;
  plateNumber: string;
  motorcycleType: string;
  determinationKernNo: string;
  determinationPrice: string;
  salesValue: string;
  penaltyGov: string;
  penalty: string;
  bankName: string;
  prePayment: string;
  paymentType: string;
  chequeNumber: string;
};
export const motorcycleInitialValues: Motorcycle = {
  _id: "01234",
  engineNumber: "01234",
  chassisNumber: "01234",
  libreNumber: "01234",
  region: "Somalia",
  code: "3 Liu Tessabi",
  plateNumber: "01234",
  motorcycleType: "Truck",
  determinationKernNo: "01234",
  determinationPrice: "01234",
  salesValue: "01234",
  penaltyGov: "01234",
  penalty: "01234",
  bankName: "Commercial Bank",
  prePayment: "01234",
  paymentType: "In Cash",
  chequeNumber: "01234",
};

const [FormProvider, useMotorcycleFormContext, useMotorcycleForm] =
  createFormContext<Motorcycle>();

export { useMotorcycleFormContext };

type Props = { children: ReactNode };
export const MotorcycleFormProvider = ({ children }: Props) => {
  const form = useMotorcycleForm({
    mode: "uncontrolled",
    initialValues: motorcycleInitialValues,
    validate: {
      engineNumber: (value) =>
        isNotEmpty(value) ? null : "Engine Number is required",
      chassisNumber: (value) =>
        isNotEmpty(value) ? null : "Chassis Number is required",
      libreNumber: (value) =>
        isNotEmpty(value) ? null : "Libre Number is required",
      region: (value) => (isNotEmpty(value) ? null : "Region is required"),
      code: (value) => (isNotEmpty(value) ? null : "Code is required"),
      plateNumber: (value) =>
        isNotEmpty(value) ? null : "Plate Number is required",
      motorcycleType: (value) =>
        isNotEmpty(value) ? null : "Motorcycle Type is required",
      determinationKernNo: (value) =>
        isNotEmpty(value) ? null : "Determination Kern No is required",
      determinationPrice: (value) =>
        isNotEmpty(value) ? null : "Determination Price is required",
      salesValue: (value) =>
        isNotEmpty(value) ? null : "Sales Value is required",
      penaltyGov: (value) =>
        isNotEmpty(value) ? null : "Penalty Gov is required",
      penalty: (value) => (isNotEmpty(value) ? null : "Penalty is required"),
      bankName: (value) => (isNotEmpty(value) ? null : "Bank Name is required"),
      prePayment: (value) =>
        isNotEmpty(value) ? null : "Pre-Payment is required",
      paymentType: (value) =>
        isNotEmpty(value) ? null : "Payment Type is required",
      chequeNumber: (value) =>
        isNotEmpty(value) ? null : "Cheque Number is required",
    },
  });

  return <FormProvider form={form}>{children}</FormProvider>;
};
