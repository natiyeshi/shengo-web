import { Organization } from "./organization-form-context";
import { ReactNode, createContext, useContext, useState } from "react";

type OrganizationContextType = {
  organizations: Organization[];
  getOrganizationById: (_id: string) => Organization | undefined;
  addOrganization: (organization: Organization) => void;
  updateOrganizationById: (_id: string, updatedorganization: Partial<Organization>) => void;
  removeOrganizationById: (id: string) => void;
  clearOrganizations: () => void;
};

const organizationContextInitial: OrganizationContextType = {
  organizations: [],
  getOrganizationById: (id: string) => undefined,
  addOrganization: (organization: Organization) => {},
  updateOrganizationById: (id: string, updatedOrganization: Partial<Organization>) => {},
  removeOrganizationById: (id: string) => {},
  clearOrganizations: () => {},
};

const organizationContext = createContext<OrganizationContextType>(organizationContextInitial);

type organizationContextProviderProps = {
  children: ReactNode;
};
export const OrganizationContextProvider = ({
  children,
}: organizationContextProviderProps) => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);

  const addOrganization = (organization: Organization) => {
    setOrganizations((prev) => [
      ...prev,
      { ...organization, _id: Date.now().toString() },
    ]);
  };

  const getOrganizationById = (id: string) => {
    return organizations.find((organization) => organization._id === id);
  };

  const updateOrganizationById = (id: string, updatedOrganization: Partial<Organization>) => {
    setOrganizations((prev) =>
      prev.map((organization) =>
        organization._id === id ? { ...organization, ...updatedOrganization } : organization,
      ),
    );
  };

  const removeOrganizationById = (id: string) => {
    setOrganizations((prev) => prev.filter((organization) => organization._id !== id));
  };

  const clearOrganizations = () => {
    setOrganizations([]);
  };
  return (
    <organizationContext.Provider
      value={{
        organizations,
        getOrganizationById,
        addOrganization,
        updateOrganizationById,
        removeOrganizationById,
        clearOrganizations,
      }}
    >
      {children}
    </organizationContext.Provider>
  );
};

export const useOrganizationContext = () => {
  const context = useContext(organizationContext);
  if (!context) {
    throw new Error(
      "useOrganizationContextProvider must be used within a OrganizationContextProvider",
    );
  }
  return context;
};
