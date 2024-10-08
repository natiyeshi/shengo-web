import {
  CustomerInfo,
  customerFormContextInitial,
} from "@/app/(protected)/dashboard/_contexts/customer/customer-form-context";
import { createContext, ReactNode, useContext, useState } from "react";

export type EnhancedCustomerType = CustomerInfo & { type: string };
type CustomerContextType = {
  customers: EnhancedCustomerType[];
  getCustomerById: (_id: string) => CustomerInfo | undefined
  getCustomersByType: (type: string) => EnhancedCustomerType[];
  addCustomer: (type: string, customer: CustomerInfo) => void;
  updateCustomerById: (
    _id: string,
    updatedCustomer: Partial<CustomerInfo>,
  ) => void;
  removeCustomerById: (id: string) => void;
  removeCustomersByType: (type: string) => void;
  clearCustomers: () => void;
};

const customerContextInitial = {
  customers: [],
  getCustomerById: (_id: string) => undefined,
  getCustomersByType: (type: string) => [],
  addCustomer: () => {},
  updateCustomerById: (id: string, updatedCustomer: Partial<CustomerInfo>) => {},
  removeCustomerById: (id: string) => {},
  removeCustomersByType: (type: string) => {},
  clearCustomers: () => {},
};

const CustomerContext = createContext<CustomerContextType>(
  customerContextInitial,
);

type CustomerContextProviderProps = {
  children: ReactNode;
};
export const CustomerContextProvider = ({
  children,
}: CustomerContextProviderProps) => {
  const [customers, setCustomers] = useState<EnhancedCustomerType[]>([]);

  const addCustomer = (type: string, customer: CustomerInfo) => {
    setCustomers((prev) => [
      ...prev,
      { type, ...customer, _id: Date.now().toString() },
    ]);
  };

  const getCustomerById = (id: string) => {
    const customer = customers.find((customer) => customer._id === id);
    if (customer) {
      const { type, ...response } = customer;
      return response;
    }
    return customer;
  };
  const getCustomersByType = (type: string) => {
    return customers.filter((customer) => customer.type === type);
  };

  const updateCustomerById = (
    id: string,
    updatedCustomer: Partial<CustomerInfo>,
  ) => {
    setCustomers((prev) =>
      prev.map((customer) =>
        customer._id === id ? { ...customer, ...updatedCustomer } : customer,
      ),
    );
  };

  const removeCustomerById = (id: string) => {
    setCustomers((prev) => prev.filter((customer) => customer._id !== id));
  };

  const removeCustomersByType = (type: string) => {
    setCustomers((prev) => prev.filter((customer) => customer.type !== type));
  };

  const clearCustomers = () => {
    setCustomers([]);
  };
  return (
    <CustomerContext.Provider
      value={{
        customers,
        getCustomerById,
        getCustomersByType,
        addCustomer,
        updateCustomerById,
        removeCustomerById,
        removeCustomersByType,
        clearCustomers,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
};

export const useCustomerContext = () => {
  const context = useContext(CustomerContext);

  return context;
};
