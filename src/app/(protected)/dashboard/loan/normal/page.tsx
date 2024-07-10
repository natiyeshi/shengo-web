"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Title } from "@mantine/core";
import { LOAN_NORMAL_TABS_MAP } from "../_utils/constants";
import { CustomerContextProvider } from "../../_contexts/customer/customer-context";
import { LoanContextProvider } from "../../_contexts/loan/loan-context";
import { CustomerFormProvider } from "../../_contexts/customer/customer-form-context";
import { CustomerOperationProvider } from "../../_contexts/customer/customer-operation-provider";
import CustomerIdentityRegisteration from "@/components/custom/customer-identity-registration";
import { LoanFormProvider } from "../../_contexts/loan/loan-form-context";
import { LoanOperationProvider } from "../../_contexts/loan/loan-operation-context";
import LoanRegistration from "@/components/custom/loan-registration";
import ServiceRequest from "@/components/custom/service-request";
import Tabs from "@/components/custom/tabs";
import { useCarouselAPI } from "@/hooks/use-carouselAPI";

const Page = () => {
  const { defaultTabValue, current, api, setAPI, goBack, goToNext } =
    useCarouselAPI({
      tabsMap: LOAN_NORMAL_TABS_MAP,
    });

  return (
    <main className="container">
      <CustomerContextProvider>
        <LoanContextProvider>
          <Tabs
            carouselApi={api}
            current={current}
            tabsMap={LOAN_NORMAL_TABS_MAP}
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
                    type={LOAN_NORMAL_TABS_MAP.saler}
                    carouselAction={{ goBack, goToNext }}
                  >
                    <CustomerIdentityRegisteration />
                  </CustomerOperationProvider>
                </CustomerFormProvider>
              </CarouselItem>
              <CarouselItem>
                <CustomerFormProvider>
                  <CustomerOperationProvider
                    type={LOAN_NORMAL_TABS_MAP.buyer}
                    carouselAction={{ goBack, goToNext }}
                  >
                    <CustomerIdentityRegisteration />
                  </CustomerOperationProvider>
                </CustomerFormProvider>
              </CarouselItem>
              <CarouselItem>
                <LoanFormProvider>
                  <LoanOperationProvider carouselAction={{ goBack, goToNext }}>
                    <LoanRegistration />
                  </LoanOperationProvider>
                </LoanFormProvider>
              </CarouselItem>
              <CarouselItem>
                <CustomerFormProvider>
                  <CustomerOperationProvider
                    type={LOAN_NORMAL_TABS_MAP.withness}
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
        </LoanContextProvider>
      </CustomerContextProvider>
    </main>
  );
};

export default Page;
