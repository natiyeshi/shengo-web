import H1 from "@/components/custom/h1";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import { SALES_TABS_MAP } from "../_utils/constants";
import CustomerIdentityRegisteration from "../_components/customer-identity-registration";
import VehicleRegistration from "../_components/vehicle-registration";
import ServiceRequest from "../_components/service-request";
import { Title } from "@mantine/core";

const Page = () => {
  const defaultTabValue = Object.keys(SALES_TABS_MAP)[0];
  return (
    <main className="container">
      <Title order={1} className="my-5">
        Vehicle Sales
      </Title>
      <section className="">
        <Tabs defaultValue={defaultTabValue}>
          <TabsList className="mb-7 p-0">
            {Object.keys(SALES_TABS_MAP).map((tabKey) => (
              <TabsTrigger
                className="rounded-none px-6 py-3"
                key={tabKey}
                value={tabKey}
              >
                {SALES_TABS_MAP[tabKey]}
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.keys(SALES_TABS_MAP).map((tabKey) => (
            <TabsContent key={tabKey} value={tabKey}>
              {SALES_TABS_MAP[tabKey] === SALES_TABS_MAP.saler && (
                <CustomerIdentityRegisteration type="Saler" />
              )}
              {SALES_TABS_MAP[tabKey] === SALES_TABS_MAP.buyer && (
                <CustomerIdentityRegisteration type="Buyer" />
              )}
              {SALES_TABS_MAP[tabKey] === SALES_TABS_MAP.vehicle && (
                <VehicleRegistration />
              )}
              {SALES_TABS_MAP[tabKey] === SALES_TABS_MAP.withness && (
                <CustomerIdentityRegisteration type="Witness" />
              )}
              {SALES_TABS_MAP[tabKey] === SALES_TABS_MAP.service && (
                <ServiceRequest />
              )}
            </TabsContent>
          ))}
        </Tabs>
      </section>
    </main>
  );
};

export default Page;
