import { UseEmblaCarouselType } from "embla-carousel-react";
import React, { useEffect, useState, useRef } from "react";
import { toast } from "../ui/use-toast";
import { cn } from "@/lib/utils";
import { motion, MotionConfig } from "framer-motion";
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
      className={cn(
        "sticky left-0 top-0 z-[19] mb-4 mt-1 border-t border-b border-zinc-200 bg-white p-1",
        classNames?.wrapper,
      )}
      ref={tabRef}
    >
      {Object.keys(tabsMap).map((tabKey, ind) => (
        <div
          className={cn(
            `relative inline-flex cursor-pointer items-center justify-center px-3.5 py-2.5 text-sm text-zinc-500 transition-all duration-300`,
            {
              "font-medium text-zinc-800": current - 1 === ind,
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
          <span className="relative z-[9] capitalize">{tabsMap[tabKey]}</span>
          {current - 1 === ind && (
            <motion.div
              layoutId="active"
              className="absolute inset-0 -z-[9] rounded-lg bg-primary/10 shadow-sm"
            ></motion.div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Tabs;
