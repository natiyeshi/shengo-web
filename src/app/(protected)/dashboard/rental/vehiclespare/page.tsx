"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import { RENTAL_VEHICLESPARE_TABS_MAP } from "../_utils/constants";
import { CustomerContextProvider } from "../../_contexts/customer/customer-context";
import { VehiclespareContextProvider } from "../../_contexts/vehiclespare/vehiclespare-context";
import { CustomerFormProvider } from "../../_contexts/customer/customer-form-context";
import { CustomerOperationProvider } from "../../_contexts/customer/customer-operation-provider";
import CustomerIdentityRegisteration from "@/components/custom/customer-identity-registration";
import { VehiclespareFormProvider } from "../../_contexts/vehiclespare/vehiclespare-form-context";
import { VehiclespareOperationProvider } from "../../_contexts/vehiclespare/vehiclespare-operation-context";
import VehiclespareRegistration from "@/components/custom/vehiclespare-registration";
import ServiceRequest from "@/components/custom/service-request";
import Tabs from "@/components/custom/tabs";
import { useCarouselAPI } from "@/hooks/use-carouselAPI";

const Page = () => {
  const { defaultTabValue, current, api, setAPI, goBack, goToNext } =
    useCarouselAPI({
      tabsMap: RENTAL_VEHICLESPARE_TABS_MAP,
    });
  return (
    <main className="container no-scrollbar">
      <CustomerContextProvider>
        <VehiclespareContextProvider>
          <Tabs
            carouselApi={api}
            current={current}
            tabsMap={RENTAL_VEHICLESPARE_TABS_MAP}
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
                    type={RENTAL_VEHICLESPARE_TABS_MAP.saler}
                    carouselAction={{ goBack, goToNext }}
                  >
                    <CustomerIdentityRegisteration />
                  </CustomerOperationProvider>
                </CustomerFormProvider>
              </CarouselItem>

              <CarouselItem>
                <CustomerFormProvider>
                  <CustomerOperationProvider
                    type={RENTAL_VEHICLESPARE_TABS_MAP.buyer}
                    carouselAction={{ goBack, goToNext }}
                  >
                    <CustomerIdentityRegisteration />
                  </CustomerOperationProvider>
                </CustomerFormProvider>
              </CarouselItem>
              <CarouselItem>
                <VehiclespareFormProvider>
                  <VehiclespareOperationProvider
                    carouselAction={{ goBack, goToNext }}
                  >
                    <VehiclespareRegistration />
                  </VehiclespareOperationProvider>
                </VehiclespareFormProvider>
              </CarouselItem>
              <CarouselItem>
                <CustomerFormProvider>
                  <CustomerOperationProvider
                    type={RENTAL_VEHICLESPARE_TABS_MAP.withness}
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
        </VehiclespareContextProvider>
      </CustomerContextProvider>
    </main>
  );
};

export default Page;
