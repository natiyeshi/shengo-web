"use client";
import { Label } from "@/components/ui/label";
import FieldControl from "./field-control";

import { CUSTOMER_TITLES, CUSTOMER_TYPES, GENDERS } from "../_utils/constants";

import {
  getNationalities,
  getNationIndexFromNationalities,
  getRegionsFromNationality,
  stringToObjectOfTitleValue,
} from "../_utils";

import Columns from "./columns";
import { Save } from "lucide-react";
import ButtonWithIcon from "./button-with-icon";

import { MdClear } from "react-icons/md";

import { Stack, Title } from "@mantine/core";
import { IndividualSalerSchemaType } from "../vehicle/_types/schema";
import TextInput from "./text-input";
import CheckboxController from "./checkbox-controller";
import { useFormContext } from "react-hook-form";

type Props = {
  type: string;
};
const NATIONALITIES = stringToObjectOfTitleValue(
  getNationalities().nationalities,
);

console.log("🚀 ~ NATIONALITIES:", NATIONALITIES);

const CustomerIdentityRegisteration = ({ type }: Props) => {
  const { watch } = useFormContext<IndividualSalerSchemaType>();
  return (
    <section>
      <TextInput<IndividualSalerSchemaType>
        name="type"
        selectorData={CUSTOMER_TYPES}
        variants="select"
        mandatory={"Customer Type"}
      />
      <Stack className="mt-5">
        <Title order={2} className="">
          {type}
        </Title>
        <TextInput<IndividualSalerSchemaType>
          className="md:max-w-[33%]"
          name="title"
          selectorData={CUSTOMER_TITLES}
          variants="select"
          mandatory={"Title"}
        />

        <Columns>
          <TextInput<IndividualSalerSchemaType>
            name="name"
            variants="input"
            mandatory={"Name"}
          />

          <TextInput<IndividualSalerSchemaType>
            name="fatherName"
            variants="input"
            mandatory={"Father Name"}
          />

          <TextInput<IndividualSalerSchemaType>
            name="grandFatherName"
            variants="input"
            mandatory={"Grand Father Name"}
          />
        </Columns>
        <Columns>
          <TextInput<IndividualSalerSchemaType>
            name="gender"
            variants="select"
            mandatory={"Gender"}
            selectorData={GENDERS}
          />

          <TextInput<IndividualSalerSchemaType>
            name="nationality"
            variants="select"
            mandatory={"Nationality"}
            selectorData={NATIONALITIES}
            defaultIndex={getNationIndexFromNationalities("ethiopian")}
          />
          <TextInput<IndividualSalerSchemaType>
            name="nationality"
            variants="select"
            mandatory={"Origin"}
            selectorData={NATIONALITIES}
            defaultIndex={getNationIndexFromNationalities("ethiopian")}
          />
        </Columns>

        <TextInput<IndividualSalerSchemaType>
          name="tin"
          variants="input"
          type="number"
          mandatory={"Tin"}
        />
      </Stack>
      <Stack className="mt-5">
        <Title order={2} className="">
          Address
        </Title>

        <FieldControl className="flex-row items-center gap-3">
          <CheckboxController<IndividualSalerSchemaType> name="isForeigner" />
          <Label className="">Are you a foreigner ?</Label>
        </FieldControl>
        <Columns>
          <TextInput<IndividualSalerSchemaType>
            name="region"
            variants="select"
            mandatory={"Region"}
            selectorData={stringToObjectOfTitleValue(
              getRegionsFromNationality(watch("nationality")).regions,
            )}
          />
          <TextInput<IndividualSalerSchemaType>
            name="city"
            variants="input"
            label={"City"}
          />
          <TextInput<IndividualSalerSchemaType>
            name="subCity"
            variants="input"
            label={"Sub city"}
          />
        </Columns>
        <Columns>
          <TextInput<IndividualSalerSchemaType>
            name="woreda"
            variants="input"
            label={"Woreda"}
          />
          <TextInput<IndividualSalerSchemaType>
            name="houseNo"
            variants="input"
            type="number"
            label={"House No."}
          />
          <TextInput<IndividualSalerSchemaType>
            name="phoneNo"
            variants="input"
            type="number"
            label={"Phone No."}
            placeholder="0918223344"
          />
        </Columns>
        <TextInput<IndividualSalerSchemaType>
          name="otherAddress"
          variants="textarea"
          label={"Other address"}
          className="resize-none"
        />
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

export default CustomerIdentityRegisteration;
