"use client";
import React, { useRef, useState } from "react";
import { Download } from "lucide-react";
import { Group, Select, Stack } from "@mantine/core";
import dynamic from "next/dynamic";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import DocumentDdf from "./document-pdf";
import { Button } from "../ui/button";
import {
  ServiceProviders,
  ServiceType,
} from "@/app/(protected)/dashboard/_utils/constants";
import { useServiceData } from "@/app/(protected)/dashboard/_hooks/use-serviceData";
import { saleVehicle } from "@/app/(protected)/dashboard/sales/vehicle/service";
import { toCustomerDb, toVehicleDb } from "@/_utils/dto";
import {  Privilege } from "@prisma/client";
import { toast } from "../ui/use-toast";

import { useAsyncWrapper } from "@/app/(protected)/dashboard/_hooks/use-async-wrapper";

const ServiceMap = dynamic(() => import("./map/service-map"), { ssr: false });

type Props = {
  serviceType: ServiceType;
};

const defaultServiceDeliveringOffice = {
  name: "Doro Bet",
  phoneNumber: "09777777",
  description: "Service delivering office description",
  latitude: 12,
  longitude: 12,
};

const defaultUser = {
  name: "John Doe",
  password: "password",
  privilege: "USER" as Privilege,
};

const showNotification = (message: string, title = "Failed") => {
  return toast({
    title,
    description: message || "Operation completed successfully",
    duration: 3000,
  });
};

const ServiceRequest = ({ serviceType }: Props) => {
  const [serviceProvier, setServiceProvider] = useState(ServiceProviders[0]);
  const [open, setOpen] = useState(false);
  const reportTemplateRef = useRef<HTMLDivElement>(null);
  const data = useServiceData(serviceType);
  const { status, asyncWrapper } = useAsyncWrapper();

  const handleSubmit = async () => {
    switch (serviceType) {
      case ServiceType.SALES_VEHICLE:
        if (!data?.customers)
          return showNotification("Please fill customers information!");
        if (!data?.vehicles)
          return showNotification("Please fill vehicle information!");

        return await saleVehicle({
          customers: data.customers.map((customer) =>
            toCustomerDb(customer, "Saler"),
          ),
          vehicle: data.vehicles.map((vehicle) => toVehicleDb(vehicle)),
          serviceDeliveringOffice: defaultServiceDeliveringOffice,
          user: defaultUser,
        });

      default:
        console.log({ serviceType, data });
    }
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

          <Button onClick={handleSubmit} disabled={status === "LOADING"}>
            Submit
          </Button>
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
