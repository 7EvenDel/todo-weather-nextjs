import Link from "next/link";
import { Label } from "./ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
import { Info, InfoIcon } from "lucide-react";
import { useSession, signOut } from "next-auth/react";

const Header = () => {
  const { data: session } = useSession();
  const userprofile =
    session && session.user
      ? session.user
      : {
          name: "name",
          image: "https://cdn-icons-png.flaticon.com/256/848/848043.png",
          email: "email",
        };

  return (
    <header className="bg-white drop-shadow pb-2">
      <div className="container flex justify-between items-center">
        <Link
          href="/"
          className="flex flex-col w-20 items-center hover:opacity-50 cursor-pointer transition duration-200"
        >
          <Image src="/logo.jpg" alt="logo" width={50} height={50} />
          <Label>ToDoWeath</Label>
        </Link>
        <div className="w-full flex justify-end gap-4 mt-2 px-32">
          <Button variant="ghost" className="font-bold">
            History
          </Button>
          <Button variant="ghost" className="">
            My Tasks
          </Button>
          <Button variant="ghost" className="">
            Weather
          </Button>
        </div>
        <Dialog>
          <DialogTrigger asChild className="mt-2 relative size-12">
            <img
              src={userprofile.image}
              alt="user"
              className="size-12 rounded-full hover:opacity-50 cursor-pointer transition duration-200"
            />
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                Edit profile{" "}
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
                src={userprofile.image}
                alt="user"
                className="size-12 rounded-full absolute right-10 top-3"
              />
            </DialogHeader>
            <Input
              id="name"
              defaultValue={userprofile.name}
              className="w-full"
            />
            <Input
              id="username"
              defaultValue={userprofile.email}
              className="w-full"
            />
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Language" />
              </SelectTrigger>
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
            <div className="flex gap-2 w-full">
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Date Format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Select date format</SelectLabel>
                    <SelectItem value="ukrainian">MM/DD/YYYY</SelectItem>
                    <SelectItem value="english">DD/MM/YYYY</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>{" "}
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Time Format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Select time format</SelectLabel>
                    <SelectItem value="ukrainian">12h (am/pm)</SelectItem>
                    <SelectItem value="english">24h</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Country" />
              </SelectTrigger>
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
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Time Zone" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Select your country</SelectLabel>
                  <SelectItem value="uscanada">
                    Central Time - US & Canada
                  </SelectItem>
                  <SelectItem value="uscanada1">
                    Central Time - US & Canada
                  </SelectItem>
                  <SelectItem value="uscanada2">
                    Central Time - US & Canada
                  </SelectItem>
                  <SelectItem value="uscanada3">
                    Central Time - US & Canada
                  </SelectItem>
                  <SelectItem value="uscanada4">
                    Central Time - US & Canada
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <DialogFooter className="flex w-full justify-between">
              <DialogClose>
                <Button type="submit">Save changes</Button>
              </DialogClose>
              <DialogClose>
                <Button
                  type="submit"
                  variant="destructive"
                  onClick={() => signOut()}
                >
                  Sign out
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </header>
  );
};

export default Header;
