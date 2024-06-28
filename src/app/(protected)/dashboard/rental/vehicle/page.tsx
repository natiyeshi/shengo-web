"use client";
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
import { CustomerFormProvider } from "../../_contexts/customer-form-context";
import { CustomerOperationProvider } from "@/app/(protected)/dashboard/_contexts/customer-operation-provider";
import { CustomerContextProvider } from "@/app/(protected)/dashboard/_contexts/customer-context";
import { VehicleContextProvider } from "../../_contexts/vehicle-context";
import { VehicleOperationProvider } from "../../_contexts/vehicle-operation-context";
import { VehicleFormProvider } from "../../_contexts/vehicle-form-context";
type RentalVehicleTabKeys = keyof typeof RENTAL_VEHICLE_TABS_MAP;

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
      <CustomerContextProvider>
        <VehicleContextProvider>
          <section>
            <section defaultValue={defaultTabValue}>
              <div className="mb-7 rounded-md bg-muted py-1">
                {Object.keys(RENTAL_VEHICLE_TABS_MAP).map((tabKey, ind) => (
                  <div
                    className={`${current - 1 === ind && "rounded-sm border-b-4 border-primary px-2 py-1 font-semibold text-primary"} inline-flex cursor-pointer items-center justify-center px-3 py-1.5 text-sm transition-all`}
                    onClick={() => {
                      if (current - 1 < ind) {
                        return toast({
                          title: "Warning",
                          description: "Please fill the current form first!",
                          variant: "destructive",
                        });
                      }
                      api && api.scrollTo(ind);
                    }}
                    key={tabKey}
                  >
                    {RENTAL_VEHICLE_TABS_MAP[tabKey as RentalVehicleTabKeys]}
                  </div>
                ))}
              </div>

              <Carousel
                setApi={setApi}
                opts={{
                  watchDrag: false,
                  align: "start",
                }}
                className="w-full"
              >
                <CarouselContent>
                  <CarouselItem>
                    <CustomerFormProvider>
                      <CustomerOperationProvider
                        type={RENTAL_VEHICLE_TABS_MAP.lessor}
                        carouselAction={{ goBack, goToNext }}
                      >
                        <CustomerIdentityRegisteration />
                      </CustomerOperationProvider>
                    </CustomerFormProvider>
                  </CarouselItem>
                  <CarouselItem>
                    <CustomerFormProvider>
                      <CustomerOperationProvider
                        type={RENTAL_VEHICLE_TABS_MAP.renter}
                        carouselAction={{ goBack, goToNext }}
                      >
                        <CustomerIdentityRegisteration />
                      </CustomerOperationProvider>
                    </CustomerFormProvider>
                  </CarouselItem>
                  <CarouselItem>
                    <VehicleFormProvider>
                      <VehicleOperationProvider
                        carouselAction={{ goBack, goToNext }}
                      >
                        <VehicleRegistration />
                      </VehicleOperationProvider>
                    </VehicleFormProvider>
                  </CarouselItem>
                  <CarouselItem>
                    <CustomerFormProvider>
                      <CustomerOperationProvider
                        type={RENTAL_VEHICLE_TABS_MAP.withness}
                        carouselAction={{ goBack, goToNext }}
                      >
                        <CustomerIdentityRegisteration />
                      </CustomerOperationProvider>
                    </CustomerFormProvider>
                  </CarouselItem>
                  <CarouselItem>
                    <ServiceRequest />
                  </CarouselItem>
                </CarouselContent>
              </Carousel>
            </section>
          </section>
        </VehicleContextProvider>
      </CustomerContextProvider>
    </main>
  );
};

export default Page;
