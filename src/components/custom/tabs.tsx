import { UseEmblaCarouselType } from "embla-carousel-react";
import React from "react";
import { toast } from "../ui/use-toast";

type Props = {
  current: number;
  tabsMap: Record<string, string>;
  carouselApi: UseEmblaCarouselType[1] | undefined;
};

const Tabs = ({ current, tabsMap, carouselApi }: Props) => {
  return (
    <div className="mb-7 rounded-md bg-muted">
      {Object.keys(tabsMap).map((tabKey, ind) => (
        <div
          className={`${current - 1 === ind && "border-b-[3px] border-primary px-2 py-1 font-semibold text-primary"} inline-flex cursor-pointer items-center justify-center px-3 py-2.5 text-sm transition-all`}
          onClick={() => {
            if (current - 1 < ind) {
              return toast({
                title: "Warning",
                description: "Please fill the current form first!",
                variant: "destructive",
              });
            }
            carouselApi && carouselApi.scrollTo(ind);
          }}
          key={tabKey}
        >
          {tabsMap[tabKey]}
        </div>
      ))}
    </div>
  );
};

export default Tabs;
