"use client";
import { useState } from "react";
import { HiArrowCircleRight } from "react-icons/hi";
import { FaPlane, FaGraduationCap, FaMedal, FaHandHoldingHeart, FaChartLine } from "react-icons/fa";
import { HiCalendar, HiLocationMarker } from "react-icons/hi";

type Category =
  | "Travel Scholarship"
  | "Study Abroad Scholarship"
  | "International Competition"
  | "Social Program"
  | "Personal Development";

export type ActiveCategory = Category | "All";

export interface HighlightCard {
  id: number;
  title: string;
  subtitle: string;
  year: string;
  location: string;
  img: string;
  category: Category;
  size: "large" | "small";
  accentColor: string;
  btnColor: string;
  badgeColor: string;
}

const categories: { name: Category; icon: React.ReactNode }[] = [
  { name: "Travel Scholarship", icon: <FaPlane /> },
  { name: "Study Abroad Scholarship", icon: <FaGraduationCap /> },
  { name: "International Competition", icon: <FaMedal /> },
  { name: "Social Program", icon: <FaHandHoldingHeart /> },
  { name: "Personal Development", icon: <FaChartLine /> },
];

function HighlightCardItem({ item }: { item: HighlightCard }) {
  return (
    <div
      className={[
        "relative group overflow-hidden rounded-[2rem] shadow-sm border border-gray-100 bg-white",
        item.size === "large" ? "col-span-2 h-[240px]" : "col-span-1 h-[240px]",
      ].join(" ")}
    >
      <img
        src={item.img}
        alt={item.title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      
      <div className={`absolute inset-0 bg-gradient-to-r ${item.accentColor} from-[0%] via-white/90 via-[30%] to-transparent to-[70%]`} />
      
      <div className="absolute inset-0 p-8 pt-6 pb-6 flex flex-col justify-between z-10">
        <div className="flex gap-2">

         <div 
          style={{ 
            backgroundColor: `${item.badgeColor}33`, 
            borderColor: `${item.badgeColor}4D` 
          }}
          className="backdrop-blur-sm px-4 py-1.5 rounded-lg flex items-center gap-2 border"
        >
          <HiCalendar style={{ color: item.badgeColor }} className="text-sm" />
          <span style={{ color: item.badgeColor }} className="text-xs font-bold">
            {item.year}
          </span>
        </div>

          <div 
          style={{ 
            backgroundColor: `${item.badgeColor}33`,
            borderColor: `${item.badgeColor}4D`
          }}
          className="backdrop-blur-sm px-4 py-1.5 rounded-lg flex items-center gap-2 border"
        >
          <HiLocationMarker style={{ color: item.badgeColor }} className="text-sm" />
          <span style={{ color: item.badgeColor }} className="text-xs font-bold">
            {item.location}
          </span>
        </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-2xl font-black text-[#283646] tracking-tight">
            {item.title}
          </h3>
          <p className="text-[13px] text-[#283646]/80 font-medium leading-snug max-w-sm">
            {item.subtitle}
          </p>

          <div className="w-[40%] border-b border-[#10316B]/40 pt-2" />
          
          <div className="pt-2">
            <button 
              style={{ backgroundColor: item.btnColor }}
              className="text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-2 transition-all shadow-md active:scale-95 group/btn hover:brightness-110"
            >
              View more 
              <HiArrowCircleRight className="text-lg transition-transform group-hover/btn:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CategoryFilter({ highlights }: { highlights: HighlightCard[] }) {
  const [active, setActive] = useState<ActiveCategory>("All");

  const filtered =
    active === "All" ? highlights : highlights.filter((h) => h.category === active);

  return (
    <>
      {/* Category Pills */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        <button
          onClick={() => setActive("All")}
          className={[
            "px-5 py-2 rounded-full border text-[12px] font-bold transition-all shadow-sm",
            active === "All"
              ? "bg-[#15B1E8] text-white border-[#15B1E8]"
              : "border-gray-200 text-[#283646] bg-white hover:bg-[#E7F0FC]",
          ].join(" ")}
        >
          All
        </button>
        {categories.map((cat, idx) => (
          <button
            key={idx}
            onClick={() => setActive(cat.name)}
            className={[
              "flex items-center gap-2 px-5 py-2 rounded-full border text-[12px] font-bold transition-all shadow-sm",
              active === cat.name
                ? "bg-[#15B1E8] text-white border-[#15B1E8]"
                : "border-gray-200 text-[#283646] bg-white hover:bg-[#E7F0FC]",
            ].join(" ")}
          >
            <span className={active === cat.name ? "text-white" : "text-gray-400"}>
              {cat.icon}
            </span>
            {cat.name}
          </button>
        ))}
      </div>

      {/* Cards Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 gap-8">
          {filtered.map((item) => (
            <HighlightCardItem key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-[#283646]/40 text-sm font-medium italic">
          No activities in this category yet.
        </div>
      )}
    </>
  );
}