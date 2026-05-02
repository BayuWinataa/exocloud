import type { Metadata } from 'next';
import { Geist, Geist_Mono, Poppins } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import './globals.css';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

const poppins = Poppins({
	variable: '--font-poppins',
	subsets: ['latin'],
	weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
	title: 'Exocloud Indonesia',
	description: 'Exocloud adalah platform pengembangan anak muda yang menyediakan program beasiswa, peluang internasional, volunteer, kompetisi, dan pengembangan diri untuk menciptakan dampak global.',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={`${poppins.variable} ${geistSans.variable} ${geistMono.variable}  h-full antialiased`}>
			<body className="min-h-full flex flex-col pt-20">
				<Navbar />
				{children}
				<Footer />
			</body>
		</html>
	);
}