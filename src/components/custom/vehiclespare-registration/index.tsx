"use client";
import React from "react";
import Columns from "../columns";

import { TextInput, Select, Input, Checkbox } from "@mantine/core";

import FormFooterButtons from "../form-footer-buttons";
import { useVehiclespareFormContext } from "@/app/(protected)/dashboard/_contexts/vehiclespare/vehiclespare-form-context";
import { useVehiclespareOperation } from "@/app/(protected)/dashboard/_contexts/vehiclespare/vehiclespare-operation-context";
import AreYouSure from "../AreYouSure";
import VehiclespareListDrawer from "./vehiclespare-list-drawer";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { useDisclosure } from "@mantine/hooks";
import { BANK_NAMES, PAYMENT_TYPES } from "@/_utils/constants";

const VehiclespareRegistration = () => {
  const form = useVehiclespareFormContext();
  const {
    submit,
    alertInfo,
    vehiclespares,
    editing,
    nextAndContinue,
    deleteCurrentForm,
  } = useVehiclespareOperation();
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <section>
      <VehiclespareListDrawer
        title={`Vehiclespare's list`}
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
            {vehiclespares.length}
          </span>
        </Button>
      </VehiclespareListDrawer>
      {alertInfo && <AreYouSure {...alertInfo} />}
      <form onSubmit={form.onSubmit(submit)} className="flex flex-col gap-5">
        <Input hidden {...form.getInputProps("_id")} key={form.key("_id")} />
        <Columns>
          <TextInput
            label="Property Name"
            placeholder="Property Name"
            withAsterisk
            key={form.key("propertyName")}
            {...form.getInputProps("propertyName")}
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
        </Columns>

        <Columns>
          <TextInput
            label="Value"
            placeholder="Value"
            key={form.key("value")}
            type="number"
            defaultValue={0.0}
            {...form.getInputProps("value")}
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
          showNextButton={vehiclespares.length > 0}
          nextAction={nextAndContinue}
          isEditing={!!editing}
        />
      </form>
    </section>
  );
};

export default VehiclespareRegistration;
