"use client";

import { MenuIcon, SettingsIcon } from "lucide-react";
import MyAccordion from "./sidebar-accordion";
import { cn } from "@/lib/utils";
import { useSidebarVisibilityDeterminer } from "@/hooks/use-sidebar-visibility-determiner";
import { Group, Stack, Tooltip, Badge, Burger } from "@mantine/core";
import Link from "next/link";
import {
  FamilyOptions,
  GeneralOrSpecificOptions,
  GiftsOptions,
  LoanOptions,
  RentalOptions,
  SalesOptions,
} from "@/app/(protected)/dashboard/_utils/constants";
import { PropsWithChildren, useEffect, useState } from "react";

import {
  FaDollarSign,
  FaHome,
  FaGift,
  FaHandHoldingUsd,
  FaUsers,
  FaGlobe,
} from "react-icons/fa";
import { usePathname, useRouter } from "next/navigation";

const IconCommonStyle = "size-[2.5rem] p-2.5";

const MENU_OPTIONS = [
  {
    _id: 1,
    icon: <FaDollarSign className={IconCommonStyle} />,
    label: "Sales",
    options: SalesOptions,
  },
  {
    _id: 2,
    icon: <FaHome className={IconCommonStyle} />,
    label: "Rental",
    options: RentalOptions,
  },
  {
    _id: 3,
    icon: <FaGift className={IconCommonStyle} />,
    label: "Gifts",
    options: GiftsOptions,
  },
  {
    _id: 4,
    icon: <FaHandHoldingUsd className={IconCommonStyle} />,
    label: "Loan",
    options: LoanOptions,
  },
  {
    _id: 5,
    icon: <FaUsers className={IconCommonStyle} />,
    label: "Family",
    options: FamilyOptions,
  },
  {
    _id: 6,
    icon: <FaGlobe className={IconCommonStyle} />,
    label: "Representation",
    options: GeneralOrSpecificOptions,
  },
];

type Props = {};

const Sidebar = (props: Props) => {
  const { isSidebarOpended, setIsSidebarOpended } =
    useSidebarVisibilityDeterminer({
      minViewportSize: 650,
    });
  const pathname = usePathname();
  const menus = pathname.split("/").slice(1); // removing first empty path
  const [activeMenu, setActiveMenu] = useState(
    () =>
      MENU_OPTIONS.find((option) => {
        return menus.length === 3
          ? option.label.toLowerCase() === menus[1]
          : false;
      }) || undefined,
  );

  const router = useRouter();

  const handelActiveMenu = (key: number) => {
    const menu = MENU_OPTIONS[key - 1];
    setActiveMenu(menu);
    router.push(menu.options[0].url);
  };

  // useEffect(() => {

  // }, [menus]);

  return (
    <div className="sticky left-0 top-0 flex">
      <section
        className={cn(
          "flex h-[calc(100dvh-1rem)] w-[3.5rem] flex-col items-center rounded-[1rem] border p-4 text-zinc-800",
        )}
      >
        <div className="relative">
          <Burger
            classNames={{
              burger: "bg-primary",
            }}
            opened={isSidebarOpended && !!activeMenu}
            onClick={() => setIsSidebarOpended((prev) => !prev)}
          />
        </div>

        <div className={cn("mt-8 flex flex-col gap-2")}>
          {MENU_OPTIONS.map((icon) => (
            <button key={icon._id}>
              <Tooltip
                withArrow
                position="right-start"
                label={icon.label}
                className="cursor-pointer"
              >
                <div
                  onClick={() => handelActiveMenu(icon._id)}
                  className={cn(
                    "rounded-md opacity-80 transition hover:bg-zinc-200/70",
                    {
                      "rounded-md bg-primary text-white opacity-100 shadow hover:bg-primary":
                        activeMenu?.label === icon.label,
                    },
                  )}
                >
                  {icon.icon}
                </div>
              </Tooltip>
            </button>
          ))}
        </div>

        <Stack mt="auto" className="border-t border-t-muted/25">
          <Link href="/dashboard/setting">
            <Tooltip withArrow position="right-start" label="Setting">
              <SettingsIcon className={IconCommonStyle} />
            </Tooltip>
          </Link>
        </Stack>
      </section>
      <section
        className={cn(
          "mt-2 w-0 overflow-x-hidden transition-all duration-300",
          {
            "w-[14rem] px-4": isSidebarOpended && activeMenu,
          },
        )}
      >
        <Badge>{activeMenu?.label}</Badge>
        <div className="mt-8 flex flex-col gap-2">
          {activeMenu?.options.map((option) => (
            <Link
              key={option.url}
              href={option.url}
              className={cn(
                "rounded-md border-b border-b-zinc-100 p-2 text-sm transition-all duration-200 hover:bg-primary/90 hover:text-white",
                {
                  "bg-primary text-white hover:bg-primary":
                    option.url === pathname,
                },
              )}
            >
              {option.name}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Sidebar;
