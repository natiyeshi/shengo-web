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
import { FaGifts } from "react-icons/fa";
import FamilyImage from "../../../../public/images/family-2.jpg";
import Image from "next/image";

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
    <main
      className="grid grid-cols-1 overflow-auto lg:grid-cols-[7fr_6fr]"
      style={{ height: "100vh" }}
    >
      <section className="relative flex h-[60dvh] flex-col items-center lg:h-auto">
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
          {/* <form onSubmit={form.onSubmit((values) => handleSubmit(values))}> */}
          <form onSubmit={handleSubmit} className="flex flex-col">
            <TextInput
              size="md"
              label="Email"
              placeholder="you@example.com"
              {...form.getInputProps("email")}
            />
            <PasswordInput
              size="md"
              label="Password"
              placeholder="Your password"
              mt="md"
              {...form.getInputProps("password")}
            />

            <Box mt="md">
              <Button type="submit" className="w-full" size="md">
                Login
              </Button>
            </Box>
            <section className="mt-7 flex flex-col text-sm text-zinc-600">
              <Text>
                Do not have an account yet,{" "}
                <Link href={"/auth/register"} className="text-primary">
                  Register ?
                </Link>
              </Text>
              <Link href={"/auth/forget"}>
                <Text className="hover:text-primary">
                  Forget your <span className="text-primary">password?</span>
                </Text>
              </Link>
            </section>
          </form>
        </div>
      </section>
    </main>
  );
};

export default LoginPage;
