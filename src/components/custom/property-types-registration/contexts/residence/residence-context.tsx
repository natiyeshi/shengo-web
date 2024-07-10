import { Residence } from "./residence-form-context";
import { ReactNode, createContext, useContext, useState } from "react";

type ResidenceContextType = {
  residences: Residence[];
  getResidenceById: (_id: string) => Residence | undefined;
  addResidence: (residence: Residence) => void;
  updateResidenceById: (_id: string, updatedresidence: Partial<Residence>) => void;
  removeResidenceById: (id: string) => void;
  clearResidences: () => void;
};

const residenceContextInitial: ResidenceContextType = {
  residences: [],
  getResidenceById: (id: string) => undefined,
  addResidence: (residence: Residence) => {},
  updateResidenceById: (id: string, updatedResidence: Partial<Residence>) => {},
  removeResidenceById: (id: string) => {},
  clearResidences: () => {},
};

const ResidenceContext = createContext<ResidenceContextType>(residenceContextInitial);

type residenceContextProviderProps = {
  children: ReactNode;
};


export const ResidenceContextProvider = ({
  children,
}: residenceContextProviderProps) => {
  const [residences, setResidences] = useState<Residence[]>([]);

  const addResidence = (residence: Residence) => {
    setResidences((prev) => [
      ...prev,
      { ...residence, _id: Date.now().toString() },
    ]);
  };

  const getResidenceById = (id: string) => {
    return residences.find((residence) => residence._id === id);
  };

  const updateResidenceById = (id: string, updatedResidence: Partial<Residence>) => {
    setResidences((prev) =>
      prev.map((residence) =>
        residence._id === id ? { ...residence, ...updatedResidence } : residence,
      ),
    );
  };

  const removeResidenceById = (id: string) => {
    setResidences((prev) => prev.filter((residence) => residence._id !== id));
  };

  const clearResidences = () => {
    setResidences([]);
  };
  return (
    <ResidenceContext.Provider
      value={{
        residences,
        getResidenceById,
        addResidence,
        updateResidenceById,
        removeResidenceById,
        clearResidences,
      }}
    >
      {children}
    </ResidenceContext.Provider>
  );
};

export const useResidenceContext = () => {
  const context = useContext(ResidenceContext);
  if (!context) {
    throw new Error(
      "useResidenceContextProvider must be used within a ResidenceContextProvider",
    );
  }
  return context;
};
