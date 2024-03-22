"use client";

import { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Checkbox } from "./ui/checkbox";
import Image from "next/image";
import { signIn } from "next-auth/react";

const schema = z.object({
  name: z.string().min(3, { message: "Ім'я має містити щонайменше 3 символи" }),
  contacts: z
    .string()
    .min(6, { message: "Контакти мають містити щонайменше 6 символів" }),
  comment: z.string().optional(),
});

const Auth = () => {
  const [sending, setSending] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    setSending(true);
    var date = new Date();
    data.formattedDate = `${date.getDate()}-${
      date.getMonth() + 1
    }-${date.getFullYear()}`;

    try {
      const res = await fetch("http://localhost:3000/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        openPopup("Data wasn't sent");
        setSending(false);
        throw new Error("failed to fetch");
      }

      setSending(false);
      openPopup("Ваші дані успішно надіслані!");
      return res.text();
    } catch (error) {
      openPopup("Не вдалося надіслати...");
      setSending(false);
    }
  };

  return (
    <section className="flex flex-col items-center mt-[103px] bg-cover">
      <div className="w-[554px] h-[669px]">
        <h1 className="font-bold text-[32px]">Create account</h1>
        <p className="text-[16px] mb-[100px]">
          Already have an accont?
          <Button variant="link" className="text-[16px] font-normal -mx-2">
            Login
          </Button>
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="mb-5 flex gap-8 w-full">
            <div className="w-1/2">
              <Input
                type="text"
                {...register("name")}
                placeholder="First Name"
                className="text-[16px] px-4 py-3 bg-transparent border border-gray-500 rounded w-full h-12"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>
            <div className="w-1/2">
              <Input
                type="text"
                {...register("name")}
                placeholder="Last Name"
                className="text-[16px] px-4 py-3 bg-transparent border border-gray-500 rounded w-full h-12"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>
          </div>

          <div className="mb-5">
            <Input
              type="text"
              placeholder="Email"
              {...register("contacts")}
              className="text-[16px] px-4 py-3 bg-transparent border border-gray-500 rounded w-full h-12"
            />
            {errors.contacts && (
              <p className="text-red-500 text-sm">{errors.contacts.message}</p>
            )}
          </div>

          <div className="mb-4">
            <Input
              type="text"
              placeholder="Password"
              {...register("contacts")}
              className="text-[16px] px-4 py-3 bg-transparent border border-gray-500 rounded w-full h-12"
            />
            {errors.contacts && (
              <p className="text-red-500 text-sm">{errors.contacts.message}</p>
            )}
          </div>

          <div className="flex gap-2 items-center mb-6">
            <Checkbox className="size-[18px] rounded border-black" />
            <Label className="text-[14px]">
              I agree to DopeSass{" "}
              <Button variant="link" className="p-0 py-0 h-4" type="button">
                Terms of service
              </Button>{" "}
              and{" "}
              <Button variant="link" className="p-0 py-0 h-4" type="button">
                Privacy policy
              </Button>
            </Label>
          </div>

          <Button
            type="submit"
            disabled={sending}
            className={
              sending
                ? "w-full h-16 flex items-center justify-center flex h-[49px] text-[16px] mb-6"
                : "w-full h-16 flex items-center justify-center cursor-pointer flex h-[49px] text-[16px] mb-6"
            }
          >
            <p>{sending ? "Wait..." : "Create account"}</p>
          </Button>

          <div className="flex items-center justify-between mb-6">
            <Separator className="max-w-64 bg-gray-400" />
            <p>or</p>
            <Separator className="max-w-64 bg-gray-400" />
          </div>

          <Button
            type="button"
            variant="ghost"
            disabled={sending}
            onClick={() => signIn()}
            className={
              sending
                ? "flex border border-black w-full h-16 flex items-center justify-center flex h-[49px] text-[16px] mb-4"
                : "flex border border-black w-full h-16 flex items-center justify-center cursor-pointer flex h-[49px] text-[16px] mb-4"
            }
          >
            <Image
              className="mr-2"
              height="18"
              width="18"
              alt="google"
              src="/google.webp"
            />
            <p>Continue with Google</p>
          </Button>
          <Button
            type="button"
            variant="ghost"
            disabled={sending}
            onClick={() => signIn()}
            className={
              sending
                ? "flex border border-black w-full h-16 flex items-center justify-center flex h-[49px] text-[16px] mb-6"
                : "flex border border-black w-full h-16 flex items-center justify-center cursor-pointer flex h-[49px] text-[16px] mb-6"
            }
          >
            <Image
              className="mr-2"
              height="18"
              width="18"
              alt="apple"
              src="/apple.png"
            />
            <p>Continue with Apple</p>
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Auth;
