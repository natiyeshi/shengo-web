"use client";
import React from "react";
import Columns from "../columns";

import { TextInput, Select, Input } from "@mantine/core";

import {
  getNationalities,
  getRegionsFromNationality,
  strToObjOfLabelAndValue,
} from "@/_utils";

import FormFooterButtons from "../form-footer-buttons";
import { useBusinessFormContext } from "@/app/(protected)/dashboard/_contexts/business/business-form-context";
import { useBusinessOperation } from "@/app/(protected)/dashboard/_contexts/business/business-operation-context";
import AreYouSure from "../AreYouSure";
import BusinessListDrawer from "./business-list-drawer";
import { Button } from "@/components/ui/button";
import { Car } from "lucide-react";
import { useDisclosure } from "@mantine/hooks";
import { BANK_NAMES, PAYMENT_TYPES } from "@/_utils/constants";

const BusinessRegistration = () => {
  const form = useBusinessFormContext();
  const {
    submit,
    alertInfo,
    business,
    editing,
    nextAndContinue,
    deleteCurrentForm,
  } = useBusinessOperation();
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <section>
      <BusinessListDrawer
        title={`Business's list`}
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
            {business.length}
          </span>
        </Button>
      </BusinessListDrawer>
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
        </Columns>

        <Columns>
          <TextInput
            label="Sales Value"
            placeholder="Sales Value"
            key={form.key("salesValue")}
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

        <Columns>
          <Select
            label="Region"
            withAsterisk
            key={form.key("region")}
            {...form.getInputProps("region")}
            data={["Oromia", "Amhara"]}
          />

          <TextInput
            label="City"
            key={form.key("city")}
            {...form.getInputProps("city")}
            withAsterisk
            placeholder="City"
          />

          <TextInput
            label="Sub City"
            key={form.key("subcity")}
            {...form.getInputProps("subcity")}
            withAsterisk
            placeholder="Subcity"
          />
        </Columns>
        <Columns>
          <TextInput
            label="Kebele"
            key={form.key("kebele")}
            {...form.getInputProps("kebele")}
            placeholder="kebele"
          />
          <TextInput
            label="House Number"
            key={form.key("houseNumber")}
            {...form.getInputProps("houseNumber")}
            withAsterisk
            placeholder="House Number"
          />
          <TextInput
            label="Tin"
            key={form.key("tin")}
            {...form.getInputProps("tin")}
            placeholder="Tin"
          />
        </Columns>
        <Columns>
          <TextInput
            label="Business Name"
            key={form.key("businessName")}
            {...form.getInputProps("businessName")}
            placeholder="Business Name"
          />
          <TextInput
            label="Business Type"
            key={form.key("businessType")}
            {...form.getInputProps("businessType")}
            placeholder="Business Type"
          />
          <TextInput
            label="Registration Number"
            key={form.key("registrationNumber")}
            {...form.getInputProps("registrationNumber")}
            placeholder="Registration Number"
          />
          <TextInput
            label="License Number"
            key={form.key("licenseNumber")}
            {...form.getInputProps("licenseNumber")}
            placeholder="License Number"
          />
        </Columns>
        <FormFooterButtons
          clearAction={() => {
            deleteCurrentForm();
            form.reset();
          }}
          showNextButton={business.length > 0}
          nextAction={nextAndContinue}
          isEditing={!!editing}
        />
      </form>
    </section>
  );
};

export default BusinessRegistration;
