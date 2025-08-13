"use client";

import Image from "next/image";
import Link from "next/link";
import { ModeToggle } from "../theme/mode-toggle";
import Logout from "./logout";

export default function Header() {
  return (
    <header className="flex justify-between items-center py-2 px-4 w-screen">
      <Link href="/" className="flex gap-1 items-center">
        <Image
          width={48}
          height={48}
          alt="Next MDX Blog Admin Logo"
          src="/logo.webp"
          className="rounded-full size-8 md:size-12"
        />
        <h1 className="text-base md:text-xl font-semibold">
          Next MDX Blog Admin
        </h1>
      </Link>

      <div className="flex gap-1 items-center">
        <ModeToggle />
        <Logout />
      </div>
    </header>
  );
}
