import Sidebar from "@/components/custom/side-bar";
import React from "react";
import Header from "./dashboard/_components/header";

function Layout({ children }: any) {
  return (
    <div className="flex h-screen w-screen gap-4 overflow-hidden bg-zinc-100/40 p-2">
      <Sidebar />
      <section className="flex w-full flex-col overflow-x-auto rounded-[1rem] bg-white">
        <Header />
        <div className="overflow-y-auto bg-white">{children}</div>
      </section>
    </div>
  );
}
export default Layout;
