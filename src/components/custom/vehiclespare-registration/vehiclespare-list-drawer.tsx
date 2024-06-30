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
import Person from "./vehiclespare";
import { useVehiclespareOperation } from "@/app/(protected)/dashboard/_contexts/vehiclespare/vehiclespare-operation-context";
import Vehiclespare from "./vehiclespare";

type Props = {
  title?: string;
  children: ReactNode;
  opened?: boolean;
  close: () => void;
};

const VehiclespareListDrawer = ({
  title,
  opened = false,
  close,
  children,
}: Props) => {
  const { vehiclespares } = useVehiclespareOperation();

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
            {vehiclespares && (
              <Stack className="last:border-b last:border-b-muted" gap={0}>
                {vehiclespares.map((vehiclespare) => (
                  <Vehiclespare
                    key={vehiclespare.propertyName}
                    vehiclespare={vehiclespare}
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

export default VehiclespareListDrawer;
