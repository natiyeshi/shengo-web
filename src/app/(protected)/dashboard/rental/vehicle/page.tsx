"use client";
import H1 from "@/components/custom/h1";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useEffect, useState } from "react";
import { RENTAL_VEHICLE_TABS_MAP } from "../_utils/constants";
import CustomerIdentityRegisteration from "../_components/customer-identity-registration";
import VehicleRegistration from "../_components/vehicle-registration";
import ServiceRequest from "../_components/service-request";
import { Title } from "@mantine/core";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const Page = () => {
  const [api, setApi] = useState<CarouselApi>();
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

  const defaultTabValue = Object.keys(RENTAL_VEHICLE_TABS_MAP)[0];
  return (
    <main className="container">
      <Title order={1} className="my-5">
        Vehicle Rental 
      </Title>
      <section className="">
        <Tabs defaultValue={defaultTabValue}>
          <TabsList className="mb-7 rounded-md py-1">
            {Object.keys(RENTAL_VEHICLE_TABS_MAP).map((tabKey,ind) => (
              <TabsTrigger onClick={()=>api && api.scrollTo(ind)} className="rounded-md" key={tabKey} value={tabKey}>
                {RENTAL_VEHICLE_TABS_MAP[tabKey]}
              </TabsTrigger>
            ))}
          </TabsList>

          <Carousel
            setApi={setApi}
            opts={{
              watchDrag: false,
            }}
            className=""
          >
            <CarouselContent>
              <CarouselItem>
                <CustomerIdentityRegisteration type="Lessor" />
              </CarouselItem>
              <CarouselItem>
                <CustomerIdentityRegisteration type="Renter" />
              </CarouselItem>
              <CarouselItem>
                <VehicleRegistration />
              </CarouselItem>
              <CarouselItem>
                <CustomerIdentityRegisteration type="Witness" />
              </CarouselItem>
              <CarouselItem>
                <ServiceRequest />
              </CarouselItem>
            </CarouselContent>
          </Carousel>

          {/* {Object.keys(RENTAL_VEHICLE_TABS_MAP).map((tabKey) => (
            <TabsContent key={tabKey} value={tabKey}>
              {RENTAL_VEHICLE_TABS_MAP[tabKey] === RENTAL_VEHICLE_TABS_MAP.lessor && (
              )}
              {RENTAL_VEHICLE_TABS_MAP[tabKey] === RENTAL_VEHICLE_TABS_MAP.renter && (
              )}
              {RENTAL_VEHICLE_TABS_MAP[tabKey] === RENTAL_VEHICLE_TABS_MAP.vehicle && (
              )}
              {RENTAL_VEHICLE_TABS_MAP[tabKey] === RENTAL_VEHICLE_TABS_MAP.withness && (
              )}
              {RENTAL_VEHICLE_TABS_MAP[tabKey] === RENTAL_VEHICLE_TABS_MAP.service && (
              )}
            </TabsContent>
          ))} */}
        </Tabs>
      </section>
    </main>
  );
};

export default Page;
