import { Button } from "@/components/ui/button";
import { Title } from "@mantine/core";
import {
  ArrowRightIcon,
  BikeIcon,
  BoxIcon,
  BriefcaseIcon,
  CarIcon,
  ClipboardIcon,
  ConeIcon,
  HomeIcon,
  TruckIcon,
} from "lucide-react";
import Link from "next/link";
import React, { ReactElement } from "react";
import { ServiceCard as TServiceCard } from "./_types";

export const Services: TServiceCard[] = [
  {
    icon: <CarIcon className="h-6 w-6" />,
    title: "Vehicle",
    description:
      "Buy, sell, or rent any type of vehicle, from cars to construction equipment.",
    exploreLink: "#",
  },
  {
    icon: <HomeIcon className="h-6 w-6" />,
    title: "Residence",
    description:
      "Find your dream home or investment property, whether you're buying or renting.",
    exploreLink: "#",
  },
  {
    icon: <BriefcaseIcon className="h-6 w-6" />,
    title: "Business",
    description: "Buy, sell, or rent commercial properties and businesses.",
    exploreLink: "#",
  },
  {
    icon: <BoxIcon className="h-6 w-6" />,
    title: "Other Property",
    description:
      "Buy, sell, or rent any other type of property, from land to specialized assets.",
    exploreLink: "#",
  },
  {
    icon: <TruckIcon className="h-6 w-6" />,
    title: "Vehicle Spare Part",
    description: "Buy, sell, or rent any type of vehicle spare part.",
    exploreLink: "#",
  },
  {
    icon: <BikeIcon className="h-6 w-6" />,
    title: "Motor Cycle",
    description: "Buy, sell, or rent any type of motorcycle.",
    exploreLink: "#",
  },
  {
    icon: <ConeIcon className="h-6 w-6" />,
    title: "Construction Machine",
    description: "Buy, sell, or rent any type of construction equipment.",
    exploreLink: "#",
  },
  {
    icon: <ClipboardIcon className="h-6 w-6" />,
    title: "Lease",
    description: "Lease any type of property or asset.",
    exploreLink: "#",
  },
];

const Page = () => {
  return (
    <main className="container">
      <section className="mt-12 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-primary">
          Discover Your Next Opportunity
        </h2>
        <p className="mt-4 text-muted-foreground">
          Explore our wide range of property and asset listings to find the
          perfect fit for your needs.
        </p>
      </section>
      <section className="grid mt-12 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {Services.map((service) => (
          <ServiceCard {...service} key={service.title} />
        ))}
      </section>
    </main>
  );
};

const ServiceCard = ({
  icon,
  title,
  description,
  exploreLink,
}: TServiceCard) => {
  return (
    <div className="rounded-lg bg-background p-6 shadow-lg transition-shadow hover:shadow-xl">
      <section className="mb-4 flex items-center gap-3">
        <span className="rounded-full bg-primary p-3 text-primary-foreground">
          {icon}
        </span>
        <h3 className="text-xl font-bold">{title}</h3>
      </section>
      <p className="mb-6 text-muted-foreground">{description}</p>
      <div className="flex items-center justify-end">
        <Link
          href={exploreLink || "#"}
          className="inline-flex items-center gap-2 font-medium text-primary hover:underline"
          prefetch={false}
        >
          Explore
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
};

export default Page;
