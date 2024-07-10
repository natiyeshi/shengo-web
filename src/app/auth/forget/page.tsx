"use client";
import React from "react";
import { useForm } from "@mantine/form";
import {
  TextInput,
  Paper,
  Group,
  Button,
  Container,
  Title,
  Text,
  Box,
} from "@mantine/core";
import Link from "next/link";

interface FormValues {
  email: string;
}

const ForgetPasswordPage: React.FC = () => {
  const form = useForm<FormValues>({
    mode: "controlled",
    initialValues: {
      email: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid Email"),
    },
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const { hasErrors } = form.validate();
    if (hasErrors) return;
    alert("Password reset link sent to your email");
  };

  return (
    <div className="mt-0 bg-primary pt-0" style={{ height: "100vh" }}>
      <Container size={520} py={40} className="">
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <Title className="text-center" style={{ fontWeight: 900 }}>
            Forgot Password?
          </Title>
          <Text color="dimmed" size="sm" className="text-center" mt={5}>
            Enter your email to reset your password
          </Text>
          <form onSubmit={handleSubmit}>
            <TextInput
              label="Email"
              placeholder="you@example.com"
              {...form.getInputProps("email")}
            />
            <Box mt="md" display="flex" >
              <Button type="submit">Send Reset Link</Button>
            </Box>
            <Text color="dimmed" size="sm" className="text-center" mt={10}>
              Remember your password?{" "}
              <Link href={"/auth/login"} className="text-primary">
                Login
              </Link>
            </Text>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default ForgetPasswordPage;
