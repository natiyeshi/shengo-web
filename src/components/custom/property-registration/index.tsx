"use client";
import React from "react";
import Columns from "../columns";

import { TextInput, Select, Input } from "@mantine/core";

import FormFooterButtons from "../form-footer-buttons";
import { usePropertyFormContext } from "@/app/(protected)/dashboard/_contexts/property/property-form-context";
import { usePropertyOperation } from "@/app/(protected)/dashboard/_contexts/property/property-operation-context";
import AreYouSure from "../AreYouSure";
import PropertyListDrawer from "./property-list-drawer";
import { Button } from "@/components/ui/button";
import { Car } from "lucide-react";
import { useDisclosure } from "@mantine/hooks";
import { BANK_NAMES, PAYMENT_TYPES } from "@/_utils/constants";

const PropertyRegistration = () => {
  const form = usePropertyFormContext();
  const {
    submit,
    alertInfo,
    properties,
    editing,
    nextAndContinue,
    deleteCurrentForm,
  } = usePropertyOperation();
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <section>
      <PropertyListDrawer
        title={`Property's list`}
        opened={opened}
        close={close}
      >
        <Button
          onClick={open}
          size="icon"
          variant="outline"
          className="relative rounded-full"
        >
          <Car />
          <span className="absolute -right-0 -top-0 font-semibold text-primary">
            {properties.length}
          </span>
        </Button>
      </PropertyListDrawer>
      {alertInfo && <AreYouSure {...alertInfo} />}
      <form onSubmit={form.onSubmit(submit)} className="flex flex-col gap-5">
        <Input hidden {...form.getInputProps("_id")} key={form.key("_id")} />

        <Columns>
          <TextInput
            label="Property Name"
            placeholder="Property Name"
            key={form.key("propertyName")}
            type="number"
            defaultValue={0.0}
            {...form.getInputProps("propertyName")}
          />
          <TextInput
            label="Sales Value"
            placeholder="Sales Value"
            key={form.key("value")}
            type="number"
            defaultValue={0.0}
            {...form.getInputProps("value")}
          />
          <TextInput
            label="Penalty To Government"
            placeholder="Penalty To Government"
            key={form.key("penaltyGov")}
            type="number"
            defaultValue={0.0}
            {...form.getInputProps("penaltyGov")}
          />
          <TextInput
            label="Penalty"
            placeholder="Penalty"
            key={form.key("penalty")}
            type="number"
            defaultValue={0.0}
            {...form.getInputProps("penalty")}
          />
        </Columns>

        <Select
          label="Bank Name"
          withAsterisk
          {...form.getInputProps("bankName")}
          placeholder="Bank Name"
          data={BANK_NAMES}
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

        <FormFooterButtons
          clearAction={() => {
            deleteCurrentForm();
            form.reset();
          }}
          showNextButton={properties.length > 0}
          nextAction={nextAndContinue}
          isEditing={!!editing}
        />
      </form>
    </section>
  );
};

export default PropertyRegistration;
