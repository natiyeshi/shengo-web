"use client";
import React, { ReactNode } from "react";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export interface ContentInfo {
  url: string;
  name: string;
}

interface Props {
  contents: ContentInfo[];
  trigger: ReactNode;
}

const MyAccordion = ({ trigger, contents }: Props) => {
  const pathname = usePathname();
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1" className="overflow-hidden border-none">
        <AccordionTrigger className="text-sm">
         {trigger}
        </AccordionTrigger>
        <AccordionContent className="dark flex flex-col gap-2 px-2">
          {contents.map((value, ind) => {
            const isCurrent = value.url == pathname;
            return (
              <Link
                key={ind}
                className={cn(
                  `rounded-md px-2 py-1 transition-all duration-300 hover:bg-white/10`,
                  {
                    "bg-foreground text-background hover:bg-white/90":
                      isCurrent,
                  },
                )}
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
