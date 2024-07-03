"use client";

import { createContext, useContext, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { AlertInfo } from "../../../../../components/custom/AreYouSure";
import { usePropertyContext } from "./property-context";
import { usePropertyFormContext } from "./property-form-context";

export type CarouselAction = {
  goBack: Function;
  goToNext: Function;
};

type PropertyOperationUtilitiesProps = {
  carouselAction: CarouselAction;
};

const usePropertyOperationUtilities = ({
  carouselAction: { goBack, goToNext },
}: PropertyOperationUtilitiesProps) => {
  const form = usePropertyFormContext();
  const {
    properties,
    getPropertyById,
    addProperty,
    updatePropertyById,
    removePropertyById,
    clearProperties,
  } = usePropertyContext();

  const { toast } = useToast();

  const [editing, setEditing] = useState<string | undefined>();

  const submit = () => {
    const { hasErrors } = form.validate();
    if (hasErrors) return;

    if (editing) {
      toast({
        title: "Completed!",
        description: `You successfully updated a Property!`,
        duration : 3000,
      });
      updatePropertyById(form.getValues()._id, form.getValues());
      setEditing(undefined);
    } else {
      toast({
        title: "Completed!",
        description: `You successfully added a Property!`,
        duration : 3000,
      });
      addProperty(form.getValues());
    }
    form.reset();
  };

  const nextAndContinue = () => {
    // submit();
    goToNext();
  };

  const deleteAllProperty = () => {
    clearProperties();
    toast({
      title: "Task Completed!",
      description: `You successfully deleted all Property!`,
      duration : 3000,
    });
  };

  const deleteCurrentForm = () => {
    form.reset();
  };

  const deleteSingleProperty = (id: string) => {
    removePropertyById(id);
    toast({
      title: "Task Completed!",
      description: `You successfully deleted a Property`,
      duration : 3000,
    });
  };

  const editProperty = (_id: string) => {
    setEditing(_id);
    form.setValues(getPropertyById(_id) || {});
  };

  const [alertInfo, setAlertInfo] = useState<AlertInfo | null>(null);

  return {
    editProperty,
    deleteSingleProperty,
    deleteCurrentForm,
    deleteAllProperty,
    nextAndContinue,
    submit,
    editing,
    setEditing,
    properties,
    goBack,
    goToNext,
    alertInfo,
    setAlertInfo,
  };
};

type PropertyOperationType = ReturnType<typeof usePropertyOperationUtilities>;
const PropertyOperationInitial: PropertyOperationType = {
  editProperty: (index) => {},
  deleteSingleProperty: (index) => {},
  deleteCurrentForm: () => {},
  deleteAllProperty: () => {},
  nextAndContinue: () => {},
  submit: () => {},

  editing: undefined,
  setEditing: (index) => {},
  properties: [],
  goBack: () => {},
  goToNext: () => {},
  alertInfo: null,
  setAlertInfo: (info) => {},
};

// Creating context
const PropertyOperationContext = createContext<PropertyOperationType>(
  PropertyOperationInitial,
);

type PropertyOperationProviderProps = {
  carouselAction: CarouselAction;
  children: React.ReactNode;
};

export const PropertyOperationProvider = ({
  carouselAction,
  children,
}: PropertyOperationProviderProps) => {
  const value = usePropertyOperationUtilities({ carouselAction });

  return (
    <PropertyOperationContext.Provider value={value}>
      {children}
    </PropertyOperationContext.Provider>
  );
};

export const usePropertyOperation = () => {
  const context = useContext(PropertyOperationContext);
  if (!context) {
    throw new Error(
      "usePropertyOperation must be used within a PropertyOperationProvider",
    );
  }
  return context;
};
