"use client";

import { createContext, useContext, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { AlertInfo } from "../../../../../components/custom/AreYouSure";
import { useLoanContext } from "./loan-context";
import { useLoanFormContext } from "./loan-form-context";

export type CarouselAction = {
  goBack: Function;
  goToNext: Function;
};

type LoanOperationUtilitiesProps = {
  carouselAction: CarouselAction;
};

const useLoanOperationUtilities = ({
  carouselAction: { goBack, goToNext },
}: LoanOperationUtilitiesProps) => {
  const form = useLoanFormContext();
  const {
    loans,
    getLoanById,
    addLoan,
    updateLoanById,
    removeLoanById,
    clearLoans,
  } = useLoanContext();

  const { toast } = useToast();

  const [editing, setEditing] = useState<string | undefined>();

  const submit = () => {
    const { hasErrors } = form.validate();
    if (hasErrors) return;

    if (editing) {
      toast({
        title: "Completed!",
        description: `You successfully updated a Loan!`,
        duration: 3000,
      });
      updateLoanById(form.getValues()._id, form.getValues());
      setEditing(undefined);
    } else {
      toast({
        title: "Completed!",
        description: `You successfully added a Loanaaa`,
        duration: 3000,
      });
      addLoan(form.getValues());
    }
    form.reset();
  };

  const nextAndContinue = () => {
    // submit();
    goToNext();
  };

  const deleteAllLoan = () => {
    clearLoans();
    toast({
      title: "Task Completed!",
      description: `You successfully deleted all Loan!`,
      duration: 3000,
    });
  };

  const deleteCurrentForm = () => {
    form.reset();
  };

  const deleteSingleLoan = (id: string) => {
    removeLoanById(id);
    toast({
      title: "Task Completed!",
      description: `You successfully deleted a Loan`,
      duration: 3000,
    });
  };

  const editLoan = (_id: string) => {
    setEditing(_id);
    form.setValues(getLoanById(_id) || {});
  };

  const [alertInfo, setAlertInfo] = useState<AlertInfo | null>(null);

  return {
    editLoan,
    deleteSingleLoan,
    deleteCurrentForm,
    deleteAllLoan,
    nextAndContinue,
    submit,
    editing,
    setEditing,
    loans,
    goBack,
    goToNext,
    alertInfo,
    setAlertInfo,
  };
};

type LoanOperationType = ReturnType<typeof useLoanOperationUtilities>;
const LoanOperationInitial: LoanOperationType = {
  editLoan: (index) => {},
  deleteSingleLoan: (index) => {},
  deleteCurrentForm: () => {},
  deleteAllLoan: () => {},
  nextAndContinue: () => {},
  submit: () => {},

  editing: undefined,
  setEditing: (index) => {},
  loans: [],
  goBack: () => {},
  goToNext: () => {},
  alertInfo: null,
  setAlertInfo: (info) => {},
};

// Creating context
const LoanOperationContext = createContext<LoanOperationType>(
  LoanOperationInitial,
);

type LoanOperationProviderProps = {
  carouselAction: CarouselAction;
  children: React.ReactNode;
};

export const LoanOperationProvider = ({
  carouselAction,
  children,
}: LoanOperationProviderProps) => {
  const value = useLoanOperationUtilities({ carouselAction });

  return (
    <LoanOperationContext.Provider value={value}>
      {children}
    </LoanOperationContext.Provider>
  );
};

export const useLoanOperation = () => {
  const context = useContext(LoanOperationContext);
  if (!context) {
    throw new Error(
      "useLoanOperation must be used within a LoanOperationProvider",
    );
  }
  return context;
};
