"use client";

import {
  Form,
  FormControl,
  FormItem,
  FormField,
  FormLabel,
  FormDescription,
  FormMessage,
} from "./ui/form";
import Link from "next/link";
import { Label } from "./ui/label";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
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
          <Image src="/logo.jpg" alt="logo" width={50} height={50} />
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
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z
    .string({
      required_error: "Please select an email to display.",
    })
    .email(),
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
    console.log("submitted");
    console.log(data);
  };

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      // username: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verified email to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="m@example.com">m@example.com</SelectItem>
                  <SelectItem value="m@google.com">m@google.com</SelectItem>
                  <SelectItem value="m@support.com">m@support.com</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                You can manage email addresses in your{" "}
                <Link href="/examples/forms">email settings</Link>.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogClose asChild>
          <Button type="submit">Submit</Button>
        </DialogClose>
      </form>
    </Form>
  );
};

export default Header;
