"use client";

import { createContext, useContext, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { AlertInfo } from "../../../../../components/custom/AreYouSure";
import { useBusinessContext } from "./business-context";
import { useBusinessFormContext } from "./business-form-context";

export type CarouselAction = {
  goBack: Function;
  goToNext: Function;
};

type BusinessOperationUtilitiesProps = {
  carouselAction: CarouselAction;
};

const useBusinessOperationUtilities = ({
  carouselAction: { goBack, goToNext },
}: BusinessOperationUtilitiesProps) => {
  const form = useBusinessFormContext();
  const {
    business,
    getBusinessById,
    addBusiness,
    updateBusinessById,
    removeBusinessById,
    clearBusiness,
  } = useBusinessContext();

  const { toast } = useToast();

  const [editing, setEditing] = useState<string | undefined>();

  const submit = () => {
    const { hasErrors } = form.validate();
    if (hasErrors) return;

    if (editing) {
      toast({
        title: "Completed!",
        description: `You successfully updated a Business!`,
      });
      updateBusinessById(form.getValues()._id, form.getValues());
      setEditing(undefined);
    } else {
      toast({
        title: "Completed!",
        description: `You successfully added a Business!`,
      });
      addBusiness(form.getValues());
    }
    form.reset();
  };

  const nextAndContinue = () => {
    // submit();
    goToNext();
  };

  const deleteAllBusiness = () => {
    clearBusiness();
    toast({
      title: "Task Completed!",
      description: `You successfully deleted all Business!`,
    });
  };

  const deleteCurrentForm = () => {
    form.reset();
  };

  const deleteSingleBusiness = (id: string) => {
    removeBusinessById(id);
    toast({
      title: "Task Completed!",
      description: `You successfully deleted a Business`,
    });
  };

  const editBusiness = (_id: string) => {
    setEditing(_id);
    form.setValues(getBusinessById(_id) || {});
  };

  const [alertInfo, setAlertInfo] = useState<AlertInfo | null>(null);

  return {
    editBusiness,
    deleteSingleBusiness,
    deleteCurrentForm,
    deleteAllBusiness,
    nextAndContinue,
    submit,
    editing,
    setEditing,
    business,
    goBack,
    goToNext,
    alertInfo,
    setAlertInfo,
  };
};

type BusinessOperationType = ReturnType<typeof useBusinessOperationUtilities>;
const BusinessOperationInitial: BusinessOperationType = {
  editBusiness: (index) => {},
  deleteSingleBusiness: (index) => {},
  deleteCurrentForm: () => {},
  deleteAllBusiness: () => {},
  nextAndContinue: () => {},
  submit: () => {},

  editing: undefined,
  setEditing: (index) => {},
  business: [],
  goBack: () => {},
  goToNext: () => {},
  alertInfo: null,
  setAlertInfo: (info) => {},
};

// Creating context
const BusinessOperationContext = createContext<BusinessOperationType>(
  BusinessOperationInitial,
);

type BusinessOperationProviderProps = {
  carouselAction: CarouselAction;
  children: React.ReactNode;
};

export const BusinessOperationProvider = ({
  carouselAction,
  children,
}: BusinessOperationProviderProps) => {
  const value = useBusinessOperationUtilities({ carouselAction });

  return (
    <BusinessOperationContext.Provider value={value}>
      {children}
    </BusinessOperationContext.Provider>
  );
};

export const useBusinessOperation = () => {
  const context = useContext(BusinessOperationContext);
  if (!context) {
    throw new Error(
      "useBusinessOperation must be used within a BusinessOperationProvider",
    );
  }
  return context;
};
