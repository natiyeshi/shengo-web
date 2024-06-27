import React from "react";
import { PersonInf } from "./types";
import { MdPerson } from "react-icons/md";

interface props {
  person: PersonInf;
  onDelete: Function;
  onEdit: Function;
  editing: boolean;
}

const Person = ({ person, onDelete, onEdit, editing }: props) => {
  const isOrganization = person.customerType === "Organization";
  return (
    <div
      className={`flex w-fit gap-4 rounded-xl border bg-gray-200 px-5 py-2 shadow-lg`}
    >
      <div className="flex">
        <MdPerson className="my-auto text-3xl text-primary" />
      </div>
      <div className="flex flex-col justify-between gap-1">
        <div className="flex gap-2 text-sm">
          <p>
            {person.customerTitle}
            {isOrganization ? person.grantorName : person.name}
          </p>
        </div>
        <div className="flex w-full justify-between gap-2">
          <button
            onClick={() => onEdit()}
            className="flex gap-1 bg-transparent px-0 py-1 text-sm text-black hover:underline"
          >
            {/* <MdEdit className="my-auto text-sm" /> */}
            <span>Edit</span>
          </button>
          <button
            onClick={() => onDelete()}
            className="text-destractive flex gap-1 bg-transparent px-0 py-1 text-sm hover:underline"
          >
            {/* <MdDelete className="my-auto text-sm" /> */}
            <span>Delete</span>
          </button>
        </div>
        {editing && (
          <p className="text-xs font-semibold text-primary">
            Editing this file...
          </p>
        )}
      </div>
    </div>
  );
};

export default Person;
