"use client";
import React, { useRef, useState } from "react";

import { Group, Select, Stack, Title } from "@mantine/core";
import dynamic from "next/dynamic";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import DocumentDdf from "./document-pdf";
import { Button } from "../ui/button";
import {
  ServiceProviders,
  ServiceType,
} from "@/app/(protected)/dashboard/_utils/constants";

import { toast } from "../ui/use-toast";
import { useServices } from "@/app/(protected)/dashboard/_services/useServices";

const ServiceMap = dynamic(() => import("./map/service-map"), { ssr: false });

type Props = {
  serviceType: ServiceType;
};

const ServiceRequest = ({ serviceType }: Props) => {
  const [serviceProvier, setServiceProvider] = useState(ServiceProviders[0]);
  const [open, setOpen] = useState(false);
  const reportTemplateRef = useRef<HTMLDivElement>(null);
  const { isSubmitting, requestService } = useServices(serviceType);

  const handleSubmit = () => {
    console.log({ serviceType });
    requestService();
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
          allowDeselect={false}
        />

        <Group>
          <Button variant="outline" onClick={() => setOpen(true)}>
            {/* <Download /> */}
            Download File
          </Button>
        </Group>
      </Group>

      <section className="grid grid-cols-1 items-start gap-8 md:grid-cols-[4fr_3fr]">
        <ServiceMap
          position={serviceProvier.position}
          popUpMessage={serviceProvier.popUpMessage}
        />
        <OfficeAddress
          description="Information about the selected office location."
          address={serviceProvier.label}
          phoneNumber={"0912121213"}
          officeStartHour={1}
          officeEndHour={12}
          handleSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      </section>

      <DocumentDdf
        download={handleGeneratePdf}
        reportTemplateRef={reportTemplateRef}
        setOpen={setOpen}
        open={open}
      />
    </Stack>
  );
};
type OfficeAddressProps = {
  description: string;
  address: string;
  phoneNumber: string;
  officeStartHour: number;
  officeEndHour: number;
  handleSubmit: () => void;
  isSubmitting: boolean;
};
const OfficeAddress = ({
  description,
  address,
  phoneNumber,
  officeStartHour,
  officeEndHour,
  handleSubmit,
  isSubmitting,
}: OfficeAddressProps) => {
  return (
    <Stack gap="lg">
      <Stack gap={3}>
        <Title className="font-medium">Office Detail</Title>
        <p className="font-light leading-relaxed text-zinc-600">
          {description}
        </p>
      </Stack>

      <OfficeAddressContent
        title="Address"
        detail={`123 Main St, ${address}`}
      />
      <OfficeAddressContent title="Phone" detail={phoneNumber} />
      <OfficeAddressContent title="Hours" detail={`Mon-Fri: 8am - 5pm`} />
      <Button onClick={handleSubmit} disabled={isSubmitting}>
        Request Service
      </Button>
    </Stack>
  );
};

type OfficeAddressContentProps = {
  title: string;
  detail: string;
};

const OfficeAddressContent = ({ title, detail }: OfficeAddressContentProps) => {
  return (
    <Stack gap={3}>
      <Title className="font-medium" order={3}>
        {title}
      </Title>
      <p className="font-light leading-relaxed text-zinc-600">{detail}</p>
    </Stack>
  );
};
export default ServiceRequest;
