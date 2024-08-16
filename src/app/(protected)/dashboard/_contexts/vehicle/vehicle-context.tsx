import { Vehicle } from "./vehicle-form-context";
import { ReactNode, createContext, useContext, useState } from "react";

type VehicleContextType = {
  vehicles: Vehicle[];
  getVehicleById: (_id: string) => Vehicle | undefined;
  addVehicle: (vehicle: Vehicle) => void;
  updateVehicleById: (_id: string, updatedvehicle: Partial<Vehicle>) => void;
  removeVehicleById: (id: string) => void;
  clearVehicles: () => void;
};

const vehicleContextInitial: VehicleContextType = {
  vehicles: [],
  getVehicleById: (id: string) => undefined,
  addVehicle: (vehicle: Vehicle) => {},
  updateVehicleById: (id: string, updatedVehicle: Partial<Vehicle>) => {},
  removeVehicleById: (id: string) => {},
  clearVehicles: () => {},
};

const vehicleContext = createContext<VehicleContextType>(vehicleContextInitial);

type vehicleContextProviderProps = {
  children: ReactNode;
};
export const VehicleContextProvider = ({
  children,
}: vehicleContextProviderProps) => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  const addVehicle = (vehicle: Vehicle) => {
    setVehicles((prev) => [
      ...prev,
      { ...vehicle, _id: Date.now().toString() },
    ]);
  };

  const getVehicleById = (id: string) => {
    return vehicles.find((vehicle) => vehicle._id === id);
  };

  const updateVehicleById = (id: string, updatedVehicle: Partial<Vehicle>) => {
    setVehicles((prev) =>
      prev.map((vehicle) =>
        vehicle._id === id ? { ...vehicle, ...updatedVehicle } : vehicle,
      ),
    );
  };

  const removeVehicleById = (id: string) => {
    setVehicles((prev) => prev.filter((vehicle) => vehicle._id !== id));
  };

  const clearVehicles = () => {
    setVehicles([]);
  };
  return (
    <vehicleContext.Provider
      value={{
        vehicles,
        getVehicleById,
        addVehicle,
        updateVehicleById,
        removeVehicleById,
        clearVehicles,
      }}
    >
      {children}
    </vehicleContext.Provider>
  );
};

export const useVehicleContext = () => {
  const context = useContext(vehicleContext);

  return context;
};
