import { CarouselApi } from "@/components/ui/carousel";
import { useEffect, useState } from "react";

type UseCarouselAPI = {
  tabsMap: Record<string, string>;
};

export const useCarouselAPI = ({ tabsMap }: UseCarouselAPI) => {
  const [api, setAPI] = useState<CarouselApi>();
  const [current, setCurrent] = useState(1);
  const [count, setCount] = useState(5);

  useEffect(() => {
    if (!api) {
      return;
    }
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const defaultTabValue = Object.keys(tabsMap)[0];

  const goToNext = (ind: number | null) => {
    api && api.scrollTo(ind ?? current);
  };

  const goBack = (ind: number | null) => {
    api && api.scrollTo(ind ?? current - 2);
  };

  return {
    current,
    defaultTabValue,
    goToNext,
    goBack,
    api,
    setAPI
  };
};
