"use client";
import React from "react";
import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Button,
  Title,
  Text,
  Box,
} from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaGifts } from "react-icons/fa";
import FamilyImage from "../../../../public/images/family-3.jpg";
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
      <section className="relative flex h-[60dvh] items-center justify-center lg:h-auto">
        <div className="relative h-full w-full">
          <Image
            src={FamilyImage}
            alt="product image"
            className="object-contain"
            style={{ backgroundPositionX: "left" }}
            fill
            placeholder="blur"
          />
        </div>
      </section>
      <section className="flex items-center">
        <div className="w-full p-8">
          <Title
            className="my-8 flex items-center justify-center gap-3 text-2xl md:text-4xl"
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

            <Box mt="md">
              <Button type="submit" className="w-full">
                Login
              </Button>
            </Box>
            <section className="mt-4 flex flex-col text-sm text-zinc-600">
              <p>
                Do not have an account yet,{" "}
                <Link href={"/auth/register"} className="text-primary">
                  Register ?
                </Link>
              </p>
              <Link href={"/auth/forget"}>
                <p className="hover:text-primary">
                  Forget your <span className="text-primary">password?</span>
                </p>
              </Link>
            </section>
          </form>
        </div>
      </section>
    </main>
  );
};

export default LoginPage;
