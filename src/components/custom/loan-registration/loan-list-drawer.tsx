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
import Person from "./loan";
import { useLoanOperation } from "@/app/(protected)/dashboard/_contexts/loan/loan-operation-context";
import Loan from "./loan";

type Props = {
  title?: string;
  children: ReactNode;
  opened?: boolean;
  close: () => void;
};

const LoanListDrawer = ({
  title,
  opened = false,
  close,
  children,
}: Props) => {
  const { loans } = useLoanOperation();

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
            {loans && (
              <Stack className="last:border-b last:border-b-muted" gap={0}>
                {loans.map((loan) => (
                  <Loan
                    key={loan._id}
                    loan={loan}
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

export default LoanListDrawer;
