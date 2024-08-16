import { Business } from "./business-form-context";
import { ReactNode, createContext, useContext, useState } from "react";

type BusinessContextType = {
  business: Business[];
  getBusinessById: (_id: string) => Business | undefined;
  addBusiness: (business: Business) => void;
  updateBusinessById: (_id: string, updatedbusiness: Partial<Business>) => void;
  removeBusinessById: (id: string) => void;
  clearBusiness: () => void;
};

const businessContextInitial: BusinessContextType = {
  business: [],
  getBusinessById: (id: string) => undefined,
  addBusiness: (business: Business) => {},
  updateBusinessById: (id: string, updatedBusiness: Partial<Business>) => {},
  removeBusinessById: (id: string) => {},
  clearBusiness: () => {},
};

const BusinessContext = createContext<BusinessContextType>(
  businessContextInitial,
);

type businessContextProviderProps = {
  children: ReactNode;
};

export const BusinessContextProvider = ({
  children,
}: businessContextProviderProps) => {
  const [business, setBusiness] = useState<Business[]>([]);

  const addBusiness = (business: Business) => {
    setBusiness((prev) => [
      ...prev,
      { ...business, _id: Date.now().toString() },
    ]);
  };

  const getBusinessById = (id: string) => {
    return business.find((business) => business._id === id);
  };

  const updateBusinessById = (
    id: string,
    updatedBusiness: Partial<Business>,
  ) => {
    setBusiness((prev) =>
      prev.map((business) =>
        business._id === id ? { ...business, ...updatedBusiness } : business,
      ),
    );
  };

  const removeBusinessById = (id: string) => {
    setBusiness((prev) => prev.filter((business) => business._id !== id));
  };

  const clearBusiness = () => {
    setBusiness([]);
  };
  return (
    <BusinessContext.Provider
      value={{
        business,
        getBusinessById,
        addBusiness,
        updateBusinessById,
        removeBusinessById,
        clearBusiness,
      }}
    >
      {children}
    </BusinessContext.Provider>
  );
};

export const useBusinessContext = () => {
  const context = useContext(BusinessContext);
  return context;
};
