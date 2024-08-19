export const SalesOptions = [
  { name: "Vehicle", url: "/dashboard/sales/vehicle" },
  { name: "Residence", url: "/dashboard/sales/residence" },
  { name: "Business", url: "/dashboard/sales/business" },
  { name: "Other Property", url: "/dashboard/sales/otherproperty" },
  { name: "Vehicle Spare Part", url: "/dashboard/sales/vehiclespare" },
  { name: "Motor Cycle", url: "/dashboard/sales/motorcycle" },
  {
    name: "Construction Machine",
    url: "/dashboard/sales/constructionmachine",
  },
  { name: "Lease", url: "/dashboard/sales/lease" },
];

export const RentalOptions = [
  { name: "Vehicle", url: "/dashboard/rental/vehicle" },
  { name: "Residence", url: "/dashboard/rental/residence" },
  { name: "Business", url: "/dashboard/rental/business" },
  { name: "Other Property", url: "/dashboard/rental/otherproperty" },
  { name: "Vehicle Spare Part", url: "/dashboard/rental/vehiclespare" },
  { name: "Motor Cycle", url: "/dashboard/rental/motorcycle" },
  {
    name: "Construction Machine",
    url: "/dashboard/rental/constructionmachine",
  },
  { name: "Lease", url: "/dashboard/rental/lease" },
];
export const GiftsOptions = [
  { name: "Vehicle", url: "/dashboard/gifts/vehicle" },
  { name: "Residence", url: "/dashboard/gifts/residence" },
  { name: "Business", url: "/dashboard/gifts/business" },
  { name: "Other Property", url: "/dashboard/gifts/otherproperty" },
  { name: "Vehicle Spare Part", url: "/dashboard/gifts/vehiclespare" },
  { name: "Motor Cycle", url: "/dashboard/gifts/motorcycle" },
  {
    name: "Construction Machine",
    url: "/dashboard/gifts/constructionmachine",
  },
  { name: "Lease", url: "/dashboard/gifts/lease" },
];
export const FamilyOptions = [
  { name: "Normal", url: "/dashboard/family-representation/normal" },
];

export const GeneralOrSpecificOptions = [
  {
    name: "General Representation",
    url: "/dashboard/general-specific-representation/general",
  },
];

export const LoanOptions = [{ name: "Normal", url: "/dashboard/loan/normal" }];

export const AllLinks = [
  ...SalesOptions,
  ...RentalOptions,
  ...GiftsOptions,
  ...FamilyOptions,
  ...GeneralOrSpecificOptions,
  ...LoanOptions,
];
export enum ServiceType {
  SALES_VEHICLE = "Sales of Vehicle",
  SALES_RESIDENCE = "Sales of Residence",
  SALES_BUSINESS = "Sales of Business",
  SALES_PROPERTY = "Sales of Property",
  SALES_VEHICLESPARE = "Sales of Vehicle Spare Parts",
  SALES_MOTORCYCLE = "Sales of Motorcycle",
  SALES_LEASE = "Sales of Lease",
  SALES_CONSTRUCTION_MACHINE = "Sales of Construction Machine",

  RENTAL_VEHICLE = "Rental of Vehicle",
  RENTAL_RESIDENCE = "Rental of Residence",
  RENTAL_BUSINESS = "Rental of Business",
  RENTAL_PROPERTY = "Rental of Property",
  RENTAL_VEHICLESPARE = "Rental of Vehicle Spare Parts",
  RENTAL_MOTORCYCLE = "Rental of Motorcycle",
  RENTAL_LEASE = "Rental of Lease",
  RENTAL_CONSTRUCTION_MACHINE = "Rental of Construction Machine",

  GIFTS_VEHICLE = "Gift of Vehicle",
  GIFTS_RESIDENCE = "Gift of Residence",
  GIFTS_BUSINESS = "Gift of Business",
  GIFTS_PROPERTY = "Gift of Property",
  GIFTS_VEHICLESPARE = "Gift of Vehicle Spare Parts",
  GIFTS_MOTORCYCLE = "Gift of Motorcycle",
  GIFTS_LEASE = "Gift of Lease",
  GIFTS_CONSTRUCTION_MACHINE = "Gift of Construction Machine",

  FAMILY_REPRESENTATION_NORMAL = "Family Representation (Normal)",

  GENERAL_SPECIFIC_REPRESENTATION_GENERAL = "General Specific Representation (General)",

  LOAN_NORMAL = "Loan (Normal)",
}

export const ServiceProviders = [
  {
    label: "Megenagna",
    value: "megenagna",
    position: {
      lat: 9.0205,
      lng: 38.8024,
    },
    popUpMessage: "Megenagna",
  },
  {
    label: "Bethel",
    value: "bethel",
    position: {
      lat: 8.9189,
      lng: 38.4792,
    },
    popUpMessage: "Bethel",
  },
  {
    label: "Kilinto",
    value: "kilinto",
    position: {
      lat: 8.9038,
      lng: 38.816,
    },
    popUpMessage: "Kilinto",
  },
];
