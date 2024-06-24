import React from "react";
import Columns from "./columns";
import FieldControl from "./field-control";

import LabelMandatory from "./label-mandatory";
import { Input } from "@/components/ui/input";
import Selector from "./selector";
import { getRegions, stringToObjectOfTitleValue } from "../_utils";
import {
  BANK_NAMES,
  PAYMENT_TYPES,
  VEHICLE_CODES,
  VEHICLE_TYPES,
} from "../_utils/constants";
import { Label } from "@/components/ui/label";
import ButtonWithIcon from "./button-with-icon";
import { MdClear } from "react-icons/md";
import { Save } from "lucide-react";

type Props = {};

const VehicleRegistration = (props: Props) => {
  return (
    <section className="flex flex-col gap-5">
      <Columns>
        <FieldControl>
          <LabelMandatory>Engine No.</LabelMandatory>
          <Input type="number" />
        </FieldControl>
        <FieldControl>
          <LabelMandatory>Chassis No.</LabelMandatory>
          <Input type="number" />
        </FieldControl>
        <FieldControl>
          <LabelMandatory>Libre No.</LabelMandatory>
          <Input type="number" />
        </FieldControl>
      </Columns>
      <Columns>
        <FieldControl>
          <LabelMandatory className="">Region</LabelMandatory>
          <Selector
            selectorData={stringToObjectOfTitleValue(getRegions().regions)}
          />
        </FieldControl>
        <FieldControl>
          <LabelMandatory className="">Code</LabelMandatory>
          <Selector selectorData={VEHICLE_CODES} />
        </FieldControl>
        <FieldControl>
          <LabelMandatory className="">Plate No.</LabelMandatory>
          <Input />
        </FieldControl>
      </Columns>

      <Columns>
        <FieldControl>
          <LabelMandatory className="">Vehicle Type</LabelMandatory>
          <Selector selectorData={VEHICLE_TYPES} />
        </FieldControl>
        <FieldControl>
          <LabelMandatory className="">Determination Kern No.</LabelMandatory>
          <Input />
        </FieldControl>
        <FieldControl>
          <LabelMandatory className="">Determination Price</LabelMandatory>
          <Input type="number" />
        </FieldControl>
      </Columns>

      <Columns>
        <FieldControl>
          <Label className="">Sales Value</Label>
          <Input type="number" defaultValue={0.0} />
        </FieldControl>
        <FieldControl>
          <Label className="">Penalty To Government</Label>
          <Input type="number" defaultValue={0.0} />
        </FieldControl>
        <FieldControl>
          <Label className="">Penalty</Label>
          <Input type="number" defaultValue={0.0} />
        </FieldControl>
      </Columns>
      <FieldControl>
        <LabelMandatory className="">Bank Name</LabelMandatory>

        <Selector selectorData={BANK_NAMES} />
      </FieldControl>
      <Columns className="">
        <FieldControl>
          <LabelMandatory className="">Prepayment</LabelMandatory>
          <Input type="number" defaultValue={0.0} />
        </FieldControl>
        <FieldControl>
          <LabelMandatory className="">Payment Type</LabelMandatory>
          <Selector selectorData={PAYMENT_TYPES} />
        </FieldControl>
        <FieldControl>
          <Label className="">Cheque/CPO No</Label>
          <Input type="number" />
        </FieldControl>
      </Columns>

      <section className="flex justify-end gap-5 my-7">
        <ButtonWithIcon variant="destructive">
          <MdClear />
          <span>Clear</span>
        </ButtonWithIcon>
        <ButtonWithIcon >
          <Save />
          <span>Save</span>
        </ButtonWithIcon>
      </section>
    </section>
  );
};

export default VehicleRegistration;
