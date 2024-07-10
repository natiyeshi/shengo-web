import React, { Dispatch, ReactNode } from "react";
import { Avatar, Group } from "@mantine/core";
import { Edit, Trash } from "lucide-react";
import { usePropertyOperation } from "@/app/(protected)/dashboard/_contexts/property/property-operation-context";
import { Vehicle } from "../contexts/vehicle/vehicle-form-context";
import { Residence } from "../contexts/residence/residence-form-context";
import { Organization } from "../contexts/organization/organization-form-context";
import { useVehicleOperation } from "../contexts/vehicle/vehicle-operation-context";
import { useResidenceOperation } from "../contexts/residence/residence-operation-context";
import { AlertInfo } from "../../AreYouSure";

type Props = {
  handelDrawerclose: Function;
  editing: string | undefined;
  editProperty: (_id: string) => void;
  setAlertInfo: Dispatch<React.SetStateAction<AlertInfo | null>>;
  deleteSingleProperty: (id: string) => void;
} & (
  | {
      type: "Vehicle";
      property: Vehicle;
    }
  | { type: "Residence"; property: Residence }
  | {
      type: "Organization";
      property: Organization;
    }
);

const Property = ({
  type,
  property,
  handelDrawerclose,
  editing,
  editProperty,
  setAlertInfo,
  deleteSingleProperty,
}: Props) => {
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
    if (editing) return;
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

  let content: ReactNode = "";

  type === "Vehicle" &&
    (content = (
      <Group>
        <Avatar size="md" color="initials">
          {property.vehicleType.charAt(0).toUpperCase()}
        </Avatar>
        <span className="text-sm">{property.vehicleType}</span>
      </Group>
    ));

  type === "Residence" &&
    (content = (
      <Group>
        <Avatar size="md" color="initials">
          {property.city.charAt(0).toUpperCase()}
        </Avatar>
        <span className="text-sm">{property.city}</span>
      </Group>
    ));

  type === "Organization" &&
    (content = (
      <Group>
        <Avatar size="md" color="initials">
          {property.companyName.charAt(0).toUpperCase()}
        </Avatar>
        <span className="text-sm">{property.companyName}</span>
      </Group>
    ));

  return (
    <section className="border-t border-t-muted py-3">
      <Group justify="space-between">
        <Group>
          <Avatar size="md" color="initials">
            {type === "Vehicle" && property.vehicleType.charAt(0).toUpperCase()}
          </Avatar>
          <span className="text-sm">{property._id}</span>
        </Group>

        <Group>
          {editing ? (
            "..."
          ) : (
            <Edit size={16} className="cursor-pointer" onClick={handleEdit} />
          )}
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
