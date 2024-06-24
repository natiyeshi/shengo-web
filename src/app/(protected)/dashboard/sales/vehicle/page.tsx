import { Title } from "@mantine/core";

import VehicleTabs from "./_components/vehicle-tabs";

const Page = () => {
  return (
    <main className="container">
      <Title order={1} className="my-5">
        Vehicle Sales
      </Title>
      <VehicleTabs />
    </main>
  );
};

export default Page;
