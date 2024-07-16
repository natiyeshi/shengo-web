import React, { useRef, useState } from "react";
import { Download } from "lucide-react";
import { Select, Stack } from "@mantine/core";

import ButtonWithIcon from "./button-with-icon";
import dynamic from "next/dynamic";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import DocumentDdf from "./document-pdf";

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
  const [open, setOpen] = useState(false);
  const reportTemplateRef = useRef<HTMLDivElement>(null);

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
        orientation: "landscape",
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

      <DocumentDdf
        download={handleGeneratePdf}
        reportTemplateRef={reportTemplateRef}
        setOpen={setOpen}
        open={open}
      />
      <div className="mt-4 flex items-center gap-5 self-end">
        <ButtonWithIcon onClick={() => setOpen(true)}>
          <Download />
          <span>Download Service </span>
        </ButtonWithIcon>
      </div>
    </Stack>
  );
};

export default ServiceRequest;
