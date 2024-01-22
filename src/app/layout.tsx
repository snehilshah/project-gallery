import type { Metadata } from 'next'
import { ABeeZee } from 'next/font/google'
import './globals.tail.css'
import Link from 'next/link'

const abeezee = ABeeZee({
	weight: '400',
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-abeezee',
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
				<header className="bg-blue-400">
					<Link href="/" replace>
						Back to Home
					</Link>
				</header>
				{children}
				<footer className="bg-green-400">This is the footer</footer>
			</body>
		</html>
	)
}
