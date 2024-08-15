"use client";
import { Group, Input, TextInput } from "@mantine/core";
import Rows from "../rows";

import { Textarea } from "@mantine/core";
import Columns from "../columns";
import { User } from "lucide-react";

import { Checkbox } from "@mantine/core";
import { Title } from "@mantine/core";
import { Select } from "@mantine/core";

import { Button } from "@/components/ui/button";
import AreYouSure from "../AreYouSure";

import {
  getNationalities,
  getRegionsFromNationality,
  strToObjOfLabelAndValue,
} from "@/_utils";
import CustomerListDrawer from "./customer-list-drawer";
import { useDisclosure } from "@mantine/hooks";

import { useCustomerOperation } from "../../../app/(protected)/dashboard/_contexts/customer/customer-operation-provider";

import { useCustomerFormContext } from "@/app/(protected)/dashboard/_contexts/customer/customer-form-context";
import FormFooterButtons from "../form-footer-buttons";
import { CUSTOMER_TITLES, CUSTOMER_TYPES, GENDERS } from "@/_utils/constants";
import FormBatch from "@/app/(protected)/dashboard/_components/form-batch";

const CustomerIdentityRegisteration = () => {
  const {
    deleteCurrentForm,
    nextAndContinue,
    submit,
    isOrganization,
    customers,
    nationality,
    type,
    alertInfo,
    editing,
  } = useCustomerOperation();

  const form = useCustomerFormContext();
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <div >
      <CustomerListDrawer
        title={`${type}'s list`}
        opened={opened}
        close={close}
      >
        <Button
          onClick={open}
          size="icon"
          variant="outline"
          className="relative rounded-full"
        >
          <User />
          <span className="absolute -right-0 -top-0 font-semibold text-primary">
            {customers.length}
          </span>
        </Button>
      </CustomerListDrawer>
      {alertInfo && <AreYouSure {...alertInfo} />}

      <form onSubmit={form.onSubmit(submit)}>
        <Select
          label="Customer Type"
          withAsterisk
          key={form.key("customerType")}
          {...form.getInputProps("customerType")}
          data={CUSTOMER_TYPES}
        />
        <Input hidden {...form.getInputProps("_id")} key={form.key("_id")} />
        <Rows className="mt-5">
          <FormBatch>{type}</FormBatch>
          {!isOrganization && (
            <>
              <Select
                label="Customer Title"
                withAsterisk
                key={form.key("customerTitle")}
                {...form.getInputProps("customerTitle")}
                data={CUSTOMER_TITLES}
              />

              <Columns>
                <TextInput
                  label="Name"
                  placeholder="Abebe"
                  withAsterisk
                  key={form.key("name")}
                  {...form.getInputProps("name")}
                />

                <TextInput
                  label="Father name"
                  placeholder="Doro"
                  withAsterisk
                  key={form.key("fatherName")}
                  {...form.getInputProps("fatherName")}
                />
                <TextInput
                  label="Grand Father Name"
                  placeholder="Bela"
                  withAsterisk
                  key={form.key("grandFatherName")}
                  {...form.getInputProps("grandFatherName")}
                />
              </Columns>
            </>
          )}

          {isOrganization && (
            <>
              <TextInput
                label="Business Name"
                placeholder="Business Name"
                withAsterisk
                key={form.key("businessName")}
                {...form.getInputProps("businessName")}
              />
              <Columns>
                <Select
                  label="Title"
                  withAsterisk
                  key={form.key("customerTitle")}
                  {...form.getInputProps("customerTitle")}
                  data={CUSTOMER_TITLES}
                />

                <TextInput
                  label="Grantor Name"
                  placeholder="Grantor Name"
                  withAsterisk
                  key={form.key("grantorName")}
                  {...form.getInputProps("grantorName")}
                />

                <Select
                  label="Job Position"
                  withAsterisk
                  key={form.key("jobPosition")}
                  {...form.getInputProps("jobPosition")}
                  data={["Representative", "Vise Manager"]}
                />
              </Columns>
            </>
          )}
          <Columns>
            <Select
              label="Gender"
              withAsterisk
              key={form.key("Gender")}
              {...form.getInputProps("gender")}
              data={GENDERS}
            />

            <Select
              label="Nationality"
              withAsterisk
              key={form.key("nationality")}
              {...form.getInputProps("nationality")}
              data={strToObjOfLabelAndValue(
                getNationalities().map((country) => country.nationality),
              )}
            />

            {!isOrganization && (
              <Select
                label="Origin"
                withAsterisk
                key={form.key("origin")}
                {...form.getInputProps("origin")}
                data={strToObjOfLabelAndValue(
                  getNationalities().map((country) => country.nationality),
                )}
              />
            )}
          </Columns>
          {!isOrganization && (
            <TextInput
              type="number"
              label="Tin"
              key={form.key("tin")}
              {...form.getInputProps("tin")}
              maxLength={10}
              withAsterisk
            />
          )}
        </Rows>
        <Rows className="mt-5">
          <FormBatch>Address</FormBatch>

          <Group>
            <Checkbox
              defaultChecked={false}
              key={form.key("foreign")}
              {...form.getInputProps("foreign")}
              label="Are you a foreigner ?"
            />
          </Group>
          <Columns>
            <Select
              label="Region"
              withAsterisk
              key={form.key("region")}
              {...form.getInputProps("region")}
              data={strToObjOfLabelAndValue(
                getRegionsFromNationality(nationality).map(
                  (item) => item.region,
                ),
              )}
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
              label="Woreda"
              key={form.key("woreda")}
              {...form.getInputProps("woreda")}
              placeholder="Woreda"
            />
            <TextInput
              label="House No."
              type="number"
              key={form.key("houseNumber")}
              {...form.getInputProps("houseNumber")}
              withAsterisk
              placeholder="House Number"
            />

            <TextInput
              type="number"
              label="Phone No."
              key={form.key("phoneNumber")}
              {...form.getInputProps("phoneNumber")}
              withAsterisk
              placeholder="09..."
            />
          </Columns>

          <Textarea
            label="Other Address"
            key={form.key("otherAddress")}
            {...form.getInputProps("otherAddress")}
            placeholder="Other Address"
            rows={3}
          />
        </Rows>

        <FormFooterButtons
          clearAction={() => {
            deleteCurrentForm();
            form.reset();
          }}
          showNextButton={customers.length > 0}
          nextAction={nextAndContinue}
          isEditing={!!editing}
        />
      </form>
    </div>
  );
};

export default CustomerIdentityRegisteration;
