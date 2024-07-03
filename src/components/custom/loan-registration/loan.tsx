import React from "react";
import { Avatar, Group } from "@mantine/core";
import { Edit, Trash } from "lucide-react";
import { Loan as LoanType } from "@/app/(protected)/dashboard/_contexts/loan/loan-form-context";
import { useLoanOperation } from "@/app/(protected)/dashboard/_contexts/loan/loan-operation-context";

type Props = {
  loan: LoanType;
  handelDrawerclose: Function;
};

const Loan = ({ loan, handelDrawerclose }: Props) => {
  const { editLoan, editing, setAlertInfo, deleteSingleLoan } =
    useLoanOperation();

  const handleEdit = () => {
    handelDrawerclose();
    setAlertInfo({
      title: "Edit information!",
      description:
        "If you edit this information, you will lose the current form, are you sure ?",
      execute: (cont: boolean) => {
        if (cont) {
          editLoan(loan._id);
        }
        setAlertInfo(null);
      },
    });
  };

  const handleDelete = () => {
    handelDrawerclose();
    setAlertInfo({
      title: "Delete information!",
      description: "Are you sure you want to delete this information ?",
      execute: (cont: boolean) => {
        if (cont) {
          deleteSingleLoan(loan._id);
        }
        setAlertInfo(null);
      },
    });
  };

  return (
    <section className="border-t border-t-muted py-3">
      <Group justify="space-between">
        <Group>
          <Avatar size="md" color="initials">
            {Loan.name.charAt(0).toUpperCase()}
          </Avatar>
          <span className="text-sm">{loan.loanType}</span>
        </Group>

        <Group>
          <Edit size={16} className="cursor-pointer" onClick={handleEdit} />
          <Trash
            size={16}
            onClick={handleDelete}
            className="cursor-pointer text-red-500"
          />
        </Group>
      </Group>
    </section>
  );
};

export default Loan;
