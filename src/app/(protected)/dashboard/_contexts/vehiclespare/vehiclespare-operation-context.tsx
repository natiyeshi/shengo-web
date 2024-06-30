"use client";

import { createContext, useContext, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { AlertInfo } from "../../../../../components/custom/AreYouSure";
import { useVehiclespareContext } from "./vehiclespare-context";
import { useVehiclespareFormContext } from "./vehiclespare-form-context";

export type CarouselAction = {
  goBack: Function;
  goToNext: Function;
};

type VehiclespareOperationUtilitiesProps = {
  carouselAction: CarouselAction;
};

const useVehiclespareOperationUtilities = ({
  carouselAction: { goBack, goToNext },
}: VehiclespareOperationUtilitiesProps) => {
  const form = useVehiclespareFormContext();
  const {
    vehiclespares,
    getVehiclespareById,
    addVehiclespare,
    updateVehiclespareById,
    removeVehiclespareById,
    clearVehiclespares,
    
  } = useVehiclespareContext();

  const { toast } = useToast();

  const [editing, setEditing] = useState<string | undefined>();

  const submit = () => {
    const { hasErrors } = form.validate();
    if (hasErrors) return;

    if (editing) {
      toast({
        title: "Completed!",
        description: `You successfully updated a Vehiclespare!`,
      });
      updateVehiclespareById(form.getValues()._id, form.getValues());
      setEditing(undefined);
    } else {
      toast({
        title: "Completed!",
        description: `You successfully added a Vehiclespare!`,
      });
      addVehiclespare(form.getValues());
    }
    form.reset();
  };

  const nextAndContinue = () => {
    // submit();
    goToNext();
  };

  const deleteAllVehiclespare = () => {
    clearVehiclespares();
    toast({
      title: "Task Completed!",
      description: `You successfully deleted all Vehiclespare!`,
    });
  };

  const deleteCurrentForm = () => {
    form.reset();
  };

  const deleteSingleVehiclespare = (id: string) => {
    removeVehiclespareById(id);
    toast({
      title: "Task Completed!",
      description: `You successfully deleted a Vehiclespare`,
    });
  };

  const editVehiclespare = (_id: string) => {
    setEditing(_id);
    form.setValues(getVehiclespareById(_id) || {});
  };

  const [alertInfo, setAlertInfo] = useState<AlertInfo | null>(null);

  return {
    editVehiclespare,
    deleteSingleVehiclespare,
    deleteCurrentForm,
    deleteAllVehiclespare,
    nextAndContinue,
    submit,
    editing,
    setEditing,
    vehiclespares,
    goBack,
    goToNext,
    alertInfo,
    setAlertInfo,
  };
};

type VehiclespareOperationType = ReturnType<typeof useVehiclespareOperationUtilities>;
const VehiclespareOperationInitial: VehiclespareOperationType = {
  editVehiclespare: (index) => {},
  deleteSingleVehiclespare: (index) => {},
  deleteCurrentForm: () => {},
  deleteAllVehiclespare: () => {},
  nextAndContinue: () => {},
  submit: () => {},

  editing: undefined,
  setEditing: (index) => {},
  vehiclespares: [],
  goBack: () => {},
  goToNext: () => {},
  alertInfo: null,
  setAlertInfo: (info) => {},
};

// Creating context
const VehiclespareOperationContext = createContext<VehiclespareOperationType>(
  VehiclespareOperationInitial,
);

type VehiclespareOperationProviderProps = {
  carouselAction: CarouselAction;
  children: React.ReactNode;
};

export const VehiclespareOperationProvider = ({
  carouselAction,
  children,
}: VehiclespareOperationProviderProps) => {
  const value = useVehiclespareOperationUtilities({ carouselAction });

  return (
    <VehiclespareOperationContext.Provider value={value}>
      {children}
    </VehiclespareOperationContext.Provider>
  );
};

export const useVehiclespareOperation = () => {
  const context = useContext(VehiclespareOperationContext);
  if (!context) {
    throw new Error(
      "useVehiclespareOperation must be used within a VehiclespareOperationProvider",
    );
  }
  return context;
};
