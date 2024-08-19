"use client";

import { toast } from "@/components/ui/use-toast";
import { useState } from "react";

export const useAsyncWrapper = () => {
  const [status, setStatus] = useState<"IDEL" | "LOADING" | "ERROR">("IDEL");

  const asyncWrapper = (callback: Function, successMessage?: string) => {
    return async () => {
      setStatus("LOADING");
      try {
        await callback();
        setStatus("IDEL");
        return toast({
          title: "Success",
          description: successMessage || "Operation completed successfully",
          duration: 3000,
        });
      } catch (error: any) {
        setStatus("ERROR");
        return toast({
          title: "Failed",
          description:
            error.message || "Something went wrong, please try again!",
          variant: "destructive",
          duration: 3000,
        });
      }
    };
  };

  const isSubmitting = status === "LOADING";

  return { status, isSubmitting, asyncWrapper };
};
