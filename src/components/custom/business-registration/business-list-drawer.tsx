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
import Person from "./business";
import { useBusinessOperation } from "@/app/(protected)/dashboard/_contexts/business/business-operation-context";
import Business from "./business";

type Props = {
  title?: string;
  children: ReactNode;
  opened?: boolean;
  close: () => void;
};

const BusinessListDrawer = ({
  title,
  opened = false,
  close,
  children,
}: Props) => {
  const { business } = useBusinessOperation();

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
            {business && (
              <Stack className="last:border-b last:border-b-muted" gap={0}>
                {business.map((business) => (
                  <Business
                    key={business._id}
                    business={business}
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

export default BusinessListDrawer;
