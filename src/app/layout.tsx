import type { Metadata } from 'next'
import { ABeeZee } from 'next/font/google'
import './globals.tail.css'

const abeezee = ABeeZee({
	weight: '400',
	subsets: ['latin'],
	display: 'swap',
  variable: '--font-abeezee'
})

export const metadata: Metadata = {
	title: 'Project Gallery',
	description: 'The GitHub Frontend',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<body className={abeezee.className}>
				<div className="">{children}</div>
			</body>
		</html>
	)
}
