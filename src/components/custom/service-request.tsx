"use client";
import React, { useRef, useState } from "react";
import { Download } from "lucide-react";
import { Group, Select, Stack } from "@mantine/core";
import dynamic from "next/dynamic";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import DocumentDdf from "./document-pdf";
import { Button } from "../ui/button";
import { ServiceType } from "@/app/(protected)/dashboard/_utils/constants";
import { useServiceData } from "@/app/(protected)/dashboard/_hooks/use-serviceData";

const ServiceMap = dynamic(() => import("./map/service-map"), { ssr: false });

const ServiceProviders = [
  {
    label: "Megenagna",
    value: "megenagna",
    position: {
      lat: 9.0205,
      lng: 38.8024,
    },
    popUpMessage: "Megenagna",
  },
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
];

type Props = {
  serviceType: ServiceType;
};

const ServiceRequest = ({ serviceType }: Props) => {
  const [serviceProvier, setServiceProvider] = useState(ServiceProviders[0]);
  const [open, setOpen] = useState(false);
  const reportTemplateRef = useRef<HTMLDivElement>(null);
  const data = useServiceData(serviceType);

  const handleSubmit = () => {
    console.log("ServiceRequest: ", { serviceType, data });
  };

  const handleGeneratePdf = async () => {
    const input = reportTemplateRef.current;
    if (!input) return;

    try {
      const canvas = await html2canvas(input, {
        scale: 2,
        useCORS: true,
        logging: true,
        width: input.scrollWidth,
        height: input.scrollHeight,
        windowWidth: input.scrollWidth,
        windowHeight: input.scrollHeight,
      });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: [canvas.width, canvas.height],
      });
      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
      pdf.save("document.pdf");
    } catch (err) {
      console.log(err);
      alert("Something goes wrong!!");
    }
  };
  return (
    <Stack>
      <Group justify="space-between">
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

        <Group>
          <Button size="icon" variant="secondary" onClick={() => setOpen(true)}>
            <Download />
            <span className="sr-only">Download Service </span>
          </Button>

          <Button onClick={handleSubmit}>Submit</Button>
        </Group>
      </Group>

      <ServiceMap
        position={serviceProvier.position}
        popUpMessage={serviceProvier.popUpMessage}
      />

      <DocumentDdf
        download={handleGeneratePdf}
        reportTemplateRef={reportTemplateRef}
        setOpen={setOpen}
        open={open}
      />
    </Stack>
  );
};

export default ServiceRequest;
