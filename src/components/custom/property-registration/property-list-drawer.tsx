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
import { usePropertyOperation } from "@/app/(protected)/dashboard/_contexts/property/property-operation-context";
import Property from "./property";

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
  const { properties } = usePropertyOperation();

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
            {properties && (
              <Stack className="last:border-b last:border-b-muted" gap={0}>
                {properties.map((property) => (
                  <Property
                    key={property._id}
                    property={property}
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

export default PropertyListDrawer;
