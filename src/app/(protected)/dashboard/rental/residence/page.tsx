"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Title } from "@mantine/core";
import { RENTAL_RESIDENCE_TABS_MAP } from "../_utils/constants";
import { CustomerContextProvider } from "../../_contexts/customer/customer-context";
import { ResidenceContextProvider } from "../../_contexts/residence/residence-context";
import { CustomerFormProvider } from "../../_contexts/customer/customer-form-context";
import { CustomerOperationProvider } from "../../_contexts/customer/customer-operation-provider";
import CustomerIdentityRegisteration from "@/components/custom/customer-identity-registration";
import { ResidenceFormProvider } from "../../_contexts/residence/residence-form-context";
import { ResidenceOperationProvider } from "../../_contexts/residence/residence-operation-context";
import ResidenceRegistration from "@/components/custom/residence-registration";
import ServiceRequest from "@/components/custom/service-request";
import Tabs from "@/components/custom/tabs";
import { useCarouselAPI } from "@/hooks/use-carouselAPI";
import { useEffect } from "react";

const Page = () => {
  const { defaultTabValue, current, api, setAPI, goBack, goToNext } =
    useCarouselAPI({
      tabsMap: RENTAL_RESIDENCE_TABS_MAP,
    });

  return (
    <main className="container">
      <CustomerContextProvider>
        <ResidenceContextProvider>
          
            <Tabs
              carouselApi={api}
              current={current}
              tabsMap={RENTAL_RESIDENCE_TABS_MAP}
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
                      type={RENTAL_RESIDENCE_TABS_MAP.saler}
                      carouselAction={{ goBack, goToNext }}
                    >
                      <CustomerIdentityRegisteration />
                    </CustomerOperationProvider>
                  </CustomerFormProvider>
                </CarouselItem>

                <CarouselItem>
                  <CustomerFormProvider>
                    <CustomerOperationProvider
                      type={RENTAL_RESIDENCE_TABS_MAP.buyer}
                      carouselAction={{ goBack, goToNext }}
                    >
                      <CustomerIdentityRegisteration />
                    </CustomerOperationProvider>
                  </CustomerFormProvider>
                </CarouselItem>
                <CarouselItem>
                  <ResidenceFormProvider>
                    <ResidenceOperationProvider
                      carouselAction={{ goBack, goToNext }}
                    >
                      <ResidenceRegistration />
                    </ResidenceOperationProvider>
                  </ResidenceFormProvider>
                </CarouselItem>
                <CarouselItem>
                  <CustomerFormProvider>
                    <CustomerOperationProvider
                      type={RENTAL_RESIDENCE_TABS_MAP.withness}
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
         
        </ResidenceContextProvider>
      </CustomerContextProvider>
    </main>
  );
};

export default Page;
