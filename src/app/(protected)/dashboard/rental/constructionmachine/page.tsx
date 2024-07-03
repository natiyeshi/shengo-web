"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Title } from "@mantine/core";
import { RENTAL_CONSTRUCTIONMACHINE_TABS_MAP } from "../_utils/constants";
import { CustomerContextProvider } from "../../_contexts/customer/customer-context";
import { ConstructionmachineContextProvider } from "../../_contexts/constructionmachine/constructionmachine-context";
import { CustomerFormProvider } from "../../_contexts/customer/customer-form-context";
import { CustomerOperationProvider } from "../../_contexts/customer/customer-operation-provider";
import CustomerIdentityRegisteration from "@/components/custom/customer-identity-registration";
import { ConstructionmachineFormProvider } from "../../_contexts/constructionmachine/constructionmachine-form-context";
import { ConstructionmachineOperationProvider } from "../../_contexts/constructionmachine/constructionmachine-operation-context";
import ConstructionmachineRegistration from "@/components/custom/construction-machine-registration";
import ServiceRequest from "@/components/custom/service-request";
import Tabs from "@/components/custom/tabs";
import { useCarouselAPI } from "@/hooks/use-carouselAPI";

const Page = () => {
  const { defaultTabValue, current, api, setAPI, goBack, goToNext } =
    useCarouselAPI({
      tabsMap: RENTAL_CONSTRUCTIONMACHINE_TABS_MAP,
    });

  return (
    <main className="container">
      {/* <Title order={1} className="my-5">
        Construction Machine 
      </Title> */}
      <CustomerContextProvider>
        <ConstructionmachineContextProvider>
          <section className="mt-5">
            <section defaultValue={defaultTabValue}>
              <Tabs
                carouselApi={api}
                current={current}
                tabsMap={RENTAL_CONSTRUCTIONMACHINE_TABS_MAP}
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
                        type={RENTAL_CONSTRUCTIONMACHINE_TABS_MAP.saler}
                        carouselAction={{ goBack, goToNext }}
                      >
                        <CustomerIdentityRegisteration />
                      </CustomerOperationProvider>
                    </CustomerFormProvider>
                  </CarouselItem>
                  <CarouselItem>
                    <CustomerFormProvider>
                      <CustomerOperationProvider
                        type={RENTAL_CONSTRUCTIONMACHINE_TABS_MAP.buyer}
                        carouselAction={{ goBack, goToNext }}
                      >
                        <CustomerIdentityRegisteration />
                      </CustomerOperationProvider>
                    </CustomerFormProvider>
                  </CarouselItem>
                  <CarouselItem>
                    <ConstructionmachineFormProvider>
                      <ConstructionmachineOperationProvider
                        carouselAction={{ goBack, goToNext }}
                      >
                        <ConstructionmachineRegistration />
                      </ConstructionmachineOperationProvider>
                    </ConstructionmachineFormProvider>
                  </CarouselItem>
                  <CarouselItem>
                    <CustomerFormProvider>
                      <CustomerOperationProvider
                        type={RENTAL_CONSTRUCTIONMACHINE_TABS_MAP.withness}
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
        </ConstructionmachineContextProvider>
      </CustomerContextProvider>
    </main>
  );
};

export default Page;
