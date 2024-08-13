"use client";
import Profile from "@/components/custom/profile";
import { Badge } from "@mantine/core";
type Props = {};

const Header = (props: Props) => {
  return (
    <div className="flex items-center justify-between px-4 py-3">
      <Badge size="lg">Shengo Application</Badge>
      <Profile />
    </div>
  );
};

export default Header;
