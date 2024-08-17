"use server";

import { toCustomerDb, toVehicleDb } from "@/_utils/dto";
import prisma from "@/lib/prisma-client";
import { ServiceDeliveryOffice, User } from "@prisma/client";

type ServiceResponse = { status: "success" | "error"; message: string };

export const saleVehicle = async (data: {
  customers: ReturnType<typeof toCustomerDb>[];
  vehicle: ReturnType<typeof toVehicleDb>[];
  serviceDeliveringOffice: Omit<ServiceDeliveryOffice, "id"> & { id?: string };
  user: Omit<User, "id"> & { id?: string };
}): Promise<ServiceResponse> => {
  const { customers, vehicle, serviceDeliveringOffice, user } = data;
  console.log("I am called");

  try {
    await prisma.service.create({
      data: {
        amount: 100,
        fileLocation: "/file-location",
        fileNumber: 2,
        numberOfPages: 3,
        filePath: "/file-path",
        printStatus: false,
        serviceDeliveryDate: new Date(),
        serviceRequestDate: new Date(),
        serviceSubType: "Vehicle",
        serviceType: "Sale",
        accountUser: {
          connectOrCreate: {
            where: { id: user.id || "" },
            create: user,
          },
        },

        customers: {
          create: customers,
        },
        vehicles: { create: vehicle },
        serviceDeliveryOffice: {
          connectOrCreate: {
            where: { id: serviceDeliveringOffice.id || "" },
            create: serviceDeliveringOffice,
          },
        },
      },
    });
  } catch (error) {
    console.error("Error creating vehicle sale service:", error);
    return {
      status: "error",
      message: "An error occurred while creating the vehicle sale service",
    };
  }

  return {
    status: "success",
    message: "Vehicle sale service created successfully",
  };
};
