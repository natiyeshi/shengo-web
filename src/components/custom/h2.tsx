import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  children: React.ReactNode;
};

const H2 = ({ children, className }: Props) => {
  return (
    <h2 className={cn("font-semibold text-xl md:2xl", className)}>
      {children}
    </h2>
  );
};

export default H2;
