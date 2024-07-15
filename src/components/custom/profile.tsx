import {
  Avatar,
  Menu,
  MenuDropdown,
  MenuItem,
  MenuTarget,
} from "@mantine/core";
import { LogOut, User } from "lucide-react";
import React from "react";

type Props = {};

const Profile = (props: Props) => {
  return (
    <Menu>
      <MenuTarget>
        <Avatar radius="xl" color="initials" component="button">
          N
        </Avatar>
      </MenuTarget>
      <MenuDropdown className="shadow-md" >
        <MenuItem className="w-[10rem]"  leftSection={<User size={15} className="opacity-70" />}>
          Profile
        </MenuItem>
        <MenuItem className="w-[10rem]" leftSection={<LogOut size={15} className="opacity-70" />}>
          Logout
        </MenuItem>
      </MenuDropdown>
    </Menu>
  );
};

export default Profile;
