import React from "react";
import ButtonWithIcon from "./button-with-icon";
import { ArrowLeft, File } from "lucide-react";
import { Title } from "@mantine/core";

type Props = {};

const ServiceRequest = (props: Props) => {
  return (
    <section>
      <div className="mb-10">
        <Title order={2}>You are done with filling the form</Title>
        <ButtonWithIcon className="mt-7" size="lg">
          <File />
          <span>Print Service</span>
        </ButtonWithIcon>
      </div>

      <ButtonWithIcon variant="outline">
        <ArrowLeft />
        <span>Back</span>
      </ButtonWithIcon>
    </section>
  );
};

export default ServiceRequest;
