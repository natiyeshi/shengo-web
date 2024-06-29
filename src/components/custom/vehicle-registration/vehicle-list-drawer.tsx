"use client";

import {
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  DrawerRoot,
  DrawerTitle,
  Stack,
} from "@mantine/core";
import React, { ReactNode } from "react";
import Person from "./vehicle";
import { useVehicleOperation } from "@/app/(protected)/dashboard/_contexts/vehicle/vehicle-operation-context";
import Vehicle from "./vehicle";

type Props = {
  title?: string;
  children: ReactNode;
  opened?: boolean;
  close: () => void;
};

const VehicleListDrawer = ({
  title,
  opened = false,
  close,
  children,
}: Props) => {
  const { vehicles } = useVehicleOperation();

  return (
    <>
      {children}
      <DrawerRoot size="sm" opened={opened} onClose={close} position="right">
        <DrawerOverlay className="bg-white/5 backdrop-blur-sm" />
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle className="text-lg font-semibold text-primary">
              {title}
            </DrawerTitle>
          </DrawerHeader>
          <DrawerBody>
            {vehicles && (
              <Stack className="last:border-b last:border-b-muted" gap={0}>
                {vehicles.map((vehicle) => (
                  <Vehicle
                    key={vehicle._id}
                    vehicle={vehicle}
                    handelDrawerclose={close}
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

export default VehicleListDrawer;
