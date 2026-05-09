import { Button } from '@/components/ui/button';
import { HiGlobeAlt, HiUsers, HiPaperAirplane } from 'react-icons/hi2';
import { HiArrowCircleRight } from 'react-icons/hi';
import CategoryFilter, { type HighlightCard } from './CategoryFilter';

const stats = [
	{ label: 'Programs', val: '10+', icon: <HiGlobeAlt />, color: 'text-[#0881A3]', bg: 'bg-[#E8F5EF]' },
	{ label: 'Participants', val: '300+', icon: <HiUsers />, color: 'text-[#F59E0B]', bg: 'bg-[#FEF7E8]' },
	{ label: 'Countries', val: '20+', icon: <HiPaperAirplane />, color: 'text-[#15B1E8]', bg: 'bg-[#E7F0FC]' },
];

const highlights: HighlightCard[] = [
	// Beasiswa Perjalanan
	{
		id: 1,
		title: 'IEES 2025',
		subtitle: 'Internasional Enterpreunership Education Summit.',
		year: '2025',
		location: 'Belgia, Paris',
		img: '/images/iees-2025.webp',
		category: 'Travel Scholarship',
		size: 'large',
		accentColor: 'from-[#E7F0FC]',
		btnColor: '#10316B',
		badgeColor: '#10316B',
	},
	{
		id: 2,
		title: 'International Youth Leaders Fellowship',
		subtitle: 'International Youth Leaders Fellowship',
		year: '2026',
		location: 'Coming Soon',
		img: '/images/iylf-img.webp',
		category: 'Travel Scholarship',
		size: 'large',
		accentColor: 'from-[#FEF7E8]',
		btnColor: '#F59E0B',
		badgeColor: '#F59E0B',
	},

	// Beasiswa Studi ke Luar Negeri
	{
		id: 3,
		title: 'Exoreach International Scholarship',
		subtitle: 'Program beasiswa internasional untuk pengembangan kepemimpinan global.',
		year: '2025',
		location: 'Bangkok, Thailand',
		img: '/images/exoreach-img-1.webp',
		category: 'Study Abroad Scholarship',
		size: 'large',
		accentColor: 'from-[#FEF7E8]',
		btnColor: '#F59E0B',
		badgeColor: '#F59E0B',
	},
	{
		id: 4,
		title: 'Global Youth Scholars Program',
		subtitle: 'Orientasi Surabaya dan Sidoarjo GYSP 2025.',
		year: '2025',
		location: 'Surabaya, Sidoarjo',
		img: '/images/gysp-img.webp',
		category: 'Study Abroad Scholarship',
		size: 'small',
		accentColor: 'from-[#E7F0FC]',
		btnColor: '#10316B',
		badgeColor: '#10316B',
	},

	{
		id: 5,
		title: 'Exoreach Asia Scholarship',
		subtitle: 'Program beasiswa internasional untuk pengembangan kepemimpinan global.',
		year: 'Coming Soon',
		location: 'Coming Soon',
		img: '/images/exoreach-asia-img.webp',
		category: 'Study Abroad Scholarship',
		size: 'small',
		accentColor: 'from-[#E8F5EF]',
		btnColor: '#0881A3',
		badgeColor: '#0881A3',
	},

	// Kompetisi Internasional

	{
		id: 6,
		title: 'International Future Innovators Challenge',
		subtitle: 'Mencetak Inovator Muda: Exocloud Indonesia Gelar International Future Innovators Challenge (IFIC).',
		year: '2026',
		location: 'Singapore, Malaysia',
		img: '/images/ific-img.webp',
		category: 'International Competition',
		size: 'large',
		accentColor: 'from-[#E7F0FC]',
		btnColor: '#10316B',
		badgeColor: '#10316B',
	},

	//social
	{
		id: 7,
		title: 'Exocloud Sponsorship Program',
		subtitle: 'Exocloud Sponsorship Program',
		year: '2026',
		location: 'Coming Soon',
		img: '/images/exocloud-sponsorship-img.webp',
		category: 'Social Program',
		size: 'large',
		accentColor: 'from-[#FEF7E8]',
		btnColor: '#F59E0B',
		badgeColor: '#F59E0B',
	},

	//self dev
	{
		id: 8,
		title: 'Exocloud Voluntary Program',
		subtitle: 'Exocloud Voluntary Program',
		year: '2026',
		location: 'Indonesia',
		img: '/images/exocloud-voluntary-img.webp',
		category: 'Personal Development',
		size: 'small',
		accentColor: 'from-[#E7F0FC]',
		btnColor: '#10316B',
		badgeColor: '#10316B',
	},

	{
		id: 9,
		title: 'Exobiz Incubator',
		subtitle: 'Exobiz Incubator',
		year: '2026',
		location: 'Coming Soon',
		img: '/images/exobiz-incubator-img.webp',
		category: 'Personal Development',
		size: 'small',
		accentColor: 'from-[#E8F5EF]',
		btnColor: '#0881A3',
		badgeColor: '#0881A3',
	},

	{
		id: 10,
		title: 'English Class 5.0',
		subtitle: 'English Class 5.0',
		year: '2026',
		location: 'Coming Soon',
		img: '/images/english-class-img.webp',
		category: 'Personal Development',
		size: 'large',
		accentColor: 'from-[#FEF7E8]',
		btnColor: '#F59E0B',
		badgeColor: '#F59E0B',
	},

	{
		id: 11,
		title: 'Podcast XYZ',
		subtitle: 'Podcast XYZ',
		year: '2026',
		location: 'Coming Soon',
		img: '/images/podcast-xyz-img.webp',
		category: 'Personal Development',
		size: 'small',
		accentColor: 'from-[#E8F5EF]',
		btnColor: '#0881A3',
		badgeColor: '#0881A3',
	},

	{
		id: 12,
		title: 'Kongres Pemuda Indonesia',
		subtitle: 'Kongres Pemuda Indonesia',
		year: '2026',
		location: 'Coming Soon',
		img: '/images/kongres-pemuda-img.webp',
		category: 'Personal Development',
		size: 'small',
		accentColor: 'from-[#E7F0FC]',
		btnColor: '#10316B',
		badgeColor: '#10316B',
	},
];

export default function Highlight() {
	return (
		<section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-16 font-sans">
			<div className="text-center mb-10 space-y-2">
				<h2 className="text-3xl md:text-4xl font-extrabold text-[#283646] tracking-tight">
					Exocloud <span className="text-[#F59E0B]">Activity</span> Highlights
				</h2>
				<p className="text-[#283646] italic font-medium text-sm md:text-base">A glimpse into our programs, events, and global experiences.</p>
			</div>

			<div className="max-w-2xl mx-auto mb-12">
				<div className="bg-white border border-gray-50 shadow-[0_4px_20px_rgba(0,0,0,0.03)] rounded-2xl px-3 py-3 sm:px-5 sm:py-4 md:px-8 md:py-4">
					<div className="grid grid-cols-3 items-center gap-2 sm:gap-3 md:gap-4">
						{stats.map((stat, i) => (
							<div key={i} className="flex min-w-0 flex-col items-center gap-1 text-center sm:flex-row sm:items-center sm:text-left sm:gap-2 md:gap-3">
								<div className={`${stat.bg} flex h-8 w-8 items-center justify-center rounded-lg ${stat.color} text-sm sm:h-9 sm:w-9 sm:rounded-xl sm:text-base md:h-10 md:w-10 md:text-xl`}>{stat.icon}</div>
								<div className="min-w-0">
									<p className="text-[11px] font-black leading-none text-[#283646] sm:text-sm md:text-base">{stat.val}</p>
									<p className="mt-0.5 text-[7px] font-bold uppercase tracking-[0.18em] text-gray-400 sm:text-[8px] md:text-[10px]">{stat.label}</p>
								</div>
                
							</div>
						))}
					</div>
				</div>
			</div>

			<CategoryFilter highlights={highlights} />

			<div className="text-center mt-16 space-y-4">
				<p className="text-[#283646]/50 text-sm font-medium">Want to see all of our activities?</p>
				<Button variant="outline" className="border-2 border-[#15B1E8] text-[#15B1E8] hover:bg-[#15B1E8] hover:text-white rounded-3xl px-8 py-5 font-bold text-sm transition-all duration-300 gap-2 shadow-sm active:scale-95">
					View More <HiArrowCircleRight className="text-xl" />
				</Button>
			</div>
		</section>
	);
}
