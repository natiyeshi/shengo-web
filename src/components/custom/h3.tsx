import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  children: React.ReactNode;
};

const H3 = ({ children, className }: Props) => {
  return (
    <h3 className={cn("font-semibold text-lg md:xl", className)}>{children}</h3>
  );
};

export default H3;
