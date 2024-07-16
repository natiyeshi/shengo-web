import { BikeIcon, BoxIcon, BriefcaseIcon, CarIcon, ClipboardIcon, ConeIcon, HomeIcon, TruckIcon } from "lucide-react";
import { ServiceCard } from "../_types";

export const Services: ServiceCard[] = [
    {
      icon: <CarIcon className="h-6 w-6" />,
      title: "Vehicle",
      description:
        "Buy, sell, or rent any type of vehicle, from cars to construction equipment.",
      exploreLink: " #",
    },
    {
      icon: <HomeIcon className="h-6 w-6" />,
      title: "Residence",
      description:
        "Find your dream home or investment property, whether you're buying or renting.",
      exploreLink: "#",
    },
    {
      icon: <BriefcaseIcon className="h-6 w-6" />,
      title: "Business",
      description: "Buy, sell, or rent commercial properties and businesses.",
      exploreLink: "#",
    },
    {
      icon: <BoxIcon className="h-6 w-6" />,
      title: "Other Property",
      description:
        "Buy, sell, or rent any other type of property, from land to specialized assets.",
      exploreLink: "#",
    },
    {
      icon: <TruckIcon className="h-6 w-6" />,
      title: "Vehicle Spare Part",
      description: "Buy, sell, or rent any type of vehicle spare part.",
      exploreLink: "#",
    },
    {
      icon: <BikeIcon className="h-6 w-6" />,
      title: "Motor Cycle",
      description: "Buy, sell, or rent any type of motorcycle.",
      exploreLink: "#",
    },
    {
      icon: <ConeIcon className="h-6 w-6" />,
      title: "Consstruction Machine",
      description: "Buy, sell, or rent any type of construction equipment.",
      exploreLink: "#",
    },
    {
      icon: <ClipboardIcon className="h-6 w-6" />,
      title: "Lease",
      description: "Lease any type of property or asset.",
      exploreLink: "#",
    },
  ];