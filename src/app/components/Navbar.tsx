'use client'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import { ThemeButton } from './theme-provider'
import { LoginDropDown } from './auth/LoginDropDown'

export default function Navbar() {
	return (
		<div className="mx-auto flex">
			<Image
				className="mx-4"
				src="/star-svg.svg"
				alt="project gallery logo"
				width={60}
				height={5}
			/>
			<div className="flex items-center py-4 gap-10 justify-around w-full">
				<Input type="text" placeholder="Search" className="w-2/6" />
				<ThemeButton />
				<LoginDropDown />
			</div>
		</div>
	)
}
