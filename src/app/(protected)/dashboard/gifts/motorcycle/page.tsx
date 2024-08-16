"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Title } from "@mantine/core";
import { GIFTS_MOTORCYCLE_TABS_MAP } from "../_utils/constants";
import { CustomerContextProvider } from "../../_contexts/customer/customer-context";
import { MotorcycleContextProvider } from "../../_contexts/motorcycle/motorcycle-context";
import { CustomerFormProvider } from "../../_contexts/customer/customer-form-context";
import { CustomerOperationProvider } from "../../_contexts/customer/customer-operation-provider";
import CustomerIdentityRegisteration from "@/components/custom/customer-identity-registration";
import { MotorcycleFormProvider } from "../../_contexts/motorcycle/motorcycle-form-context";
import { MotorcycleOperationProvider } from "../../_contexts/motorcycle/motorcycle-operation-context";
import MotorcycleRegistration from "@/components/custom/motorcycle-registration";
import ServiceRequest from "@/components/custom/service-request";
import Tabs from "@/components/custom/tabs";
import { useCarouselAPI } from "@/hooks/use-carouselAPI";
import { ServiceType } from "../../_utils/constants";

const Page = () => {
  const { defaultTabValue, current, api, setAPI, goBack, goToNext } =
    useCarouselAPI({
      tabsMap: GIFTS_MOTORCYCLE_TABS_MAP,
    });

  return (
    <main className="container no-scrollbar">
      <CustomerContextProvider>
        <MotorcycleContextProvider>
          <Tabs
            carouselApi={api}
            current={current}
            tabsMap={GIFTS_MOTORCYCLE_TABS_MAP}
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
                    type={GIFTS_MOTORCYCLE_TABS_MAP.saler}
                    carouselAction={{ goBack, goToNext }}
                  >
                    <CustomerIdentityRegisteration />
                  </CustomerOperationProvider>
                </CustomerFormProvider>
              </CarouselItem>
              <CarouselItem>
                <CustomerFormProvider>
                  <CustomerOperationProvider
                    type={GIFTS_MOTORCYCLE_TABS_MAP.buyer}
                    carouselAction={{ goBack, goToNext }}
                  >
                    <CustomerIdentityRegisteration />
                  </CustomerOperationProvider>
                </CustomerFormProvider>
              </CarouselItem>
              <CarouselItem>
                <MotorcycleFormProvider>
                  <MotorcycleOperationProvider
                    carouselAction={{ goBack, goToNext }}
                  >
                    <MotorcycleRegistration />
                  </MotorcycleOperationProvider>
                </MotorcycleFormProvider>
              </CarouselItem>
              <CarouselItem>
                <CustomerFormProvider>
                  <CustomerOperationProvider
                    type={GIFTS_MOTORCYCLE_TABS_MAP.withness}
                    carouselAction={{ goBack, goToNext }}
                  >
                    <CustomerIdentityRegisteration />
                  </CustomerOperationProvider>
                </CustomerFormProvider>
              </CarouselItem>
              <CarouselItem>
              <ServiceRequest serviceType={ServiceType.GIFTS_MOTORCYCLE} />
              </CarouselItem>
            </CarouselContent>
          </Carousel>
        </MotorcycleContextProvider>
      </CustomerContextProvider>
    </main>
  );
};

export default Page;
