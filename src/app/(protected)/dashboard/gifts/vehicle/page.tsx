import H1 from "@/components/custom/h1";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import { GIFT_VEHICLE_TABS_MAP } from "../_utils/constants";
import CustomerIdentityRegisteration from "../_components/customer-identity-registration";
import VehicleRegistration from "../_components/vehicle-registration";
import ServiceRequest from "../_components/service-request";
import { Title } from "@mantine/core";

const Page = () => {
  const defaultTabValue = Object.keys(GIFT_VEHICLE_TABS_MAP)[0];
  return (
    <main className="container">
      <Title order={1} className="my-5">
        Vehicle Gift
      </Title>
      <section className="">
        <Tabs defaultValue={defaultTabValue}>
          <TabsList className="mb-7 rounded-md py-1">
            {Object.keys(GIFT_VEHICLE_TABS_MAP).map((tabKey) => (
              <TabsTrigger className="rounded-md" key={tabKey} value={tabKey}>
                {GIFT_VEHICLE_TABS_MAP[tabKey]}
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.keys(GIFT_VEHICLE_TABS_MAP).map((tabKey) => (
            <TabsContent key={tabKey} value={tabKey}>
              {GIFT_VEHICLE_TABS_MAP[tabKey] === GIFT_VEHICLE_TABS_MAP.giver && (
                <CustomerIdentityRegisteration type="Giver" />
              )}
              {GIFT_VEHICLE_TABS_MAP[tabKey] === GIFT_VEHICLE_TABS_MAP.receiver && (
                <CustomerIdentityRegisteration type="Receiver" />
              )}
              {GIFT_VEHICLE_TABS_MAP[tabKey] === GIFT_VEHICLE_TABS_MAP.vehicle && (
                <VehicleRegistration />
              )}
              {GIFT_VEHICLE_TABS_MAP[tabKey] === GIFT_VEHICLE_TABS_MAP.withness && (
                <CustomerIdentityRegisteration type="Witness" />
              )}
              {GIFT_VEHICLE_TABS_MAP[tabKey] === GIFT_VEHICLE_TABS_MAP.service && (
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
