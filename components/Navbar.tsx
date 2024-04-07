'use client'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import { ThemeButton } from './theme-provider'
import { LoginDropDown } from './auth/LoginDropDown'
import Link from 'next/link'

export default function Navbar() {
	return (
		<div className="mx-auto flex mb-6">
			<Link href={'/'}>
				<Image
					className="mx-4"
					src="/star-svgrepo-com.svg"
					alt="Project Gallery Logo"
					width={60}
					height={60}
				/>
			</Link>
			<div className="flex items-center py-4 gap-10 justify-around w-full">
				<Input type="text" placeholder="Search" className="w-2/6" />
				<ThemeButton />
				<LoginDropDown />
			</div>
		</div>
	)
}
