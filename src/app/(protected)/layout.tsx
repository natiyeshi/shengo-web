
import MyAccordion from "@/components/custom/MyAccordion";
import { MenuIcon } from "lucide-react";
import React from "react";


function Layout({ children }: any) {
  const salesOptions = [
    { name: "Vehicle", url: "/dashboard/sales/vehicle" },
    { name: "Residence", url: "/dashboard/sales/residence" },
    { name: "Business", url: "/dashboard/sales/business" },
  ];
  const giftsOptions = [
    { name: "Vehicle", url: "/dashboard/gifts/vehicle" },
    { name: "Residence", url: "/dashboard/gifts/residence" },
    { name: "Business", url: "/dashboard/gifts/business" },
  ];
  const rentalOptions = [
    { name: "Vehicle", url: "/dashboard/rental/vehicle" },
    { name: "Residence", url: "/dashboard/rental/residence" },
    { name: "Business", url: "/dashboard/rental/business" },
  ];
  // "/dashboard/sales/residence"
  return (
    <div className="flex h-[100vh] w-full">
      <section className="flex h-full w-[25%] flex-col overflow-auto bg-primary text-primary-foreground">
        <div className="flex w-full gap-2 py-8 ps-4">
          <MenuIcon />
          <div>SHENGO SOLUTIONS</div>
        </div>
        <div className="px-4 overflow-auto">
          <MyAccordion
            trigger={"Sales"}
            contents={[{ name: "Vehicle", url: "/dashboard/sales/vehicle" }]}
          />
         
        </div>
      </section>

      <div className="w-[75%] h-full  pb-5 overflow-auto">{children}</div>
    </div>
  );
}
export default Layout;
