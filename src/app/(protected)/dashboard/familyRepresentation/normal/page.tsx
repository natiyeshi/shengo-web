"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { FAMILY_REPRESETATION_TABS_MAP } from "../_utils/constants";
import { CustomerContextProvider } from "../../_contexts/customer/customer-context";
import { CustomerFormProvider } from "../../_contexts/customer/customer-form-context";
import { CustomerOperationProvider } from "../../_contexts/customer/customer-operation-provider";
import CustomerIdentityRegisteration from "@/components/custom/customer-identity-registration";
import ServiceRequest from "@/components/custom/service-request";
import Tabs from "@/components/custom/tabs";
import { useCarouselAPI } from "@/hooks/use-carouselAPI";
import FamilyProperty from "@/components/custom/family-property-registration";
import { VehicleContextProvider } from "@/components/custom/family-property-registration/contexts/vehicle/vehicle-context";
import { ResidenceContextProvider } from "@/components/custom/family-property-registration/contexts/residence/residence-context";
import { OrganizationContextProvider } from "@/components/custom/family-property-registration/contexts/organization/organization-context";

const Page = () => {
  const { current, api, setAPI, goBack, goToNext } = useCarouselAPI({
    tabsMap: FAMILY_REPRESETATION_TABS_MAP,
  });

  return (
    <main className="container">
      <CustomerContextProvider>
        <Tabs
          carouselApi={api}
          current={current}
          tabsMap={FAMILY_REPRESETATION_TABS_MAP}
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
                  type={FAMILY_REPRESETATION_TABS_MAP.grantor}
                  carouselAction={{ goBack, goToNext }}
                >
                  <CustomerIdentityRegisteration />
                </CustomerOperationProvider>
              </CustomerFormProvider>
            </CarouselItem>
            <CarouselItem>
              <CustomerFormProvider>
                <CustomerOperationProvider
                  type={FAMILY_REPRESETATION_TABS_MAP.representative}
                  carouselAction={{ goBack, goToNext }}
                >
                  <CustomerIdentityRegisteration />
                </CustomerOperationProvider>
              </CustomerFormProvider>
            </CarouselItem>
            {/* Family Propery content */}
            <CarouselItem>
              <VehicleContextProvider>
                <ResidenceContextProvider>
                  <OrganizationContextProvider>
                    <FamilyProperty carouselAction={{ goBack, goToNext }} />
                  </OrganizationContextProvider>
                </ResidenceContextProvider>
              </VehicleContextProvider>
            </CarouselItem>
            <CarouselItem>
              <CustomerFormProvider>
                <CustomerOperationProvider
                  type={FAMILY_REPRESETATION_TABS_MAP.withness}
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
      </CustomerContextProvider>
    </main>
  );
};

export default Page;
