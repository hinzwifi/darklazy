"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronDown,
  LogOut,
  User,
  Home,
  Vote,
  BarChart,
  VoteIcon,
  House,
  Cog,
  PictureInPicture,
  Cat,
} from "lucide-react";

import { ModeToggle } from "./theme";

const Navigation = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between h-16">
        <div className="flex">
          <Link href="/" className="flex-shrink-0 flex items-center">
            <Cat />
          </Link>
        </div>
        <div className="hidden sm:ml-6 sm:flex sm:items-center">
          <ModeToggle />
        </div>
        <div className="flex items-center sm:hidden">
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

export default Navigation;
