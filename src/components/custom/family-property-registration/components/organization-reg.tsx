"use client";
import { useOrganizationFormContext } from "../contexts/organization/organization-form-context";
import { useOrganizationOperation } from "../contexts/organization/organization-operation-context";

import AreYouSure from "@/components/custom/AreYouSure";
import Columns from "@/components/custom/columns";
import FormFooterButtons from "@/components/custom/form-footer-buttons";
import { TextInput, Select, Input } from "@mantine/core";

const OrganizationRegistration = () => {
  const form = useOrganizationFormContext();
  const {
    submit,
    alertInfo,
    organizations,
    editing,
    nextAndContinue,
    deleteCurrentForm,
  } = useOrganizationOperation();
  return (
    <section>
      {alertInfo && <AreYouSure {...alertInfo} />}
      <form onSubmit={form.onSubmit(submit)} className="flex flex-col gap-5">
        <Input hidden {...form.getInputProps("_id")} key={form.key("_id")} />
        <Columns>
          <TextInput
            label="Company Name"
            placeholder="nesru.eco"
            withAsterisk
            key={form.key("companyName")}
            {...form.getInputProps("companyName")}
          />
          <TextInput
            label="Business Reg No."
            placeholder="et1200"
            withAsterisk
            key={form.key("businessRegNo")}
            {...form.getInputProps("businessRegNo")}
          />
          <TextInput
            label="Business License No."
            placeholder="04442"
            withAsterisk
            key={form.key("businessLincenseNo")}
            {...form.getInputProps("businessLincenseNo")}
          />
        </Columns>
        <Columns>
          <TextInput
            label="Tin"
            placeholder="11102"
            withAsterisk
            type="number"
            key={form.key("tin")}
            {...form.getInputProps("tin")}
          />

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
        </Columns>
        <Columns>
          <Select
            label="Sub City"
            withAsterisk
            placeholder="Sub City"
            key={form.key("subCity")}
            {...form.getInputProps("subCity")}
            data={["Somalia", "Amhara", "Tigrai", "Oromia"]}
          />
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
        </Columns>

        <FormFooterButtons
          clearAction={() => {
            deleteCurrentForm();
            form.reset();
          }}
          showNextButton={organizations.length > 0}
          nextAction={nextAndContinue}
          isEditing={!!editing}
        />
      </form>
    </section>
  );
};

export default OrganizationRegistration;
