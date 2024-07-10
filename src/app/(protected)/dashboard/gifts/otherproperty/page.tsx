"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Title } from "@mantine/core";
import { GIFTS_PROPERTY_TABS_MAP } from "../_utils/constants";
import { CustomerContextProvider } from "../../_contexts/customer/customer-context";
import { PropertyContextProvider } from "../../_contexts/property/property-context";
import { CustomerFormProvider } from "../../_contexts/customer/customer-form-context";
import { CustomerOperationProvider } from "../../_contexts/customer/customer-operation-provider";
import CustomerIdentityRegisteration from "@/components/custom/customer-identity-registration";
import { PropertyFormProvider } from "../../_contexts/property/property-form-context";
import { PropertyOperationProvider } from "../../_contexts/property/property-operation-context";
import PropertyRegistration from "@/components/custom/property-registration";
import ServiceRequest from "@/components/custom/service-request";
import Tabs from "@/components/custom/tabs";
import { useCarouselAPI } from "@/hooks/use-carouselAPI";

const Page = () => {
  const { defaultTabValue, current, api, setAPI, goBack, goToNext } =
    useCarouselAPI({
      tabsMap: GIFTS_PROPERTY_TABS_MAP,
    });

  return (
    <main className="container">
      <CustomerContextProvider>
        <PropertyContextProvider>
          <Tabs
            carouselApi={api}
            current={current}
            tabsMap={GIFTS_PROPERTY_TABS_MAP}
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
                    type={GIFTS_PROPERTY_TABS_MAP.saler}
                    carouselAction={{ goBack, goToNext }}
                  >
                    <CustomerIdentityRegisteration />
                  </CustomerOperationProvider>
                </CustomerFormProvider>
              </CarouselItem>
              <CarouselItem>
                <CustomerFormProvider>
                  <CustomerOperationProvider
                    type={GIFTS_PROPERTY_TABS_MAP.buyer}
                    carouselAction={{ goBack, goToNext }}
                  >
                    <CustomerIdentityRegisteration />
                  </CustomerOperationProvider>
                </CustomerFormProvider>
              </CarouselItem>
              <CarouselItem>
                <PropertyFormProvider>
                  <PropertyOperationProvider
                    carouselAction={{ goBack, goToNext }}
                  >
                    <PropertyRegistration />
                  </PropertyOperationProvider>
                </PropertyFormProvider>
              </CarouselItem>
              <CarouselItem>
                <CustomerFormProvider>
                  <CustomerOperationProvider
                    type={GIFTS_PROPERTY_TABS_MAP.withness}
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
        </PropertyContextProvider>
      </CustomerContextProvider>
    </main>
  );
};

export default Page;
