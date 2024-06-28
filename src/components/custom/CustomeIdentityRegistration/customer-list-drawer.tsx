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
import Person from "./person";
import { useCustomerOperation } from "../../../app/(protected)/dashboard/_contexts/customer-operation-provider";

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
  const { persons, type } = useCustomerOperation();


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
            {persons && (
              <Stack className="last:border-b last:border-b-muted" gap={0}>
                {persons.map((person) => (
                  <Person
                    key={person._id}
                    person={person}
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
