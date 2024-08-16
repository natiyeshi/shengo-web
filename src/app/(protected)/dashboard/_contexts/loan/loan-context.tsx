import { Loan } from "./loan-form-context";
import { ReactNode, createContext, useContext, useState } from "react";

type LoanContextType = {
  loans: Loan[];
  getLoanById: (_id: string) => Loan | undefined;
  addLoan: (loan: Loan) => void;
  updateLoanById: (_id: string, updatedloan: Partial<Loan>) => void;
  removeLoanById: (id: string) => void;
  clearLoans: () => void;
};

const loanContextInitial: LoanContextType = {
  loans: [],
  getLoanById: (id: string) => undefined,
  addLoan: (loan: Loan) => {},
  updateLoanById: (id: string, updatedLoan: Partial<Loan>) => {},
  removeLoanById: (id: string) => {},
  clearLoans: () => {},
};

const loanContext = createContext<LoanContextType>(loanContextInitial);

type loanContextProviderProps = {
  children: ReactNode;
};
export const LoanContextProvider = ({
  children,
}: loanContextProviderProps) => {
  const [loans, setLoans] = useState<Loan[]>([]);

  const addLoan = (loan: Loan) => {
    setLoans((prev) => [...prev, { ...loan, _id: Date.now().toString() }]);
  };

  const getLoanById = (id: string) => {
    return loans.find((loan) => loan._id === id);
  };

  const updateLoanById = (id: string, updatedLoan: Partial<Loan>) => {
    setLoans((prev) =>
      prev.map((loan) =>
        loan._id === id ? { ...loan, ...updatedLoan } : loan,
      ),
    );
  };

  const removeLoanById = (id: string) => {
    setLoans((prev) => prev.filter((loan) => loan._id !== id));
  };

  const clearLoans = () => {
    setLoans([]);
  };
  return (
    <loanContext.Provider
      value={{
        loans,
        getLoanById,
        addLoan,
        updateLoanById,
        removeLoanById,
        clearLoans,
      }}
    >
      {children}
    </loanContext.Provider>
  );
};

export const useLoanContext = () => {
  const context = useContext(loanContext);

  return context;
};
