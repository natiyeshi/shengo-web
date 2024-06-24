"use client";

import Columns from "./columns";
import { Save } from "lucide-react";
import ButtonWithIcon from "./button-with-icon";
import { MdClear } from "react-icons/md";
import { Stack, Title } from "@mantine/core";
import TextInput from "./text-input";

import { VehicleSchemaType } from "../vehicle/_types/schema";
import {
  getRegionsFromNationality,
  stringToObjectOfTitleValue,
} from "../_utils";
import {
  BANK_NAMES,
  PAYMENT_TYPES,
  VEHICLE_CODES,
  VEHICLE_TYPES,
} from "../_utils/constants";

type Props = {
  type: string;
};

const VehicleRegistration = ({ type }: Props) => {
  return (
    <section>
      <Stack className="mt-5">
        <Title order={2}>{type}</Title>
        <Columns>
          <TextInput<VehicleSchemaType>
            name="engineNo"
            variants="input"
            type="number"
            mandatory={"Engine No."}
          />
          <TextInput<VehicleSchemaType>
            name="chassisNo"
            variants="input"
            type="number"
            mandatory={"Chassis No."}
          />
          <TextInput<VehicleSchemaType>
            name="libreNo"
            variants="input"
            type="number"
            mandatory={"Libre No."}
          />
        </Columns>

        <Columns>
          <TextInput<VehicleSchemaType>
            name="region"
            variants="select"
            mandatory={"Region"}
            selectorData={stringToObjectOfTitleValue(
              getRegionsFromNationality().regions,
            )}
          />
          <TextInput<VehicleSchemaType>
            name="code"
            variants="select"
            mandatory={"Code"}
            selectorData={VEHICLE_CODES}
          />
          <TextInput<VehicleSchemaType>
            name="plateNo"
            variants="input"
            mandatory={"Plate No."}
          />
        </Columns>

        <Columns>
          <TextInput<VehicleSchemaType>
            name="vehicleType"
            variants="select"
            mandatory={"Vehicle Type"}
            selectorData={VEHICLE_TYPES}
          />
          <TextInput<VehicleSchemaType>
            name="determinationKernNo"
            variants="input"
            mandatory={"Determination Kern No."}
          />
          <TextInput<VehicleSchemaType>
            name="determinationPrice"
            variants="input"
            type="number"
            mandatory={"Determination Price"}
          />
        </Columns>

        <Columns>
          <TextInput<VehicleSchemaType>
            name="salesValue"
            variants="input"
            type="number"
            label={"Sales Value"}
            defaultValue={0.0}
          />
          <TextInput<VehicleSchemaType>
            name="penaltyToGovernment"
            variants="input"
            type="number"
            label={"Penalty To Government"}
            defaultValue={0.0}
          />
          <TextInput<VehicleSchemaType>
            name="penalty"
            variants="input"
            type="number"
            label={"Penalty"}
            defaultValue={0.0}
          />
        </Columns>
        <TextInput<VehicleSchemaType>
          name="bankName"
          variants="select"
          mandatory={"Bank Name"}
          selectorData={BANK_NAMES}
        />

        <Columns>
          <TextInput<VehicleSchemaType>
            name="prepayment"
            variants="input"
            type="number"
            mandatory={"Prepayment"}
            defaultValue={0.0}
          />
          <TextInput<VehicleSchemaType>
            name="paymentType"
            variants="select"
            mandatory={"Payment Type"}
            selectorData={PAYMENT_TYPES}
          />
          <TextInput<VehicleSchemaType>
            name="chequeOrCpoNo"
            variants="input"
            type="number"
            label={"Cheque/CPO No"}
          />
        </Columns>
      </Stack>

      <section className="my-7 flex justify-end gap-5">
        <ButtonWithIcon variant="destructive">
          <MdClear />
          <span>Clear</span>
        </ButtonWithIcon>
        <ButtonWithIcon>
          <Save />
          <span>Save</span>
        </ButtonWithIcon>
      </section>
    </section>
  );
};

export default VehicleRegistration;
