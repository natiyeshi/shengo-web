"use client";

import {
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  DrawerRoot,
  DrawerTitle,
  Stack,
  Title,
} from "@mantine/core";
import React, { ReactNode } from "react";
import Property from "./property";
import { useVehicleOperation } from "../contexts/vehicle/vehicle-operation-context";
import { useResidenceOperation } from "../contexts/residence/residence-operation-context";
import { useOrganizationOperation } from "../contexts/organization/organization-operation-context";
import EmptyListMessage from "../../empty-list-message";

type Props = {
  title?: string;
  children: ReactNode;
  opened?: boolean;
  close: () => void;
};

const PropertyListDrawer = ({
  title,
  opened = false,
  close,
  children,
}: Props) => {
  const {
    vehicles,
    editing: editingVehicle,
    editVehicle,
    setAlertInfo: setAlertInfoVehicle,
    deleteSingleVehicle,
  } = useVehicleOperation();
  const {
    residences,
    editing: editingResidence,
    editResidence,
    setAlertInfo: setAlertInfoResidence,
    deleteSingleResidence,
  } = useResidenceOperation();
  const {
    organizations,
    editing: editingOrganization,
    editOrganization,
    setAlertInfo: setAlertInfoOrganization,
    deleteSingleOrganization,
  } = useOrganizationOperation();

  return (
    <>
      {children}
      <DrawerRoot opened={opened} onClose={close} position="right">
        <DrawerOverlay className="bg-white/5 backdrop-blur-sm" />
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle className="text-lg font-semibold text-primary">
              <Title order={3}>{title}</Title>
            </DrawerTitle>
          </DrawerHeader>
          <DrawerBody>
            {vehicles && (
              <Stack className="last:border-b last:border-b-muted" gap={0}>
                <Title order={4}>Vehicle</Title>
                {vehicles.length === 0 && (
                  <EmptyListMessage>Vehicle is empty for new!</EmptyListMessage>
                )}
                {vehicles.map((vehicle) => (
                  <Property
                    type="Vehicle"
                    key={vehicle._id}
                    property={vehicle}
                    handelDrawerclose={close}
                    editProperty={editVehicle}
                    editing={editingVehicle}
                    setAlertInfo={setAlertInfoVehicle}
                    deleteSingleProperty={deleteSingleVehicle}
                  />
                ))}
              </Stack>
            )}
            {residences && (
              <Stack className="last:border-b last:border-b-muted" gap={0}>
                <Title order={4}>Residence</Title>
                {residences.length === 0 && (
                  <EmptyListMessage>
                    Residence is empty for new!
                  </EmptyListMessage>
                )}
                {residences.map((residence) => (
                  <Property
                    type="Residence"
                    key={residence._id}
                    property={residence}
                    handelDrawerclose={close}
                    editProperty={editResidence}
                    editing={editingResidence}
                    setAlertInfo={setAlertInfoResidence}
                    deleteSingleProperty={deleteSingleResidence}
                  />
                ))}
              </Stack>
            )}
            {organizations && (
              <Stack className="last:border-b last:border-b-muted" gap={0}>
                <Title order={4}>Organization</Title>
                {organizations.length === 0 && (
                  <EmptyListMessage>
                    Organization is empty for new!
                  </EmptyListMessage>
                )}
                {organizations.map((organization) => (
                  <Property
                    type="Organization"
                    key={organization._id}
                    property={organization}
                    handelDrawerclose={close}
                    editProperty={editOrganization}
                    editing={editingOrganization}
                    setAlertInfo={setAlertInfoOrganization}
                    deleteSingleProperty={deleteSingleOrganization}
                  />
                ))}
              </Stack>
            )}
          </DrawerBody>
        </DrawerContent>
      </DrawerRoot>
    </>
  );
};

export default PropertyListDrawer;
