"use client";
import { sidebarLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { SignOutButton, SignedIn, useAuth } from "@clerk/nextjs";

export default function LeftSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const {userId} = useAuth();
  return (
    <div className="custom-scrollbar leftsidebar">
      <div className="flex w-full flex-1 flex-col gap-6 px-4">
        {sidebarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;
             if(link.route === "/profile") link.route = `/profile/${userId}`
            return (
            <Link
              href={link.route}
              className={`leftsidebar_link ${isActive && "bg-primary-500"}`}
              key={link.label}
            >
              <Image
                src={link.imgURL}
                alt={link.label}
                width={24}
                height={24}
              />
              <p className="max-lg:hidden text-light-1">{link.label}</p>
            </Link>
          );
        })}
      </div>
      <div className="mt-10 px-6">
          <SignedIn>
            <SignOutButton signOutCallback={() => router.push('/sign-in')}>
              <div className="flex gap-4 p-4 cursor-pointer">
                <Image
                  src={"/assets/logout.svg"}
                  alt="logout"
                  width={25}
                  height={24}
                />
                <p className="text-light-2 max-lg:hidden">Logout</p>
              </div>
            </SignOutButton>
          </SignedIn>
        </div>
    </div>
  );
}
