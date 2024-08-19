"use client";
import React, { useEffect, useState } from "react";
import { getServiceVehicle } from "./getData";
import Tables from "./table";

const Page = () => {
  const [data, setData] = useState<any>([]);
  useEffect(() => {
    const a = async () => {
      try {
        const d = await getServiceVehicle();
        setData(d);
      } catch (err) {
        setData(null);
      }
    };
    a();
  }, []);



  return (
    <div className="relative pb-12">
      <div className="sticky left-0 right-0 top-0 my-5 bg-white py-3 ps-2 text-lg font-semibold shadow">
        Sells Vehicle Datas
      </div>
      <div className="overflow-auto ps-2">
        {data == null ? (
          <div>Something goes wrong!!</div>
        ) : (
          <Tables data={data} setData={setData} />
        )}
      </div>
    </div>
  );
};

export default Page;
