"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SALES_TABS_MAP } from "../../_utils/constants";
import RegistrationFormProvider from "../../_contexts/registration-form-provider";
import {
  individualSalerDefaultValues,
  individualSalerSchema,
  IndividualSalerSchemaType,
  vehicleDefaultValues,
  vehicleSchema,
  VehicleSchemaType,
} from "../_types/schema";
import CustomerIdentityRegisteration from "../../_components/customer-identity-registration";
import VehicleRegistration from "../../_components/vehicle-registration";
import ServiceRequest from "../../_components/service-request";

const VehicleTabs = () => {
  const defaultTabValue = Object.keys(SALES_TABS_MAP)[0];
  return (
    <section>
      <section className="">
        <Tabs defaultValue={defaultTabValue}>
          <TabsList className="mb-7 justify-start rounded-md py-1 max-sm:flex max-sm:h-auto max-sm:max-w-fit max-sm:flex-wrap">
            {Object.keys(SALES_TABS_MAP).map((tabKey) => (
              <TabsTrigger className="rounded-none" key={tabKey} value={tabKey}>
                {SALES_TABS_MAP[tabKey]}
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.keys(SALES_TABS_MAP).map((tabKey) => (
            <TabsContent key={tabKey} value={tabKey}>
              <RegistrationFormProvider<IndividualSalerSchemaType>
                defaultValues={individualSalerDefaultValues}
                resolver={individualSalerSchema}
              >
                <RegistrationFormProvider<VehicleSchemaType>
                  defaultValues={vehicleDefaultValues}
                  resolver={vehicleSchema}
                >
                  {SALES_TABS_MAP[tabKey] === SALES_TABS_MAP.saler && (
                    <CustomerIdentityRegisteration type="Saler" />
                  )}
                  {SALES_TABS_MAP[tabKey] === SALES_TABS_MAP.buyer && (
                    <CustomerIdentityRegisteration type="Buyer" />
                  )}
                  {SALES_TABS_MAP[tabKey] === SALES_TABS_MAP.withness && (
                    <CustomerIdentityRegisteration type="Witness" />
                  )}

                  {SALES_TABS_MAP[tabKey] === SALES_TABS_MAP.vehicle && (
                    <VehicleRegistration type="Vehicle" />
                  )}
                  {SALES_TABS_MAP[tabKey] === SALES_TABS_MAP.service && (
                    <ServiceRequest />
                  )}
                </RegistrationFormProvider>
              </RegistrationFormProvider>
            </TabsContent>
          ))}
        </Tabs>
      </section>
    </section>
  );
};

export default VehicleTabs;
