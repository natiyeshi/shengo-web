import { isNotEmpty } from "@/lib/utils";
import { createFormContext } from "@mantine/form";
import { ReactNode } from "react";

export type Vehicle = {
  _id: string;
  engineNumber: string;
  chassisNumber: string;
  libreNumber: string;
  region: string;
  code: string;
  plateNumber: string;
  vehicleType: string;
};
export const vehicleInitialValues: Vehicle = {
  _id: "01234",
  engineNumber: "01234",
  chassisNumber: "01234",
  libreNumber: "01234",
  region: "Somalia",
  code: "3 Liu Tessabi",
  plateNumber: "01234",
  vehicleType: "Truck",
};

const [FormProvider, useVehicleFormContext, useVehicleForm] =
  createFormContext<Vehicle>();

export { useVehicleFormContext };

type Props = { children: ReactNode };
export const VehicleFormProvider = ({ children }: Props) => {
  const form = useVehicleForm({
    mode: "uncontrolled",
    initialValues: vehicleInitialValues,
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
      vehicleType: (value) =>
        isNotEmpty(value) ? null : "Vehicle Type is required",
    },
  });

  return <FormProvider form={form}>{children}</FormProvider>;
};
