import Link from "next/link";
import React from "react";
import { ServiceCard as TServiceCard } from "./_types";
import { Services } from "./_utils/services";
import { ArrowRightIcon } from "lucide-react";
import { Flex, Group, Stack } from "@mantine/core";

const Page = () => {
  return (
    <main className="container">
      <section className="mt-8 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-primary">
          Secure Your Future Deals
        </h2>
        <p className="mt-4 text-muted-foreground">
          Create and manage contracts for buying, renting, selling, and more
          with ease.
        </p>
      </section>
      <section className="my-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
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
    <Flex
      direction="column"
      gap={0}
      className="rounded-md bg-white p-6 shadow-md transition-all hover:shadow-lg"
    >
      <Group className="mb-4 flex items-center gap-3">
        <span className="rounded-full bg-primary p-3 text-primary-foreground">
          {icon}
        </span>
        <h3 className="text-xl font-bold">{title}</h3>
      </Group>
      <p className="mb-6 line-clamp-3 text-muted-foreground">{description}</p>
      <Group className="mt-auto flex items-center justify-end">
        <Link
          href={exploreLink || "#"}
          className="inline-flex items-center gap-2 font-medium text-primary hover:underline"
        >
          Explore
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </Group>
    </Flex>
  );
};

export default Page;
