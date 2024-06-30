import React from "react";
import { Avatar, Group } from "@mantine/core";
import { Edit, Trash } from "lucide-react";
import { Residence as ResidenceType } from "@/app/(protected)/dashboard/_contexts/residence/residence-form-context";
import { useResidenceOperation } from "@/app/(protected)/dashboard/_contexts/residence/residence-operation-context";

type Props = {
  residence: ResidenceType;
  handelDrawerclose: Function;
};

const Residence = ({ residence, handelDrawerclose }: Props) => {
  const { editResidence, editing, setAlertInfo, deleteSingleResidence } =
    useResidenceOperation();

  const handleEdit = () => {
    handelDrawerclose();
    setAlertInfo({
      title: "Edit information!",
      description:
        "If you edit this information, you will lose the current form, are you sure ?",
      execute: (cont: boolean) => {
        if (cont) {
          editResidence(residence._id);
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
          deleteSingleResidence(residence._id);
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
            {Residence.name.charAt(0).toUpperCase()}
          </Avatar>
          <span className="text-sm">{residence._id}</span>
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

export default Residence;
