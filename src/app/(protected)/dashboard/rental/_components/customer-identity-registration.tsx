"use client";
import { Label } from "@/components/ui/label";
import FieldControl from "./field-control";
import { Input } from "@mantine/core";
import Rows from "./rows";
import H3 from "@/components/custom/h3";
import { MdPerson } from "react-icons/md";
import { Edit } from "lucide-react";
import { MdEdit, MdDelete } from "react-icons/md";
import { useToast } from "@/components/ui/use-toast";
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
import { Button } from "@/components/ui/button";
import AreYouSure, { AlertInf } from "./AreYouSure";

type Props = {
  type: string;
  goBack: Function;
  goToNext: Function;
};

interface PersonInf {
  customerType: string;
  customerTitle: string;
  name: string;
  fatherName: string;
  grandFatherName: string;
  gender: string;
  nationality: string;
  origin: string;
  tin: number;
  foreign: boolean;
  region: string;
  city: string;
  subcity: string;
  houseNumber: number;
  phoneNumber: string;
  otherAddress: string;

  businessName: string;
  grantorName: string;
  jobPosition: string;
}

const CustomerIdentityRegisteration = ({ type, goBack, goToNext }: Props) => {
  const maxTinLength = 10;
  const [value, setValue] = useState<string | null>("");
  const isNotEmpty = (value: string) => {
    return value && value.trim().length > 0;
  };
  const { toast } = useToast();
  const initialValues: PersonInf = {
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

    businessName: "",
    grantorName: "",
    jobPosition: "",
  };
  const form = useForm({
    mode: "controlled",
    initialValues,
    validate: {
      customerType: (value) =>
        isNotEmpty(value) ? null : "Customer type is required",
      customerTitle: (value) =>
        isNotEmpty(value) ? null : "Customer title is required",
      name: (value): any =>
        form.getValues()["customerType"] === "Organization" || isNotEmpty(value)
          ? null
          : "Name is required",
      fatherName: (value): any =>
        form.getValues()["customerType"] === "Organization" || isNotEmpty(value)
          ? null
          : "Father name is required",
      grandFatherName: (value): any =>
        form.getValues()["customerType"] === "Organization" || isNotEmpty(value)
          ? null
          : "Grandfather name is required",
      gender: (value) => (isNotEmpty(value) ? null : "Gender is required"),
      nationality: (value) =>
        isNotEmpty(value) ? null : "Nationality is required",
      origin: (value) : any => ( form.getValues()["customerType"] === "Organization" || isNotEmpty(value) ? null : "Origin is required"),
      tin: (value): any =>
        form.getValues()["customerType"] === "Organization" || value
          ? null
          : "TIN must be a number",
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

      businessName: (value): any =>
        form.getValues()["customerType"] === "Individual" || isNotEmpty(value)
          ? null
          : "Business Name is required",
      grantorName: (value): any =>
        form.getValues()["customerType"] === "Individual" || isNotEmpty(value)
          ? null
          : "Grantor Name is required",
      jobPosition: (value): any =>
        form.getValues()["customerType"] === "Individual" || isNotEmpty(value)
          ? null
          : "Job Position is required",
    },
  });
  const users: PersonInf[] = [];
  const [persons, setPersons] = useState<PersonInf[]>([]);
  const [editing, setEditing] = useState(-1);
  const isOrganization = form.getValues()["customerType"] === "Organization";

  const submit = () => {
    const { hasErrors } = form.validate();
    if (hasErrors) return ;
    form.setValues(initialValues);
    toast({
      title: "Completed!",
      description: `You successfully Added ${type}!`,
    });
    if (editing != -1) {
      setPersons((p): any => {
        let newValues = [...p];
        newValues[editing] = form.values;
        return newValues;
      });
      setEditing(-1);
    } else {
      setPersons((p): any => [...p, form.values]);
    }
  };

  const nextAndContinue = () => {
    submit();
    goToNext();
  };

  const deleteAllPersons = () => {
    setPersons([]);
    toast({
      title: "Task Completed!",
      description: `You successfully deleted all ${type}!`,
    });
  };

  const deleteCurrentForm = () => {
    form.setValues(initialValues);
  };

  const deleteSinglePerson = (index: number) => {
    setPersons((datas) => datas.filter((data, i) => index != i));
    toast({
      title: "Task Completed!",
      description: `You successfully deleted a ${type}!`,
    });
  };

  const editPerson = (index: number) => {
    setEditing(index);
    form.setValues(persons[index]);
  };

  const [alertInfo, setAlertInfo] = useState<AlertInf | null>(null);

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
          {!isOrganization && (
            <>
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
                    placeholder="Select Customer Title"
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
                    placeholder="Job Position"
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
            {!isOrganization && (
              <FieldControl>
                <LabelMandatory className="">Origin</LabelMandatory>
                <Select
                  {...form.getInputProps("origin")}
                  placeholder="Origin"
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

const Person = ({
  person,
  onDelete,
  onEdit,
  editing,
}: {
  person: PersonInf;
  onDelete: Function;
  onEdit: Function;
  editing: boolean;
}) => {
  const isOrganization = person.customerType === "Organization";
  return (
    <div
      className={`flex w-fit gap-4 rounded-xl border bg-gray-200 px-5 py-2 shadow-lg`}
    >
      <div className="flex">
        <MdPerson className="my-auto text-3xl text-primary" />
      </div>
      <div className="flex flex-col justify-between gap-1">
        <div className="flex gap-2 text-sm">
          <p>
            {person.customerTitle}
            {isOrganization ? person.grantorName : person.name}
          </p>
        </div>
        <div className="flex w-full justify-between gap-2">
          <button
            onClick={() => onEdit()}
            className="flex gap-1 bg-transparent px-0 py-1 text-sm text-black hover:underline"
          >
            {/* <MdEdit className="my-auto text-sm" /> */}
            <span>Edit</span>
          </button>
          <button
            onClick={() => onDelete()}
            className="text-destractive flex gap-1 bg-transparent px-0 py-1 text-sm hover:underline"
          >
            {/* <MdDelete className="my-auto text-sm" /> */}
            <span>Delete</span>
          </button>
        </div>
        {editing && (
          <p className="text-xs font-semibold text-primary">
            Editing this file...
          </p>
        )}
      </div>
    </div>
  );
};

export default CustomerIdentityRegisteration;
