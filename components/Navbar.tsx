'use client';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { ThemeButton } from './theme-provider';
import { LoginDropDown } from './auth/LoginDropDown';
import Link from 'next/link';

export default function Navbar() {
  return (
    <div className="mx-auto mb-6 flex">
      <Link href={'/'}>
        <Image
          className="mx-4"
          src="/star-svgrepo-com.svg"
          alt="Project Gallery Logo"
          width={60}
          height={60}
        />
      </Link>
      <div className="flex w-full items-center justify-around gap-10 py-4">
        <Input type="text" placeholder="Search" className="w-2/6" />
        <ThemeButton />
        <LoginDropDown />
      </div>
    </div>
  );
}
