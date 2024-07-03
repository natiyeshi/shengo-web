"use client";
import React from "react";
import Columns from "../columns";

import { TextInput, Select, Input } from "@mantine/core";

import FormFooterButtons from "../form-footer-buttons";
import { useLeaseFormContext } from "@/app/(protected)/dashboard/_contexts/lease/lease-form-context";
import { useLeaseOperation } from "@/app/(protected)/dashboard/_contexts/lease/lease-operation-context";
import AreYouSure from "../AreYouSure";
import LeaseListDrawer from "./lease-list-drawer";
import { Button } from "@/components/ui/button";
import { Car } from "lucide-react";
import { useDisclosure } from "@mantine/hooks";
import { BANK_NAMES, PAYMENT_TYPES } from "@/_utils/constants";

const LeaseRegistration = () => {
  const form = useLeaseFormContext();
  const {
    submit,
    alertInfo,
    leases,
    editing,
    nextAndContinue,
    deleteCurrentForm,
  } = useLeaseOperation();
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <section>
      <LeaseListDrawer title={`Lease's list`} opened={opened} close={close}>
        <Button
          onClick={open}
          size="icon"
          variant="outline"
          className="relative rounded-full"
        >
          <Car />
          <span className="absolute -right-0 -top-0 font-semibold text-primary">
            {leases.length}
          </span>
        </Button>
      </LeaseListDrawer>
      {alertInfo && <AreYouSure {...alertInfo} />}
      <form onSubmit={form.onSubmit(submit)} className="flex flex-col gap-5">
        <Input hidden {...form.getInputProps("_id")} key={form.key("_id")} />
        <Columns>
          <TextInput
            label="Form Number"
            placeholder="Form Number"
            withAsterisk
            key={form.key("formNumber")}
            {...form.getInputProps("formNumber")}
          />
          <TextInput
            label="Lease Service"
            placeholder="Lease Service"
            withAsterisk
            key={form.key("leaseService")}
            {...form.getInputProps("leaseService")}
          />
          <TextInput
            label="Total Lease Price"
            placeholder="Total Lease Price"
            withAsterisk
            key={form.key("totalLeasePrice")}
            {...form.getInputProps("totalLeasePrice")}
          />
        </Columns>
        <Columns>
          <TextInput
            label="Paid Lease Price"
            placeholder="Paid Lease Price"
            withAsterisk
            key={form.key("paidLeasePrice")}
            {...form.getInputProps("paidLeasePrice")}
          />
          <TextInput
            label="House Number"
            placeholder="House Number"
            withAsterisk
            key={form.key("houseNumber")}
            {...form.getInputProps("houseNumber")}
          />
          <TextInput
            label="Remaining Lease Price"
            placeholder="Remaining Lease Price"
            withAsterisk
            key={form.key("remainingLeasePrice")}
            {...form.getInputProps("remainingLeasePrice")}
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
          <TextInput
            label="Kebele"
            placeholder="Kebele"
            withAsterisk
            key={form.key("kebele")}
            {...form.getInputProps("kebele")}
          />
        </Columns>

        <Columns>
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
            key={form.key("penaltyToGovernment")}
            type="number"
            defaultValue={0.0}
            {...form.getInputProps("penaltyToGovernment")}
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
        <Columns>
          <Select
            label="Bank Name"
            withAsterisk
            {...form.getInputProps("bankName")}
            placeholder="Bank Name"
            data={BANK_NAMES}
          />
          <TextInput
            label="Penalty"
            placeholder="Penalty"
            key={form.key("penalty")}
            type="number"
            defaultValue={0.0}
            {...form.getInputProps("penalty")}
          />
          <TextInput
            label="Book Number"
            placeholder="Book Number"
            key={form.key("bookNumber")}
            type="number"
            defaultValue={0.0}
            {...form.getInputProps("bookNumber")}
          />

        </Columns>

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
            label="Book Given Date"
            placeholder="Book Given Date"
            key={form.key("bookGivenDate")}
            {...form.getInputProps("bookGivenDate")}
          />
        </Columns>

        <FormFooterButtons
          clearAction={() => {
            deleteCurrentForm();
            form.reset();
          }}
          showNextButton={leases.length > 0}
          nextAction={nextAndContinue}
          isEditing={!!editing}
        />
      </form>
    </section>
  );
};

export default LeaseRegistration;
