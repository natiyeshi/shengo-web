"use client";
import React from "react";
import Columns from "../columns";

import { TextInput, Select, Input, Checkbox } from "@mantine/core";

import FormFooterButtons from "../form-footer-buttons";
import { useResidenceFormContext } from "@/app/(protected)/dashboard/_contexts/residence/residence-form-context";
import { useResidenceOperation } from "@/app/(protected)/dashboard/_contexts/residence/residence-operation-context";
import AreYouSure from "../AreYouSure";
import ResidenceListDrawer from "./residence-list-drawer";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { useDisclosure } from "@mantine/hooks";
import { BANK_NAMES, PAYMENT_TYPES } from "@/_utils/constants";
import { DatePicker, DatePickerInput } from "@mantine/dates";

const ResidenceRegistration = () => {
  const form = useResidenceFormContext();
  const {
    submit,
    alertInfo,
    residences,
    editing,
    nextAndContinue,
    deleteCurrentForm,
  } = useResidenceOperation();
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <section>
      <ResidenceListDrawer
        title={`Residence's list`}
        opened={opened}
        close={close}
      >
        <Button
          onClick={open}
          size="icon"
          variant="outline"
          className="relative rounded-full"
        >
          <Home />
          <span className="absolute -right-0 -top-0 font-semibold text-primary">
            {residences.length}
          </span>
        </Button>
      </ResidenceListDrawer>
      {alertInfo && <AreYouSure {...alertInfo} />}
      <form onSubmit={form.onSubmit(submit)} className="flex flex-col gap-5">
        <Input hidden {...form.getInputProps("_id")} key={form.key("_id")} />
        <Columns>
          <Select
            label="Region"
            withAsterisk
            {...form.getInputProps("region")}
            placeholder="Region"
            data={["Somalia", "Amhara", "Tigrai", "Oromia"]}
          />
          <TextInput
            label="city/zone"
            placeholder="city/zone"
            withAsterisk
            key={form.key("city")}
            {...form.getInputProps("city")}
          />
          <TextInput
            label="subcity/woreda"
            placeholder="subcity"
            withAsterisk
            key={form.key("subcity")}
            {...form.getInputProps("subcity")}
          />
        </Columns>
        <Columns>
          <TextInput
            label="House Number"
            placeholder="House Number"
            withAsterisk
            key={form.key("houseNumber")}
            {...form.getInputProps("houseNumber")}
          />

          <TextInput
            label="Service"
            placeholder="Service"
            withAsterisk
            key={form.key("service")}
            {...form.getInputProps("service")}
          />
        </Columns>

        <Columns>
          <TextInput
            label="Book Number"
            placeholder="Book Number"
            withAsterisk
            key={form.key("bookNumber")}
            {...form.getInputProps("bookNumber")}
          />
          <TextInput
            label="Building Number"
            placeholder="Building Number"
            withAsterisk
            key={form.key("buildingNumber")}
            {...form.getInputProps("buildingNumber")}
          />
          <TextInput
            label="Area"
            placeholder="Area"
            withAsterisk
            key={form.key("area")}
            {...form.getInputProps("area")}
          />
        </Columns>
        <Columns>
          <TextInput
            label="price"
            placeholder="price"
            withAsterisk
            key={form.key("price")}
            {...form.getInputProps("price")}
          />
          <TextInput
            label="Penalityt"
            placeholder="Penalityt"
            key={form.key("penality")}
            {...form.getInputProps("penality")}
          />
          <TextInput
            label="Payment To Government"
            placeholder="Payment To Government"
            key={form.key("paymentToGovernment")}
            {...form.getInputProps("paymentToGovernment")}
          />
        </Columns>
        <Columns>
          <Select
            label="Bank Name"
            withAsterisk
            {...form.getInputProps("bankName")}
            placeholder="Bank Name"
            data={BANK_NAMES}
          />
          <div className="flex w-full flex-col gap-1">
            <label htmlFor="" className="text-sm">
              Remaining Price Date
            </label>
            <input
              type="date"
              className="rounded-lg border border-gray-700/20 bg-white px-2 py-1"
              onChange={(value) => {
                form.setFieldValue("remainingPriceDate", value.toString());
              }}
            />
          </div>
        </Columns>
          <Checkbox
            defaultChecked
            label="Is it Condominium"
            className="my-auto"
            {...form.getInputProps("isCondominium")}
          />

        <Columns>
          <TextInput
            label="Prepayment"
            placeholder="Prepayment"
            key={form.key("prePayment")}
            type="number"
            defaultValue={0.0}
            {...form.getInputProps("prePayment")}
          />

          <Select
            label="Payment Type"
            data={PAYMENT_TYPES}
            {...form.getInputProps("paymentType")}
            placeholder="Payment Type"
          />

          <TextInput
            label="Cheque/CPO No"
            placeholder="Cheque Number"
            key={form.key("chequeNumber")}
            type="number"
            {...form.getInputProps("chequeNumber")}
          />
        </Columns>
        <Columns>
          <TextInput
            label="Residence Number"
            placeholder="Residence Number"
            key={form.key("residenceNumber")}
            {...form.getInputProps("residenceNumber")}
          />
          <TextInput
            label="Total Lease Price"
            placeholder="Total Lease Price"
            key={form.key("totalLeasePrice")}
            {...form.getInputProps("totalLeasePrice")}
          />
          <TextInput
            label="Paid Residence Price"
            placeholder="Paid Residence Price"
            key={form.key("paidResidencePrice")}
            {...form.getInputProps("paidResidencePrice")}
          />
          <TextInput
            label="Remaining Price"
            placeholder="Remaining Price"
            key={form.key("remainingPrice")}
            {...form.getInputProps("remainingPrice")}
          />

          <div className="flex w-full flex-col gap-1">
            <label htmlFor="" className="text-sm">
              Remaining Price Date
            </label>
            <input
              type="date"
              className="rounded-lg border border-gray-700/20 bg-white px-2 py-1"
              onChange={(value) => {
                form.setFieldValue("remainingPriceDate", value.toString());
              }}
            />
          </div>
          {
            // label="Remaining Price Date"
            // placeholder="Remaining Price Date"
            // key={form.key("remainingPriceDate")}
            // {...form.getInputProps("remainingPriceDate")}
          }

          <TextInput
            label="Reciept Number"
            placeholder="Reciept Number"
            key={form.key("recieptNumber")}
            {...form.getInputProps("recieptNumber")}
          />
        </Columns>

        <FormFooterButtons
          clearAction={() => {
            deleteCurrentForm();
            form.reset();
          }}
          showNextButton={residences.length > 0}
          nextAction={nextAndContinue}
          isEditing={!!editing}
        />
      </form>
    </section>
  );
};

export default ResidenceRegistration;
