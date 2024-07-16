import React, { useState } from "react";
import { Download } from "lucide-react";
import { Select, Stack } from "@mantine/core";

import ButtonWithIcon from "./button-with-icon";
import dynamic from "next/dynamic";

const ServiceMap = dynamic(() => import("./map/service-map"), { ssr: false });

const ServiceProviders = [
  {
    label: "Bethel",
    value: "bethel",
    position: {
      lat: 8.9189,
      lng: 38.4792,
    },
    popUpMessage: "Bethel",
  },
  {
    label: "Kilinto",
    value: "kilinto",
    position: {
      lat: 8.9038,
      lng: 38.816,
    },
    popUpMessage: "Kilinto",
  },
  {
    label: "Megenagna",
    value: "megenagna",
    position: {
      lat: 9.0205,
      lng: 38.8024,
    },
    popUpMessage: "Megenagna",
  },
];

type Props = {};

const ServiceRequest = (props: Props) => {
  const [serviceProvier, setServiceProvider] = useState(ServiceProviders[0]);
  return (
    <Stack>
      <Select
        label="Select service provider"
        data={ServiceProviders}
        defaultValue={serviceProvier.value}
        onChange={(value: string | null) =>
          setServiceProvider(
            ServiceProviders.find((provider) => provider.value === value)!,
          )
        }
        searchable
        allowDeselect={false}
      />

      <ServiceMap
        position={serviceProvier.position}
        popUpMessage={serviceProvier.popUpMessage}
      />

      <ButtonWithIcon className="mt-4 self-end">
        <Download />
        <span>Download Service </span>
      </ButtonWithIcon>
    </Stack>
  );
};

export default ServiceRequest;
