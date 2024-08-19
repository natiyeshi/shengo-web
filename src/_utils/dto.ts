import { Vehicle as VehicleDB } from "@prisma/client";
import { Vehicle as VehicleClient } from "@/app/(protected)/dashboard/_contexts/vehicle/vehicle-form-context";
import { Lease as LeaseDB } from "@prisma/client";
import { Lease as LeaseClient } from "@/app/(protected)/dashboard/_contexts/lease/lease-form-context";
import { Residence as ResidenceDB } from "@prisma/client";
import { Residence as ResidenceClient } from "@/app/(protected)/dashboard/_contexts/residence/residence-form-context";
import { Property as PropertyDB } from "@prisma/client";
import { Property as PropertyClient } from "@/app/(protected)/dashboard/_contexts/property/property-form-context";
import { Motorcycle as MotorcycleDB } from "@prisma/client";
import { Motorcycle as MotorcycleClient } from "@/app/(protected)/dashboard/_contexts/motorcycle/motorcycle-form-context";
import { Loan as LoanDB } from "@prisma/client";
import { Loan as LoanClient } from "@/app/(protected)/dashboard/_contexts/loan/loan-form-context";
import { Customer as CustomerDB } from "@prisma/client";
import { CustomerInfo as CustomerClient } from "@/app/(protected)/dashboard/_contexts/customer/customer-form-context";

/* Vehicle */
export const toVehicleDb = (
  vehicle: VehicleClient,
): Omit<VehicleDB, "serviceId" | "id"> => {
  const { _id, ...v } = vehicle;
  return {
    ...v,
  };
};

export const toVehicleClient = (vehicle: VehicleDB): VehicleClient => {
  return {
    ...vehicle,
    _id: "",
  };
};

/* Lease */
export const toLeaseDb = (
  Lease: LeaseClient,
): Omit<LeaseDB, "serviceId" | "id"> => {
  const { _id, ...v } = Lease;
  return {
    ...v,
    bookGivenDate: new Date(v.bookGivenDate),
  };
};

export const toLeaseClient = (Lease: LeaseDB): LeaseClient => {
  return {
    ...Lease,
    _id: "",
    bookGivenDate: Lease.bookGivenDate.toString(),
  };
};

/* Residence */
export const toResidenceDb = (
  Residence: ResidenceClient,
): Omit<ResidenceDB, "serviceId" | "id"> => {
  const { _id, ...v } = Residence;
  return {
    ...v,
    bookGivenDate: new Date(v.bookGivenDate),
    remainingPriceDate: new Date(v.remainingPriceDate),
  };
};

export const toResidenceClient = (Residence: ResidenceDB): ResidenceClient => {
  return {
    ...Residence,
    _id: "",
    service: "null",
    bookGivenDate: Residence.bookGivenDate.toString(),
    remainingPriceDate: Residence.remainingPriceDate.toString(),
  };
};

/* Property */
export const toPropertyDb = (
  Property: PropertyClient,
): Omit<PropertyDB, "serviceId" | "id"> => {
  const { _id, ...v } = Property;
  return {
    ...v,
    penality: Property.penality ?? null,
    penaltyGov: Property.penaltyGov ?? null,
    bankName: Property.bankName ?? null,
    chequeOrCpoNo: Property.chequeOrCpoNo ?? null,
  };
};

export const toPropertyClient = (Property: PropertyDB): PropertyClient => {
  return {
    ...Property,
    _id: "",
    penality: Property.penality ?? undefined,
    penaltyGov: Property.penaltyGov ?? undefined,
    bankName: Property.bankName ?? undefined,
    chequeOrCpoNo: Property.chequeOrCpoNo ?? undefined,
  };
};

/* Motorcycle */
export const toMotorcycleDb = (
  Motorcycle: MotorcycleClient,
): Omit<MotorcycleDB, "serviceId" | "id"> => {
  const { _id, ...v } = Motorcycle;
  return {
    ...v,
  };
};

export const toMotorcycleClient = (
  Motorcycle: MotorcycleDB,
): MotorcycleClient => {
  return {
    ...Motorcycle,
    _id: "",
  };
};

/* Loan */
export const toLoanDb = (
  Loan: LoanClient,
): Omit<LoanDB, "serviceId" | "id"> => {
  const { _id, ...v } = Loan;
  return {
    ...v,

    loanEndingDate: new Date(Loan.loanEndingDate),
  };
};

export const toLoanClient = (Loan: LoanDB): LoanClient => {
  return {
    ...Loan,
    _id: "",
    loanEndingDate: Loan.loanEndingDate.toString(),
  };
};

/* Customer */
export const toCustomerDb = (
  Customer: CustomerClient & {
    type: string;
  },
  serviceType: string,
): Omit<CustomerDB, "serviceId" | "id"> => {
  const { _id, type, ...v } = Customer;

  return {
    ...v,
    customerType: Customer.customerType,
    serviceType,
  };
};

export const toCustomerClient = (Customer: CustomerDB): CustomerClient => {
  return {
    ...Customer,
    _id: "",
    customerType: Customer.customerType,
    otherAddress: Customer.otherAddress ?? "",
    businessName: Customer.businessName ?? "",
    grantorName: Customer.grantorName ?? "",
    jobPosition: Customer.jobPosition ?? "",
  };
};