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
import { useRouter } from "next/navigation";

interface FormValues {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const form = useForm<FormValues>({
    mode: "controlled",
    initialValues: {
      email: "test@gmail.com",
      password: "12345678",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid Email"),
      password: (value) =>
        value.length >= 6 ? null : "Password should be 6 or more",
    },
  });

  const router = useRouter();

  const handleSubmit = (e: any) => {
    // Handle form submission
    // console.log("Form values:", values);
    e.preventDefault();
    const { hasErrors } = form.validate();
    if (hasErrors) return;
    router.push("/dashboard");
  };

  return (
    <div className="mt-0 bg-primary pt-0" style={{ height: "100vh" }}>
      <Container size={520} py={40} className="">
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <Title className="text-center" style={{ fontWeight: 900 }}>
            Welcome To <span className="text-primary">Shengo</span>
          </Title>
          <Text c="dimmed" size="sm" className="text-center" mt={5}>
            Sign in here!
          </Text>
          {/* <form onSubmit={form.onSubmit((values) => handleSubmit(values))}> */}
          <form onSubmit={handleSubmit}>
            <TextInput
              label="Email"
              placeholder="you@example.com"
              {...form.getInputProps("email")}
            />
            <PasswordInput
              label="Password"
              placeholder="Your password"
              mt="md"
              {...form.getInputProps("password")}
            />
            <Box mt="md" display="flex">
              <Button type="submit">Login</Button>
            </Box>
            <Link href={"/auth/forget"}>
              <Text
                c="dimmed"
                size="sm"
                className="text-center hover:text-primary"
                mt={10}
              >
                Forget your password.
              </Text>
            </Link>
            <Text c="dimmed" size="sm" className="text-center" mt={5}>
              Do not have an account yet?{" "}
              <Link href={"/auth/register"} className="text-primary">
                Register
              </Link>
            </Text>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default LoginPage;
