import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono, Poppins, Inter } from 'next/font/google';
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

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const viewport: Viewport = {
	themeColor: '#ffffff',
	width: 'device-width',
	initialScale: 1,
	maximumScale: 1,
};

export const metadata: Metadata = {
	metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
	title: {
		default: 'Exocloud Indonesia | Beasiswa & Peluang Internasional',
		template: '%s | Exocloud Indonesia',
	},
	description: 'Exocloud adalah platform pengembangan anak muda yang menyediakan program beasiswa, peluang internasional, volunteer, kompetisi, dan pengembangan diri untuk menciptakan dampak global.',
	keywords: ['beasiswa', 'volunteer', 'kompetisi', 'peluang internasional', 'pengembangan diri', 'exocloud', 'indonesia'],
	authors: [{ name: 'Exocloud Indonesia' }],
	creator: 'Exocloud Indonesia',
	openGraph: {
		type: 'website',
		locale: 'id_ID',
		url: '/',
		title: 'Exocloud Indonesia | Beasiswa & Peluang Internasional',
		description: 'Platform pengembangan anak muda dengan program beasiswa, peluang internasional, volunteer, kompetisi, dan pengembangan diri.',
		siteName: 'Exocloud Indonesia',
		images: [
			{
				url: '/logo-exocloud.webp',
				width: 1200,
				height: 630,
				alt: 'Exocloud Indonesia Logo',
			}
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Exocloud Indonesia | Beasiswa & Peluang Internasional',
		description: 'Platform pengembangan anak muda dengan program beasiswa, peluang internasional, volunteer, kompetisi, dan pengembangan diri.',
		creator: '@exocloud',
		images: ['/logo-exocloud.webp'],
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={`${inter.variable} ${poppins.variable} ${geistSans.variable} ${geistMono.variable}  h-full antialiased`}>
			<body className="min-h-full flex flex-col">
				{children}
			</body>
		</html>
	);
}
