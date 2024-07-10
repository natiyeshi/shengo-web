"use client";
import React from "react";
import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
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
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  fullName: string;
}

const RegistrationPage: React.FC = () => {
  const form = useForm<FormValues>({
    mode: "controlled",
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
      fullName: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid Email"),
      password: (value) =>
        value.length >= 6 ? null : "Password should be 6 or more",
      confirmPassword: (value, values) =>
        value === values.password ? null : "Passwords do not match",
      phoneNumber: (value) =>
        /^[0-9]+$/.test(value) ? null : "Invalid phone number",
      fullName: (value) => (value.trim() !== "" ? null : "Full name is required"),
    },
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const { hasErrors } = form.validate();
    if (hasErrors) return;
    alert("Registration successful");
  };

  return (
    <div className="mt-0 bg-primary pt-0 overflow-auto" style={{ height: "100vh" }}>
      <Container size={520} py={40} className="">
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <Title className="text-center" style={{ fontWeight: 900 }}>
            Welcome To <span className="text-primary">Shengo</span>
          </Title>
          <Text color="dimmed" size="sm" className="text-center" mt={5}>
            Register here!
          </Text>
          <form onSubmit={handleSubmit}>
            <TextInput
              label="Full Name"
              placeholder="John Doe"
              {...form.getInputProps("fullName")}
            />
            <TextInput
              label="Email"
              placeholder="you@example.com"
              mt="md"
              {...form.getInputProps("email")}
            />
            <TextInput
              label="Phone Number"
              placeholder="1234567890"
              mt="md"
              {...form.getInputProps("phoneNumber")}
            />
            <PasswordInput
              label="Password"
              placeholder="Your password"
              mt="md"
              {...form.getInputProps("password")}
            />
            <PasswordInput
              label="Confirm Password"
              placeholder="Confirm your password"
              mt="md"
              {...form.getInputProps("confirmPassword")}
            />
            <Box mt="md" display="flex">
              <Button type="submit">Register</Button>
            </Box>
            <Text color="dimmed" size="sm" className="text-center" mt={5}>
              Already have an account? {" "}
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

export default RegistrationPage;
