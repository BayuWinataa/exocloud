import AboutHeroSection from '@/components/about/AboutHeroSection';
import AboutImpactSection from '@/components/about/AboutImpactSection';
import AboutMissionSection from '@/components/about/AboutMissionSection';
import AboutPartnersSection from '@/components/about/AboutPartnersSection';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Tentang Kami',
	description: 'Kenali lebih dekat tentang Exocloud Indonesia, misi kami, dan dampak yang ingin kami ciptakan untuk pemuda-pemudi di kancah global.',
	openGraph: {
		title: 'Tentang Exocloud Indonesia',
		description: 'Kenali lebih dekat tentang Exocloud Indonesia, misi kami, dan dampak yang ingin kami ciptakan untuk pemuda-pemudi di kancah global.',
		url: '/about',
	},
	alternates: {
		canonical: '/about',
	},
};

export default function Page() {
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": ["AboutPage", "Organization"],
		"name": "Exocloud Indonesia",
		"url": process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
		"logo": `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/logo-exocloud.webp`,
		"description": "Exocloud adalah platform pengembangan anak muda yang menyediakan program beasiswa, peluang internasional, volunteer, kompetisi, dan pengembangan diri untuk menciptakan dampak global.",
		"contactPoint": {
			"@type": "ContactPoint",
			"telephone": "+62-811-2733-339",
			"contactType": "customer support",
			"email": "exocloudindonesia@gmail.com",
			"areaServed": "ID",
			"availableLanguage": "Indonesian"
		},
		"sameAs": [
			"https://instagram.com/exocloudindonesia"
		]
	};

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>
			<AboutHeroSection />
			<AboutMissionSection />
			<AboutImpactSection />
			<AboutPartnersSection />
		</>
	);
}
