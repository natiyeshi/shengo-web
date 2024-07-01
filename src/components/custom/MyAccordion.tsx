"use client";
import React from "react";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { usePathname } from "next/navigation";

export interface ContentInfo {
  url: string;
  name: string;
}

interface Props {
  contents: ContentInfo[];
  trigger: string;
}

const MyAccordion = ({ trigger, contents }: Props) => {
  const pathname = usePathname();
  const mainPath = pathname.split("/")[2] == trigger.toLowerCase();
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1" className="overflow-hidden border-none">
        <AccordionTrigger className="text-sm">
          <div className="font-semibold">{trigger}</div>
        </AccordionTrigger>
        <AccordionContent className="dark flex flex-col gap-2 px-2">
          {contents.map((value, ind) => {
            const isCurrent = value.url == pathname;
            return (
              <Link
                key={ind}
                className={`rounded-xl ${isCurrent && "bg-foreground text-background"} px-2 py-1 transition-all duration-300 hover:bg-white/10`}
                href={value.url}
              >
                {value.name}
              </Link>
            );
          })}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default MyAccordion;
