import { ReactElement } from "react";

export type Selector = {
  label: string;
  value: string;
};

export type ServiceCard = {
  icon: ReactElement;
  title: string;
  description: string;
  exploreLink?: string;
};
