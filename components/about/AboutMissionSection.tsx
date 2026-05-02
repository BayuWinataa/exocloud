import { FaShieldAlt, FaHandshake, FaLightbulb, FaGlobeAsia } from 'react-icons/fa';

const missionItems = [
	{
		title: 'Integrity',
		description: 'Berintegritas dalam setiap langkah dan keputusan yang kami ambil.',
		icon: FaShieldAlt,
		iconWrapper: 'bg-primary/25',
		iconColor: 'text-primary',
		titleColor: 'text-primary',
		lineColor: 'bg-primary',
	},
	{
		title: 'Collaboration',
		description: 'Berkolaborasi untuk menciptakan dampak yang lebih luas dan berkelanjutan.',
		icon: FaHandshake,
		iconWrapper: 'bg-secondary/80',
		iconColor: 'text-accent',
		titleColor: 'text-accent',
		lineColor: 'bg-accent',
	},
	{
		title: 'Innovation',
		description: 'Mendorong ide baru dan kreativitas untuk menghadirkan perubahan nyata.',
		icon: FaLightbulb,
		iconWrapper: 'bg-primary/25',
		iconColor: 'text-primary',
		titleColor: 'text-primary',
		lineColor: 'bg-primary',
	},
	{
		title: 'Impact',
		description: 'Memberikan manfaat nyata bagi masyarakat dan generasi masa depan.',
		icon: FaGlobeAsia,
		iconWrapper: 'bg-blue-100',
		iconColor: 'text-blue-900',
		titleColor: 'text-blue-900',
		lineColor: 'bg-blue-900',
	},
];

export default function AboutMissionSection() {
	return (
		<section className="bg-white px-6 py-20 md:px-10 lg:px-16">
			<div className="mx-auto container">
				<div className="mx-auto max-w-3xl text-center">
					<h2 className="text-4xl font-extrabold text-primary md:text-5xl">Our Mission</h2>

					<div className="mx-auto mt-3 h-0.5 w-64 bg-primary" />

					<p className="mx-auto mt-8 max-w-2xl text-base font-medium leading-relaxed text-slate-700 md:text-lg">
						Kami berkomitmen untuk memberdayakan generasi muda melalui pendidikan, pengembangan diri, dan kolaborasi global yang berdampak.
					</p>
				</div>

				<div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
					{missionItems.map((item) => {
						const Icon = item.icon;

						return (
							<div key={item.title} className="flex min-h-82.5 flex-col items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-8 text-center shadow-[0_8px_24px_rgba(15,23,42,0.08)] ">
								<div className={`flex h-28 w-28 items-center justify-center rounded-full ${item.iconWrapper}`}>
									<Icon className={item.iconColor} size={44} />
								</div>

								<h3 className={`mt-12 text-2xl font-extrabold ${item.titleColor}`}>{item.title}</h3>

								<div className={`mt-4 h-0.5 w-10 rounded-full ${item.lineColor}`} />

								<p className="mt-8 text-sm font-medium leading-relaxed text-slate-600">{item.description}</p>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
