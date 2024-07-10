"use client";
import { useResidenceFormContext } from "../contexts/residence/residence-form-context";
import { useResidenceOperation } from "../contexts/residence/residence-operation-context";
import { useDisclosure } from "@mantine/hooks";

import AreYouSure from "@/components/custom/AreYouSure";
import Columns from "@/components/custom/columns";
import FormFooterButtons from "@/components/custom/form-footer-buttons";
import { TextInput, Select, Input, Checkbox, Textarea } from "@mantine/core";

const ResidenceRegistration = () => {
  const form = useResidenceFormContext();
  const {
    submit,
    alertInfo,
    residences,
    editing,
    nextAndContinue,
    deleteCurrentForm,
  } = useResidenceOperation();
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <section>
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

          <Select
            label="City"
            withAsterisk
            placeholder="City"
            key={form.key("city")}
            {...form.getInputProps("city")}
            data={["Somalia", "Amhara", "Tigrai", "Oromia"]}
          />
          <Select
            label="Sub City"
            withAsterisk
            placeholder="Sub City"
            key={form.key("subCity")}
            {...form.getInputProps("subCity")}
            data={["Somalia", "Amhara", "Tigrai", "Oromia"]}
          />
        </Columns>
        <Columns>
          <Select
            label="Woreda"
            withAsterisk
            placeholder="Woreda"
            key={form.key("woreda")}
            {...form.getInputProps("woreda")}
            data={["Somalia", "Amhara", "Tigrai", "Oromia"]}
          />

          <TextInput
            label="House Number"
            placeholder="House Number"
            withAsterisk
            key={form.key("houseNumber")}
            {...form.getInputProps("houseNumber")}
          />
          <TextInput
            label="Book Number"
            placeholder="Book Number"
            withAsterisk
            key={form.key("bookNumber")}
            {...form.getInputProps("bookNumber")}
          />
        </Columns>

        <Columns>
          <TextInput
            label="Area"
            placeholder="Area"
            withAsterisk
            key={form.key("area")}
            {...form.getInputProps("area")}
          />

          <Select
            label="Service"
            withAsterisk
            placeholder="Service"
            key={form.key("service")}
            {...form.getInputProps("service")}
            data={[
              "For Living",
              "For Business",
              "For Organization",
              "For Mixed",
            ]}
          />
          <Checkbox
            defaultChecked
            label="Is it Condominium"
            className="my-auto"
            {...form.getInputProps("isCondominium")}
          />
        </Columns>

        <Textarea
          label="Other Address"
          key={form.key("otherAddress")}
          {...form.getInputProps("otherAddress")}
          placeholder="Other Address"
          rows={3}
        />

        <FormFooterButtons
          clearAction={() => {
            deleteCurrentForm();
            form.reset();
          }}
          showNextButton={residences.length > 0}
          nextAction={nextAndContinue}
          isEditing={!!editing}
        />
      </form>
    </section>
  );
};

export default ResidenceRegistration;
