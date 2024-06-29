"use client";
import React from "react";
import Columns from "../columns";

import { TextInput, Select, Input } from "@mantine/core";

import FormFooterButtons from "../form-footer-buttons";
import { useVehicleFormContext } from "@/app/(protected)/dashboard/_contexts/vehicle/vehicle-form-context";
import { useVehicleOperation } from "@/app/(protected)/dashboard/_contexts/vehicle/vehicle-operation-context";
import AreYouSure from "../AreYouSure";
import VehicleListDrawer from "./vehicle-list-drawer";
import { Button } from "@/components/ui/button";
import { Car } from "lucide-react";
import { useDisclosure } from "@mantine/hooks";
import { BANK_NAMES, PAYMENT_TYPES, VEHICLE_CODES, VEHICLE_TYPES } from "@/_utils/constants";

const VehicleRegistration = () => {
  const form = useVehicleFormContext();
  const {
    submit,
    alertInfo,
    vehicles,
    editing,
    nextAndContinue,
    deleteCurrentForm,
  } = useVehicleOperation();
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <section>
      <VehicleListDrawer title={`Vehicle's list`} opened={opened} close={close}>
        <Button
          onClick={open}
          size="icon"
          variant="outline"
          className="relative rounded-full"
        >
          <Car />
          <span className="absolute -right-0 -top-0 font-semibold text-primary">
            {vehicles.length}
          </span>
        </Button>
      </VehicleListDrawer>
      {alertInfo && <AreYouSure {...alertInfo} />}
      <form onSubmit={form.onSubmit(submit)} className="flex flex-col gap-5">
        <Input hidden {...form.getInputProps("_id")} key={form.key("_id")} />
        <Columns>
          <TextInput
            label="Engine No."
            placeholder="Engine Number"
            withAsterisk
            key={form.key("engineNumber")}
            {...form.getInputProps("engineNumber")}
          />
          <TextInput
            label="Chassis No."
            placeholder="Chassis Number"
            withAsterisk
            key={form.key("chassisNumber")}
            {...form.getInputProps("chassisNumber")}
          />
          <TextInput
            label="Libre No."
            placeholder="Libre Number"
            withAsterisk
            key={form.key("libreNumber")}
            {...form.getInputProps("libreNumber")}
          />
        </Columns>
        <Columns>
          <Select
            label="Region"
            withAsterisk
            {...form.getInputProps("region")}
            placeholder="Region"
            data={["Somalia", "Amhara", "Tigrai", "Oromia"]}
          />

          <Select
            label="Code"
            withAsterisk
            {...form.getInputProps("code")}
            placeholder="Code"
            data={VEHICLE_CODES}
          />

          <TextInput
            label="Plate No."
            placeholder="Plate Number"
            withAsterisk
            key={form.key("plateNumber")}
            {...form.getInputProps("plateNumber")}
          />
        </Columns>
        <Columns>
          <Select
            label="Vehicle Type"
            withAsterisk
            {...form.getInputProps("vehicleType")}
            placeholder="Vehicle Type"
            data={VEHICLE_TYPES}
          />
          <TextInput
            label="Determination Kern No."
            placeholder="Determination Kern Number"
            withAsterisk
            key={form.key("determinationKernNo")}
            {...form.getInputProps("determinationKernNo")}
          />
          <TextInput
            label="Determination Price"
            placeholder="Determination Price"
            withAsterisk
            key={form.key("determinationPrice")}
            {...form.getInputProps("determinationPrice")}
          />
        </Columns>
        <Columns>
          <TextInput
            label="Sales Value"
            placeholder="Sales Value"
            key={form.key("salesValue")}
            type="number"
            defaultValue={0.0}
            {...form.getInputProps("salesValue")}
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
          showNextButton={vehicles.length > 0}
          nextAction={nextAndContinue}
          isEditing={!!editing}
        />
      </form>
    </section>
  );
};

export default VehicleRegistration;
