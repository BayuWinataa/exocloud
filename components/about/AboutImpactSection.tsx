import Image from 'next/image';
import { FaPlane, FaUsers, FaGlobeAsia, FaHandshake } from 'react-icons/fa';

const impactStats = [
	{
		value: '20+',
		label: 'Participants',
		icon: FaPlane,
		iconClass: 'bg-primary/20 text-primary',
		valueClass: 'text-primary',
	},
	{
		value: '300+',
		label: 'Participants',
		icon: FaUsers,
		iconClass: 'bg-secondary/40 text-accent',
		valueClass: 'text-accent',
	},
	{
		value: '20+',
		label: 'Programs',
		icon: FaGlobeAsia,
		iconClass: 'bg-primary/20 text-primary',
		valueClass: 'text-primary',
	},
	{
		value: '15+',
		label: 'Partnerships',
		icon: FaHandshake,
		iconClass: 'bg-primary/20 text-primary',
		valueClass: 'text-primary',
	},
];

export default function AboutImpactSection() {
	return (
		<section className="relative overflow-hidden bg-warm-surface px-4 py-16 sm:px-6 md:px-10 md:py-20 lg:px-16">
			<div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
			<div className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-primary/15 blur-3xl" />
			<div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-linear-to-b from-white to-transparent" />

			<div className="relative mx-auto container">
				<div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
					<div>
						<div className="mb-8">
							<h2 className="text-3xl font-extrabold leading-tight text-accent sm:text-4xl md:text-5xl">Impact & Contribution</h2>

							<div className="mt-4 h-1 w-28 rounded-full bg-accent" />
						</div>

						<div className="max-w-2xl space-y-5 text-sm font-medium leading-relaxed text-slate-700 sm:text-base md:text-lg">
							<p>
								Sejak berdiri, Exocloud Indonesia telah memberikan kontribusi nyata di bidang pendidikan, sosial, dan lingkungan melalui berbagai program pengembangan masyarakat, akses pendidikan internasional, serta proyek sosial yang
								meningkatkan kualitas hidup.
							</p>

							<p>Ke depan, Exocloud bersama Yayasan Dharma Bakti Wahyudin terus mengembangkan inisiatif strategis untuk mencetak generasi pemimpin berwawasan global yang berkontribusi bagi kemajuan Indonesia.</p>
						</div>
					</div>

					<div className="relative">
						<div className="absolute -right-4 -top-4 hidden h-28 w-28 rounded-full bg-accent/20 sm:block" />
						<div className="absolute -bottom-5 -left-5 hidden h-20 w-20 rounded-3xl bg-primary/80 sm:block" />

						<div className="relative overflow-hidden rounded-[2rem] shadow-[0_24px_60px_rgba(15,23,42,0.16)]">
							<div className="relative h-57.5 overflow-hidden rounded-[1.5rem] sm:h-82.5 lg:h-97.5">
								<Image src="/images/about-5.webp" alt="Impact and contribution Exocloud Indonesia" fill className="object-cover" sizes="(max-width: 768px) 100vw, 560px" />
							</div>
						</div>
					</div>
				</div>

				<div className="mt-12 overflow-hidden rounded-[2rem] border border-orange-100 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.10)]">
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
						{impactStats.map((item, index) => {
							const Icon = item.icon;

							return (
								<div key={`${item.value}-${item.label}`} className={`relative flex items-center gap-4 px-6 py-6 sm:px-8 ${index !== impactStats.length - 1 ? 'border-b border-slate-200 sm:border-r lg:border-b-0' : ''}`}>
									<div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${item.iconClass}`}>
										<Icon size={24} />
									</div>

									<div>
										<p className={`text-3xl font-extrabold leading-none ${item.valueClass}`}>{item.value}</p>
										<p className="mt-1 text-sm font-semibold text-slate-600">{item.label}</p>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</section>
	);
}
