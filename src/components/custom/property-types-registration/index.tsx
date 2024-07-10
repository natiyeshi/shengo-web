"use client";

import { Group, Select } from "@mantine/core";

import { strToObjOfLabelAndValue } from "@/_utils";
import { useState } from "react";

import VehicleRegistration from "./components/vehicle-reg";
import ResidenceRegistration from "./components/residence-reg";
import OrganizationRegistration from "./components/organization-reg";
import { useVehicleContext } from "./contexts/vehicle/vehicle-context";
import { useResidenceContext } from "./contexts/residence/residence-context";
import { useOrganizationContext } from "./contexts/organization/organization-context";
import { VehicleFormProvider } from "./contexts/vehicle/vehicle-form-context";
import { VehicleOperationProvider } from "./contexts/vehicle/vehicle-operation-context";
import { ResidenceFormProvider } from "./contexts/residence/residence-form-context";
import { ResidenceOperationProvider } from "./contexts/residence/residence-operation-context";
import { OrganizationFormProvider } from "./contexts/organization/organization-form-context";
import { OrganizationOperationProvider } from "./contexts/organization/organization-operation-context";
import { Car } from "lucide-react";
import { useDisclosure } from "@mantine/hooks";
import PropertyListDrawer from "./components/property-list-drawer";
import { CarouselAction } from "@/types";
import { Button } from "@/components/ui/button";
const PROPERTY_TYPE = {
  vehicle: "Vehicle",
  residence: "Residence",
  organization: "Organization",
};
type PropertyTypesProps = {
  carouselAction: CarouselAction;
};
const PropertyType = ({ carouselAction }: PropertyTypesProps) => {
  const [propertyType, setPropertyType] = useState(
    PROPERTY_TYPE.vehicle.toLowerCase(),
  );
  const handelPropertyTypeSelection = (type: string | null) => {
    if (!type) return;
    setPropertyType(type);
  };

  const properties = [
    ...useVehicleContext().vehicles,
    ...useResidenceContext().residences,
    ...useOrganizationContext().organizations,
  ];

  const [opened, { open, close }] = useDisclosure(false);
  return (
    <main>
      <VehicleFormProvider>
        <VehicleOperationProvider carouselAction={carouselAction}>
          <ResidenceFormProvider>
            <ResidenceOperationProvider carouselAction={carouselAction}>
              <OrganizationFormProvider>
                <OrganizationOperationProvider carouselAction={carouselAction}>
                  <Group justify="space-between" align="center">
                    <Select
                      label="Select property type"
                      name="propertyType"
                      value={propertyType}
                      onChange={(value) => handelPropertyTypeSelection(value)}
                      data={strToObjOfLabelAndValue(
                        Object.values(PROPERTY_TYPE),
                      )}
                    />

                    <PropertyListDrawer
                      title={`Property's list`}
                      opened={opened}
                      close={close}
                    >
                      <Button
                        onClick={open}
                        size="icon"
                        variant="outline"
                        className="relative rounded-full"
                      >
                        <Car />
                        <span className="absolute -right-0 -top-0 font-semibold text-primary">
                          {properties.length}
                        </span>
                      </Button>
                    </PropertyListDrawer>
                  </Group>

                  {propertyType === PROPERTY_TYPE.vehicle.toLowerCase() && (
                    <VehicleRegistration />
                  )}
                  {propertyType === PROPERTY_TYPE.residence.toLowerCase() && (
                    <ResidenceRegistration />
                  )}
                  {propertyType ===
                    PROPERTY_TYPE.organization.toLowerCase() && (
                    <OrganizationRegistration />
                  )}
                </OrganizationOperationProvider>
              </OrganizationFormProvider>
            </ResidenceOperationProvider>
          </ResidenceFormProvider>
        </VehicleOperationProvider>
      </VehicleFormProvider>
    </main>
  );
};

export default PropertyType;
