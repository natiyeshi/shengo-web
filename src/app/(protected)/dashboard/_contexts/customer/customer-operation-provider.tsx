"use client";

import { createContext, useContext, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { AlertInfo } from "../../../../../components/custom/AreYouSure";

import { useCustomerFormContext } from "@/app/(protected)/dashboard/_contexts/customer/customer-form-context";
import { useCustomerContext } from "./customer-context";

export type CarouselAction = {
  goBack: Function;
  goToNext: Function;
};

type CustomerOperationUtilitiesProps = {
  type: string;
  carouselAction: CarouselAction;
};

const useCustomerOperationUtilities = ({
  type,
  carouselAction: { goBack, goToNext },
}: CustomerOperationUtilitiesProps) => {
  const form = useCustomerFormContext();
  const {
    customers,
    getCustomerById,
    getCustomersByType,
    addCustomer,
    updateCustomerById,
    removeCustomerById,
    removeCustomersByType,
  } = useCustomerContext();

  const { toast } = useToast();

  const [customerType, setCustomerType] = useState(
    form.getValues().customerType,
  );
  const [nationality, setNationality] = useState(form.getValues().nationality);
  const [editing, setEditing] = useState<string | undefined>();

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

    if (editing) {
      toast({
        title: "Completed!",
        description: `You successfully updated a ${type}!`,
      });
      updateCustomerById(form.getValues()._id, form.getValues());
      setEditing(undefined);
    } else {
      toast({
        title: "Completed!",
        description: `You successfully added ${type}!`,
      });
      addCustomer(type, form.getValues());
    }
    form.reset();
  };

  const nextAndContinue = () => {
    // submit();
    goToNext();
  };

  const deleteAllCustomers = () => {
    removeCustomersByType(type);
    toast({
      title: "Task Completed!",
      description: `You successfully deleted all ${type}!`,
    });
  };

  const deleteCurrentForm = () => {
    form.reset();
  };

  const deleteSingleCustomer = (id: string) => {
    removeCustomerById(id);
    toast({
      title: "Task Completed!",
      description: `You successfully deleted a ${type}!`,
    });
  };

  const editCustomer = (_id: string) => {
    setEditing(_id);
    form.setValues(getCustomerById(_id) || {});
  };

  const [alertInfo, setAlertInfo] = useState<AlertInfo | null>(null);

  return {
    editCustomer,
    deleteSingleCustomer,
    deleteCurrentForm,
    deleteAllCustomers,
    nextAndContinue,
    submit,
    isOrganization,
    editing,
    setEditing,
    customers: getCustomersByType(type),
    nationality,
    type,
    goBack,
    goToNext,
    alertInfo,
    setAlertInfo,
  };
};

type CustomerOperationType = ReturnType<typeof useCustomerOperationUtilities>;
const customerOperationInitial: CustomerOperationType = {
  editCustomer: (index) => {},
  deleteSingleCustomer: (index) => {},
  deleteCurrentForm: () => {},
  deleteAllCustomers: () => {},
  nextAndContinue: () => {},
  submit: () => {},
  isOrganization: false,
  editing: undefined,
  setEditing: (index) => {},
  customers: [],
  nationality: "",
  type: "",
  goBack: () => {},
  goToNext: () => {},
  alertInfo: null,
  setAlertInfo: (info) => {},
};

// Creating context
const CustomerOperationContext = createContext<CustomerOperationType>(
  customerOperationInitial,
);

type CustomerOperationProviderProps = {
  carouselAction: CarouselAction;
  type: string;
  children: React.ReactNode;
};

export const CustomerOperationProvider = ({
  type,
  carouselAction,
  children,
}: CustomerOperationProviderProps) => {
  const value = useCustomerOperationUtilities({ type, carouselAction });

  return (
    <CustomerOperationContext.Provider value={value}>
      {children}
    </CustomerOperationContext.Provider>
  );
};

export const useCustomerOperation = () => {
  const context = useContext(CustomerOperationContext);
  return context;
};
