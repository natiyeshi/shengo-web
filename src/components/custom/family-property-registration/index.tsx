"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Title } from "@mantine/core";
// import { FAMILIY_PROPERTY_TABS_MAP } from "../_utils/constants";
// import CustomerIdentityRegisteration from "@/components/custom/customer-identity-registration";
import LeaseRegistration from "@/components/custom/lease-registration";
import ServiceRequest from "@/components/custom/service-request";
import Tabs from "@/components/custom/tabs";
import { useCarouselAPI } from "@/hooks/use-carouselAPI";
import { VehicleFormProvider } from "@/app/(protected)/dashboard/_contexts/vehicle/vehicle-form-context";
import { VehicleOperationProvider } from "@/app/(protected)/dashboard/_contexts/vehicle/vehicle-operation-context";
import VehicleRegistration from "../vehicle-registration";
import { VehicleContextProvider } from "@/app/(protected)/dashboard/_contexts/vehicle/vehicle-context";
import { ResidenceContextProvider } from "@/app/(protected)/dashboard/_contexts/residence/residence-context";
import { ResidenceFormProvider } from "@/app/(protected)/dashboard/_contexts/residence/residence-form-context";
import { ResidenceOperationProvider } from "@/app/(protected)/dashboard/_contexts/residence/residence-operation-context";
import ResidenceRegistration from "../residence-registration";
import { PropertyContextProvider } from "@/app/(protected)/dashboard/_contexts/property/property-context";
import { PropertyFormProvider } from "@/app/(protected)/dashboard/_contexts/property/property-form-context";
import { PropertyOperationProvider } from "@/app/(protected)/dashboard/_contexts/property/property-operation-context";
import PropertyRegistration from "../property-registration";

const FamilyProperty = () => {
  const FAMILIY_PROPERTY_TABS_MAP = {
    Vehicle: "Vehicle",
    Residence: "Residence",
    OtherProperty: "OtherProperty",
  };
  const { defaultTabValue, current, api, setAPI, goBack, goToNext } =
    useCarouselAPI({
      tabsMap: FAMILIY_PROPERTY_TABS_MAP,
    });

  return (
    <VehicleContextProvider>
      <ResidenceContextProvider>
        <PropertyContextProvider>
          <main className="">
            <section className="mt-2">
              <section defaultValue={defaultTabValue}>
                <div className="mx-5 bg-red-300" style={{paddingLeft : "14px"}}>
                  <Tabs
                    carouselApi={api}
                    current={current}
                    tabsMap={FAMILIY_PROPERTY_TABS_MAP}
                  />
                </div>

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
                      <VehicleFormProvider>
                        <VehicleOperationProvider
                          carouselAction={{ goBack, goToNext }}
                        >
                          <VehicleRegistration />
                        </VehicleOperationProvider>
                      </VehicleFormProvider>
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
                      <PropertyFormProvider>
                        <PropertyOperationProvider
                          carouselAction={{ goBack, goToNext }}
                        >
                          <PropertyRegistration />
                        </PropertyOperationProvider>
                      </PropertyFormProvider>
                    </CarouselItem>
                  </CarouselContent>
                </Carousel>
              </section>
            </section>
          </main>
        </PropertyContextProvider>
      </ResidenceContextProvider>
    </VehicleContextProvider>
  );
};

export default FamilyProperty;
