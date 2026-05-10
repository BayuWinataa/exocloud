import Image from 'next/image';

const aboutImages = [
	{
		src: '/images/about-1.webp',
		alt: 'Kegiatan sosial Exocloud',
		className: 'md:translate-y-0',
	},
	{
		src: '/images/about-2.webp',
		alt: 'Program internasional Exocloud',
		className: 'md:translate-y-6',
	},
	{
		src: '/images/about-3.webp',
		alt: 'Dokumentasi komunitas Exocloud',
		className: 'md:-translate-y-2',
	},
	{
		src: '/images/about-4.webp',
		alt: 'International Entrepreneurship Education Summit',
		className: 'md:translate-y-4',
	},
];

export default function AboutHeroSection() {
	return (
		<section className="container mx-auto py-5 px-5">
			<div className="mx-auto grid items-center gap-10 lg:grid-cols-2">
				<div>
					<div className="mb-8 inline-block">
						<p className="text-xl font-semibold text-primary">About Us</p>
						<div className="mt-2 h-0.5 w-full bg-primary" />
					</div>

					<h1 className="text-4xl font-extrabold leading-tight text-secondary-foreground md:text-5xl lg:text-6xl">
						Empowering Youth,
						<br />
						<span className="text-primary">Creating Global Impact</span>
					</h1>

					<div className="mt-8 space-y-6 text-base font-medium leading-relaxed text-slate-700 md:text-lg">
						<p>
							Exocloud Indonesia adalah organisasi non-pemerintah (NGO) di bawah Yayasan Dharma Bakti Wahyudin (DBW) yang berdiri sejak 2021. Berfokus pada pengembangan potensi sumber daya manusia, Exocloud berkomitmen menjembatani talenta
							muda Indonesia dengan peluang global.
						</p>

						<p>
							Didukung oleh kepemimpinan Abdul Rokhim, S.Pd. (Chief Governing Officer), Imam Wahyudin, S.H. (Chief Executive Officer), dan Dra. Nur Asmah (Chief Supervisory Officer), organisasi ini terus membangun ekosistem inovatif untuk
							mendukung generasi muda berkembang secara global.
						</p>
					</div>
				</div>

				<div className="relative overflow-hidden">
					<div className="absolute left-1/2 top-1/2 -z-10 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-2xl sm:h-80 sm:w-80 lg:h-105 lg:w-105" />
					<div className="absolute -right-6 top-8 -z-10 h-20 w-20 rounded-full bg-secondary/50 blur-xl sm:h-28 sm:w-28" />

					<div className="grid grid-cols-2 gap-4 md:gap-5">
						{aboutImages.map((image) => (
							<div key={image.src} className={`relative h-48 overflow-hidden rounded-3xl shadow-lg md:h-60 lg:h-64 ${image.className}`}>
								<Image src={image.src} alt={image.alt} fill className="object-cover" sizes="(max-width: 768px) 50vw, 300px" />
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
