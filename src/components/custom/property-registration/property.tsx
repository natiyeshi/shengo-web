import React from "react";
import { Avatar, Group } from "@mantine/core";
import { Edit, Trash } from "lucide-react";
import { Property as PropertyType } from "@/app/(protected)/dashboard/_contexts/property/property-form-context";
import { usePropertyOperation } from "@/app/(protected)/dashboard/_contexts/property/property-operation-context";

type Props = {
  property: PropertyType;
  handelDrawerclose: Function;
};

const Property = ({ property, handelDrawerclose }: Props) => {
  const { editProperty, editing, setAlertInfo, deleteSingleProperty } =
    usePropertyOperation();

  const handleEdit = () => {
    handelDrawerclose();
    setAlertInfo({
      title: "Edit information!",
      description:
        "If you edit this information, you will lose the current form, are you sure ?",
      execute: (cont: boolean) => {
        if (cont) {
          editProperty(property._id);
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
          deleteSingleProperty(property._id);
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
            {Property.name.charAt(0).toUpperCase()}
          </Avatar>
          <span className="text-sm">{property._id}</span>
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

export default Property;
