import React from "react";
import { Avatar, Group } from "@mantine/core";
import { Edit, Trash } from "lucide-react";
import { Motorcycle as MotorcycleType } from "@/app/(protected)/dashboard/_contexts/motorcycle/motorcycle-form-context";
import { useMotorcycleOperation } from "@/app/(protected)/dashboard/_contexts/motorcycle/motorcycle-operation-context";

type Props = {
  motorcycle: MotorcycleType;
  handelDrawerclose: Function;
};

const Motorcycle = ({ motorcycle, handelDrawerclose }: Props) => {
  const { editMotorcycle, editing, setAlertInfo, deleteSingleMotorcycle } =
    useMotorcycleOperation();

  const handleEdit = () => {
    handelDrawerclose();
    setAlertInfo({
      title: "Edit information!",
      description:
        "If you edit this information, you will lose the current form, are you sure ?",
      execute: (cont: boolean) => {
        if (cont) {
          editMotorcycle(motorcycle._id);
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
          deleteSingleMotorcycle(motorcycle._id);
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
            {Motorcycle.name.charAt(0).toUpperCase()}
          </Avatar>
          <span className="text-sm">{motorcycle.motorcycleType}</span>
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

export default Motorcycle;
