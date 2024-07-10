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
import Person from "./residence";
import { useResidenceOperation } from "@/app/(protected)/dashboard/_contexts/residence/residence-operation-context";
import Residence from "./residence";

type Props = {
  title?: string;
  children: ReactNode;
  opened?: boolean;
  close: () => void;
};

const ResidenceListDrawer = ({
  title,
  opened = false,
  close,
  children,
}: Props) => {
  const { residences } = useResidenceOperation();

  return (
    <>
      {children}
      <DrawerRoot opened={opened} onClose={close} position="right">
        <DrawerOverlay className="bg-white/5 backdrop-blur-sm" />
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle className="text-lg font-semibold text-primary">
              {title} 
            </DrawerTitle>
          </DrawerHeader>
          <DrawerBody>
            {residences && (
              <Stack className="last:border-b last:border-b-muted" gap={0}>
                {residences.map((residence) => (
                  <Residence
                    key={residence.houseNumber}
                    residence={residence}
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

export default ResidenceListDrawer;
