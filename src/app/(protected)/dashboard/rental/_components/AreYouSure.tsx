import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
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
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Group justify="flex-end">
            <AlertDialogCancel onClick={() => execute(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={() => execute(true)}>
              Yes
            </AlertDialogAction>
          </Group>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
