import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';

export default function AboutPartnersSection() {
	return (
		<section className="bg-white px-4 py-10 sm:px-6 md:px-10 md:py-20 lg:px-16">
			<div className="container mx-auto">
				<div className="grid items-center gap-5 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
					<div className="order-2 relative lg:order-1">
						<div className="absolute -left-5 -top-5 hidden h-24 w-24 rounded-full bg-secondary/40 blur-xl sm:block" />
						<div className="absolute -bottom-5 -right-5 hidden h-28 w-28 rounded-full bg-primary/15 blur-2xl sm:block" />

						<div className="relative overflow-hidden rounded-[2rem] border border-slate-200 shadow-[0_20px_50px_rgba(15,23,42,0.12)]">
							<div className="relative h-60 overflow-hidden rounded-[1.5rem] sm:h-80 lg:h-107">
								<Image src="/images/about-6.webp" alt="Exocloud partners and collaboration" fill className="" sizes="(max-width: 768px) 100vw, 620px" />
							</div>
						</div>

						<div className="absolute -bottom-6 left-6 hidden rounded-2xl bg-white px-5 py-4 sm:block">
							<p className="text-sm font-semibold text-slate-500">Partnership Network</p>
							<p className="text-2xl font-extrabold text-primary">Growing Together</p>
						</div>
					</div>

					<div className="order-1 lg:order-2 lg:pl-2">
						<div className="my-8">
							<h2 className="text-4xl font-extrabold leading-tight text-secondary-foreground md:text-5xl">Partners</h2>
							<div className="mt-4 h-1 w-24 rounded-full bg-primary" />
						</div>

						<div className="max-w-2xl space-y-5 text-sm font-medium leading-relaxed text-slate-700 sm:text-base md:text-lg">
							<p>For schools, communities, and NGOs, we are looking forward to collaborating with you. Enjoy our various development programs and perks to support your vision, students, and teachers.</p>
							<p>For institutions, we cordially invite you to be part of our movement. We add values to your institution and boost your institution&apos;s performance.</p>
						</div>

						<Link href="/contact" className="mt-8 inline-flex items-center gap-3 rounded-xl bg-primary px-7 py-4 text-sm font-bold text-white transition-colors hover:bg-primary-strong">
							More Information
							<span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-primary">
								<FaArrowRight size={11} />
							</span>
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
}
