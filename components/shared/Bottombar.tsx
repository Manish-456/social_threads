"use client";
import { sidebarLinks } from '@/constants'
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react'

export default function Bottombar() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <section className='bottombar'>
    <div className="bottombar_container">
    {sidebarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;
          
            return (
            <Link
              href={link.route}
              className={`bottombar_link ${isActive && "bg-primary-500"}`}
              key={link.label}
            >
              <Image
                src={link.imgURL}
                alt={link.label}
                width={18}
                height={18}
              />
              <p className="text-subtle-medium text-light-1 max-sm:hidden">{link.label.split(/\s+/)[0]}</p>
            </Link>
          );
        })}
    </div>
    </section>
  )
}
