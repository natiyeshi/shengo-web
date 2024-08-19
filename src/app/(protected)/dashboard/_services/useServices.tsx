"use client";

import { toast } from "@/components/ui/use-toast";
import { useAsyncWrapper } from "../_hooks/use-async-wrapper";
import { useServiceData } from "../_hooks/use-serviceData";
import { ServiceType } from "../_utils/constants";
import {
  leaseService,
  motorcycleService,
  propertyService,
  residenceService,
  vehicleService,
} from ".";
import {
  toCustomerDb,
  toLeaseDb,
  toMotorcycleDb,
  toPropertyDb,
  toResidenceDb,
  toVehicleDb,
} from "@/_utils/dto";
import { Property } from "../_contexts/property/property-form-context";

const defaultServiceDeliveringOffice = {
  name: "Doro Bet",
  phoneNumber: "09777777",
  description: "Service delivering office description",
  latitude: 12,
  longitude: 12,
};

const defaultUser = {
  name: "John Doe",
  password: "password",
  privilege: "USER",
};

const showWarning = (message: string, title = "Failed", isWarning = true) => {
  toast({
    title,
    variant: isWarning ? "destructive" : "default",
    description: message || "Operation completed successfully",
    duration: 3000,
  });
};

export const useServices = (serviceType: ServiceType) => {
  const data = useServiceData(serviceType);
  const { isSubmitting, asyncWrapper } = useAsyncWrapper();

  const requestService = () => {
    console.log({ isSubmitting });
    if (
      [
        ServiceType.SALES_VEHICLE,
        ServiceType.RENTAL_VEHICLE,
        ServiceType.GIFTS_VEHICLE,
      ].includes(serviceType)
    ) {
      if (!data?.customers || data?.customers.length === 0)
        return showWarning("Please fill customers information!");
      if (!data?.vehicles || data.vehicles.length === 0)
        return showWarning("Please fill vehicle information!");

      asyncWrapper(async () => {
        await vehicleService({
          serviceType,
          customers: data.customers.map((customer) =>
            toCustomerDb(customer, serviceType),
          ),
          vehicles: data.vehicles.map((vehicle) => toVehicleDb(vehicle)),
          serviceDeliveringOffice: defaultServiceDeliveringOffice,
          user: defaultUser,
        });
      })();
    } else if (
      [
        ServiceType.SALES_MOTORCYCLE,
        ServiceType.RENTAL_MOTORCYCLE,
        ServiceType.GIFTS_MOTORCYCLE,
      ].includes(serviceType)
    ) {
      if (!data?.customers || data?.customers.length === 0)
        return showWarning("Please fill customers information!");
      if (!data?.motorcycles || data.motorcycles.length === 0)
        return showWarning("Please fill motorcycles information!");

      asyncWrapper(async () => {
        await motorcycleService({
          serviceType,
          customers: data.customers.map((customer) =>
            toCustomerDb(customer, serviceType),
          ),
          motorcycles: data.motorcycles.map((motorcycle) =>
            toMotorcycleDb(motorcycle),
          ),
          serviceDeliveringOffice: defaultServiceDeliveringOffice,
          user: defaultUser,
        });
      })();
    } else if (
      [
        ServiceType.SALES_RESIDENCE,
        ServiceType.RENTAL_RESIDENCE,
        ServiceType.GIFTS_RESIDENCE,
      ].includes(serviceType)
    ) {
      if (!data?.customers || data?.customers.length === 0)
        return showWarning("Please fill customers information!");
      if (!data?.residences || data.residences.length === 0)
        return showWarning("Please fill residences information!");

      asyncWrapper(async () => {
        await residenceService({
          serviceType,
          customers: data.customers.map((customer) =>
            toCustomerDb(customer, serviceType),
          ),
          residences: data.residences.map((residence) =>
            toResidenceDb(residence),
          ),
          serviceDeliveringOffice: defaultServiceDeliveringOffice,
          user: defaultUser,
        });
      })();
    } else if (
      [
        ServiceType.SALES_LEASE,
        ServiceType.RENTAL_LEASE,
        ServiceType.GIFTS_LEASE,
      ].includes(serviceType)
    ) {
      if (!data?.customers || data?.customers.length === 0)
        return showWarning("Please fill customers information!");
      if (!data.leases || data.leases.length === 0)
        return showWarning("Please fill leases information!");

      asyncWrapper(async () => {
        await leaseService({
          serviceType,
          customers: data.customers.map((customer) =>
            toCustomerDb(customer, serviceType),
          ),
          leases: data.leases.map((lease) => toLeaseDb(lease)),
          serviceDeliveringOffice: defaultServiceDeliveringOffice,
          user: defaultUser,
        });
      })();
    } else if (
      [
        ServiceType.SALES_PROPERTY,
        ServiceType.RENTAL_PROPERTY,
        ,
        ServiceType.GIFTS_PROPERTY,
      ].includes(serviceType)
    ) {
      if (!data?.customers || data?.customers.length === 0)
        return showWarning("Please fill customers information!");
      if (!data?.properties || data.properties.length === 0)
        return showWarning("Please fill properties information!");

      const properties = data.properties as Property[];

      asyncWrapper(async () => {
        await propertyService({
          serviceType,
          customers: data.customers.map((customer) =>
            toCustomerDb(customer, serviceType),
          ),
          properties: properties.map((property) => toPropertyDb(property)),
          serviceDeliveringOffice: defaultServiceDeliveringOffice,
          user: defaultUser,
        });
      })();
    } else if (
      [
        ServiceType.SALES_VEHICLESPARE,
        ServiceType.RENTAL_VEHICLESPARE,
        ServiceType.GIFTS_VEHICLESPARE,
      ].includes(serviceType)
    ) {
      if (!data?.customers || data?.customers.length === 0)
        return showWarning("Please fill customers information!");
      if (!data?.vehicleSpares || data.vehicleSpares.length === 0)
        return showWarning("Please fill vehiclespares information!");

      showWarning("Not implemented yet!");
    } else if (
      [
        ServiceType.SALES_BUSINESS,
        ServiceType.RENTAL_BUSINESS,
        ServiceType.GIFTS_BUSINESS,
      ].includes(serviceType)
    ) {
      if (!data?.customers || data?.customers.length === 0)
        return showWarning("Please fill customers information!");
      if (!data?.businesses || data.businesses.length === 0)
        return showWarning("Please fill businesses information!");

      showWarning("Not implemented yet!");
    } else if (
      [
        ServiceType.SALES_CONSTRUCTION_MACHINE,
        ServiceType.RENTAL_CONSTRUCTION_MACHINE,
        ,
        ServiceType.GIFTS_CONSTRUCTION_MACHINE,
      ].includes(serviceType)
    ) {
      if (!data?.customers || data?.customers.length === 0)
        return showWarning("Please fill customers information!");
      if (!data?.constructionMachines || data.constructionMachines.length === 0)
        return showWarning("Please fill construction machines information!");
      showWarning("Not implemented yet!");
    }
  };

  return {
    requestService,
    isSubmitting,
  };
};
