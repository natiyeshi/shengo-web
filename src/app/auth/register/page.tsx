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
import FamilyImage from "../../../../public/images/family-2.jpg";
import Image from "next/image";
import { FaGifts } from "react-icons/fa";
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
      email: "test@gmail.com",
      password: "12345678",
      confirmPassword: "12345678",
      phoneNumber: "091122334455",
      fullName: "Doro Bet",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid Email"),
      password: (value) =>
        value.length >= 6 ? null : "Password should be 6 or more",
      confirmPassword: (value, values) =>
        value === values.password ? null : "Passwords do not match",
      phoneNumber: (value) =>
        /^[0-9]+$/.test(value) ? null : "Invalid phone number",
      fullName: (value) =>
        value.trim() !== "" ? null : "Full name is required",
    },
  });

  const router = useRouter();
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const { hasErrors } = form.validate();
    if (hasErrors) return;
    router.push("/auth/login");
  };

  return (
    <main
      className="grid grid-cols-1 overflow-auto lg:grid-cols-[7fr_6fr]"
      style={{ height: "100vh" }}
    >
      <section className="relative flex h-[60dvh] flex-col items-center py-7 lg:h-auto">
        <div className="relative w-full flex-1">
          <Image
            src={FamilyImage}
            alt="product image"
            className="object-cover"
            style={{ backgroundPositionX: "left" }}
            fill
            placeholder="blur"
          />
        </div>
      </section>
      <section className="flex items-center">
        <div className="w-full p-8">
          <Title
            className="my-8 flex items-center justify-center gap-3 text-3xl md:text-5xl"
            style={{ fontWeight: 700 }}
          >
            <FaGifts />
            <p>
              Welcome To <span className="text-primary">Shengo</span>
            </p>
          </Title>

          <form onSubmit={handleSubmit}>
            <TextInput
              size="md"
              label="Full Name"
              placeholder="John Doe"
              {...form.getInputProps("fullName")}
            />
            <TextInput
              size="md"
              label="Email"
              placeholder="you@example.com"
              mt="md"
              {...form.getInputProps("email")}
            />
            <TextInput
              size="md"
              label="Phone Number"
              placeholder="1234567890"
              mt="md"
              {...form.getInputProps("phoneNumber")}
            />
            <PasswordInput
              size="md"
              label="Password"
              placeholder="Your password"
              mt="md"
              {...form.getInputProps("password")}
            />
            <PasswordInput
              size="md"
              label="Confirm Password"
              placeholder="Confirm your password"
              mt="md"
              {...form.getInputProps("confirmPassword")}
            />
            <Box mt="md" display="flex" w={"full"}>
              <Button type="submit" size="md" className="w-full">
                Register
              </Button>
            </Box>
            <Text c="dimmed" size="sm" className="mt-4">
              Already have an account?{" "}
              <Link href={"/auth/login"} className="text-primary">
                Login
              </Link>
            </Text>
          </form>
        </div>
      </section>
    </main>
  );
};

export default RegistrationPage;
