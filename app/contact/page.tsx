import Link from 'next/link';
import { FaEnvelope, FaInstagram, FaPhoneAlt, FaWhatsapp } from 'react-icons/fa';
import { Button } from '@/components/ui/button';

const contactMethods = [
	{
		label: 'Email',
		value: 'exocloudindonesia@gmail.com',
		href: 'mailto:exocloudindonesia@gmail.com',
		icon: FaEnvelope,
	},
	{
		label: 'WhatsApp',
		value: '+62-811-2733-339',
		href: 'https://wa.me/628112733339',
		icon: FaWhatsapp,
	},
	{
		label: 'Telepon',
		value: '+62-811-2733-339',
		href: 'tel:+628112733339',
		icon: FaPhoneAlt,
	},
	{
		label: 'Instagram',
		value: '@exocloudindonesia',
		href: 'https://instagram.com/exocloudindonesia',
		icon: FaInstagram,
	},
];

const helpTopics = ['Program dan volunteer', 'Kerja sama sekolah atau kampus', 'Sponsorship acara', 'Informasi kegiatan sosial'];

const officeDetails = [
	{ label: 'Jam respons', value: 'Senin - Jumat, 09.00 - 17.00 WIB' },
	{ label: 'Lokasi', value: 'Tambaksari, Tambakrejo, Waru, Sidoarjo' },
];

export default function ContactPage() {
	return (
		<main className="min-h-screen bg-[#fafaf8] pt-24">
			<section className="container mx-auto px-5 py-10 md:py-14 lg:py-16">
				<div className="mx-auto max-w-5xl">
					<div className="mt-6 max-w-3xl space-y-5">
						<h1 className="text-4xl font-extrabold leading-tight tracking-tight text-secondary-foreground md:text-5xl lg:text-6xl">Hubungi Exocloud untuk kerja sama, program, atau pertanyaan lainnya.</h1>
						<p className="text-base leading-relaxed text-slate-700 md:text-lg">
							Kami terbuka untuk kolaborasi dengan sekolah, kampus, komunitas, mitra program, maupun individu yang ingin terlibat dalam pengembangan anak muda dan kegiatan sosial.
						</p>
					</div>

					<div className="mt-8 flex flex-col gap-3 sm:flex-row">
						<Button asChild className="h-12 rounded-full bg-primary px-6 text-sm font-bold text-white hover:bg-primary-strong">
							<Link href="mailto:exocloudindonesia@gmail.com">Email Kami</Link>
						</Button>
						<Button asChild className="h-12 rounded-full bg-white px-6 text-sm font-bold text-secondary-foreground shadow-sm ring-1 ring-slate-200/70 hover:bg-slate-50">
							<Link href="https://wa.me/628112733339" target="_blank" rel="noreferrer noopener">
								Chat WhatsApp
							</Link>
						</Button>
						<Button asChild className="h-12 rounded-full bg-secondary px-6 text-sm font-bold text-secondary-foreground hover:bg-secondary/90">
							<Link href="https://maps.app.goo.gl/i4zZeqGThdnF6cKs8" target="_blank" rel="noreferrer noopener">
								Buka Lokasi
							</Link>
						</Button>
					</div>

					<div className="mt-8 grid gap-3 sm:grid-cols-3">
						{officeDetails.map((item) => (
							<div key={item.label} className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200/70">
								<p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">{item.label}</p>
								<p className="mt-2 text-sm font-semibold leading-relaxed text-secondary-foreground">{item.value}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			<section className="container mx-auto px-5 py-4 md:py-8">
				<div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
					{contactMethods.map((method) => {
						const Icon = method.icon;

						return (
							<a
								key={method.label}
								href={method.href}
								target={method.href.startsWith('http') ? '_blank' : undefined}
								rel={method.href.startsWith('http') ? 'noreferrer noopener' : undefined}
								className="group rounded-[1.75rem] bg-white p-5 shadow-sm ring-1 ring-slate-200/70 "
							>
								<div className="flex items-start gap-4">
									<div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-white transition-colors group-hover:bg-primary-strong">
										<Icon size={18} />
									</div>
									<div className="min-w-0 flex-1">
										<p className="text-sm font-bold uppercase tracking-[0.16em] text-primary">{method.label}</p>
										<p className="mt-2 truncate text-base font-semibold text-secondary-foreground">{method.value}</p>
									</div>
								</div>
							</a>
						);
					})}
				</div>
			</section>

			<section className="container mx-auto px-5 py-10 md:py-14">
				<div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
					<div className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-200/70 md:p-8">
						<p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">Apa yang bisa kami bantu</p>
						<h2 className="mt-3 text-3xl font-extrabold text-secondary-foreground md:text-4xl">Sampaikan kebutuhan Anda secara singkat.</h2>
						<p className="mt-4 text-sm leading-relaxed text-slate-700 md:text-base">Sebutkan tujuan, latar belakang, dan tenggat waktu agar tim kami bisa meneruskan ke divisi yang tepat.</p>

						<div className="mt-6 space-y-3">
							{helpTopics.map((topic, idx) => (
								<div key={topic} className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3 text-sm font-semibold text-secondary-foreground ring-1 ring-slate-200/70">
									<span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-white">{idx + 1}</span>
									<span>{topic}</span>
								</div>
							))}
						</div>
					</div>

					<div className="space-y-4">
						<div className="overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-slate-200/70">
							<div className="h-80 w-full sm:h-96 lg:h-128">
								<iframe
									title="Exocloud Office Map"
									src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15828.195431162692!2d112.77974955447256!3d-7.348410791692513!2m3!1f0!2f0!3f0!2m3!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7e5360859899d%3A0x71e89301d6f4feb3!2sJl.%20Manggis%20IX%2C%20Tambaksari%2C%20Tambakrejo%2C%20Kec.%20Waru%2C%20Kabupaten%20Sidoarjo%2C%20Jawa%20Timur%2061256!5e0!3m2!1sid!2sid!4v1777714460940!5m2!1sid!2sid"
									loading="lazy"
									referrerPolicy="no-referrer-when-downgrade"
									allowFullScreen
									className="h-full w-full border-0"
								/>
							</div>
						</div>
					</div>
				</div>
			</section>
		</main>
	);
}
