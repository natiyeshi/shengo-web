import Sidebar from "@/components/custom/side-bar";
import React from "react";
import Header from "./dashboard/_components/header";

function Layout({ children }: any) {
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
