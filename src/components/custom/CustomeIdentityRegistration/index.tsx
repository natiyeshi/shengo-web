"use client";
import { Label } from "@/components/ui/label";
import FieldControl from "../field-control";
import { Input } from "@mantine/core";
import Rows from "../rows";
import { MdPerson } from "react-icons/md";
import { MdEdit, MdDelete } from "react-icons/md";
import { useToast } from "@/components/ui/use-toast";
import {
  CUSTOMER_TITLES,
  CUSTOMER_TYPES,
  GENDERS,
  NATIONALITIES,
} from "../constants";
// import { getRegions, stringToObjectOfTitleValue } from "../_utils";
import { Textarea } from "@mantine/core";
import Columns from "../columns";
import { Save } from "lucide-react";
import { MdClear } from "react-icons/md";
import { Checkbox } from "@mantine/core";
import LabelMandatory from "../label-mandatory";
import { Title } from "@mantine/core";
import { Select } from "@mantine/core";
import { useState } from "react";
import { useForm } from "@mantine/form";
import { Button } from "@/components/ui/button";
import AreYouSure, { AlertInf } from "../AreYouSure";
import useMyHook from "./useMyHook";
import { HookProps } from "./types";
import Person from "./person";

const CustomerIdentityRegisteration = ({ type, goBack, goToNext }: HookProps) => {
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
  } = useMyHook({ type, goBack, goToNext })
  return (
    <div>
      {persons && (
        <div className="mb-4 flex w-full flex-wrap gap-3">
          {persons.map((person, ind) => (
            <Person
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
        <FieldControl className="">
          <LabelMandatory className="">Customer Type</LabelMandatory>
          <Select
            {...form.getInputProps("customerType")}
            data={CUSTOMER_TYPES}
          />
        </FieldControl>
        <Rows className="mt-5">
          <Title order={2} className="">
            {type}
          </Title>
          {!isOrganization && (
            <>
              <FieldControl>
                <LabelMandatory className="">Title</LabelMandatory>
                <Select
                  {...form.getInputProps("customerTitle")}
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
                  <LabelMandatory className="">
                    Grand Father Name
                  </LabelMandatory>
                  <Input
                    {...form.getInputProps("grandFatherName")}
                    placeholder="Grand Father Name"
                  />
                </FieldControl>
              </Columns>
            </>
          )}

          {isOrganization && (
            <>
              <FieldControl>
                <LabelMandatory className="">Business Name</LabelMandatory>
                <Input
                  {...form.getInputProps("businessName")}
                  placeholder="Business Name"
                />
              </FieldControl>
              <Columns>
                <FieldControl>
                  <LabelMandatory className="">Title</LabelMandatory>
                  <Select
                    {...form.getInputProps("customerTitle")}
                    data={CUSTOMER_TITLES}
                  />
                </FieldControl>

                <FieldControl>
                  <LabelMandatory className="">Grantor Name</LabelMandatory>
                  <Input
                    {...form.getInputProps("grantorName")}
                    placeholder="Grantor Name"
                  />
                </FieldControl>
                <FieldControl>
                  <LabelMandatory className=""> Job Position</LabelMandatory>
                  <Select
                    {...form.getInputProps("jobPosition")}
                    data={["Representative", "Vise Manager"]}
                  />
                </FieldControl>
              </Columns>
            </>
          )}
          <section className="flex gap-5">
            <FieldControl className="w-[24rem]">
              <LabelMandatory className="">Gender</LabelMandatory>
              <Select
                {...form.getInputProps("gender")}
                data={GENDERS}
              />
            </FieldControl>
            <FieldControl>
              <LabelMandatory className="">Nationality</LabelMandatory>
              <Select
                {...form.getInputProps("nationality")}
                data={NATIONALITIES}
              />
            </FieldControl>
            {!isOrganization && (
              <FieldControl>
                <LabelMandatory className="">Origin</LabelMandatory>
                <Select
                  {...form.getInputProps("origin")}
                  data={NATIONALITIES}
                />
              </FieldControl>
            )}
          </section>
          {!isOrganization && (
            <FieldControl>
              <LabelMandatory className="">Tin</LabelMandatory>
              <Input
                {...form.getInputProps("tin")}
                type="number"
                maxLength={10}
              />
            </FieldControl>
          )}
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
