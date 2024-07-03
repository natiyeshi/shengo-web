"use client";
import React from "react";
import Columns from "../columns";

import { TextInput, Select, Input } from "@mantine/core";

import FormFooterButtons from "../form-footer-buttons";
import { useLoanFormContext } from "@/app/(protected)/dashboard/_contexts/loan/loan-form-context";
import { useLoanOperation } from "@/app/(protected)/dashboard/_contexts/loan/loan-operation-context";
import AreYouSure from "../AreYouSure";
import LoanListDrawer from "./loan-list-drawer";
import { Button } from "@/components/ui/button";
import { Car } from "lucide-react";
import { useDisclosure } from "@mantine/hooks";
import { BANK_NAMES, PAYMENT_TYPES } from "@/_utils/constants";

const LoanRegistration = () => {
  const form = useLoanFormContext();
  const {
    submit,
    alertInfo,
    loans,
    editing,
    nextAndContinue,
    deleteCurrentForm,
  } = useLoanOperation();
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <section>
      <LoanListDrawer title={`Loan's list`} opened={opened} close={close}>
        <Button
          onClick={open}
          size="icon"
          variant="outline"
          className="relative rounded-full"
        >
          <Car />
          <span className="absolute -right-0 -top-0 font-semibold text-primary">
            {loans.length}
          </span>
        </Button>
      </LoanListDrawer>
      {alertInfo && <AreYouSure {...alertInfo} />}
      <form onSubmit={form.onSubmit(submit)} className="flex flex-col gap-5">
        <Input hidden {...form.getInputProps("_id")} key={form.key("_id")} />

        <Select
          label="Loan Type"
          withAsterisk
          {...form.getInputProps("loanType")}
          placeholder="Loan Type"
          data={["InCash", "InProperty"]}
        />

        <Columns>
          <TextInput
            label="Loan Amount"
            placeholder="Loan Amount"
            key={form.key("loanAmount")}
            type="number"
            defaultValue={0.0}
            {...form.getInputProps("loanAmount")}
          />
          <TextInput
            label="Penality For Other"
            placeholder="Penality For Other"
            key={form.key("penaltyForOther")}
            type="number"
            defaultValue={0.0}
            {...form.getInputProps("penaltyForOther")}
          />
          <TextInput
            label="penalty To Government"
            placeholder="penalty To Government"
            key={form.key("penaltyToGovernment")}
            type="number"
            defaultValue={0.0}
            {...form.getInputProps("penaltyToGovernment")}
          />
        </Columns>
        <Columns>
          <div className="flex w-full flex-col gap-1">
            <label htmlFor="" className="text-sm">
              Loan Ending Date
            </label>
            <input
              type="date"
              className="rounded-lg border border-gray-700/20 bg-white px-2 py-1"
              onChange={(value) => {
                form.setFieldValue("loanEndingDate", value.toString());
              }}
            />
          </div>
        </Columns>

        <Columns>
          <TextInput
            label="Penalty"
            placeholder="Penalty"
            key={form.key("penalty")}
            type="number"
            defaultValue={0.0}
            {...form.getInputProps("penalty")}
          />
          <Select
            label="Payment Type"
            withAsterisk
            {...form.getInputProps("paymentType")}
            placeholder="Payment Type"
            data={["In Cash", "Check", "CPO", "In Kind", "In Transfer"]}
          />
        </Columns>

        <FormFooterButtons
          clearAction={() => {
            deleteCurrentForm();
            form.reset();
          }}
          showNextButton={loans.length > 0}
          nextAction={nextAndContinue}
          isEditing={!!editing}
        />
      </form>
    </section>
  );
};

export default LoanRegistration;
