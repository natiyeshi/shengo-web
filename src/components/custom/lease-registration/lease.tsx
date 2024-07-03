import React from "react";
import { Avatar, Group } from "@mantine/core";
import { Edit, Trash } from "lucide-react";
import { Lease as LeaseType } from "@/app/(protected)/dashboard/_contexts/lease/lease-form-context";
import { useLeaseOperation } from "@/app/(protected)/dashboard/_contexts/lease/lease-operation-context";

type Props = {
  lease: LeaseType;
  handelDrawerclose: Function;
};

const Lease = ({ lease, handelDrawerclose }: Props) => {
  const { editLease, editing, setAlertInfo, deleteSingleLease } =
    useLeaseOperation();

  const handleEdit = () => {
    handelDrawerclose();
    setAlertInfo({
      title: "Edit information!",
      description:
        "If you edit this information, you will lose the current form, are you sure ?",
      execute: (cont: boolean) => {
        if (cont) {
          editLease(lease._id);
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
          deleteSingleLease(lease._id);
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
            {Lease.name.charAt(0).toUpperCase()}
          </Avatar>
          <span className="text-sm">{lease._id}</span>
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

export default Lease;
