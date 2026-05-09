'use client';
import { useState } from 'react';
import { HiArrowCircleRight } from 'react-icons/hi';
import { FaPlane, FaGraduationCap, FaMedal, FaHandHoldingHeart, FaChartLine } from 'react-icons/fa';
import { HiCalendar, HiLocationMarker } from 'react-icons/hi';
import Image from 'next/image';

type Category = 'Travel Scholarship' | 'Study Abroad Scholarship' | 'International Competition' | 'Social Program' | 'Personal Development';

export type ActiveCategory = Category | 'All';

export interface HighlightCard {
	id: number;
	title: string;
	subtitle: string;
	year: string;
	location: string;
	img: string;
	category: Category;
	size: 'large' | 'small';
	accentColor: string;
	btnColor: string;
	badgeColor: string;
}

const categories: { name: Category; icon: React.ReactNode }[] = [
	{ name: 'Travel Scholarship', icon: <FaPlane /> },
	{ name: 'Study Abroad Scholarship', icon: <FaGraduationCap /> },
	{ name: 'International Competition', icon: <FaMedal /> },
	{ name: 'Social Program', icon: <FaHandHoldingHeart /> },
	{ name: 'Personal Development', icon: <FaChartLine /> },
];

function HighlightCardItem({ item }: { item: HighlightCard }) {
	return (
		<div
			className={['relative group overflow-hidden rounded-[2rem] shadow-sm border border-gray-100', item.size === 'large' ? 'col-span-1 sm:col-span-2 h-55 sm:h-60' : 'col-span-1 h-55 sm:h-60'].join(' ')}
			style={{ backgroundColor: `${item.badgeColor}08` }}
		>
			{item.img && <Image src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" width={400} height={240} loading='lazy' />}

			<div className={`absolute inset-0 bg-linear-to-r ${item.accentColor} from-0% via-white/95 via-35% to-transparent to-75%`} />

			<div className="absolute inset-0 z-10 flex flex-col justify-between p-4 sm:p-8 sm:pt-6 sm:pb-6">
				<div className="flex flex-wrap gap-2">
					<div
						style={{
							backgroundColor: `${item.badgeColor}33`,
							borderColor: `${item.badgeColor}4D`,
						}}
						className="backdrop-blur-sm px-3 py-1.5 rounded-lg flex items-center gap-2 border"
					>
						<HiCalendar style={{ color: item.badgeColor }} className="text-xs sm:text-sm" />
						<span style={{ color: item.badgeColor }} className="text-[10px] font-bold sm:text-xs">
							{item.year}
						</span>
					</div>

					<div
						style={{
							backgroundColor: `${item.badgeColor}33`,
							borderColor: `${item.badgeColor}4D`,
						}}
						className="backdrop-blur-sm px-3 py-1.5 rounded-lg flex items-center gap-2 border"
					>
						<HiLocationMarker style={{ color: item.badgeColor }} className="text-xs sm:text-sm" />
						<span style={{ color: item.badgeColor }} className="text-[10px] font-bold sm:text-xs">
							{item.location}
						</span>
					</div>
				</div>

				<div className="space-y-2">
					<h3 className="text-lg font-black leading-tight text-[#283646] tracking-tight sm:text-2xl">{item.title}</h3>
					<p className="max-w-none text-[12px] font-medium leading-snug text-[#283646]/80 sm:max-w-sm sm:text-[13px]">{item.subtitle}</p>

					<div className="w-1/3 border-b border-[#10316B]/40 pt-1 sm:w-[40%] sm:pt-2" />

					<div className="pt-1 sm:pt-2">
						<button style={{ backgroundColor: item.btnColor }} className="flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold text-white transition-all shadow-md active:scale-95 group/btn hover:brightness-110">
							View more
							<HiArrowCircleRight className="text-base transition-transform group-hover/btn:translate-x-1 sm:text-lg" />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default function CategoryFilter({ highlights }: { highlights: HighlightCard[] }) {
	const [active, setActive] = useState<ActiveCategory>('All');

	const filtered = active === 'All' ? highlights : highlights.filter((h) => h.category === active);

	const displayedHighlights = active === 'All' ? filtered.slice(0, 3) : filtered;

	return (
		<>
			{/* Category Pills */}
			<div className="mb-10 px-0">
				<div className="flex flex-wrap items-center justify-center gap-2">
					<button
						onClick={() => setActive('All')}
						className={[
							'px-3 py-2 rounded-full border text-[11px] font-bold transition-all shadow-sm sm:px-5 sm:text-[12px]',
							active === 'All' ? 'bg-[#15B1E8] text-white border-[#15B1E8]' : 'border-gray-200 text-[#283646] bg-white hover:bg-[#E7F0FC]',
						].join(' ')}
					>
						All
					</button>
					{categories.map((cat, idx) => (
						<button
							key={idx}
							onClick={() => setActive(cat.name)}
							className={[
								'flex items-center gap-2 px-3 py-2 rounded-full border text-[11px] font-bold transition-all shadow-sm sm:px-5 sm:text-[12px]',
								active === cat.name ? 'bg-[#15B1E8] text-white border-[#15B1E8]' : 'border-gray-200 text-[#283646] bg-white hover:bg-[#E7F0FC]',
							].join(' ')}
						>
							<span className={active === cat.name ? 'text-white' : 'text-gray-400'}>{cat.icon}</span>
							{cat.name}
						</button>
					))}
				</div>
			</div>

			{/* Cards Grid */}
			{filtered.length > 0 ? (
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:gap-8">
					{displayedHighlights.map((item) => (
						<HighlightCardItem key={item.id} item={item} />
					))}
				</div>
			) : (
				<div className="text-center py-20 text-[#283646]/40 text-sm font-medium italic">No activities in this category yet.</div>
			)}
		</>
	);
}
