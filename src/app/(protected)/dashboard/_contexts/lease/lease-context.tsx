import { Lease } from "./lease-form-context";
import { ReactNode, createContext, useContext, useState } from "react";

type LeaseContextType = {
  leases: Lease[];
  getLeaseById: (_id: string) => Lease | undefined;
  addLease: (lease: Lease) => void;
  updateLeaseById: (_id: string, updatedlease: Partial<Lease>) => void;
  removeLeaseById: (id: string) => void;
  clearLeases: () => void;
};

const leaseContextInitial: LeaseContextType = {
  leases: [],
  getLeaseById: (id: string) => undefined,
  addLease: (lease: Lease) => {},
  updateLeaseById: (id: string, updatedLease: Partial<Lease>) => {},
  removeLeaseById: (id: string) => {},
  clearLeases: () => {},
};

const leaseContext = createContext<LeaseContextType>(leaseContextInitial);

type leaseContextProviderProps = {
  children: ReactNode;
};
export const LeaseContextProvider = ({
  children,
}: leaseContextProviderProps) => {
  const [leases, setLeases] = useState<Lease[]>([]);

  const addLease = (lease: Lease) => {
    setLeases((prev) => [
      ...prev,
      { ...lease, _id: Date.now().toString() },
    ]);
  };

  const getLeaseById = (id: string) => {
    return leases.find((lease) => lease._id === id);
  };

  const updateLeaseById = (id: string, updatedLease: Partial<Lease>) => {
    setLeases((prev) =>
      prev.map((lease) =>
        lease._id === id ? { ...lease, ...updatedLease } : lease,
      ),
    );
  };

  const removeLeaseById = (id: string) => {
    setLeases((prev) => prev.filter((lease) => lease._id !== id));
  };

  const clearLeases = () => {
    setLeases([]);
  };
  return (
    <leaseContext.Provider
      value={{
        leases,
        getLeaseById,
        addLease,
        updateLeaseById,
        removeLeaseById,
        clearLeases,
      }}
    >
      {children}
    </leaseContext.Provider>
  );
};

export const useLeaseContext = () => {
  const context = useContext(leaseContext);

  return context;
};
