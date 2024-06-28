"use client";

import { createContext, useContext, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { AlertInf } from "../../../../components/custom/AreYouSure";
import { useVehicleContext } from "./vehicle-context";
import { useVehicleFormContext } from "./vehicle-form-context";

export type CarouselAction = {
  goBack: Function;
  goToNext: Function;
};

type VehicleOperationUtilitiesProps = {
  carouselAction: CarouselAction;
};

const useVehicleOperationUtilities = ({
  carouselAction: { goBack, goToNext },
}: VehicleOperationUtilitiesProps) => {
  const form = useVehicleFormContext();
  const {
    vehicles,
    getVehicleById,
    addVehicle,
    updateVehicleById,
    removeVehicleById,
    clearVehicles,
  } = useVehicleContext();

  const { toast } = useToast();

  const [editing, setEditing] = useState<string | undefined>();

  const submit = () => {
    const { hasErrors } = form.validate();
    if (hasErrors) return;

    if (editing) {
      toast({
        title: "Completed!",
        description: `You successfully updated a Vehicle!`,
      });
      updateVehicleById(form.getValues()._id, form.getValues());
      setEditing(undefined);
    } else {
      toast({
        title: "Completed!",
        description: `You successfully added a Vehicle!`,
      });
      addVehicle(form.getValues());
    }
    form.reset();
  };

  const nextAndContinue = () => {
    // submit();
    goToNext();
  };

  const deleteAllVehicle = () => {
    clearVehicles();
    toast({
      title: "Task Completed!",
      description: `You successfully deleted all Vehicle!`,
    });
  };

  const deleteCurrentForm = () => {
    form.reset();
  };

  const deleteSingleVehicle = (id: string) => {
    removeVehicleById(id);
    toast({
      title: "Task Completed!",
      description: `You successfully deleted a Vehicle`,
    });
  };

  const editVehicle = (_id: string) => {
    setEditing(_id);
    form.setValues(getVehicleById(_id) || {});
  };

  const [alertInfo, setAlertInfo] = useState<AlertInf | null>(null);

  return {
    editVehicle,
    deleteSingleVehicle,
    deleteCurrentForm,
    deleteAllVehicle,
    nextAndContinue,
    submit,
    editing,
    setEditing,
    vehicles,
    goBack,
    goToNext,
    alertInfo,
    setAlertInfo,
  };
};

type VehicleOperationType = ReturnType<typeof useVehicleOperationUtilities>;
const VehicleOperationInitial: VehicleOperationType = {
  editVehicle: (index) => {},
  deleteSingleVehicle: (index) => {},
  deleteCurrentForm: () => {},
  deleteAllVehicle: () => {},
  nextAndContinue: () => {},
  submit: () => {},

  editing: undefined,
  setEditing: (index) => {},
  vehicles: [],
  goBack: () => {},
  goToNext: () => {},
  alertInfo: null,
  setAlertInfo: (info) => {},
};

// Creating context
const VehicleOperationContext = createContext<VehicleOperationType>(
  VehicleOperationInitial,
);

type VehicleOperationProviderProps = {
  carouselAction: CarouselAction;
  children: React.ReactNode;
};

export const VehicleOperationProvider = ({
  carouselAction,
  children,
}: VehicleOperationProviderProps) => {
  const value = useVehicleOperationUtilities({ carouselAction });

  return (
    <VehicleOperationContext.Provider value={value}>
      {children}
    </VehicleOperationContext.Provider>
  );
};

export const useVehicleOperation = () => {
  const context = useContext(VehicleOperationContext);
  if (!context) {
    throw new Error(
      "useVehicleOperation must be used within a VehicleOperationProvider",
    );
  }
  return context;
};
