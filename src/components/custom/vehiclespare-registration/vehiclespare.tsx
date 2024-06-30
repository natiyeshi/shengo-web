import React from "react";
import { Avatar, Group } from "@mantine/core";
import { Edit, Trash } from "lucide-react";
import { Vehiclespare as VehiclespareType } from "@/app/(protected)/dashboard/_contexts/vehiclespare/vehiclespare-form-context";
import { useVehiclespareOperation } from "@/app/(protected)/dashboard/_contexts/vehiclespare/vehiclespare-operation-context";

type Props = {
  vehiclespare: VehiclespareType;
  handelDrawerclose: Function;
};

const Vehiclespare = ({ vehiclespare, handelDrawerclose }: Props) => {
  const { editVehiclespare, editing, setAlertInfo, deleteSingleVehiclespare } =
    useVehiclespareOperation();

  const handleEdit = () => {
    handelDrawerclose();
    setAlertInfo({
      title: "Edit information!",
      description:
        "If you edit this information, you will lose the current form, are you sure ?",
      execute: (cont: boolean) => {
        if (cont) {
          editVehiclespare(vehiclespare._id);
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
          deleteSingleVehiclespare(vehiclespare._id);
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
            {Vehiclespare.name.charAt(0).toUpperCase()}
          </Avatar>
          <span className="text-sm">{vehiclespare._id}</span>
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

export default Vehiclespare;
