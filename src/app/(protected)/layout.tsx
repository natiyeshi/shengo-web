import MyAccordion from "@/components/custom/MyAccordion";
import { MenuIcon } from "lucide-react";
import React from "react";

function Layout({ children }: any) {
  return (
    <div className="w-full flex h-[100vh] ">
     
      <div className="w-[25%] overflow-auto flex flex-col text-primary-foreground bg-primary h-full">
        <div className="flex gap-2 ps-4 py-4 w-full ">
          <MenuIcon />
          <div>SHENGO SOLUTIONS</div>
        </div>
        <div className="px-4 overflow-auto">
          <MyAccordion
            trigger={<div>Working</div>}
            contents={[{ name: "one", url: "two" },{ name: "one", url: "two" },{ name: "one", url: "two" },{ name: "one", url: "two" }]}
          />
           <MyAccordion
            trigger={<div>Working</div>}
            contents={[{ name: "one", url: "two" },{ name: "one", url: "two" },{ name: "one", url: "two" },{ name: "one", url: "two" }]}
          />
          <MyAccordion
            trigger={<div>Working</div>}
            contents={[{ name: "one", url: "two" },{ name: "one", url: "two" },{ name: "one", url: "two" },{ name: "one", url: "two" }]}
          />
           <MyAccordion
            trigger={<div>Working</div>}
            contents={[{ name: "one", url: "two" },{ name: "one", url: "two" },{ name: "one", url: "two" },{ name: "one", url: "two" }]}
          />
          <MyAccordion
            trigger={<div>Working</div>}
            contents={[{ name: "one", url: "two" },{ name: "one", url: "two" },{ name: "one", url: "two" },{ name: "one", url: "two" }]}
          />
           <MyAccordion
            trigger={<div>Working</div>}
            contents={[{ name: "one", url: "two" },{ name: "one", url: "two" },{ name: "one", url: "two" },{ name: "one", url: "two" }]}
          />
          <MyAccordion
            trigger={<div>Working</div>}
            contents={[{ name: "one", url: "two" },{ name: "one", url: "two" },{ name: "one", url: "two" },{ name: "one", url: "two" }]}
          />
           <MyAccordion
            trigger={<div>Working</div>}
            contents={[{ name: "one", url: "two" },{ name: "one", url: "two" },{ name: "one", url: "two" },{ name: "one", url: "two" }]}
          />
          <MyAccordion
            trigger={<div>Working</div>}
            contents={[{ name: "one", url: "two" },{ name: "one", url: "two" },{ name: "one", url: "two" },{ name: "one", url: "two" }]}
          />
           <MyAccordion
            trigger={<div>Working</div>}
            contents={[{ name: "one", url: "two" },{ name: "one", url: "two" },{ name: "one", url: "two" },{ name: "one", url: "two" }]}
          />
          <MyAccordion
            trigger={<div>Working</div>}
            contents={[{ name: "one", url: "two" },{ name: "one", url: "two" },{ name: "one", url: "two" },{ name: "one", url: "two" }]}
          />
           <MyAccordion
            trigger={<div>Working</div>}
            contents={[{ name: "one", url: "two" },{ name: "one", url: "two" },{ name: "one", url: "two" },{ name: "one", url: "two" }]}
          />
          <MyAccordion
            trigger={<div>Working</div>}
            contents={[{ name: "one", url: "two" },{ name: "one", url: "two" },{ name: "one", url: "two" },{ name: "one", url: "two" }]}
          />
           <MyAccordion
            trigger={<div>Working</div>}
            contents={[{ name: "one", url: "two" },{ name: "one", url: "two" },{ name: "one", url: "two" },{ name: "one", url: "two" }]}
          />
        </div>
      </div>

      <div className="w-[75%]">{children}</div>
    </div>
  );
}
export default Layout;
