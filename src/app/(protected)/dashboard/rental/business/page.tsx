import H1 from "@/components/custom/h1";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import {  RENTAL_BUSINESS_TABS_MAP } from "../_utils/constants";
import CustomerIdentityRegisteration from "../_components/customer-identity-registration";
import VehicleRegistration from "../_components/vehicle-registration";
import ServiceRequest from "../_components/service-request";
import { Title } from "@mantine/core";

const Page = () => {
  const defaultTabValue = Object.keys( RENTAL_BUSINESS_TABS_MAP)[0];
  return (
    <main className="container">
      <Title order={1} className="my-5">
        Rental Gift
      </Title>
      <section className="">
        <Tabs defaultValue={defaultTabValue}>
          <TabsList className="mb-7 rounded-md py-1">
            {Object.keys( RENTAL_BUSINESS_TABS_MAP).map((tabKey) => (
              <TabsTrigger className="rounded-md" key={tabKey} value={tabKey}>
                { RENTAL_BUSINESS_TABS_MAP[tabKey]}
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.keys( RENTAL_BUSINESS_TABS_MAP).map((tabKey) => (
            <TabsContent key={tabKey} value={tabKey}>
              { RENTAL_BUSINESS_TABS_MAP[tabKey] ===
                 RENTAL_BUSINESS_TABS_MAP.lessor && (
                <CustomerIdentityRegisteration type="Lessor" />
              )}
              { RENTAL_BUSINESS_TABS_MAP[tabKey] ===
                 RENTAL_BUSINESS_TABS_MAP.renter && (
                <CustomerIdentityRegisteration type="Renter" />
              )}
              { RENTAL_BUSINESS_TABS_MAP[tabKey] ===
                 RENTAL_BUSINESS_TABS_MAP.business && <VehicleRegistration />}
              { RENTAL_BUSINESS_TABS_MAP[tabKey] ===
                 RENTAL_BUSINESS_TABS_MAP.withness && (
                <CustomerIdentityRegisteration type="Witness" />
              )}
              { RENTAL_BUSINESS_TABS_MAP[tabKey] ===
                 RENTAL_BUSINESS_TABS_MAP.service && <ServiceRequest />}
            </TabsContent>
          ))}
        </Tabs>
      </section>
    </main>
  );
};

export default Page;
