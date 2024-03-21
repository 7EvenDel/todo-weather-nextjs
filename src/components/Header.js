import Link from "next/link";
import { Label } from "./ui/label";
import Image from "next/image";
import SignInButton from "./ui/signInButton";


const Header = () => {
    


  return (
    <header className="bg-white drop-shadow pb-2">
      <div className="container flex justify-between items-center">
        <Link
          href="/"
          className="flex flex-col w-20 items-center hover:opacity-80 cursor-pointer transition duration-300"
        >
          <Image src="/logo.jpg" alt="logo" width={50} height={50} />
          <Label>ToDoWeath</Label>
        </Link>
        <SignInButton />
      </div>
    </header>
  );
};

export default Header;
