"use client";

import {useVehicleFormContext} from "../contexts/vehicle/vehicle-form-context"
import {useVehicleOperation} from "../contexts/vehicle/vehicle-operation-context"
import { useDisclosure } from "@mantine/hooks";

import AreYouSure from "@/components/custom/AreYouSure"
import Columns from "@/components/custom/columns"
import FormFooterButtons from "@/components/custom/form-footer-buttons"
import { TextInput, Select, Input } from "@mantine/core";

import { VEHICLE_CODES, VEHICLE_TYPES } from "@/_utils/constants";

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
