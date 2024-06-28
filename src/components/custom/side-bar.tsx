"use client";

import { MenuIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import MyAccordion from "./MyAccordion";
import { cn } from "@/lib/utils";
import { useViewportSize } from "@mantine/hooks";

type Props = {};

const Sidebar = (props: Props) => {
  const { width } = useViewportSize();
  const [isSidebarOpended, setIsSidebarOpended] = useState(true);

  useEffect(() => {
    if (width <= 650) setIsSidebarOpended(false);
    else setIsSidebarOpended(true);
  }, [width]);
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
        <MyAccordion
          trigger={"Sales"}
          contents={[{ name: "Vehicle", url: "/dashboard/sales/vehicle" }]}
        />
      </div>
    </section>
  );
};

export default Sidebar;
