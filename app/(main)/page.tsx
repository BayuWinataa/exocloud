import HomePage from "./home/HomePage";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Exocloud Indonesia | Beasiswa, Volunteer & Peluang Internasional",
	description: "Platform pengembangan anak muda yang menyediakan program beasiswa, peluang internasional, volunteer, kompetisi, dan pengembangan diri untuk menciptakan dampak global.",
	openGraph: {
		title: "Exocloud Indonesia | Beasiswa, Volunteer & Peluang Internasional",
		description: "Platform pengembangan anak muda yang menyediakan program beasiswa, peluang internasional, volunteer, kompetisi, dan pengembangan diri untuk menciptakan dampak global.",
		url: "/",
	},
	alternates: {
		canonical: "/",
	},
};

export default function Home() {
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "Organization",
		name: "Exocloud Indonesia",
		url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
		logo: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/logo-exocloud.webp`,
		description: "Platform pengembangan anak muda yang menyediakan program beasiswa, peluang internasional, volunteer, kompetisi, dan pengembangan diri.",
		sameAs: [
			"https://instagram.com/exocloud.id"
		],
	};

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>
			<HomePage />
		</>
	);
}
