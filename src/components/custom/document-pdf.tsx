import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";
// import QRCode from "react-qr-code";
import React, { useRef } from "react";
import { Title } from "@mantine/core";

const DocumentDdf = ({
  download,
  reportTemplateRef,
  setOpen,
  open,
}: {
  download: Function;
  reportTemplateRef: any;
  setOpen: Function;
  open: Boolean;
}) => {
  return (
    <AlertDialog
      open={open as any}
      onOpenChange={() => {
        setOpen(false);
      }}
    >
      <AlertDialogContent className="w- h-[90vh] min-w-fit overflow-auto">
        <AlertDialogHeader>
          <AlertDialogTitle>Document</AlertDialogTitle>
          <AlertDialogDescription>
            <div
              ref={reportTemplateRef}
              className="m-1 border text-black"
              style={{ width: "1122px", height: "793px" }} // A4 landscape size in pixels at 96 DPI
            >
              <Title className="mt-5 text-center uppercase text-primary">
                Shengo
              </Title>
              <div className="mx-3 my-4 border-t"></div>
              <div className="flex flex-col gap-4 px-5">
                <Title className="my-5 text-2l">Customer Information</Title>
                <div className="flex gap-4">
                  <DisplayThing name="ID" value="12345" />
                  <DisplayThing name="Customer Type" value="Individual" />
                  <DisplayThing name="Customer Title" value="Mr." />
                  <DisplayThing name="Name" value="John Doe" />
                </div>
                <div className="flex gap-4">
                  <DisplayThing name="Father's Name" value="Robert Doe" />
                  <DisplayThing name="Grandfather's Name" value="William Doe" />
                  <DisplayThing name="Gender" value="Male" />
                  <DisplayThing name="Nationality" value="American" />
                </div>
                <div className="flex gap-4">
                  <DisplayThing name="Origin" value="New York" />
                  <DisplayThing name="TIN" value="123456789" />
                  <DisplayThing name="Foreign" value="False" />
                  <DisplayThing name="Region" value="NY" />
                </div>
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              download();
            }}
          >
            Download
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DocumentDdf;

const DisplayThing = ({ name, value }: { name: string; value: string }) => (
  <div className="flex gap-5 px-2 py-2 text-[15px]">
    <div className="font-semibold capitalize">{name}</div>
    <div className="underline">{value}</div>
  </div>
);
