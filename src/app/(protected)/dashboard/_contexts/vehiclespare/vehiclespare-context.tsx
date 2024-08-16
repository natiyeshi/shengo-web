import { Vehiclespare } from "./vehiclespare-form-context";
import { ReactNode, createContext, useContext, useState } from "react";

type VehiclespareContextType = {
  vehiclespares: Vehiclespare[];
  getVehiclespareById: (_id: string) => Vehiclespare | undefined;
  addVehiclespare: (vehiclespare: Vehiclespare) => void;
  updateVehiclespareById: (
    _id: string,
    updatedvehiclespare: Partial<Vehiclespare>,
  ) => void;
  removeVehiclespareById: (id: string) => void;
  clearVehiclespares: () => void;
};

const vehiclespareContextInitial: VehiclespareContextType = {
  vehiclespares: [],
  getVehiclespareById: (id: string) => undefined,
  addVehiclespare: (vehiclespare: Vehiclespare) => {},
  updateVehiclespareById: (
    id: string,
    updatedVehiclespare: Partial<Vehiclespare>,
  ) => {},
  removeVehiclespareById: (id: string) => {},
  clearVehiclespares: () => {},
};

const VehiclespareContext = createContext<VehiclespareContextType>(
  vehiclespareContextInitial,
);

type vehiclespareContextProviderProps = {
  children: ReactNode;
};

export const VehiclespareContextProvider = ({
  children,
}: vehiclespareContextProviderProps) => {
  const [vehiclespares, setVehiclespares] = useState<Vehiclespare[]>([]);

  const addVehiclespare = (vehiclespare: Vehiclespare) => {
    setVehiclespares((prev) => [
      ...prev,
      { ...vehiclespare, _id: Date.now().toString() },
    ]);
  };

  const getVehiclespareById = (id: string) => {
    return vehiclespares.find((vehiclespare) => vehiclespare._id === id);
  };

  const updateVehiclespareById = (
    id: string,
    updatedVehiclespare: Partial<Vehiclespare>,
  ) => {
    setVehiclespares((prev) =>
      prev.map((vehiclespare) =>
        vehiclespare._id === id
          ? { ...vehiclespare, ...updatedVehiclespare }
          : vehiclespare,
      ),
    );
  };

  const removeVehiclespareById = (id: string) => {
    setVehiclespares((prev) =>
      prev.filter((vehiclespare) => vehiclespare._id !== id),
    );
  };

  const clearVehiclespares = () => {
    setVehiclespares([]);
  };
  return (
    <VehiclespareContext.Provider
      value={{
        vehiclespares,
        getVehiclespareById,
        addVehiclespare,
        updateVehiclespareById,
        removeVehiclespareById,
        clearVehiclespares,
      }}
    >
      {children}
    </VehiclespareContext.Provider>
  );
};

export const useVehiclespareContext = () => {
  const context = useContext(VehiclespareContext);

  return context;
};
