"use client";

import { createContext, useContext, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { AlertInfo } from "../../../../../components/custom/AreYouSure";
import { useResidenceContext } from "./residence-context";
import { useResidenceFormContext } from "./residence-form-context";

export type CarouselAction = {
  goBack: Function;
  goToNext: Function;
};

type ResidenceOperationUtilitiesProps = {
  carouselAction: CarouselAction;
};

const useResidenceOperationUtilities = ({
  carouselAction: { goBack, goToNext },
}: ResidenceOperationUtilitiesProps) => {
  const form = useResidenceFormContext();
  const {
    residences,
    getResidenceById,
    addResidence,
    updateResidenceById,
    removeResidenceById,
    clearResidences,
    
  } = useResidenceContext();

  const { toast } = useToast();

  const [editing, setEditing] = useState<string | undefined>();

  const submit = () => {
    const { hasErrors } = form.validate();
    if (hasErrors) return;

    if (editing) {
      toast({
        title: "Completed!",
        description: `You successfully updated a Residence!`,
      });
      updateResidenceById(form.getValues()._id, form.getValues());
      setEditing(undefined);
    } else {
      toast({
        title: "Completed!",
        description: `You successfully added a Residence!`,
      });
      addResidence(form.getValues());
    }
    form.reset();
  };

  const nextAndContinue = () => {
    // submit();
    goToNext();
  };

  const deleteAllResidence = () => {
    clearResidences();
    toast({
      title: "Task Completed!",
      description: `You successfully deleted all Residence!`,
    });
  };

  const deleteCurrentForm = () => {
    form.reset();
  };

  const deleteSingleResidence = (id: string) => {
    removeResidenceById(id);
    toast({
      title: "Task Completed!",
      description: `You successfully deleted a Residence`,
    });
  };

  const editResidence = (_id: string) => {
    setEditing(_id);
    form.setValues(getResidenceById(_id) || {});
  };

  const [alertInfo, setAlertInfo] = useState<AlertInfo | null>(null);

  return {
    editResidence,
    deleteSingleResidence,
    deleteCurrentForm,
    deleteAllResidence,
    nextAndContinue,
    submit,
    editing,
    setEditing,
    residences,
    goBack,
    goToNext,
    alertInfo,
    setAlertInfo,
  };
};

type ResidenceOperationType = ReturnType<typeof useResidenceOperationUtilities>;
const ResidenceOperationInitial: ResidenceOperationType = {
  editResidence: (index) => {},
  deleteSingleResidence: (index) => {},
  deleteCurrentForm: () => {},
  deleteAllResidence: () => {},
  nextAndContinue: () => {},
  submit: () => {},

  editing: undefined,
  setEditing: (index) => {},
  residences: [],
  goBack: () => {},
  goToNext: () => {},
  alertInfo: null,
  setAlertInfo: (info) => {},
};

// Creating context
const ResidenceOperationContext = createContext<ResidenceOperationType>(
  ResidenceOperationInitial,
);

type ResidenceOperationProviderProps = {
  carouselAction: CarouselAction;
  children: React.ReactNode;
};

export const ResidenceOperationProvider = ({
  carouselAction,
  children,
}: ResidenceOperationProviderProps) => {
  const value = useResidenceOperationUtilities({ carouselAction });

  return (
    <ResidenceOperationContext.Provider value={value}>
      {children}
    </ResidenceOperationContext.Provider>
  );
};

export const useResidenceOperation = () => {
  const context = useContext(ResidenceOperationContext);
  if (!context) {
    throw new Error(
      "useResidenceOperation must be used within a ResidenceOperationProvider",
    );
  }
  return context;
};
