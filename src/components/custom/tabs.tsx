import { UseEmblaCarouselType } from "embla-carousel-react";
import React, { useEffect, useState, useRef } from "react";
import { toast } from "../ui/use-toast";
import { cn } from "@/lib/utils";

type Props = {
  current: number;
  tabsMap: Record<string, string>;
  carouselApi: UseEmblaCarouselType[1] | undefined;
  classNames?: {
    wrapper?: string;
    tabItem?: string;
  };
};

const Tabs = ({ current, tabsMap, carouselApi, classNames }: Props) => {
  const [visitedTabs, setVisitedTabs] = useState([current]);
  const tabRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!visitedTabs.includes(current))
      setVisitedTabs((prev) => [...prev, current]);
  }, [current, visitedTabs]);

  useEffect(() => {
    if (!tabRef.current) return;

    tabRef.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, [current]);

  return (
    <div
      className={cn("mb-4 mt-1 rounded-md bg-muted", classNames?.wrapper)}
      ref={tabRef}
    >
      {Object.keys(tabsMap).map((tabKey, ind) => (
        <div
          className={cn(
            `inline-flex cursor-pointer items-center justify-center border-b-[3px] border-transparent px-3 py-2.5 text-sm transition-all`,
            {
              "border-primary font-semibold text-primary": current - 1 === ind,
            },
            classNames?.tabItem,
          )}
          onClick={() => {
            if (!visitedTabs.includes(ind + 1)) {
              // return toast({
              //   title: "Warning",
              //   description: "Please fill the current form first!",
              //   variant: "destructive",
              //   duration: 3000,
              // });
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
