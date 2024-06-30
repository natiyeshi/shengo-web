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
import Person from "./motorcycle";
import { useMotorcycleOperation } from "@/app/(protected)/dashboard/_contexts/motorcycle/motorcycle-operation-context";
import Motorcycle from "./motorcycle";

type Props = {
  title?: string;
  children: ReactNode;
  opened?: boolean;
  close: () => void;
};

const MotorcycleListDrawer = ({
  title,
  opened = false,
  close,
  children,
}: Props) => {
  const { motorcycles } = useMotorcycleOperation();

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
            {motorcycles && (
              <Stack className="last:border-b last:border-b-muted" gap={0}>
                {motorcycles.map((motorcycle) => (
                  <Motorcycle
                    key={motorcycle._id}
                    motorcycle={motorcycle}
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

export default MotorcycleListDrawer;
