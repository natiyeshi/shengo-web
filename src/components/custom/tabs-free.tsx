import { UseEmblaCarouselType } from "embla-carousel-react";
import React, { useEffect, useRef } from "react";
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

const TabsFree = ({ current, tabsMap, carouselApi, classNames }: Props) => {
  const tabRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!tabRef.current) return;

    tabRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [current]);

  return (
    <div
      className={cn("mb-4 mt-1 rounded-md bg-muted w-[90%] mx-auto", classNames?.wrapper)}
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

export default TabsFree;
