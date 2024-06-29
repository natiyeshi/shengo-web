import React from "react";
import { CustomerInfo } from "@/app/(protected)/dashboard/_contexts/customer/customer-form-context";
import { Avatar, Group } from "@mantine/core";
import { Edit, Trash } from "lucide-react";
import { useCustomerOperation } from "@/app/(protected)/dashboard/_contexts/customer/customer-operation-provider";

interface props {
  customer: CustomerInfo;
  handelDrawerclose: Function;
}

const Customer = ({ customer, handelDrawerclose }: props) => {
  const isOrganization = customer.customerType === "organization";
  const { editCustomer, editing, setAlertInfo, deleteSingleCustomer } =
    useCustomerOperation();

  const handleEdit = () => {
    handelDrawerclose();
    setAlertInfo({
      title: "Edit information!",
      description:
        "If you edit this information, you will lose the current form, are you sure ?",
      execute: (cont: boolean) => {
        if (cont) {
          editCustomer(customer._id);
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
          deleteSingleCustomer(customer._id);
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
            {isOrganization && customer.businessName.charAt(0).toUpperCase()}
            {!isOrganization && customer.name.charAt(0).toUpperCase()}
          </Avatar>
          {isOrganization && (
            <span className="text-sm">{customer.businessName}</span>
          )}
          {!isOrganization && (
            <span className="text-sm">
              {customer.customerTitle}. {customer.name}
            </span>
          )}
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

export default Customer;
