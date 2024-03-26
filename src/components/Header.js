"use client";

import {
  Form,
  FormControl,
  FormItem,
  FormField,
  FormLabel,
  FormMessage,
} from "./ui/form";
import Link from "next/link";
import { Label } from "./ui/label";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogDescription,
  DialogTitle,
  DialogClose,
  DialogHeader,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Image from "next/image";
import { InfoIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { toast } from "sonner";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect } from "react";

const Header = () => {
  
  const { data: session } = useSession();
  const router = usePathname();
  return (
    <header className="bg-white drop-shadow pb-2">
      <div className="container flex justify-between items-center">
        <Link
          href="/weather"
          className="flex flex-col w-20 items-center hover:opacity-50 cursor-pointer transition duration-200 "
        >
          <Image src="/logo.jpg" alt="logo" width={50} height={50} priority />
          <Label>ToDoWeath</Label>
        </Link>
        <div className="w-full flex justify-end gap-4 mt-2 px-32">
          <Link href="/history">
            <Button
              variant="ghost"
              className={router === "/history" ? "font-bold" : null}
            >
              History
            </Button>
          </Link>
          <Link href="/weather">
            <Button
              variant="ghost"
              className={router === "/weather" ? "font-bold" : null}
            >
              Weather
            </Button>
          </Link>
          <Link href="/tasks">
            <Button
              variant="ghost"
              className={router === "/tasks" ? "font-bold" : null}
            >
              My Tasks
            </Button>
          </Link>
        </div>
        {session && session.user ? (
          <Dialog>
            <DialogTrigger asChild className="mt-2 relative size-12">
              <img
                src={
                  session?.user.image
                    ? session.user.image
                    : "https://cdn-icons-png.freepik.com/256/1144/1144760.png"
                }
                alt="user"
                className="size-12 rounded-full hover:opacity-50 cursor-pointer transition duration-200"
              />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  Edit profile
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <InfoIcon className="size-4 text-gray-700" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>
                          Your account`s data can be used by DopeSass Terms of
                          service and Privacy policy
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </DialogTitle>
                <DialogDescription>
                  Make changes to your profile here
                </DialogDescription>
                <img
                  src={
                    session?.user.image
                      ? session.user.image
                      : "https://cdn-icons-png.freepik.com/256/1144/1144760.png"
                  }
                  alt="user"
                  className="size-12 rounded-full absolute right-10 top-3"
                />
              </DialogHeader>
              <ProfileForm />
            </DialogContent>
          </Dialog>
        ) : (
          <Link href="/auth">
            <Button
              variant="ghost"
              className={router === "/auth" ? "font-bold mt-2" : "mt-2"}
            >
              Sign in
            </Button>
          </Link>
        )}
      </div>
    </header>
  );
};

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().min(2, {
    message: "You forgot to enter your email.",
  }),
  language: z.string(),
  dateFormat: z.string(),
  timeFormat: z.string(),
  timeZone: z.string(),
  country: z.string(),
});

const ProfileForm = () => {
  const { data: session } = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = (data) => {
    toast.success("Your account has been updated");
    console.log(data, session.user);
  };

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: session?.user.name,
      email: session?.user.email,
      language: "english",
      dateFormat: "ddmmyyyy",
      timeFormat: "24",
      timeZone: "eastEurope",
      country: "Ukraine",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-2/3 space-y-6 w-full"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input defaultValue={session?.user.name} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input defaultValue={session?.user.email} {...field} disabled />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="language"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Language</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={
                  session.user.language ? session.user.language : "english"
                }
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Language" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Select your language</SelectLabel>
                    <SelectItem value="ukrainian">Ukrainian</SelectItem>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="italian">Italian</SelectItem>
                    <SelectItem value="germany">Germany</SelectItem>
                    <SelectItem value="french">French</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between space-x-4 w-full">
          <FormField
            control={form.control}
            name="dateFormat"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormLabel>Date Format</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={
                    session.user.dateFormat
                      ? session.user.dateFormat
                      : "ddmmyyyy"
                  }
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Date Format" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Select date format</SelectLabel>
                      <SelectItem value="mmddyyyy">MM/DD/YYYY</SelectItem>
                      <SelectItem value="ddmmyyyy">DD/MM/YYYY</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="timeFormat"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormLabel>Time Format</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={
                    session.user.timeFormat ? session.user.timeFormat : "24"
                  }
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Time Format" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Select time format</SelectLabel>
                      <SelectItem value="12">12h (am/pm)</SelectItem>
                      <SelectItem value="24">24h</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="timeZone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Time Zone</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={
                  session.user.timeZone ? session.user.timeZone : "eastEurope"
                }
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Time Zone" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Select your time zone</SelectLabel>
                    <SelectItem value="eastEurope">
                      Central Time - East Europe
                    </SelectItem>
                    <SelectItem value="westEurope">
                      Central Time - West Europe
                    </SelectItem>
                    <SelectItem value="asia">Central Time - Asia</SelectItem>
                    <SelectItem value="america">
                      Central Time - America
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={
                  session.user.country ? session.user.country : "ukraine"
                }
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="country" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Select your country</SelectLabel>
                    <SelectItem value="ukraine">Ukraine</SelectItem>
                    <SelectItem value="usa">United States</SelectItem>
                    <SelectItem value="italy">Italy</SelectItem>
                    <SelectItem value="germany">Germany</SelectItem>
                    <SelectItem value="france">France</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between">
          <DialogClose asChild>
            <Button type="submit">Submit</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              type="button"
              variant="destructive"
              onClick={() => signOut()}
            >
              Sign out
            </Button>
          </DialogClose>
        </div>
      </form>
    </Form>
  );
};

export default Header;
