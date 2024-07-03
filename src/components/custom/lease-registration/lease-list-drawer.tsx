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
import Person from "./lease";
import { useLeaseOperation } from "@/app/(protected)/dashboard/_contexts/lease/lease-operation-context";
import Lease from "./lease";

type Props = {
  title?: string;
  children: ReactNode;
  opened?: boolean;
  close: () => void;
};

const LeaseListDrawer = ({ title, opened = false, close, children }: Props) => {
  const { leases } = useLeaseOperation();

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
            {leases && (
              <Stack className="last:border-b last:border-b-muted" gap={0}>
                {leases.map((lease) => (
                  <Lease
                    key={lease._id}
                    lease={lease}
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

export default LeaseListDrawer;
