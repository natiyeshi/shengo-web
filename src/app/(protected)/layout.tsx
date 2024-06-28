import MyAccordion from "@/components/custom/MyAccordion";
import Sidebar from "@/components/custom/side-bar";
import { MenuIcon } from "lucide-react";
import React from "react";
import Header from "./dashboard/_components/header";

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
    <div className="flex h-screen w-screen overflow-hidden">
      <Sidebar />
      <section className="flex w-full flex-col overflow-x-auto">
        <Header />
        <div className="overflow-y-auto">{children}</div>
      </section>
    </div>
  );
}
export default Layout;
