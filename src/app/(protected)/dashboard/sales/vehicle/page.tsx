import H1 from "@/components/custom/h1";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import { SALES_TABS_MAP } from "../_utils/constants";
import CustomerIdentityRegisteration from "../_components/customer-identity-registration";
import VehicleRegistration from "../_components/vehicle-registration";

// localhost:3000/dashboard/sales/vehicle
const Page = () => {
  const defaultTabValue = Object.keys(SALES_TABS_MAP)[0];
  return (
    <main className="container">
      <H1 className="my-5">Vehicle Sales</H1>
      <section className="">
        <Tabs defaultValue={defaultTabValue}>
          <TabsList className="mb-3">
            {Object.keys(SALES_TABS_MAP).map((tabKey) => (
              <TabsTrigger className="px-4" key={tabKey} value={tabKey}>
                {SALES_TABS_MAP[tabKey]}
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.keys(SALES_TABS_MAP).map((tabKey) => (
            <TabsContent key={tabKey} value={tabKey}>
              {SALES_TABS_MAP[tabKey] === SALES_TABS_MAP.saler && (
                <CustomerIdentityRegisteration />
              )}
              {SALES_TABS_MAP[tabKey] === SALES_TABS_MAP.buyer && (
                <CustomerIdentityRegisteration />
              )}
              {SALES_TABS_MAP[tabKey] === SALES_TABS_MAP.vehicle && (
                <VehicleRegistration />
              )}
            </TabsContent>
          ))}
        </Tabs>
      </section>
    </main>
  );
};

export default Page;
