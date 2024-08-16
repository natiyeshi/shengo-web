import { Motorcycle } from "./motorcycle-form-context";
import { ReactNode, createContext, useContext, useState } from "react";

type MotorcycleContextType = {
  motorcycles: Motorcycle[];
  getMotorcycleById: (_id: string) => Motorcycle | undefined;
  addMotorcycle: (motorcycle: Motorcycle) => void;
  updateMotorcycleById: (_id: string, updatedmotorcycle: Partial<Motorcycle>) => void;
  removeMotorcycleById: (id: string) => void;
  clearMotorcycles: () => void;
};

const motorcycleContextInitial: MotorcycleContextType = {
  motorcycles: [],
  getMotorcycleById: (id: string) => undefined,
  addMotorcycle: (motorcycle: Motorcycle) => {},
  updateMotorcycleById: (id: string, updatedMotorcycle: Partial<Motorcycle>) => {},
  removeMotorcycleById: (id: string) => {},
  clearMotorcycles: () => {},
};

const motorcycleContext = createContext<MotorcycleContextType>(motorcycleContextInitial);

type motorcycleContextProviderProps = {
  children: ReactNode;
};
export const MotorcycleContextProvider = ({
  children,
}: motorcycleContextProviderProps) => {
  const [motorcycles, setMotorcycles] = useState<Motorcycle[]>([]);

  const addMotorcycle = (motorcycle: Motorcycle) => {
    setMotorcycles((prev) => [
      ...prev,
      { ...motorcycle, _id: Date.now().toString() },
    ]);
  };

  const getMotorcycleById = (id: string) => {
    return motorcycles.find((motorcycle) => motorcycle._id === id);
  };

  const updateMotorcycleById = (id: string, updatedMotorcycle: Partial<Motorcycle>) => {
    setMotorcycles((prev) =>
      prev.map((motorcycle) =>
        motorcycle._id === id ? { ...motorcycle, ...updatedMotorcycle } : motorcycle,
      ),
    );
  };

  const removeMotorcycleById = (id: string) => {
    setMotorcycles((prev) => prev.filter((motorcycle) => motorcycle._id !== id));
  };

  const clearMotorcycles = () => {
    setMotorcycles([]);
  };
  return (
    <motorcycleContext.Provider
      value={{
        motorcycles,
        getMotorcycleById,
        addMotorcycle,
        updateMotorcycleById,
        removeMotorcycleById,
        clearMotorcycles,
      }}
    >
      {children}
    </motorcycleContext.Provider>
  );
};

export const useMotorcycleContext = () => {
  const context = useContext(motorcycleContext);

  return context;
};
