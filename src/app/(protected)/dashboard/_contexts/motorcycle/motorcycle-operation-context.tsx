"use client";

import { createContext, useContext, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { AlertInfo } from "../../../../../components/custom/AreYouSure";
import { useMotorcycleContext } from "./motorcycle-context";
import { useMotorcycleFormContext } from "./motorcycle-form-context";

export type CarouselAction = {
  goBack: Function;
  goToNext: Function;
};

type MotorcycleOperationUtilitiesProps = {
  carouselAction: CarouselAction;
};

const useMotorcycleOperationUtilities = ({
  carouselAction: { goBack, goToNext },
}: MotorcycleOperationUtilitiesProps) => {
  const form = useMotorcycleFormContext();
  const {
    motorcycles,
    getMotorcycleById,
    addMotorcycle,
    updateMotorcycleById,
    removeMotorcycleById,
    clearMotorcycles,
  } = useMotorcycleContext();

  const { toast } = useToast();

  const [editing, setEditing] = useState<string | undefined>();

  const submit = () => {
    const { hasErrors } = form.validate();
    if (hasErrors) return;

    if (editing) {
      toast({
        title: "Completed!",
        description: `You successfully updated a Motorcycle!`,
      });
      updateMotorcycleById(form.getValues()._id, form.getValues());
      setEditing(undefined);
    } else {
      toast({
        title: "Completed!",
        description: `You successfully added a Motorcycle!`,
      });
      addMotorcycle(form.getValues());
    }
    form.reset();
  };

  const nextAndContinue = () => {
    // submit();
    goToNext();
  };

  const deleteAllMotorcycle = () => {
    clearMotorcycles();
    toast({
      title: "Task Completed!",
      description: `You successfully deleted all Motorcycle!`,
    });
  };

  const deleteCurrentForm = () => {
    form.reset();
  };

  const deleteSingleMotorcycle = (id: string) => {
    removeMotorcycleById(id);
    toast({
      title: "Task Completed!",
      description: `You successfully deleted a Motorcycle`,
    });
  };

  const editMotorcycle = (_id: string) => {
    setEditing(_id);
    form.setValues(getMotorcycleById(_id) || {});
  };

  const [alertInfo, setAlertInfo] = useState<AlertInfo | null>(null);

  return {
    editMotorcycle,
    deleteSingleMotorcycle,
    deleteCurrentForm,
    deleteAllMotorcycle,
    nextAndContinue,
    submit,
    editing,
    setEditing,
    motorcycles,
    goBack,
    goToNext,
    alertInfo,
    setAlertInfo,
  };
};

type MotorcycleOperationType = ReturnType<typeof useMotorcycleOperationUtilities>;
const MotorcycleOperationInitial: MotorcycleOperationType = {
  editMotorcycle: (index) => {},
  deleteSingleMotorcycle: (index) => {},
  deleteCurrentForm: () => {},
  deleteAllMotorcycle: () => {},
  nextAndContinue: () => {},
  submit: () => {},

  editing: undefined,
  setEditing: (index) => {},
  motorcycles: [],
  goBack: () => {},
  goToNext: () => {},
  alertInfo: null,
  setAlertInfo: (info) => {},
};

// Creating context
const MotorcycleOperationContext = createContext<MotorcycleOperationType>(
  MotorcycleOperationInitial,
);

type MotorcycleOperationProviderProps = {
  carouselAction: CarouselAction;
  children: React.ReactNode;
};

export const MotorcycleOperationProvider = ({
  carouselAction,
  children,
}: MotorcycleOperationProviderProps) => {
  const value = useMotorcycleOperationUtilities({ carouselAction });

  return (
    <MotorcycleOperationContext.Provider value={value}>
      {children}
    </MotorcycleOperationContext.Provider>
  );
};

export const useMotorcycleOperation = () => {
  const context = useContext(MotorcycleOperationContext);
  if (!context) {
    throw new Error(
      "useMotorcycleOperation must be used within a MotorcycleOperationProvider",
    );
  }
  return context;
};
