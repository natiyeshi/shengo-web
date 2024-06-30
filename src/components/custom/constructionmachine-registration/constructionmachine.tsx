import React from "react";
import { Avatar, Group } from "@mantine/core";
import { Edit, Trash } from "lucide-react";
import { Constructionmachine as ConstructionmachineType } from "@/app/(protected)/dashboard/_contexts/constructionmachine/constructionmachine-form-context";
import { useConstructionmachineOperation } from "@/app/(protected)/dashboard/_contexts/constructionmachine/constructionmachine-operation-context";

type Props = {
  constructionmachine: ConstructionmachineType;
  handelDrawerclose: Function;
};

const Constructionmachine = ({ constructionmachine, handelDrawerclose }: Props) => {
  const { editConstructionmachine, editing, setAlertInfo, deleteSingleConstructionmachine } =
    useConstructionmachineOperation();

  const handleEdit = () => {
    handelDrawerclose();
    setAlertInfo({
      title: "Edit information!",
      description:
        "If you edit this information, you will lose the current form, are you sure ?",
      execute: (cont: boolean) => {
        if (cont) {
          editConstructionmachine(constructionmachine._id);
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
          deleteSingleConstructionmachine(constructionmachine._id);
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
            {Constructionmachine.name.charAt(0).toUpperCase()}
          </Avatar>
          <span className="text-sm">{constructionmachine.constructionmachineType}</span>
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

export default Constructionmachine;
