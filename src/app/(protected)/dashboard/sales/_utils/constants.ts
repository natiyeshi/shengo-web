import { getNationalities } from "@/app/(protected)/dashboard/sales/_utils";
import { SelectorData } from "../_types";

export const SALES_TABS_MAP: {
  [key: string]: string;
} = {
  saler: "Saler",
  buyer: "Buyer",
  vehicle: "Vehicle",
  withness: "Withness",
  service: "Service",
};

export const CUSTOMET_TYPES: SelectorData[] = [
  { title: "Individual", value: "individual" },
  {
    title: "Organization",
    value: "organization",
  },
  {
    title: "Grantee",
    value: "grantee",
  },
  {
    title: "Heir",
    value: "heir",
  },
  {
    title: "Guardian",
    value: "guardian",
  },
  {
    title: "Insurance Represntative",
    value: "insurance",
  },
];

export const GENDERS: SelectorData[] = [
  { title: "Male", value: "male" },
  { title: "Female", value: "female" },
];

export const CUSTOMER_TITLES: SelectorData[] = [
  { title: "Mr", value: "mr" },
  {
    title: "Mrs",
    value: "mrs",
  },
  {
    title: "Ms",
    value: "ms",
  },
  {
    title: "Miss",
    value: "miss",
  },
  {
    title: "W/t",
    value: "w/t",
  },
  {
    title: "Ten boss",
    value: "ten-boss",
  },
  {
    title: "Fifty Chief",
    value: "fifty-chief",
  },
];

export const NATIONALITIES = Object.values(
  getNationalities().nationalities
).map((nation) => ({
  title: nation,
  value: nation.toLowerCase(),
}));

export const VEHICLE_CODES = [
  "3 Liu Tessabi",
  "UN Code",
  "AU Code",
  "ED Code",
  "sk",
  "Daily",
  "Tellalfi",
].map((code) => ({
  title: code,
  value: code,
}));

export const VEHICLE_TYPES = ["Car", "Truck", "Van", "Bus"].map((vehicle) => ({
  title: vehicle,
  value: vehicle.toLowerCase(),
}));
export const PAYMENT_TYPES = [
  "In Cash",
  "Cheque",
  "CPO",
  "In Kind",
  "In Transfer",
].map((vehicle) => ({
  title: vehicle,
  value: vehicle.toLowerCase(),
}));

export const BANK_NAMES = [
  "Commercial Bank",
  "Abyssian Bank",
  "Dhashen Bank",
  "Addis Bank",
  "Zemzem Bank",
].map((bank) => ({
  title: bank,
  value: bank.toLowerCase(),
}));
