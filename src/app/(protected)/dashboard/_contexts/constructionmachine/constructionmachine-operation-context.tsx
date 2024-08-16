"use client";

import { createContext, useContext, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { AlertInfo } from "../../../../../components/custom/AreYouSure";
import {          useConstructionMachineContext } from "./constructionmachine-context";
import { useConstructionmachineFormContext } from "./constructionmachine-form-context";

export type CarouselAction = {
  goBack: Function;
  goToNext: Function;
};

type ConstructionmachineOperationUtilitiesProps = {
  carouselAction: CarouselAction;
};

const useConstructionmachineOperationUtilities = ({
  carouselAction: { goBack, goToNext },
}: ConstructionmachineOperationUtilitiesProps) => {
  const form = useConstructionmachineFormContext();
  const {
    constructionmachines,
    getConstructionmachineById,
    addConstructionmachine,
    updateConstructionmachineById,
    removeConstructionmachineById,
    clearConstructionmachines,
  } =          useConstructionMachineContext();

  const { toast } = useToast();

  const [editing, setEditing] = useState<string | undefined>();

  const submit = () => {
    const { hasErrors } = form.validate();
    if (hasErrors) return;

    if (editing) {
      toast({
        title: "Completed!",
        description: `You successfully updated a Constructionmachine!`,
      });
      updateConstructionmachineById(form.getValues()._id, form.getValues());
      setEditing(undefined);
    } else {
      toast({
        title: "Completed!",
        description: `You successfully added a Constructionmachine!`,
      });
      addConstructionmachine(form.getValues());
    }
    form.reset();
  };

  const nextAndContinue = () => {
    // submit();
    goToNext();
  };

  const deleteAllConstructionmachine = () => {
    clearConstructionmachines();
    toast({
      title: "Task Completed!",
      description: `You successfully deleted all Constructionmachine!`,
    });
  };

  const deleteCurrentForm = () => {
    form.reset();
  };

  const deleteSingleConstructionmachine = (id: string) => {
    removeConstructionmachineById(id);
    toast({
      title: "Task Completed!",
      description: `You successfully deleted a Constructionmachine`,
    });
  };

  const editConstructionmachine = (_id: string) => {
    setEditing(_id);
    form.setValues(getConstructionmachineById(_id) || {});
  };

  const [alertInfo, setAlertInfo] = useState<AlertInfo | null>(null);

  return {
    editConstructionmachine,
    deleteSingleConstructionmachine,
    deleteCurrentForm,
    deleteAllConstructionmachine,
    nextAndContinue,
    submit,
    editing,
    setEditing,
    constructionmachines,
    goBack,
    goToNext,
    alertInfo,
    setAlertInfo,
  };
};

type ConstructionmachineOperationType = ReturnType<typeof useConstructionmachineOperationUtilities>;
const ConstructionmachineOperationInitial: ConstructionmachineOperationType = {
  editConstructionmachine: (index) => {},
  deleteSingleConstructionmachine: (index) => {},
  deleteCurrentForm: () => {},
  deleteAllConstructionmachine: () => {},
  nextAndContinue: () => {},
  submit: () => {},

  editing: undefined,
  setEditing: (index) => {},
  constructionmachines: [],
  goBack: () => {},
  goToNext: () => {},
  alertInfo: null,
  setAlertInfo: (info) => {},
};

// Creating context
const ConstructionmachineOperationContext = createContext<ConstructionmachineOperationType>(
  ConstructionmachineOperationInitial,
);

type ConstructionmachineOperationProviderProps = {
  carouselAction: CarouselAction;
  children: React.ReactNode;
};

export const ConstructionmachineOperationProvider = ({
  carouselAction,
  children,
}: ConstructionmachineOperationProviderProps) => {
  const value = useConstructionmachineOperationUtilities({ carouselAction });

  return (
    <ConstructionmachineOperationContext.Provider value={value}>
      {children}
    </ConstructionmachineOperationContext.Provider>
  );
};

export const useConstructionmachineOperation = () => {
  const context = useContext(ConstructionmachineOperationContext);

  return context;
};
