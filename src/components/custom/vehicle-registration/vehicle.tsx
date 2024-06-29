import React from "react";
import { Avatar, Group } from "@mantine/core";
import { Edit, Trash } from "lucide-react";
import { Vehicle as VehicleType } from "@/app/(protected)/dashboard/_contexts/vehicle/vehicle-form-context";
import { useVehicleOperation } from "@/app/(protected)/dashboard/_contexts/vehicle/vehicle-operation-context";

type Props = {
  vehicle: VehicleType;
  handelDrawerclose: Function;
};

const Vehicle = ({ vehicle, handelDrawerclose }: Props) => {
  const { editVehicle, editing, setAlertInfo, deleteSingleVehicle } =
    useVehicleOperation();

  const handleEdit = () => {
    handelDrawerclose();
    setAlertInfo({
      title: "Edit information!",
      description:
        "If you edit this information, you will lose the current form, are you sure ?",
      execute: (cont: boolean) => {
        if (cont) {
          editVehicle(vehicle._id);
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
          deleteSingleVehicle(vehicle._id);
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
            {Vehicle.name.charAt(0).toUpperCase()}
          </Avatar>
          <span className="text-sm">{vehicle.vehicleType}</span>
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

export default Vehicle;
