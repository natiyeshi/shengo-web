import { Group, Stack } from "@mantine/core";
import React from "react";
import { Button } from "../ui/button";
import { MdArrowForward, MdClear } from "react-icons/md";
import { Save } from "lucide-react";

type Props = {
  clearAction: () => void;
  isEditing: boolean;
  showNextButton?: boolean;
  nextAction?: () => void;
};

const FormFooterButtons = ({
  clearAction,
  isEditing,
  showNextButton,
  nextAction,
}: Props) => {
  return (
    <Stack>
      <Group className="my-7" justify="flex-end" gap="md">
        <Button
          type="button"
          className="text-destructive"
          onClick={() => {
            clearAction();
          }}
          variant={"outline"}
        >
          <Group gap="sm">
            <MdClear className="text-bold" />
            <span>Clear</span>
          </Group>
        </Button>
        <Button variant={"outline"}>
          <Group gap="sm" className="text-primary">
            <Save className="text-bold" />
            {isEditing ? <span>Confirm</span> : <span>Save</span>}
          </Group>
        </Button>
        {showNextButton && (
          <Button variant="ghost" onClick={() => nextAction?.()} type="button">
            <Group>
              <MdArrowForward className="text-bold me-1 text-xl" />
            </Group>
          </Button>
        )}
      </Group>
    </Stack>
  );
};

export default FormFooterButtons;
