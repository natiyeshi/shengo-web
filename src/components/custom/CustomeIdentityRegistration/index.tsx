"use client";
import { Group, TextInput } from "@mantine/core";
import Rows from "../rows";

import { Textarea } from "@mantine/core";
import Columns from "../columns";
import { Save } from "lucide-react";
import { MdClear } from "react-icons/md";
import { Checkbox } from "@mantine/core";
import { Title } from "@mantine/core";
import { Select } from "@mantine/core";

import { Button } from "@/components/ui/button";
import AreYouSure from "../AreYouSure";
import useMyHook from "./useMyHook";
import { HookProps } from "./types";
import Person from "./person";
import { CUSTOMER_TITLES, CUSTOMER_TYPES, GENDERS } from "@/_utils/constants";
import {
  getNationalities,
  getRegionsFromNationality,
  strToObjOfLabelAndValue,
} from "@/_utils";

const CustomerIdentityRegisteration = ({
  type,
  goBack,
  goToNext,
}: HookProps) => {
  const {
    toast,
    alertInfo,
    editPerson,
    setAlertInfo,
    deleteSinglePerson,
    deleteCurrentForm,
    deleteAllPersons,
    nextAndContinue,
    submit,
    isOrganization,
    editing,
    setEditing,
    persons,
    setPersons,
    users,
    form,
    nationality,
  } = useMyHook({ type, goBack, goToNext });
  return (
    <div>
      {persons && (
        <div className="mb-4 flex w-full flex-wrap gap-3">
          {persons.map((person, ind) => (
            <Person
              key={ind}
              editing={editing == ind}
              onEdit={() => {
                setAlertInfo({
                  title: "Edit information!",
                  description:
                    "If you edit this information, you will lose the current form, are you sure ?",
                  execute: (cont: boolean) => {
                    if (cont) {
                      editPerson(ind);
                    }
                    setAlertInfo(null);
                  },
                });
              }}
              onDelete={() => {
                setAlertInfo({
                  title: "Delete information!",
                  description:
                    "Are you sure you want to delete this information ?",
                  execute: (cont: boolean) => {
                    if (cont) {
                      deleteSinglePerson(ind);
                    }
                    setAlertInfo(null);
                  },
                });
              }}
              person={person}
            />
          ))}
        </div>
      )}
      {alertInfo && <AreYouSure {...alertInfo} />}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <Select
          label="Customer Type"
          withAsterisk
          key={form.key("customerType")}
          {...form.getInputProps("customerType")}
          data={CUSTOMER_TYPES}
        />

        <Rows className="mt-5">
          <Title order={2} className="">
            {type}
          </Title>
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
          <Title order={2} className="">
            Address
          </Title>

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
              placeholder="City"
            />

            <TextInput
              label="Sub City"
              key={form.key("subcity")}
              {...form.getInputProps("subcity")}
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
              placeholder="House Number"
            />

            <TextInput
              type="number"
              label="Phone No."
              key={form.key("phoneNumber")}
              {...form.getInputProps("phoneNumber")}
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

        <section className="my-7 flex justify-end gap-5">
          <Button
            type="button"
            className="text-destructive"
            onClick={() => {
              setAlertInfo({
                title: "Clear form!",
                description: "Are you sure you want to clear this form ?",
                execute: (cont: boolean) => {
                  if (cont) {
                    deleteCurrentForm();
                  }
                  setAlertInfo(null);
                },
              });
            }}
            variant={"outline"}
          >
            <MdClear className="text-bold me-1 text-xl" />
            <span>Clear</span>
          </Button>
          <Button variant={"outline"}>
            <Save className="text-bold me-1 text-xl" />
            <span>Save</span>
          </Button>
        </section>
        {persons.length > 0 && (
          <section className="my-7 flex justify-end gap-5">
            <Button onClick={() => nextAndContinue()} type="button">
              <span>Next</span>
            </Button>
          </section>
        )}
      </form>
    </div>
  );
};

export default CustomerIdentityRegisteration;
