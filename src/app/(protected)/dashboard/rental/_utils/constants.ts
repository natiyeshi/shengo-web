export const RENTAL_VEHICLE_TABS_MAP = {
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

export const GENDERS: string[] = ["Male", "Female"];

export const CUSTOMER_TITLES: string[] = [
  "Mr",
  "Mrs",
  "Ms",
  "Miss",
  "W/t",
  "Ten-boss",
  "Fifty-chief",
];

// export const NATIONALITIES = Object.values(
//   getNationalities().nationalities
// ).map((nation) => ({
//   title: nation,
//   value: nation.toLowerCase(),
// }));
export const NATIONALITIES = ["ETHIOPIA", "KENYA", "USA", "ENGLAND"];

export const VEHICLE_CODES = [
  "3 Liu Tessabi",
  "UN Code",
  "AU Code",
  "ED Code",
  "sk",
  "Daily",
  "Tellalfi",
];

export const VEHICLE_TYPES = ["Car", "Truck", "Van", "Bus"];
export const PAYMENT_TYPES = [
  "In Cash",
  "Cheque",
  "CPO",
  "In Kind",
  "In Transfer",
];

export const BANK_NAMES = [
  "Commercial Bank",
  "Abyssian Bank",
  "Dhashen Bank",
  "Addis Bank",
  "Zemzem Bank",
];
