import { isNotEmpty } from "@/lib/utils";
import { createFormContext } from "@mantine/form";
import { ReactNode } from "react";

export type Vehiclespare = {
  _id: string;
  propertyName: string;
  penality?: number;
  penalityToGovernment?: number;
  paymentType: string;
  bankName?: string;
  prePayment: number;

  value: number;
  chequeNumber?: string;
};
export const vehiclespareInitialValues: Vehiclespare = {
  _id: "1323",
  propertyName: "Name",
  penality: 50.00,
  penalityToGovernment: 200.00,
  prePayment: 300.00,
  paymentType: "PaymentType",
  chequeNumber: "Cheque5678",
  value: 100
};

const [FormProvider, useVehiclespareFormContext, useVehiclespareForm] =
  createFormContext<Vehiclespare>();

export { useVehiclespareFormContext };

type Props = { children: ReactNode };
export const VehiclespareFormProvider = ({ children }: Props) => {
  const form = useVehiclespareForm({
    mode: "uncontrolled",
    initialValues: vehiclespareInitialValues,
    validate: {
     
    },
  });

  return <FormProvider form={form}>{children}</FormProvider>;
};
