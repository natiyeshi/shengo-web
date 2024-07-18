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
import QRCode from "react-qr-code";
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
              style={{ width: "793px", height: "1122px" }} // A4 landscape size in pixels at 96 DPI
            >
              <div className="flex">
                <Title className="m-auto mt-5 text-center uppercase text-primary">
                  Shengo solutions
                </Title>
                <div className="me-6 pt-6 shadow-xl bg-primary p-2">
                  <QRCode
                    value="shengo.vercel.com"
                    size={80}
                    width={100}
                    height={100}
                  />
                </div>
              </div>
              {/* <div className="mx-3 my-4 mt-8 border-t"></div> */}
              <Customer title={"seller"} />
              <Customer title={"buyer"} />
              <Customer title={"Witness"} />
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
  <div className="flex gap-2 px-2 py-2 text-[15px]">
    <div className="font-semibold capitalize">{name}</div>
    <div className="">{value}</div>
  </div>
);

const Customer = ({ title }: { title: string }) => (
  <div className="my-2 flex flex-col gap-2 px-3">
    <div className="my-5 text-xl font-bold uppercase">{title}</div>
    <div className="flex flex-wrap gap-x-4 gap-y-1">
      <DisplayThing name="ID" value="12345" />
      <DisplayThing name="Customer Type" value="Individual" />
      <DisplayThing name="Customer Title" value="Mr." />
      <DisplayThing name="Name" value="John Doe" />
      <DisplayThing name="Father's Name" value="Robert Doe" />
      <DisplayThing name="Grandfather's Name" value="William Doe" />
      <DisplayThing name="Gender" value="Male" />
      <DisplayThing name="Nationality" value="American" />
      <DisplayThing name="Origin" value="New York" />
      <DisplayThing name="TIN" value="123456789" />
      <DisplayThing name="Foreign" value="False" />
      <DisplayThing name="Region" value="NY" />
    </div>
  </div>
);
