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
import Person from "./constructionmachine";
import { useConstructionmachineOperation } from "@/app/(protected)/dashboard/_contexts/constructionmachine/constructionmachine-operation-context";
import Constructionmachine from "./constructionmachine";

type Props = {
  title?: string;
  children: ReactNode;
  opened?: boolean;
  close: () => void;
};

const ConstructionmachineListDrawer = ({
  title,
  opened = false,
  close,
  children,
}: Props) => {
  const { constructionmachines } = useConstructionmachineOperation();

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
            {constructionmachines && (
              <Stack className="last:border-b last:border-b-muted" gap={0}>
                {constructionmachines.map((constructionmachine) => (
                  <Constructionmachine
                    key={constructionmachine._id}
                    constructionmachine={constructionmachine}
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

export default ConstructionmachineListDrawer;
