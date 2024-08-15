"use client";
import Profile from "@/components/custom/profile";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AllLinks } from "../_utils/constants";

import { Breadcrumbs } from "@mantine/core";
import { cn } from "@/lib/utils";
type Props = {};

const getApproximateExistingPath = (url: string) => {
  if (url.toLowerCase() === "dashboard") return "/dashboard";
  return AllLinks.find((link) => link.url.includes(url))?.url || "#";
};

const Header = (props: Props) => {
  const pathname = usePathname();
  const routeSegements = pathname.split("/").slice(1);

  const links = routeSegements.map((seg) => ({
    title: seg,
    href: getApproximateExistingPath(seg),
  }));

  return (
    <div className="flex items-center justify-between px-4 py-3">
      <Breadcrumbs separator=">">
        {links.map((link) => (
          <Link
            key={link.title}
            className={cn(
              "text-sm capitalize text-zinc-500 transition hover:text-primary",
              {
                "text-zinc-800": pathname === link.href,
              },
            )}
            href={link.href}
          >
            {link.title}
          </Link>
        ))}
      </Breadcrumbs>
      <Profile />
    </div>
  );
};

export default Header;
