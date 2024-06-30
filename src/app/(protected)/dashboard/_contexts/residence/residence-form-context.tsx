import { isNotEmpty } from "@/lib/utils";
import { createFormContext } from "@mantine/form";
import { ReactNode } from "react";

export type Residence = {
  _id: string;
  city : string;
  subcity : string;
  houseNumber : string;
  
  isCondominium : boolean;
  
  service : string;
  bookNumber : string;
  
  bookGivenDate : string;

  buildingNumber : string;
  area : string;
  price : string;
  penality : string;
  paymentToGovernment : string;
  prePayment : string;
  paymentType : string;
  chequeNumber : string;
  bankNumber : string;
  
  residenceNumber : string;
  totalLeasePrice : string;
  paidResidencePrice : string;
  remainingPrice : string;
  remainingPriceDate : string;
  recieptNumber : string;
};
export const residenceInitialValues: Residence = {
  _id: "1323",
  city: "CityName",
  subcity: "SubCityName",
  houseNumber: "1234",
  isCondominium: false,
  service: "ServiceType",
  bookNumber: "Book1234",
  bookGivenDate: "YYYY-MM-DD",
  buildingNumber: "Building5678",
  area: "AreaName",
  price: "1000.00",
  penality: "50.00",
  paymentToGovernment: "200.00",
  prePayment: "300.00",
  paymentType: "PaymentType",
  chequeNumber: "Cheque5678",
  bankNumber: "Bank1234",
  residenceNumber: "Residence5678",
  totalLeasePrice: "5000.00",
  paidResidencePrice: "4000.00",
  remainingPrice: "1000.00",
  remainingPriceDate: "YYYY-MM-DD",
  recieptNumber: "Receipt1234"
};

const [FormProvider, useResidenceFormContext, useResidenceForm] =
  createFormContext<Residence>();

export { useResidenceFormContext };

type Props = { children: ReactNode };
export const ResidenceFormProvider = ({ children }: Props) => {
  const form = useResidenceForm({
    mode: "uncontrolled",
    initialValues: residenceInitialValues,
    validate: {
     
    },
  });

  return <FormProvider form={form}>{children}</FormProvider>;
};
