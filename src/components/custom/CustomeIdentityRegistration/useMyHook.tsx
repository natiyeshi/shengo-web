// hooks/useWindowWidth.js
"use client";

import {  useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { initialValues } from "../constants";
import { AlertInf } from "../AreYouSure";
import { HookProps } from "./types";

import {
  PersonInfo,
  useCustomerFormContext,
} from "@/app/(protected)/dashboard/_contexts/customer-form-context";
const useMyHook = ({ type, goBack, goToNext }: HookProps) => {
  const { toast } = useToast();
  const form = useCustomerFormContext();

  const users: PersonInfo[] = [];
  const [persons, setPersons] = useState<PersonInfo[]>([]);
  const [customerType, setCustomerType] = useState(
    form.getValues().customerType,
  );
  const [nationality, setNationality] = useState(form.getValues().nationality);
  const [editing, setEditing] = useState(-1);

  form.watch("customerType", ({ value }) => {
    setCustomerType(value);
  });

  form.watch("nationality", ({ value }) => {
    setNationality(value);
  });

  const isOrganization = customerType === "organization";

  const submit = () => {
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
    nationality,
  };
};

export default useMyHook;
