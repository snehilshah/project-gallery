import type { Metadata } from 'next'
import { ABeeZee } from 'next/font/google'
import './globals.tail.css'
import Navbar from './components/Navbar'
import { ThemeProvider } from './components/theme-provider'

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
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<Navbar />
					{children}
				</ThemeProvider>
			</body>
		</html>
	)
}
