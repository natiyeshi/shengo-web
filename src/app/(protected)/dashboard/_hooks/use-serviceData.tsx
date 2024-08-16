import { useOrganizationContext } from "@/components/custom/property-types-registration/contexts/organization/organization-context";
import { useBusinessContext } from "../_contexts/business/business-context";
import { useConstructionMachineContext } from "../_contexts/constructionmachine/constructionmachine-context";
import { useCustomerContext } from "../_contexts/customer/customer-context";
import { useLeaseContext } from "../_contexts/lease/lease-context";
import { useLoanContext } from "../_contexts/loan/loan-context";
import { useMotorcycleContext } from "../_contexts/motorcycle/motorcycle-context";
import { usePropertyContext } from "../_contexts/property/property-context";
import { useResidenceContext } from "../_contexts/residence/residence-context";
import { useVehicleContext } from "../_contexts/vehicle/vehicle-context";
import { useVehiclespareContext } from "../_contexts/vehiclespare/vehiclespare-context";
import { ServiceType } from "../_utils/constants";

export const useServiceData = (serviceType: ServiceType) => {
  const customerContext = useCustomerContext();
  const vehicleContext = useVehicleContext();
  const businessContext = useBusinessContext();
  const constructionMachineContext = useConstructionMachineContext();
  const leaseContext = useLeaseContext();
  const loanContext = useLoanContext();
  const motorcycleContext = useMotorcycleContext();
  const propertyContext = usePropertyContext();
  const residenceContext = useResidenceContext();
  const vehicleSpareContext = useVehiclespareContext();
  const organizationContext = useOrganizationContext();

  switch (serviceType) {
    case ServiceType.SALES_VEHICLE:
      return {
        customers: customerContext.customers,
        vehicles: vehicleContext.vehicles,
      };
    case ServiceType.SALES_RESIDENCE:
      return {
        customers: customerContext.customers,
        residences: residenceContext.residences,
      };
    case ServiceType.SALES_BUSINESS:
      return {
        customers: customerContext.customers,
        businesses: businessContext.business,
      };
    case ServiceType.SALES_PROPERTY:
      return {
        customers: customerContext.customers,
        properties: propertyContext.properties,
      };
    case ServiceType.SALES_VEHICLESPARE:
      return {
        customers: customerContext.customers,
        vehicleSpares: vehicleSpareContext.vehiclespares,
      };
    case ServiceType.SALES_MOTORCYCLE:
      return {
        customers: customerContext.customers,
        motorcycles: motorcycleContext.motorcycles,
      };
    case ServiceType.SALES_LEASE:
      return {
        customers: customerContext.customers,
        leases: leaseContext.leases,
      };
    case ServiceType.SALES_CONSTRUCTION_MACHINE:
      return {
        customers: customerContext.customers,
        constructionMachines: constructionMachineContext.constructionmachines,
      };

    case ServiceType.RENTAL_VEHICLE:
      return {
        customers: customerContext.customers,
        vehicles: vehicleContext.vehicles,
      };
    case ServiceType.RENTAL_RESIDENCE:
      return {
        customers: customerContext.customers,
        residences: residenceContext.residences,
      };
    case ServiceType.RENTAL_BUSINESS:
      return {
        customers: customerContext.customers,
        businesses: businessContext.business,
      };
    case ServiceType.RENTAL_PROPERTY:
      return {
        customers: customerContext.customers,
        properties: propertyContext.properties,
      };
    case ServiceType.RENTAL_VEHICLESPARE:
      return {
        customers: customerContext.customers,
        vehicleSpares: vehicleSpareContext.vehiclespares,
      };
    case ServiceType.RENTAL_MOTORCYCLE:
      return {
        customers: customerContext.customers,
        motorcycles: motorcycleContext.motorcycles,
      };
    case ServiceType.RENTAL_LEASE:
      return {
        customers: customerContext.customers,
        leases: leaseContext.leases,
      };
    case ServiceType.RENTAL_CONSTRUCTION_MACHINE:
      return {
        customers: customerContext.customers,
        constructionMachines: constructionMachineContext.constructionmachines,
      };

    case ServiceType.GIFTS_VEHICLE:
      return {
        customers: customerContext.customers,
        vehicles: vehicleContext.vehicles,
      };
    case ServiceType.GIFTS_RESIDENCE:
      return {
        customers: customerContext.customers,
        residences: residenceContext.residences,
      };
    case ServiceType.GIFTS_BUSINESS:
      return {
        customers: customerContext.customers,
        businesses: businessContext.business,
      };
    case ServiceType.GIFTS_PROPERTY:
      return {
        customers: customerContext.customers,
        properties: propertyContext.properties,
      };
    case ServiceType.GIFTS_VEHICLESPARE:
      return {
        customers: customerContext.customers,
        vehicleSpares: vehicleSpareContext.vehiclespares,
      };
    case ServiceType.GIFTS_MOTORCYCLE:
      return {
        customers: customerContext.customers,
        motorcycles: motorcycleContext.motorcycles,
      };
    case ServiceType.GIFTS_LEASE:
      return {
        customers: customerContext.customers,
        leases: leaseContext.leases,
      };
    case ServiceType.GIFTS_CONSTRUCTION_MACHINE:
      return {
        customers: customerContext.customers,
        constructionMachines: constructionMachineContext.constructionmachines,
      };

    case ServiceType.LOAN_NORMAL:
      return {
        customers: customerContext.customers,
        loans: loanContext.loans,
      };
    case ServiceType.FAMILY_REPRESENTATION_NORMAL:
      return {
        customers: customerContext.customers,
        properties: [
          ...vehicleContext.vehicles,
          ...residenceContext.residences,
          ...organizationContext.organizations,
        ],
      };

    case ServiceType.GENERAL_SPECIFIC_REPRESENTATION_GENERAL:
      return {
        customers: customerContext.customers,
        properties: [
          ...vehicleContext.vehicles,
          ...residenceContext.residences,
          ...organizationContext.organizations,
        ],
      };

    default:
      return null;
  }
};
