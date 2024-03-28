import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "./ui/dialog";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, Cog, SquarePlus } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "./ui/input";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  ProfileForm,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";

import { InfoIcon } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel,
  SelectGroup,
} from "./ui/select";

import { useSession } from "next-auth/react";
import { Textarea } from "./ui/textarea";
import { useState } from "react";

const NewTask = ({ getAllTasks }) => {
  return (
    <Dialog>
      <DialogTrigger asChild className="mt-2 relative size-12">
        <SquarePlus className="size-5 hover:text-gray-500 transition duration-200 cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            New task
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <InfoIcon className="size-4 text-gray-700" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    Enter details of your new task and then click {'"Submit"'}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </DialogTitle>
        </DialogHeader>
        <NewTaskForm getAllTasks={getAllTasks} />
      </DialogContent>
    </Dialog>
  );
};

const FormSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().min(1, {
    message: "Enter description.",
  }),
  category: z.string().min(2, {
    message: "Select category.",
  }),
  dateStart: z.date({
    required_error: "A date of birth is required.",
  }),
  timeStart: z.string().min(2, {
    message: "Enter time.",
  }),
});

const NewTaskForm = ({ getAllTasks }) => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = async (data) => {
    const task = {
      ...data,
      dateFinish: null,
      timeFinish: null,
      status: "todo",
    };
    setLoading(true);
    toast.info("Sending...");
    try {
      // http://localhost:3000/api/user
      // https://todo-weather.vercel.app/api/user

      const res = await fetch("https://todo-weather.vercel.app/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ task, email: session.user.email }),
      });
      if (!res.ok) {
        throw new Error("failed to fetch");
      }
      toast.success("Task created.");
      setLoading(false);
      getAllTasks();
    } catch (error) {
      toast.warning("Could not add your task.");
      setLoading(false);
      getAllTasks();
    }
  };

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      description: "",
      category: "personal",
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
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Walk the dog" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Select category</SelectLabel>
                    <SelectItem value="personal">Personal</SelectItem>
                    <SelectItem value="work">Work</SelectItem>
                    <SelectItem value="study">Study</SelectItem>
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
            name="dateStart"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date < new Date(new Date().toDateString()) ||
                        date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="timeStart"
            render={({ field }) => (
              <FormItem className="-mt-2 w-28">
                <FormLabel>Time</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Time" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Select time</SelectLabel>
                      <SelectItem value="00">00:00</SelectItem>
                      <SelectItem value="01">01:00</SelectItem>
                      <SelectItem value="02">02:00</SelectItem>
                      <SelectItem value="03">03:00</SelectItem>
                      <SelectItem value="04">04:00</SelectItem>
                      <SelectItem value="05">05:00</SelectItem>
                      <SelectItem value="06">06:00</SelectItem>
                      <SelectItem value="07">07:00</SelectItem>
                      <SelectItem value="08">08:00</SelectItem>
                      <SelectItem value="09">09:00</SelectItem>
                      <SelectItem value="10">10:00</SelectItem>
                      <SelectItem value="11">11:00</SelectItem>
                      <SelectItem value="12">12:00</SelectItem>
                      <SelectItem value="13">13:00</SelectItem>
                      <SelectItem value="14">14:00</SelectItem>
                      <SelectItem value="15">15:00</SelectItem>
                      <SelectItem value="16">16:00</SelectItem>
                      <SelectItem value="17">17:00</SelectItem>
                      <SelectItem value="18">18:00</SelectItem>
                      <SelectItem value="19">19:00</SelectItem>
                      <SelectItem value="20">20:00</SelectItem>
                      <SelectItem value="21">21:00</SelectItem>
                      <SelectItem value="22">22:00</SelectItem>
                      <SelectItem value="23">23:00</SelectItem>
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
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Very important task!" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between">
          {/* <DialogClose asChild> */}
          <Button
            type="submit"
            disabled={loading}
            className="flex justify-center"
          >
            {loading ? <Cog className="animate-spin mr-2 size-5" /> : null}
            <p className="">Submit</p>
          </Button>
          {/* </DialogClose> */}
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Close
            </Button>
          </DialogClose>
        </div>
      </form>
    </Form>
  );
};

export default NewTask;
