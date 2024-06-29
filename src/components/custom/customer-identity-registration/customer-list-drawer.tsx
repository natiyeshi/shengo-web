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
import Customer from "./customer";
import { useCustomerOperation } from "../../../app/(protected)/dashboard/_contexts/customer/customer-operation-provider";

type Props = {
  title?: string;
  children: ReactNode;
  opened?: boolean;
  close: () => void;
};

const CustomerListDrawer = ({
  title,
  opened = false,
  close,
  children,
}: Props) => {
  const { customers, type } = useCustomerOperation();


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
            {customers && (
              <Stack className="last:border-b last:border-b-muted" gap={0}>
                {customers.map((customer) => (
                  <Customer
                    key={customer._id}
                    customer={customer}
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

export default CustomerListDrawer;
