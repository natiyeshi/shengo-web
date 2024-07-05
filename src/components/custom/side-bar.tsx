"use client";

import { MenuIcon } from "lucide-react";
import MyAccordion from "./MyAccordion";
import { cn } from "@/lib/utils";
import { useSidebarVisibilityDeterminer } from "@/hooks/use-sidebar-visibility-determiner";

type Props = {};

const Sidebar = (props: Props) => {
  const salesOptions = [
    { name: "Vehicle", url: "/dashboard/sales/vehicle" },
    { name: "Residence", url: "/dashboard/sales/residence" },
    { name: "Business", url: "/dashboard/sales/business" },
    { name: "Other Property", url: "/dashboard/sales/otherproperty" },
    { name: "Vehicle Spare Part", url: "/dashboard/sales/vehiclespare" },
    { name: "Motor Cycle", url: "/dashboard/sales/motorcycle" },
    {
      name: "Construction Machine",
      url: "/dashboard/sales/constructionmachine",
    },
    { name: "Lease", url: "/dashboard/sales/lease" },
  ];

  const rentalOptions = [
    { name: "Vehicle", url: "/dashboard/rental/vehicle" },
    { name: "Residence", url: "/dashboard/rental/residence" },
    { name: "Business", url: "/dashboard/rental/business" },
    { name: "Other Property", url: "/dashboard/rental/otherproperty" },
    { name: "Vehicle Spare Part", url: "/dashboard/rental/vehiclespare" },
    { name: "Motor Cycle", url: "/dashboard/rental/motorcycle" },
    {
      name: "Construction Machine",
      url: "/dashboard/rental/constructionmachine",
    },
    { name: "Lease", url: "/dashboard/rental/lease" },
  ];
  const giftsOptions = [
    { name: "Vehicle", url: "/dashboard/gifts/vehicle" },
    { name: "Residence", url: "/dashboard/gifts/residence" },
    { name: "Business", url: "/dashboard/gifts/business" },
    { name: "Other Property", url: "/dashboard/gifts/otherproperty" },
    { name: "Vehicle Spare Part", url: "/dashboard/gifts/vehiclespare" },
    { name: "Motor Cycle", url: "/dashboard/gifts/motorcycle" },
    {
      name: "Construction Machine",
      url: "/dashboard/gifts/constructionmachine",
    },
    { name: "Lease", url: "/dashboard/gifts/lease" },
  ];
  const familyOptions = [
    { name: "Normal", url: "/dashboard/familyRepresentation/normal" },
  ];

  const loanOptions = [{ name: "Normal", url: "/dashboard/loan/normal" }];

  const { isSidebarOpended, setIsSidebarOpended } =
    useSidebarVisibilityDeterminer({
      minViewportSize: 650,
    });
  return (
    <section
      className={cn(
        "sticky left-0 top-0 flex h-full w-[17rem] shrink-0 grow-0 flex-col overflow-auto bg-primary text-primary-foreground transition-all duration-200",
        { "w-[3.7rem]": !isSidebarOpended },
      )}
    >
      <div
        className={cn("flex w-full gap-2 px-4 py-7", {
          "justify-center": !isSidebarOpended,
        })}
      >
        <div className="relative isolate">
          <MenuIcon
            className={cn("cursor-pointer")}
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
        className={cn("overflow-auto px-4 transition-all duration-200", {
          hidden: !isSidebarOpended,
        })}
      >
        <MyAccordion trigger={"Sales"} contents={salesOptions} />
        <MyAccordion trigger={"Rental"} contents={rentalOptions} />
        <MyAccordion trigger={"Gifts"} contents={giftsOptions} />
        <MyAccordion trigger={"Loan"} contents={loanOptions} />
        <MyAccordion
          trigger={"Family Representation"}
          contents={familyOptions}
        />
      </div>
    </section>
  );
};

export default Sidebar;
