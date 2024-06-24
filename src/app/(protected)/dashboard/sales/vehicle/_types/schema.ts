import { z } from "zod";

export const individualSalerSchema = z.object({
  type: z.literal("individual"),
  title: z.string().min(1, { message: "Name is required." }),
  name: z.string().min(1, { message: "Name is required." }),
  fatherName: z.string().min(1, { message: "Father name is required." }),
  grandFatherName: z
    .string()
    .min(1, { message: "Grand father name is required." }),
  nationality: z.string().min(1, { message: "Nationality is required" }),
  origin: z.string().min(1, { message: "Origin is required" }),
  gender: z.string().min(1, { message: "Gender is required" }),
  tin: z
    .number()
    .min(5, { message: "Tin number is should be at least 5 digit long." })
    .max(10),
  isForeigner: z.boolean().default(false),
  region: z.string().min(1, { message: "Region is required" }),
  city: z.string().min(1, { message: "City is required" }),
  subCity: z.string().min(1, { message: "Sub city is required" }),
  woreda: z.string().min(1, { message: "Woreda is required" }),
  houseNo: z.string().min(1, { message: "House number is required" }),
  phoneNo: z.number().min(10, { message: "Phone number is required" }),
  otherAddress: z.string(),
});

export type IndividualSalerSchemaType = z.infer<typeof individualSalerSchema>;

export const individualSalerDefaultValues: IndividualSalerSchemaType = {
  type: "individual",
  title: "mr",
  name: "",
  fatherName: "",
  grandFatherName: "",
  nationality: "",
  origin: "",
  gender: "",
  tin: 0,
  isForeigner: false,
  region: "",
  city: "",
  subCity: "",
  woreda: "",
  houseNo: "",
  phoneNo: 0,
  otherAddress: "",
};

export const vehicleSchema = z.object({
  engineNo: z.number().min(1, { message: "Engine No. is required." }),
  chassisNo: z.number().min(1, { message: "Chassis No. is required." }),
  libreNo: z.number().min(1, { message: "Libre No. is required." }),
  region: z.string().min(1, { message: "Region is required." }),
  code: z.string().min(1, { message: "Code is required." }),
  plateNo: z.string().min(1, { message: "Plate No. is required." }),
  vehicleType: z.string().min(1, { message: "Vehicle Type is required." }),
  determinationKernNo: z
    .string()
    .min(1, { message: "Determination Kern No. is required." }),
  determinationPrice: z
    .number()
    .min(1, { message: "Determination Price is required." }),
  salesValue: z.number().default(0.0),
  penaltyToGovernment: z.number().default(0.0),
  penalty: z.number().default(0.0),
  bankName: z.string().min(1, { message: "Bank Name is required." }),
  prepayment: z.number().default(0.0),
  paymentType: z.string().min(1, { message: "Payment Type is required." }),
  chequeOrCpoNo: z.number().optional(),
});

export type VehicleSchemaType = z.infer<typeof vehicleSchema>;

export const vehicleDefaultValues: VehicleSchemaType = {
  engineNo: 0,
  chassisNo: 0,
  libreNo: 0,
  region: "",
  code: "",
  plateNo: "",
  vehicleType: "",
  determinationKernNo: "",
  determinationPrice: 0,
  salesValue: 0.0,
  penaltyToGovernment: 0.0,
  penalty: 0.0,
  bankName: "",
  prepayment: 0.0,
  paymentType: "",
  chequeOrCpoNo: undefined,
};
