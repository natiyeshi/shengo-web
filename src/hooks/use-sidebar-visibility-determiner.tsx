import { useViewportSize } from "@mantine/hooks";
import { useEffect, useState } from "react";

type UseSidebarVisibilityDeterminer = {
  minViewportSize: number;
};

export const useSidebarVisibilityDeterminer = ({
  minViewportSize,
}: UseSidebarVisibilityDeterminer) => {
  const { width } = useViewportSize();
  const [isSidebarOpended, setIsSidebarOpended] = useState(true);

  useEffect(() => {
    if (width <= minViewportSize) setIsSidebarOpended(false);
    else setIsSidebarOpended(true);
  }, [width, minViewportSize]);

  return { isSidebarOpended, setIsSidebarOpended };
};
