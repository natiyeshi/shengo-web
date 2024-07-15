"use client";
import Profile from "@/components/custom/profile";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AllUrls } from "../_utils/constants";

type Props = {};

const getAproximateExistingPath = (link: string) => {
  console.log({ link });
  return AllUrls.find((url) => url.url.includes(link))?.url || "#";
};

const Header = (props: Props) => {
  const pathname = usePathname();
  const routeSegements = pathname.split("/").slice(1);
  const segmentsLength = routeSegements.length;
  let segmentUrl = "/";

  return (
    <div className="flex items-center justify-between px-4 py-3 shadow">
      <div className="font-bold text-primary">
        {routeSegements.map((segment, index) => {
          segmentUrl += segment + "/";
          return (
            <Link
              href={
                index === 1 ? getAproximateExistingPath(segmentUrl) : segmentUrl
              }
              className="capitalize"
              key={segment}
            >
              <span>{segment}</span>
              {index + 1 !== segmentsLength && <span className="mx-1">/</span>}
            </Link>
          );
        })}
      </div>
      <Profile />
    </div>
  );
};

export default Header;
