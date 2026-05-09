'use client';

import Image from 'next/image';
import { FaInstagram, FaEnvelope, FaWhatsapp, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';

const socialLinks = [
	{
		label: 'Instagram',
		href: 'https://instagram.com/exocloudindonesia',
		icon: FaInstagram,
	},
	{
		label: 'Email',
		href: 'mailto:hello@exocloud.id',
		icon: FaEnvelope,
	},
	{
		label: 'WhatsApp',
		href: 'https://wa.me/628123456789',
		icon: FaWhatsapp,
	},
];

const contactItems = [
	{
		label: 'exocloudindonesia@gmail.com',
		href: 'mailto:exocloudindonesia@gmail.com',
		icon: FaEnvelope,
	},
	{
		label: '+62-811-2733-339',
		href: 'https://wa.me/628112733339',
		icon: FaPhoneAlt,
	},
	{
		label: 'Jln. Manggis IX Tambaksari, Tambakrejo, Kec. Waru, Kabupaten Sidoarjo, Jawa Timur 61256',
		href: 'https://maps.app.goo.gl/i4zZeqGThdnF6cKs8',
		icon: FaMapMarkerAlt,
	},
];

export default function Footer() {
	return (
		<footer className="bg-primary text-secondary-foreground">
			<div className="container mx-auto w-full px-6 py-6">
				<div className="grid gap-10 md:grid-cols-3">
					<div className="space-y-5">
						<div className="inline-flex items-center rounded-2xl bg-white px-3 py-2 shadow-xl ">
							<span className="relative block h-12 w-40">
								<Image src="/logo-exocloud.webp" alt="Exocloud logo" fill className="object-contain" priority sizes="160px" />
							</span>
						</div>
						<p className="text-sm font-medium leading-relaxed text-secondary-foreground">
							A non-governmental organization (NGO) under the auspices of the Dharma Bakti Wahyudin Foundation that empowers young people in the fields of education, social services, and social welfare.
						</p>
						<div className="flex items-center gap-3">
							{socialLinks.map((item) => {
								const Icon = item.icon;
								return (
									<a
										key={item.label}
										href={item.href}
										aria-label={item.label}
										target="_blank"
										rel="noreferrer noopener"
										className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-secondary-foreground bg-white text-secondary-foreground transition-colors hover:text-accent"
									>
										<Icon size={18} />
									</a>
								);
							})}
						</div>
					</div>

					<div className="space-y-5">
						<h3 className="text-lg font-semibold text-secondary-foreground">Contact Us</h3>
						<div className="space-y-3">
							{contactItems.map((item) => {
								const Icon = item.icon;
								return (
									<a key={item.label} href={item.href} target="_blank" rel="noreferrer noopener" className="flex items-center gap-3 text-sm text-secondary-foreground">
										<span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-secondary-foreground bg-white text-secondary-foreground hover:text-accent">
											<Icon size={16} />
										</span>
										<span className="leading-relaxed font-medium">{item.label}</span>
									</a>
								);
							})}
						</div>
					</div>

					<div className="space-y-5">
						<h3 className="text-lg font-semibold text-secondary-foreground">Our Office</h3>
						<div className="rounded-2xl border-2 border-secondary-foreground bg-white p-4 shadow-xl">
							<div className="h-44 w-full overflow-hidden rounded-xl">
								<iframe
									title="Exocloud Office Map"
									src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15828.195431162692!2d112.77974955447256!3d-7.348410791692513!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7e5360859899d%3A0x71e89301d6f4feb3!2sJl.%20Manggis%20IX%2C%20Tambaksari%2C%20Tambakrejo%2C%20Kec.%20Waru%2C%20Kabupaten%20Sidoarjo%2C%20Jawa%20Timur%2061256!5e0!3m2!1sid!2sid!4v1777714460940!5m2!1sid!2sid"
									loading="lazy"
									referrerPolicy="no-referrer-when-downgrade"
									allowFullScreen
									className="h-full w-full border-0"
								/>
							</div>
						</div>
					</div>
				</div>

				<div className="mt-2 gap-4 border-t-2 border-secondary-foreground text-sm font-medium pt-2 text-secondary-foreground md:flex-row md:items-center ">
					<p className="text-center">© 2026 Exocloud Indonesia. All rights reserved.</p>
				</div>
			</div>
		</footer>
	);
}
