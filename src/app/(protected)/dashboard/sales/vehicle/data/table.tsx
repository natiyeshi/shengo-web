import { toCustomerClient, toVehicleClient } from "@/_utils/dto";
import React, { useState } from "react";
import { Customer as CustomerDB } from "@prisma/client";
import { DeleteIcon } from "lucide-react";
import { MdDeleteForever } from "react-icons/md";
import { deleteServiceVehicle } from "./getData";
import { useToast } from "@/components/ui/use-toast";
import AreYouSure, { AlertInfo } from "@/components/custom/AreYouSure";

const Tables = ({ data, setData }: { data: any; setData: Function }) => {
  const { toast } = useToast();
  const deleteData = async (id: string) => {
    const data = await deleteServiceVehicle(id);
    if (data) {
      toast({
        description: "Deleted Sucessfully!",
      });
      setData((da: any) => da.filter((d: any) => d.id != id));
    } else {
      toast({
        description: "Something goes wrong!!",
      });
    }
  };
  return (
    <table className="w-full table-auto border-collapse border border-gray-300 text-sm">
      <thead className="bg-gray-100">
        <tr>
          <th className="whitespace-nowrap border border-gray-300 px-4 py-2"></th>
          <th className="whitespace-nowrap border border-gray-300 px-4 py-2">
            No
          </th>
          <th className="whitespace-nowrap border border-gray-300 px-4 py-2">
            Chassis Number
          </th>
          <th className="whitespace-nowrap border border-gray-300 px-4 py-2">
            Libre Number
          </th>
          <th className="whitespace-nowrap border border-gray-300 px-4 py-2">
            Region
          </th>
          <th className="whitespace-nowrap border border-gray-300 px-4 py-2">
            Code
          </th>
          <th className="whitespace-nowrap border border-gray-300 px-4 py-2">
            Plate Number
          </th>
          <th className="whitespace-nowrap border border-gray-300 px-4 py-2">
            Vehicle Type
          </th>
          <th className="whitespace-nowrap border border-gray-300 px-4 py-2">
            Determination Kern No
          </th>
          <th className="whitespace-nowrap border border-gray-300 px-4 py-2">
            Determination Price
          </th>
          <th className="whitespace-nowrap border border-gray-300 px-4 py-2">
            Sales Value
          </th>
          <th className="whitespace-nowrap border border-gray-300 px-4 py-2">
            Penalty Gov
          </th>
          <th className="whitespace-nowrap border border-gray-300 px-4 py-2">
            Penalty
          </th>
          <th className="whitespace-nowrap border border-gray-300 px-4 py-2">
            Bank Name
          </th>
          <th className="whitespace-nowrap border border-gray-300 px-4 py-2">
            Pre-Payment
          </th>
          <th className="whitespace-nowrap border border-gray-300 px-4 py-2">
            Payment Type
          </th>
          <th className="whitespace-nowrap border border-gray-300 px-4 py-2">
            Cheque Number
          </th>
          {/* <th className="border border-gray-300 px-4 py-2">Customer Name</th>
          <th className="border border-gray-300 px-4 py-2">Father Name</th>
          <th className="border border-gray-300 px-4 py-2">Grandfather Name</th>
          <th className="border border-gray-300 px-4 py-2">Gender</th>
          <th className="border border-gray-300 px-4 py-2">Nationality</th>
          <th className="border border-gray-300 px-4 py-2">Origin</th>
          <th className="border border-gray-300 px-4 py-2">TIN</th>
          <th className="border border-gray-300 px-4 py-2">Foreign</th>
          <th className="border border-gray-300 px-4 py-2">
            Region (Customer)
          </th>
          <th className="border border-gray-300 px-4 py-2">City</th>
          <th className="border border-gray-300 px-4 py-2">Subcity</th>
          <th className="border border-gray-300 px-4 py-2">House Number</th>
          <th className="border border-gray-300 px-4 py-2">Phone Number</th>
          <th className="border border-gray-300 px-4 py-2">Service Type</th>
          <th className="border border-gray-300 px-4 py-2">Confirm Status</th>
          <th className="border border-gray-300 px-4 py-2">Print Status</th>
          <th className="border border-gray-300 px-4 py-2">File Location</th>
          <th className="border border-gray-300 px-4 py-2">Number of Pages</th>
          <th className="border border-gray-300 px-4 py-2">Case Number</th> */}
        </tr>
      </thead>
      <tbody>
        {data.map((item: any, index: number) => (
          <Item key={index} index={index} item={item} deleteData={deleteData} />
        ))}
      </tbody>
    </table>
  );
};

export default Tables;

const Item = ({
  index,
  item,
  deleteData,
}: {
  index: number;
  item: any;
  deleteData: Function;
}) => {
  // const customers = item.customers.map((c : CustomerDB) => toCustomerClient(c))
  const vehicle = toVehicleClient(item);
  const [alertInfo, setAlertInfo] = useState<AlertInfo | null>(null);

  return (
    <tr className="duration-300 hover:bg-gray-100">
      {alertInfo && <AreYouSure {...alertInfo} />}
      <td className="whitespace-nowrap border border-gray-300 px-4 py-2 duration-200">
        <MdDeleteForever
          onClick={() => {
            setAlertInfo({
              title: "Delete Vehicle!",
              description: "Are you sure you want to delete this vehicle ?",
              execute: (res: boolean) => {
                res && deleteData(item.id);
                setAlertInfo(null);
              },
              open: true,
            });
          }}
          className="cursor-pointer text-xl text-orange-500"
        />{" "}
      </td>
      <td className="whitespace-nowrap border border-gray-300 px-4 py-2 duration-200">
        {index + 1}
      </td>
      <td className="whitespace-nowrap border border-gray-300 px-4 py-2 duration-200">
        {vehicle.chassisNumber}
      </td>
      <td className="whitespace-nowrap border border-gray-300 px-4 py-2 duration-200">
        {vehicle.libreNumber}
      </td>
      <td className="whitespace-nowrap border border-gray-300 px-4 py-2 duration-200">
        {vehicle.region}
      </td>
      <td className="whitespace-nowrap border border-gray-300 px-4 py-2 duration-200">
        {vehicle.code}
      </td>
      <td className="whitespace-nowrap border border-gray-300 px-4 py-2 duration-200">
        {vehicle.plateNumber}
      </td>
      <td className="whitespace-nowrap border border-gray-300 px-4 py-2 duration-200">
        {vehicle.vehicleType}
      </td>
      <td className="whitespace-nowrap border border-gray-300 px-4 py-2 duration-200">
        {vehicle.determinationKernNo}
      </td>
      <td className="whitespace-nowrap border border-gray-300 px-4 py-2 duration-200">
        {vehicle.determinationPrice}
      </td>
      <td className="whitespace-nowrap border border-gray-300 px-4 py-2 duration-200">
        {vehicle.salesValue}
      </td>
      <td className="whitespace-nowrap border border-gray-300 px-4 py-2 duration-200">
        {vehicle.penaltyGov}
      </td>
      <td className="whitespace-nowrap border border-gray-300 px-4 py-2 duration-200">
        {vehicle.penalty}
      </td>
      <td className="whitespace-nowrap border border-gray-300 px-4 py-2 duration-200">
        {vehicle.bankName}
      </td>
      <td className="whitespace-nowrap border border-gray-300 px-4 py-2 duration-200">
        {vehicle.prePayment}
      </td>
      <td className="whitespace-nowrap border border-gray-300 px-4 py-2 duration-200">
        {vehicle.paymentType}
      </td>
      <td className="whitespace-nowrap border border-gray-300 px-4 py-2 duration-200">
        {vehicle.chequeNumber}
      </td>
      {/* <td className="border border-gray-300 px-4 py-2">customer.name</td>
      <td className="border border-gray-300 px-4 py-2">customer.fatherName</td>
      <td className="border border-gray-300 px-4 py-2">
        customer.grandFatherName
      </td>
      <td className="border border-gray-300 px-4 py-2">customer.gender</td>
      <td className="border border-gray-300 px-4 py-2">customer.nationality</td>
      <td className="border border-gray-300 px-4 py-2">customer.origin</td>
      <td className="border border-gray-300 px-4 py-2">customer.tin</td>
      <td className="border border-gray-300 px-4 py-2">
        customer.foreign ? 'Yes' : 'No'
      </td> */}
      {/* <td className="border border-gray-300 px-4 py-2">customer.region</td>
      <td className="border border-gray-300 px-4 py-2">customer.city</td>
      <td className="border border-gray-300 px-4 py-2">customer.subcity</td>
      <td className="border border-gray-300 px-4 py-2">customer.houseNumber</td>
      <td className="border border-gray-300 px-4 py-2">customer.phoneNumber</td>
      <td className="border border-gray-300 px-4 py-2">service.serviceType</td>
      <td className="border border-gray-300 px-4 py-2">
        service.confirmStatus
      </td>
      <td className="border border-gray-300 px-4 py-2">
        service.printStatus ? 'Printed' : 'Not Printed'
      </td>
      <td className="border border-gray-300 px-4 py-2">service.fileLocation</td>
      <td className="border border-gray-300 px-4 py-2">
        service.numberOfPages
      </td>
      <td className="border border-gray-300 px-4 py-2">service.caseNumber</td> */}
    </tr>
  );
};
