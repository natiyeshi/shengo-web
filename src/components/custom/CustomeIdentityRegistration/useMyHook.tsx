// hooks/useWindowWidth.js
"use client";

import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import {
  initialValues,
} from "../constants";
import { useForm } from "@mantine/form";
import AreYouSure, { AlertInf } from "../AreYouSure";
import { PersonInf, HookProps } from "./types";
import { isNotEmpty } from "@/lib/utils";

const useMyHook = ({ type, goBack, goToNext }: HookProps) => {
  const { toast } = useToast();

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
      origin: (value): any =>
        form.getValues()["customerType"] === "Organization" || isNotEmpty(value)
          ? null
          : "Origin is required",
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
    console.log(form.validate());
    const { hasErrors } = form.validate();
    if (hasErrors) return;
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
  return {
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
  };
};

export default useMyHook;
