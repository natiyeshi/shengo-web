import MyAccordion from "@/components/custom/MyAccordion";
import { MenuIcon } from "lucide-react";
import React from "react";

function Layout({ children }: any) {
  return (
    <div className="flex h-[100vh] w-full">
      <section className="flex h-full w-[25%] flex-col overflow-auto bg-primary text-primary-foreground">
        <div className="flex w-full gap-2 py-8 ps-4">
          <MenuIcon />
          <div>SHENGO SOLUTIONS</div>
        </div>
        <div className="overflow-auto px-4">
          <MyAccordion
            trigger={<div>Sales</div>}
            contents={[{ name: "Vehicle", url: "/dashboard/sales/vehicle" }]}
          />
        </div>
      </section>

      <section className="h-full w-[75%] overflow-auto pb-5">
        {children}
      </section>
    </div>
  );
}
export default Layout;
