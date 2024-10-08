"use client";
import React, { useEffect } from "react";
import { RENTAL_VEHICLE_TABS_MAP } from "../_utils/constants";
import CustomerIdentityRegisteration from "@/components/custom/customer-identity-registration";
import VehicleRegistration from "@/components/custom/vehicle-registration";

import { Title } from "@mantine/core";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { CustomerFormProvider } from "../../_contexts/customer/customer-form-context";
import { CustomerOperationProvider } from "@/app/(protected)/dashboard/_contexts/customer/customer-operation-provider";
import { CustomerContextProvider } from "@/app/(protected)/dashboard/_contexts/customer/customer-context";
import { VehicleContextProvider } from "../../_contexts/vehicle/vehicle-context";
import { VehicleOperationProvider } from "../../_contexts/vehicle/vehicle-operation-context";
import { VehicleFormProvider } from "../../_contexts/vehicle/vehicle-form-context";
import ServiceRequest from "@/components/custom/service-request";
import Tabs from "@/components/custom/tabs";
import { useCarouselAPI } from "@/hooks/use-carouselAPI";
import { ServiceType } from "../../_utils/constants";

const Page = () => {
  const { defaultTabValue, current, api, setAPI, goBack, goToNext } =
    useCarouselAPI({
      tabsMap: RENTAL_VEHICLE_TABS_MAP,
    });

  return (
    <main className="no-scrollbar container">
      <CustomerContextProvider>
        <VehicleContextProvider>
          <Tabs
            carouselApi={api}
            current={current}
            tabsMap={RENTAL_VEHICLE_TABS_MAP}
          />

          <Carousel
            setApi={setAPI}
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
                    type={RENTAL_VEHICLE_TABS_MAP.saler}
                    carouselAction={{ goBack, goToNext }}
                  >
                    <CustomerIdentityRegisteration />
                  </CustomerOperationProvider>
                </CustomerFormProvider>
              </CarouselItem>
              <CarouselItem>
                <CustomerFormProvider>
                  <CustomerOperationProvider
                    type={RENTAL_VEHICLE_TABS_MAP.buyer}
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
                <ServiceRequest serviceType={ServiceType.RENTAL_VEHICLE} />
              </CarouselItem>
            </CarouselContent>
          </Carousel>
        </VehicleContextProvider>
      </CustomerContextProvider>
    </main>
  );
};

export default Page;
