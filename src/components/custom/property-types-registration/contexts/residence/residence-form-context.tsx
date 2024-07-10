import { isNotEmpty } from "@/lib/utils";
import { createFormContext } from "@mantine/form";
import { ReactNode } from "react";

export type Residence = {
  _id: string;
  region: string;
  zone: string;
  city: string;
  subcity: string;
  woreda: string;
  houseNumber: string;
  bookNumber: string;
  area: string;
  service: string;
  isCondominium: boolean;
  otherAddress:string
};
export const residenceInitialValues: Residence = {
  _id: "1323",
  region: "",
  zone: "",
  city: "CityName",
  subcity: "SubCityName",
  woreda: "",
  houseNumber: "1234",
  isCondominium: false,
  service: "ServiceType",
  bookNumber: "Book1234",
  area: "AreaName",
  otherAddress: ""
};

const [FormProvider, useResidenceFormContext, useResidenceForm] =
  createFormContext<Residence>();

export { useResidenceFormContext };

type Props = { children: ReactNode };
export const ResidenceFormProvider = ({ children }: Props) => {
  const form = useResidenceForm({
    mode: "uncontrolled",
    initialValues: residenceInitialValues,
    validate: {},
  });

  return <FormProvider form={form}>{children}</FormProvider>;
};
