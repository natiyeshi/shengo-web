"use client";

import { createContext, useContext, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { AlertInfo } from "../../../../../components/custom/AreYouSure";
import { useLeaseContext } from "./lease-context";
import { useLeaseFormContext } from "./lease-form-context";

export type CarouselAction = {
  goBack: Function;
  goToNext: Function;
};

type LeaseOperationUtilitiesProps = {
  carouselAction: CarouselAction;
};

const useLeaseOperationUtilities = ({
  carouselAction: { goBack, goToNext },
}: LeaseOperationUtilitiesProps) => {
  const form = useLeaseFormContext();
  const {
    leases,
    getLeaseById,
    addLease,
    updateLeaseById,
    removeLeaseById,
    clearLeases,
  } = useLeaseContext();

  const { toast } = useToast();

  const [editing, setEditing] = useState<string | undefined>();

  const submit = () => {
    const { hasErrors } = form.validate();
    if (hasErrors) return;

    if (editing) {
      toast({
        title: "Completed!",
        description: `You successfully updated a Lease!`,
        duration : 3000,
      });
      updateLeaseById(form.getValues()._id, form.getValues());
      setEditing(undefined);
    } else {
      toast({
        title: "Completed!",
        description: `You successfully added a Leaseaaa`,
        duration : 3000,
      });
      addLease(form.getValues());
    }
    form.reset();
  };

  const nextAndContinue = () => {
    // submit();
    goToNext();
  };

  const deleteAllLease = () => {
    clearLeases();
    toast({
      title: "Task Completed!",
      description: `You successfully deleted all Lease!`,
      duration : 3000,
    });
  };

  const deleteCurrentForm = () => {
    form.reset();
  };

  const deleteSingleLease = (id: string) => {
    removeLeaseById(id);
    toast({
      title: "Task Completed!",
      description: `You successfully deleted a Lease`,
      duration : 3000,
    });
  };

  const editLease = (_id: string) => {
    setEditing(_id);
    form.setValues(getLeaseById(_id) || {});
  };

  const [alertInfo, setAlertInfo] = useState<AlertInfo | null>(null);

  return {
    editLease,
    deleteSingleLease,
    deleteCurrentForm,
    deleteAllLease,
    nextAndContinue,
    submit,
    editing,
    setEditing,
    leases,
    goBack,
    goToNext,
    alertInfo,
    setAlertInfo,
  };
};

type LeaseOperationType = ReturnType<typeof useLeaseOperationUtilities>;
const LeaseOperationInitial: LeaseOperationType = {
  editLease: (index) => {},
  deleteSingleLease: (index) => {},
  deleteCurrentForm: () => {},
  deleteAllLease: () => {},
  nextAndContinue: () => {},
  submit: () => {},

  editing: undefined,
  setEditing: (index) => {},
  leases: [],
  goBack: () => {},
  goToNext: () => {},
  alertInfo: null,
  setAlertInfo: (info) => {},
};

// Creating context
const LeaseOperationContext = createContext<LeaseOperationType>(
  LeaseOperationInitial,
);

type LeaseOperationProviderProps = {
  carouselAction: CarouselAction;
  children: React.ReactNode;
};

export const LeaseOperationProvider = ({
  carouselAction,
  children,
}: LeaseOperationProviderProps) => {
  const value = useLeaseOperationUtilities({ carouselAction });

  return (
    <LeaseOperationContext.Provider value={value}>
      {children}
    </LeaseOperationContext.Provider>
  );
};

export const useLeaseOperation = () => {
  const context = useContext(LeaseOperationContext);

  return context;
};
