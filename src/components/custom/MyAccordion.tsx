import React from "react";
import Link from "next/link"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export interface ContentInf {
  url: string;
  name: string;
}

interface Props {
  contents: ContentInf[];
  trigger: any;
}

const MyAccordion = ({ trigger, contents }: Props) => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1" className="border-none">
        <AccordionTrigger className="text-sm">{trigger}</AccordionTrigger>
        <AccordionContent className="flex bg-background dark px-2 py-3 rounded-xl flex-col gap-3 ">
          {contents.map((value) => {
            return <Link className="hover:underline" href={value.url}>{value.name}</Link>;
          })}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default MyAccordion;
