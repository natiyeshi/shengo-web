"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Title } from "@mantine/core";
import { SALES_LEASE_TABS_MAP } from "../_utils/constants";
import { CustomerContextProvider } from "../../_contexts/customer/customer-context";
import { LeaseContextProvider } from "../../_contexts/lease/lease-context";
import { CustomerFormProvider } from "../../_contexts/customer/customer-form-context";
import { CustomerOperationProvider } from "../../_contexts/customer/customer-operation-provider";
import CustomerIdentityRegisteration from "@/components/custom/customer-identity-registration";
import { LeaseFormProvider } from "../../_contexts/lease/lease-form-context";
import { LeaseOperationProvider } from "../../_contexts/lease/lease-operation-context";
import LeaseRegistration from "@/components/custom/lease-registration";
import ServiceRequest from "@/components/custom/service-request";
import Tabs from "@/components/custom/tabs";
import { useCarouselAPI } from "@/hooks/use-carouselAPI";

const Page = () => {
  const { defaultTabValue, current, api, setAPI, goBack, goToNext } =
    useCarouselAPI({
      tabsMap: SALES_LEASE_TABS_MAP,
    });

  return (
    <main className="container">
      {/* <Title order={1} className="my-5">
        Lease 
      </Title> */}
      <CustomerContextProvider>
        <LeaseContextProvider>
          <section className="mt-5">
            <section defaultValue={defaultTabValue}>
              <Tabs
                carouselApi={api}
                current={current}
                tabsMap={SALES_LEASE_TABS_MAP}
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
                        type={SALES_LEASE_TABS_MAP.saler}
                        carouselAction={{ goBack, goToNext }}
                      >
                        <CustomerIdentityRegisteration />
                      </CustomerOperationProvider>
                    </CustomerFormProvider>
                  </CarouselItem>
                  <CarouselItem>
                    <CustomerFormProvider>
                      <CustomerOperationProvider
                        type={SALES_LEASE_TABS_MAP.buyer}
                        carouselAction={{ goBack, goToNext }}
                      >
                        <CustomerIdentityRegisteration />
                      </CustomerOperationProvider>
                    </CustomerFormProvider>
                  </CarouselItem>
                  <CarouselItem>
                    <LeaseFormProvider>
                      <LeaseOperationProvider
                        carouselAction={{ goBack, goToNext }}
                      >
                        <LeaseRegistration />
                      </LeaseOperationProvider>
                    </LeaseFormProvider>
                  </CarouselItem>
                  <CarouselItem>
                    <CustomerFormProvider>
                      <CustomerOperationProvider
                        type={SALES_LEASE_TABS_MAP.withness}
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
        </LeaseContextProvider>
      </CustomerContextProvider>
    </main>
  );
};

export default Page;
