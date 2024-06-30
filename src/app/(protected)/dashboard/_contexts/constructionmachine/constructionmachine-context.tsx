import { Constructionmachine } from "./constructionmachine-form-context";
import { ReactNode, createContext, useContext, useState } from "react";

type ConstructionmachineContextType = {
  constructionmachines: Constructionmachine[];
  getConstructionmachineById: (_id: string) => Constructionmachine | undefined;
  addConstructionmachine: (constructionmachine: Constructionmachine) => void;
  updateConstructionmachineById: (_id: string, updatedconstructionmachine: Partial<Constructionmachine>) => void;
  removeConstructionmachineById: (id: string) => void;
  clearConstructionmachines: () => void;
};

const constructionmachineContextInitial: ConstructionmachineContextType = {
  constructionmachines: [],
  getConstructionmachineById: (id: string) => undefined,
  addConstructionmachine: (constructionmachine: Constructionmachine) => {},
  updateConstructionmachineById: (id: string, updatedConstructionmachine: Partial<Constructionmachine>) => {},
  removeConstructionmachineById: (id: string) => {},
  clearConstructionmachines: () => {},
};

const constructionmachineContext = createContext<ConstructionmachineContextType>(constructionmachineContextInitial);

type constructionmachineContextProviderProps = {
  children: ReactNode;
};
export const ConstructionmachineContextProvider = ({
  children,
}: constructionmachineContextProviderProps) => {
  const [constructionmachines, setConstructionmachines] = useState<Constructionmachine[]>([]);

  const addConstructionmachine = (constructionmachine: Constructionmachine) => {
    setConstructionmachines((prev) => [
      ...prev,
      { ...constructionmachine, _id: Date.now().toString() },
    ]);
  };

  const getConstructionmachineById = (id: string) => {
    return constructionmachines.find((constructionmachine) => constructionmachine._id === id);
  };

  const updateConstructionmachineById = (id: string, updatedConstructionmachine: Partial<Constructionmachine>) => {
    setConstructionmachines((prev) =>
      prev.map((constructionmachine) =>
        constructionmachine._id === id ? { ...constructionmachine, ...updatedConstructionmachine } : constructionmachine,
      ),
    );
  };

  const removeConstructionmachineById = (id: string) => {
    setConstructionmachines((prev) => prev.filter((constructionmachine) => constructionmachine._id !== id));
  };

  const clearConstructionmachines = () => {
    setConstructionmachines([]);
  };
  return (
    <constructionmachineContext.Provider
      value={{
        constructionmachines,
        getConstructionmachineById,
        addConstructionmachine,
        updateConstructionmachineById,
        removeConstructionmachineById,
        clearConstructionmachines,
      }}
    >
      {children}
    </constructionmachineContext.Provider>
  );
};

export const useConstructionmachineContext = () => {
  const context = useContext(constructionmachineContext);
  if (!context) {
    throw new Error(
      "useConstructionmachineContextProvider must be used within a ConstructionmachineContextProvider",
    );
  }
  return context;
};
