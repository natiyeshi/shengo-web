"use client";
import { Label } from "@/components/ui/label";
import FieldControl from "./field-control";
import { Input } from "@mantine/core";
import Rows from "./rows";
import H3 from "@/components/custom/h3";
import {
  CUSTOMER_TITLES,
  CUSTOMER_TYPES,
  GENDERS,
  NATIONALITIES,
} from "../_utils/constants";
import { getRegions, stringToObjectOfTitleValue } from "../_utils";
import { Textarea } from "@mantine/core";
import Columns from "./columns";
import { Save } from "lucide-react";
import ButtonWithIcon from "./button-with-icon";
import { MdClear } from "react-icons/md";
import { Checkbox } from "@mantine/core";
import LabelMandatory from "./label-mandatory";
import { Title } from "@mantine/core";
import { Select } from "@mantine/core";
import { useState } from "react";
import { useForm } from "@mantine/form";

type Props = {
  type: string;
};

const CustomerIdentityRegisteration = ({ type }: Props) => {
  const maxTinLength = 10;
  const [value, setValue] = useState<string | null>("");
  const isNotEmpty = (value : string)  => {
    return value && value.trim().length > 0
  }
  const initialValues = {
    customerType: CUSTOMER_TYPES[0],
    customerTitle: CUSTOMER_TITLES[0],
    name: "",
    fatherName: "",
    grandFatherName: "",
    gender: "",
    nationality: "",
    origin: "",
    tin: 0,
    foreign: false,
    region: "",
    city: "",
    subcity: "",
    houseNumber: 0,
    phoneNumber: "",
    otherAddress: "",
  };
  const form = useForm({
    mode: "uncontrolled",
    initialValues,
    validate: {
      customerType: (value) =>
        isNotEmpty(value) ? null : "Customer type is required",
      customerTitle: (value) =>
        isNotEmpty(value) ? null : "Customer title is required",
      name: (value) => (isNotEmpty(value) ? null : "Name is required"),
      fatherName: (value) =>
        isNotEmpty(value) ? null : "Father name is required",
      grandFatherName: (value) =>
        isNotEmpty(value) ? null : "Grandfather name is required",
      gender: (value) => (isNotEmpty(value) ? null : "Gender is required"),
      nationality: (value) =>
        isNotEmpty(value) ? null : "Nationality is required",
      origin: (value) => (isNotEmpty(value) ? null : "Origin is required"),
      tin: (value) => (value ? null : "TIN must be a number"),
      region: (value) => (isNotEmpty(value) ? null : "Region is required"),
      city: (value) => (isNotEmpty(value) ? null : "City is required"),
      subcity: (value) => (isNotEmpty(value) ? null : "Subcity is required"),
       houseNumber: (value) => (value ? null : "House number must be a number"),
      phoneNumber: (value) =>
        value.trim().length > 8
          ? null
          : "Phone number is required and must be a valid number",
      otherAddress: (value) =>
        isNotEmpty(value) ? null : "Other address is required",
    },
  });
  const submit = () => {
    console.log(form.validate());
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
    >
      <FieldControl className="">
        <LabelMandatory className="">Customer Type</LabelMandatory>
        <Select
          {...form.getInputProps("customerType")}
          placeholder="Select Customer Type"
          data={CUSTOMER_TYPES}
        />
      </FieldControl>
      <Rows className="mt-5">
        <Title order={2} className="">
          {type}
        </Title>
        <FieldControl>
          <LabelMandatory className="">Title</LabelMandatory>
          <Select
            {...form.getInputProps("customerTitle")}
            placeholder="Select Customer Title"
            data={CUSTOMER_TITLES}
          />
        </FieldControl>
        <Columns>
          <FieldControl>
            <LabelMandatory className="">Name</LabelMandatory>
            <Input {...form.getInputProps("name")} placeholder="Name" />
          </FieldControl>
          <FieldControl>
            <LabelMandatory className="">Father Name</LabelMandatory>
            <Input
              {...form.getInputProps("fatherName")}
              placeholder="Father Name"
            />
          </FieldControl>
          <FieldControl>
            <LabelMandatory className="">Grand Father Name</LabelMandatory>
            <Input
              {...form.getInputProps("grandFatherName")}
              placeholder="Grand Father Name"
            />
          </FieldControl>
        </Columns>
        <section className="flex gap-5">
          <FieldControl className="w-[24rem]">
            <LabelMandatory className="">Gender</LabelMandatory>
            <Select
              {...form.getInputProps("gender")}
              placeholder="Gender"
              data={GENDERS}
            />
          </FieldControl>
          <FieldControl>
            <LabelMandatory className="">Nationality</LabelMandatory>
            <Select
              {...form.getInputProps("nationality")}
              placeholder="Nationality"
              data={NATIONALITIES}
            />
          </FieldControl>
          <FieldControl>
            <LabelMandatory className="">Origin</LabelMandatory>
            <Select
              {...form.getInputProps("origin")}
              placeholder="Origin"
              data={NATIONALITIES}
            />
          </FieldControl>
        </section>

        <FieldControl>
          <LabelMandatory className="">Tin</LabelMandatory>
          <Input {...form.getInputProps("tin")} type="number" maxLength={10} />
        </FieldControl>
      </Rows>
      <Rows className="mt-5">
        <Title order={2} className="">
          Address
        </Title>

        <FieldControl className="flex-row items-center gap-3">
          <Checkbox
            defaultChecked={false}
            {...form.getInputProps("foreign")}
            label="Are you a foreigner ?"
          />
        </FieldControl>
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
            <Label className="">City</Label>
            <Input {...form.getInputProps("city")} placeholder="City" />
          </FieldControl>
          <FieldControl>
            <Label className="">Sub city</Label>
            <Input {...form.getInputProps("subcity")} placeholder="Subcity" />
          </FieldControl>
        </Columns>

        <Columns>
          <FieldControl>
            <Label className="">Woreda</Label>
            <Input {...form.getInputProps("woreda")} placeholder="Woreda" />
          </FieldControl>
          <FieldControl>
            <Label className="">House No.</Label>
            <Input
              type="number"
              {...form.getInputProps("houseNumber")}
              placeholder="House Number"
            />
          </FieldControl>
          <FieldControl>
            <Label className="">Phone No.</Label>
            <Input
              type="number"
              {...form.getInputProps("phoneNumber")}
              placeholder="09..."
            />
          </FieldControl>
        </Columns>
        <Columns>
          <FieldControl className="col-span-3">
            <Label className="">Other Address</Label>
            <Textarea
              {...form.getInputProps("otherAddress")}
              placeholder="Other Address"
            />
          </FieldControl>
        </Columns>
      </Rows>

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
    </form>
  );
};

export default CustomerIdentityRegisteration;
