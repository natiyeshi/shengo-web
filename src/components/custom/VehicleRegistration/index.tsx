"use client";
import React from "react";
import Columns from "../columns";
import FieldControl from "../field-control";

import LabelMandatory from "../label-mandatory";
import { Button, Input } from "@mantine/core";
import {
  BANK_NAMES,
  PAYMENT_TYPES,
  VEHICLE_CODES,
  VEHICLE_TYPES,
} from "../constants";
import { Label } from "@/components/ui/label";
import { Select } from "@mantine/core";
import { useForm } from "@mantine/form";

interface props {
  goBack: Function;
  goToNext: Function;
}

const VehicleRegistration = ({ goBack, goToNext }: props) => {
  const isNotEmpty = (value: string) => {
    return value && value.trim().length > 0;
  };

  const initialValues = {
    engineNumber: "",
    chassisNumber: "",
    libreNumber: "",
    region: "",
    code: "",
    plateNumber: "",
    vehicleType: "",
    determinationKernNo: "",
    determinationPrice: "",
    salesValue: "",
    penaltyGov: "",
    penalty: "",
    bankName: "",
    prePayment: "",
    paymentType: "",
    chequeNumber: "",
  };

  const form = useForm({
    mode: "uncontrolled",
    initialValues,
    validate: {
      engineNumber: (value) =>
        isNotEmpty(value) ? null : "Engine Number is required",
      chassisNumber: (value) =>
        isNotEmpty(value) ? null : "Chassis Number is required",
      libreNumber: (value) =>
        isNotEmpty(value) ? null : "Libre Number is required",
      region: (value) => (isNotEmpty(value) ? null : "Region is required"),
      code: (value) => (isNotEmpty(value) ? null : "Code is required"),
      plateNumber: (value) =>
        isNotEmpty(value) ? null : "Plate Number is required",
      vehicleType: (value) =>
        isNotEmpty(value) ? null : "Vehicle Type is required",
      determinationKernNo: (value) =>
        isNotEmpty(value) ? null : "Determination Kern No is required",
      determinationPrice: (value) =>
        isNotEmpty(value) ? null : "Determination Price is required",
      salesValue: (value) =>
        isNotEmpty(value) ? null : "Sales Value is required",
      penaltyGov: (value) =>
        isNotEmpty(value) ? null : "Penalty Gov is required",
      penalty: (value) => (isNotEmpty(value) ? null : "Penalty is required"),
      bankName: (value) => (isNotEmpty(value) ? null : "Bank Name is required"),
      prePayment: (value) =>
        isNotEmpty(value) ? null : "Pre-Payment is required",
      paymentType: (value) =>
        isNotEmpty(value) ? null : "Payment Type is required",
      chequeNumber: (value) =>
        isNotEmpty(value) ? null : "Cheque Number is required",
    },
  });

  const submit = () => {
    const hasErrors = form.validate().hasErrors;
    if (hasErrors) return;
    goToNext();
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
      className="flex flex-col gap-5"
    >
      <Columns>
        <FieldControl>
          <LabelMandatory>Engine No.</LabelMandatory>
          <Input
            {...form.getInputProps("engineNumber")}
            placeholder="Engine Number"
          />
        </FieldControl>
        <FieldControl>
          <LabelMandatory>Chassis No.</LabelMandatory>
          <Input
            {...form.getInputProps("chassisNumber")}
            placeholder="Chassis Number"
          />
        </FieldControl>
        <FieldControl>
          <LabelMandatory>Libre No.</LabelMandatory>
          <Input
            {...form.getInputProps("libreNumber")}
            placeholder="Libre Number"
          />
        </FieldControl>
      </Columns>
      <Columns>
        <FieldControl>
          <LabelMandatory className="">Region</LabelMandatory>
          <Select
            {...form.getInputProps("region")}
            placeholder="Region"
            data={["Somalia", "Amhara", "Tigrai", "Oromia"]}
          />
        </FieldControl>
        <FieldControl>
          <LabelMandatory className="">Code</LabelMandatory>
          <Select
            {...form.getInputProps("code")}
            placeholder="Code"
            data={VEHICLE_CODES}
          />
        </FieldControl>
        <FieldControl>
          <LabelMandatory className="">Plate No.</LabelMandatory>
          <Input
            {...form.getInputProps("plateNumber")}
            placeholder="Plate Number"
          />
        </FieldControl>
      </Columns>

      <Columns>
        <FieldControl>
          <LabelMandatory className="">Vehicle Type</LabelMandatory>
          <Select
            {...form.getInputProps("vehicleType")}
            placeholder="Vehicle Type"
            data={VEHICLE_TYPES}
          />
        </FieldControl>
        <FieldControl>
          <LabelMandatory className="">Determination Kern No.</LabelMandatory>
          <Input
            {...form.getInputProps("determinationKernNo")}
            placeholder="Determination Kern Number"
          />
        </FieldControl>
        <FieldControl>
          <LabelMandatory className="">Determination Price</LabelMandatory>
          <Input
            {...form.getInputProps("determinationPrice")}
            placeholder="Determination Price"
          />
        </FieldControl>
      </Columns>

      <Columns>
        <FieldControl>
          <Label className="">Sales Value</Label>
          <Input
            type="number"
            defaultValue={0.0}
            {...form.getInputProps("salesValue")}
            placeholder="Sales Value"
          />
        </FieldControl>
        <FieldControl>
          <Label className="">Penalty To Government</Label>
          <Input
            type="number"
            defaultValue={0.0}
            {...form.getInputProps("penaltyGov")}
            placeholder="Penalty To Government"
          />
        </FieldControl>
        <FieldControl>
          <Label className="">Penalty</Label>
          <Input
            type="number"
            defaultValue={0.0}
            {...form.getInputProps("penalty")}
            placeholder="Penalty"
          />
        </FieldControl>
      </Columns>
      <FieldControl>
        <LabelMandatory className="">Bank Name</LabelMandatory>
        <Select
          {...form.getInputProps("bankName")}
          placeholder="Bank Name"
          data={BANK_NAMES}
        />
      </FieldControl>
      <Columns className="">
        <FieldControl>
          <LabelMandatory className="">Prepayment</LabelMandatory>
          <Input
            type="number"
            defaultValue={0.0}
            {...form.getInputProps("prePayment")}
            placeholder="Prepayment"
          />
        </FieldControl>
        <FieldControl>
          <LabelMandatory className="">Payment Type</LabelMandatory>
          <Select
            data={PAYMENT_TYPES}
            {...form.getInputProps("paymentType")}
            placeholder="Payment Type"
          />
        </FieldControl>
        <FieldControl>
          <Label className="">Cheque/CPO No</Label>
          <Input
            type="number"
            {...form.getInputProps("chequeNumber")}
            placeholder="Cheque Number"
          />
        </FieldControl>
      </Columns>

      <section className="my-7 flex justify-end gap-5">
        <Button variant="outline">
          {/* <MdClear /> */}
          <span>Clear</span>
        </Button>
        <Button type="submit">
          {/* <Save /> */}
          <span>Save</span>
        </Button>
      </section>
    </form>
  );
};

export default VehicleRegistration;
