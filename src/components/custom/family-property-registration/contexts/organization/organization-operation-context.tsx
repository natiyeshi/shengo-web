"use client";

import { createContext, useContext, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { AlertInfo } from "../../../AreYouSure";
import { useOrganizationContext } from "./organization-context";
import { useOrganizationFormContext } from "./organization-form-context";
import { CarouselAction } from "@/types";
type UseOrganizationOperationUtilitiesProps = {
  carouselAction: CarouselAction;
};

const useOrganizationOperationUtilities = ({
  carouselAction: { goToNext, goBack },
}: UseOrganizationOperationUtilitiesProps) => {
  const form = useOrganizationFormContext();
  const {
    organizations,
    getOrganizationById,
    addOrganization,
    updateOrganizationById,
    removeOrganizationById,
    clearOrganizations,
  } = useOrganizationContext();

  const { toast } = useToast();

  const [editing, setEditing] = useState<string | undefined>();

  const submit = () => {
    const { hasErrors } = form.validate();
    if (hasErrors) return;

    if (editing) {
      toast({
        title: "Completed!",
        description: `You successfully updated a Organization!`,
        duration: 3000,
      });
      updateOrganizationById(form.getValues()._id, form.getValues());
      setEditing(undefined);
    } else {
      toast({
        title: "Completed!",
        description: `You successfully added a Organization!`,
        duration: 3000,
      });
      addOrganization(form.getValues());
    }
    form.reset();
  };

  const nextAndContinue = () => {
    goToNext();
    // submit();
  };

  const deleteAllOrganization = () => {
    clearOrganizations();
    toast({
      title: "Task Completed!",
      description: `You successfully deleted all Organization!`,
      duration: 3000,
    });
  };

  const deleteCurrentForm = () => {
    form.reset();
  };

  const deleteSingleOrganization = (id: string) => {
    removeOrganizationById(id);
    toast({
      title: "Task Completed!",
      description: `You successfully deleted a Organization`,
      duration: 3000,
    });
  };

  const editOrganization = (_id: string) => {
    setEditing(_id);
    form.setValues(getOrganizationById(_id) || {});
  };

  const [alertInfo, setAlertInfo] = useState<AlertInfo | null>(null);

  return {
    editOrganization,
    deleteSingleOrganization,
    deleteCurrentForm,
    deleteAllOrganization,
    nextAndContinue,
    submit,
    editing,
    setEditing,
    organizations,
    goBack,
    goToNext,
    alertInfo,
    setAlertInfo,
  };
};

type OrganizationOperationType = ReturnType<
  typeof useOrganizationOperationUtilities
>;
const OrganizationOperationInitial: OrganizationOperationType = {
  editOrganization: (index) => {},
  deleteSingleOrganization: (index) => {},
  deleteCurrentForm: () => {},
  deleteAllOrganization: () => {},
  nextAndContinue: () => {},
  submit: () => {},

  editing: undefined,
  setEditing: (index) => {},
  organizations: [],
  goBack: () => {},
  goToNext: () => {},
  alertInfo: null,
  setAlertInfo: (info) => {},
};

// Creating context
const OrganizationOperationContext = createContext<OrganizationOperationType>(
  OrganizationOperationInitial,
);

type OrganizationOperationProviderProps = {
  carouselAction: CarouselAction;
  children: React.ReactNode;
};

export const OrganizationOperationProvider = ({
  carouselAction,
  children,
}: OrganizationOperationProviderProps) => {
  const value = useOrganizationOperationUtilities({ carouselAction });

  return (
    <OrganizationOperationContext.Provider value={value}>
      {children}
    </OrganizationOperationContext.Provider>
  );
};

export const useOrganizationOperation = () => {
  const context = useContext(OrganizationOperationContext);
  if (!context) {
    throw new Error(
      "useOrganizationOperation must be used within a OrganizationOperationProvider",
    );
  }
  return context;
};
