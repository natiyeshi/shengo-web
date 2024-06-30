import React from "react";
import { Avatar, Group } from "@mantine/core";
import { Edit, Trash } from "lucide-react";
import { Business as BusinessType } from "@/app/(protected)/dashboard/_contexts/business/business-form-context";
import { useBusinessOperation } from "@/app/(protected)/dashboard/_contexts/business/business-operation-context";

type Props = {
  business: BusinessType;
  handelDrawerclose: Function;
};

const Business = ({ business, handelDrawerclose }: Props) => {
  const { editBusiness, editing, setAlertInfo, deleteSingleBusiness } =
    useBusinessOperation();

  const handleEdit = () => {
    handelDrawerclose();
    setAlertInfo({
      title: "Edit information!",
      description:
        "If you edit this information, you will lose the current form, are you sure ?",
      execute: (cont: boolean) => {
        if (cont) {
          editBusiness(business._id);
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
          deleteSingleBusiness(business._id);
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
            {Business.name.charAt(0).toUpperCase()}
          </Avatar>
          <span className="text-sm">{business.businessType}</span>
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

export default Business;
