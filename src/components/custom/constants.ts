import { getNationalities } from "@/app/(protected)/dashboard/sales/_utils";
import { PersonInf } from "./CustomeIdentityRegistration/types";

export const RENTAL_VEHICLE_TABS_MAP: {
  [key: string]: string;
} = {
  lessor: "Lessor",
  renter: "Renter",
  vehicle: "Vehicle",
  withness: "Withness",
  service: "Service",
};

export const RENTAL_RESIDENCE_TABS_MAP: {
  [key: string]: string;
} = {
  lessor: "Lessor",
  renter: "Renter",
  residence: "Residence",
  withness: "Withness",
  service: "Service",
};

export const CUSTOMER_TYPES: string[] = [
  "Individual",
  "Organization",
  // "Grantee",
  // "Heir",
  // "Guardian",
  // "Insurance"
];

export const GENDERS: string[] = [
  "Male",
  "Female"
];

export const CUSTOMER_TITLES: string[] = [
  "Mr",
  "Mrs",
  "Ms",
  "Miss",
  "W/t",
  "Ten-boss",
  "Fifty-chief"
];

export const NATIONALITIES = [
  "ETHIOPIA",
  "KENYA",
  "USA",
  "ENGLAND"
]

export const VEHICLE_CODES = [
  "3 Liu Tessabi",
  "UN Code",
  "AU Code",
  "ED Code",
  "sk",
  "Daily",
  "Tellalfi",
]

export const VEHICLE_TYPES = ["Car", "Truck", "Van", "Bus"]
export const PAYMENT_TYPES = [
  "In Cash",
  "Cheque",
  "CPO",
  "In Kind",
  "In Transfer",
]

export const BANK_NAMES = [
  "Commercial Bank",
  "Abyssian Bank",
  "Dhashen Bank",
  "Addis Bank",
  "Zemzem Bank",
]

export const initialValues: PersonInf = {
  customerType: CUSTOMER_TYPES[0],
  customerTitle: CUSTOMER_TITLES[0],
  name: "",
  fatherName: "",
  grandFatherName: "",
  gender: "",
  nationality: "",
  origin: "",
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

