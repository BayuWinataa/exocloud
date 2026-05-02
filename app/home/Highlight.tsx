import { Button } from "@/components/ui/button";
import { HiGlobeAlt, HiUsers, HiPaperAirplane } from "react-icons/hi2";
import { HiArrowCircleRight } from "react-icons/hi";
import CategoryFilter, { type HighlightCard } from "./CategoryFilter";

const stats = [
  { label: "Programs", val: "20+", icon: <HiGlobeAlt />, color: "text-[#0881A3]", bg: "bg-[#E8F5EF]" },
  { label: "Participant", val: "300+", icon: <HiUsers />, color: "text-[#F59E0B]", bg: "bg-[#FEF7E8]" },
  { label: "Nationalities", val: "20+", icon: <HiPaperAirplane />, color: "text-[#15B1E8]", bg: "bg-[#E7F0FC]" },
];


const highlights: HighlightCard[] = [
  {
    id: 1,
    title: "IEES 2025",
    subtitle: "Internasional Enterpreunership Education Summit.",
    year: "2025",
    location: "Belgia, Paris",
    img: "/images/iees-2025.png",
    category: "International Competition",
    size: "large",
    accentColor: "from-[#E7F0FC]", 
    btnColor: "#10316B",
    badgeColor: "#03AED2"
  },
  {
    id: 2,
    title: "Global Volunteer",
    subtitle: "Social impact project for local communities.",
    year: "2025",
    location: "Bangkok, Thailand",
    img: "/images/event-2.jpg",
    category: "Social Program",
    size: "small",
    accentColor: "from-[#FEF7E8]", 
    btnColor: "#F59E0B",
    badgeColor: "#F59E0B"
  },
  {
    id: 3,
    title: "Tech Innovators",
    subtitle: "Competition for future technology leaders.",
    year: "2024",
    location: "Singapore",
    img: "/images/event-1.jpg",
    category: "International Competition",
    size: "small",
    accentColor: "from-[#E8F5EF]",
    btnColor: "#0881A3",
    badgeColor: "#0881A3"
  },
  {
    id: 4,
    title: "Study in Europe",
    subtitle: "Scholarship mentoring for prestigious universities.",
    year: "2025",
    location: "Berlin, Germany",
    img: "/images/iees-2025.png",
    category: "Study Abroad Scholarship",
    size: "large",
    accentColor: "from-[#E7F0FC]",
    btnColor: "#10316B",
    badgeColor: "#03AED2",
  },
];

export default function Highlight() {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-16 font-sans">
      <div className="text-center mb-10 space-y-2">
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#283646] tracking-tight">
          Exocloud <span className="text-[#F59E0B]">Activity</span> Highlights
        </h2>
        <p className="text-[#283646] italic font-medium text-sm md:text-base">
          A glimpse into our programs, events, and global experiences.
        </p>
      </div>

      <div className="max-w-2xl mx-auto mb-12">
        <div className="bg-white border border-gray-50 shadow-[0_4px_20px_rgba(0,0,0,0.03)] rounded-2xl px-8 py-4 flex justify-around items-center">
          {stats.map((stat, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className={`${stat.bg} p-2.5 rounded-xl ${stat.color} text-xl`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-base font-black text-[#283646] leading-none">{stat.val}</p>
                <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mt-1">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <CategoryFilter highlights={highlights} />

      <div className="text-center mt-16 space-y-4">
        <p className="text-[#283646]/50 text-sm font-medium">
          Want to see all of our activities?
        </p>
        <Button
          variant="outline"
          className="border-2 border-[#15B1E8] text-[#15B1E8] hover:bg-[#15B1E8] hover:text-white rounded-3xl px-8 py-5 font-bold text-sm transition-all duration-300 gap-2 shadow-sm active:scale-95"
        >
          View More <HiArrowCircleRight className="text-xl" />
        </Button>
      </div>
    </section>
  );
}