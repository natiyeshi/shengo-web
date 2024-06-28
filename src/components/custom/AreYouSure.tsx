import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Group } from "@mantine/core";

export type AlertInf = {
  open?: boolean;
  title: string;
  description: string;
  execute: Function;
};

export default function AreYouSure({
  title,
  description,
  open = true,
  execute,
}: AlertInf) {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent className="w-[85%] max-w-[30rem]">
       
        <AlertDialogHeader>
          <AlertDialogTitle className="text-left">{title}</AlertDialogTitle>
          <AlertDialogDescription className="text-left">{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-5">
          <Group justify="flex-end">
            <AlertDialogCancel
              className="m-0 w-[5.5rem]"
              onClick={() => execute(false)}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="w-[5.5rem]"
              onClick={() => execute(true)}
            >
              Yes
            </AlertDialogAction>
          </Group>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
