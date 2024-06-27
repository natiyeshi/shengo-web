import { Selector } from "@/types";

export const SALES_TABS_MAP: {
  [key: string]: string;
} = {
  saler: "Saler",
  buyer: "Buyer",
  vehicle: "Vehicle",
  withness: "Withness",
  service: "Service",
};

export const CUSTOMER_TYPES: Selector[] = [
  { label: "Individual", value: "individual" },
  {
    label: "Organization",
    value: "organization",
  },
  {
    label: "Grantee",
    value: "grantee",
  },
  {
    label: "Heir",
    value: "heir",
  },
  {
    label: "Guardian",
    value: "guardian",
  },
  {
    label: "Insurance Represntative",
    value: "insurance",
  },
];

export const GENDERS: Selector[] = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
];

export const CUSTOMER_TITLES: Selector[] = [
  { label: "Mr", value: "mr" },
  {
    label: "Mrs",
    value: "mrs",
  },
  {
    label: "Ms",
    value: "ms",
  },
  {
    label: "Miss",
    value: "miss",
  },
  {
    label: "W/t",
    value: "w/t",
  },
  {
    label: "Ten boss",
    value: "ten-boss",
  },
  {
    label: "Fifty Chief",
    value: "fifty-chief",
  },
];

export const VEHICLE_CODES = [
  "3 Liu Tessabi",
  "UN Code",
  "AU Code",
  "ED Code",
  "sk",
  "Daily",
  "Tellalfi",
].map((code) => ({
  label: code,
  value: code,
}));

export const VEHICLE_TYPES = ["Car", "Truck", "Van", "Bus"].map((vehicle) => ({
  label: vehicle,
  value: vehicle.toLowerCase(),
}));
export const PAYMENT_TYPES = [
  "In Cash",
  "Cheque",
  "CPO",
  "In Kind",
  "In Transfer",
].map((vehicle) => ({
  label: vehicle,
  value: vehicle.toLowerCase(),
}));

export const BANK_NAMES = [
  "Commercial Bank",
  "Abyssian Bank",
  "Dhashen Bank",
  "Addis Bank",
  "Zemzem Bank",
].map((bank) => ({
  label: bank,
  value: bank.toLowerCase(),
}));
