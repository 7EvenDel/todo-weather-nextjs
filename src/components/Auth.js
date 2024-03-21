"use client";

import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
      <div className="w-[554px] h-[669px] shadow">
        <h1 className="font-bold text-[32px]">Create account</h1>
        <p className="text-[16px] mb-[100px]">
          Already have an accont?
          <Button variant="link" className="text-[16px] font-normal -mx-2">
            Login
          </Button>
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="">
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-600"
            >
              login
            </label>
            <input
              maxLength="30"
              type="text"
              id="name"
              {...register("name")}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-primary"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="contacts"
              className="block text-sm font-medium text-gray-600"
            >
              pass
            </label>
            <input
              maxLength="45"
              type="text"
              id="contacts"
              {...register("contacts")}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-primary"
            />
            {errors.contacts && (
              <p className="text-red-500 text-sm">{errors.contacts.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="comment"
              className="block text-sm font-medium text-gray-600"
            >
              email
            </label>
            <textarea
              maxLength="112"
              id="comment"
              {...register("comment")}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-primary"
            />
          </div>

          <button
            type="submit"
            disabled={sending}
            className={
              sending
                ? "w-full h-16 rounded-full flex items-center justify-center flex transition ease-in-out delay-150 opacity-80 duration-300"
                : "w-full h-16 rounded-full flex items-center justify-center cursor-pointer flex transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-300"
            }
          >
            <p>{sending ? "Sending..." : "Send"}</p>
          </button>
        </form>
      </div>
    </section>
  );
};

export default Auth;
