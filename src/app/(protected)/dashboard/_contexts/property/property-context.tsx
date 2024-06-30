import { Property } from "./property-form-context";
import { ReactNode, createContext, useContext, useState } from "react";

type PropertyContextType = {
  properties: Property[];
  getPropertyById: (_id: string) => Property | undefined;
  addProperty: (property: Property) => void;
  updatePropertyById: (_id: string, updatedproperty: Partial<Property>) => void;
  removePropertyById: (id: string) => void;
  clearProperties: () => void;
};

const propertyContextInitial: PropertyContextType = {
  properties: [],
  getPropertyById: (id: string) => undefined,
  addProperty: (property: Property) => {},
  updatePropertyById: (id: string, updatedProperty: Partial<Property>) => {},
  removePropertyById: (id: string) => {},
  clearProperties: () => {},
};

const propertyContext = createContext<PropertyContextType>(propertyContextInitial);

type propertyContextProviderProps = {
  children: ReactNode;
};
export const PropertyContextProvider = ({
  children,
}: propertyContextProviderProps) => {
  const [properties, setProperties] = useState<Property[]>([]);

  const addProperty = (property: Property) => {
    setProperties((prev) => [
      ...prev,
      { ...property, _id: Date.now().toString() },
    ]);
  };

  const getPropertyById = (id: string) => {
    return properties.find((property) => property._id === id);
  };

  const updatePropertyById = (id: string, updatedProperty: Partial<Property>) => {
    setProperties((prev) =>
      prev.map((property) =>
        property._id === id ? { ...property, ...updatedProperty } : property,
      ),
    );
  };

  const removePropertyById = (id: string) => {
    setProperties((prev) => prev.filter((property) => property._id !== id));
  };

  const clearProperties = () => {
    setProperties([]);
  };
  return (
    <propertyContext.Provider
      value={{
        properties,
        getPropertyById,
        addProperty,
        updatePropertyById,
        removePropertyById,
        clearProperties,
      }}
    >
      {children}
    </propertyContext.Provider>
  );
};

export const usePropertyContext = () => {
  const context = useContext(propertyContext);
  if (!context) {
    throw new Error(
      "usePropertyContextProvider must be used within a PropertyContextProvider",
    );
  }
  return context;
};
