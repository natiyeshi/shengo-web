"use client";
import { Tabs, TabsList } from "@/components/ui/tabs";
import React, { useEffect, useState } from "react";
import { RENTAL_VEHICLE_TABS_MAP } from "../_utils/constants";
import CustomerIdentityRegisteration from "@/components/custom/CustomeIdentityRegistration";
import VehicleRegistration from "@/components/custom/VehicleRegistration";
import ServiceRequest from "../_components/service-request";
import { Title } from "@mantine/core";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { toast } from "@/components/ui/use-toast";
import { CustomerIdentitryRegistrationProvider } from "../../_contexts/customer-context";

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

  const goToNext = (ind: number | null) => {
    api && api.scrollTo(ind ?? current);
  };

  const goBack = (ind: number | null) => {
    api && api.scrollTo(ind ?? current - 2);
  };

  return (
    <main className="container">
      <Title order={1} className="my-5">
        Vehicle Rental
      </Title>
      <section className="">
        <CustomerIdentitryRegistrationProvider>
          <Tabs defaultValue={defaultTabValue}>
            <TabsList className="mb-7 rounded-md py-1">
              {Object.keys(RENTAL_VEHICLE_TABS_MAP).map((tabKey, ind) => (
                <div
                  className={`${current - 1 === ind && "roundedmd border-b-4 border-primary px-2 py-1 font-semibold text-primary"} inline-flex cursor-pointer items-center justify-center px-3 py-1.5 text-sm transition-all`}
                  onClick={() => {
                    if (current - 1 < ind) {
                      return toast({
                        description: "Please the current form first please!",
                        variant: "destructive",
                      });
                    }
                    api && api.scrollTo(ind);
                  }}
                  key={tabKey}
                >
                  {RENTAL_VEHICLE_TABS_MAP[tabKey]}
                </div>
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
                  <CustomerIdentityRegisteration
                    goBack={goBack}
                    goToNext={goToNext}
                    type="Lessor"
                  />
                </CarouselItem>
                <CarouselItem>
                  <CustomerIdentityRegisteration
                    goBack={goBack}
                    goToNext={goToNext}
                    type="Renter"
                  />
                </CarouselItem>
                <CarouselItem>
                  <VehicleRegistration goBack={goBack} goToNext={goToNext} />
                </CarouselItem>
                <CarouselItem>
                  <CustomerIdentityRegisteration
                    goBack={goBack}
                    goToNext={goToNext}
                    type="Witness"
                  />
                </CarouselItem>
                <CarouselItem>
                  <ServiceRequest />
                </CarouselItem>
              </CarouselContent>
            </Carousel>
          </Tabs>
        </CustomerIdentitryRegistrationProvider>
      </section>
    </main>
  );
};

export default Page;
