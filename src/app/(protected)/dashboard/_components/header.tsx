import Profile from "@/components/custom/profile";
import React from "react";

type Props = {};

const Header = (props: Props) => {
  return (
    <div className="flex items-center justify-between px-4 py-3 shadow">
      <h1 className="font-bold text-primary">Logo</h1>
      <Profile />
    </div>
  );
};

export default Header;
