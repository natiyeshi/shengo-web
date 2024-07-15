"use client";

import { LogOut, MenuIcon, SettingsIcon } from "lucide-react";
import MyAccordion from "./sidebar-accordion";
import { cn } from "@/lib/utils";
import { useSidebarVisibilityDeterminer } from "@/hooks/use-sidebar-visibility-determiner";
import { Group, isOptionsGroup, Stack, Tooltip } from "@mantine/core";
import Link from "next/link";
import { FamilyOptions, GeneralOrSpecificOptions, GiftsOptions, LoanOptions, RentalOptions, SalesOptions } from "@/app/(protected)/dashboard/_utils/constants";

type Props = {};

const Sidebar = (props: Props) => {
 

  const { isSidebarOpended, setIsSidebarOpended } =
    useSidebarVisibilityDeterminer({
      minViewportSize: 650,
    });
  return (
    <section
      className={cn(
        "sticky left-0 top-0 flex h-screen w-[18rem] shrink-0 grow-0 flex-col overflow-hidden bg-primary px-4 text-primary-foreground transition-all duration-200",
        { "w-[3.7rem]": !isSidebarOpended },
      )}
    >
      <div
        className={cn("flex w-full gap-2 border-b border-b-muted/25 py-5", {
          "justify-center": !isSidebarOpended,
        })}
      >
        <div className="relative isolate">
          <MenuIcon
            className={cn("animate-pulse cursor-pointer")}
            onClick={() => setIsSidebarOpended((prev) => !prev)}
          />
          {!isSidebarOpended && (
            <span className="absolute inset-0 -z-10 h-full w-full scale-[1.4] rounded-full bg-neutral-800/20"></span>
          )}
        </div>
        <h1 className={cn("text-balance", { hidden: !isSidebarOpended })}>
          SHENGO SOLUTIONS
        </h1>
      </div>
      <div
        className={cn(
          "no-scrollbar overflow-y-auto overflow-x-hidden transition-all duration-200",
          {
            hidden: !isSidebarOpended,
          },
        )}
      >
        <MyAccordion trigger={"Sales"} contents={SalesOptions} />
        <MyAccordion trigger={"Rental"} contents={RentalOptions} />
        <MyAccordion trigger={"Gifts"} contents={GiftsOptions} />
        <MyAccordion trigger={"Loan"} contents={LoanOptions} />
        <MyAccordion
          trigger={"Family Representation"}
          contents={FamilyOptions}
        />
        <MyAccordion
          trigger={"Gen/Spec Representation"}
          contents={GeneralOrSpecificOptions}
        />
      </div>

      <Stack mt="auto" py={16} className="border-t border-t-muted/25">
        <Link href="/dashboard/setting">
          <Group gap="sm" className="cursor-pointer">
            <Tooltip
              withArrow
              color="violet"
              position="right-start"
              label="Setting"
              opened={!isSidebarOpended ? undefined : false}
            >
              <SettingsIcon className="size-[1.1rem] shrink-0 grow-0" />
            </Tooltip>
            <span
              className={cn("text-sm font-medium", {
                hidden: !isSidebarOpended,
              })}
            >
              Setting
            </span>
          </Group>
        </Link>
      </Stack>
    </section>
  );
};

export default Sidebar;
