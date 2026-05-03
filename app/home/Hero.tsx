"use client";
import { Button } from "@/components/ui/button";
import { HiArrowCircleRight } from "react-icons/hi";
import { HiOutlineGlobeAlt, HiOutlineUserGroup, HiOutlineBriefcase } from "react-icons/hi2";

const features = [
  {
    title: "International Access",
    desc: "Gateway to global education and experiences.",
    icon: HiOutlineGlobeAlt,
  },
  {
    title: "Expert Mentorship",
    desc: "Guidance to master leadership and business.",
    icon: HiOutlineUserGroup,
  },
  {
    title: "Global Networking",
    desc: "Connect with world-class partners and institutions.",
    icon: HiOutlineBriefcase,
  },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden max-w-7xl mx-auto px-6 md:px-12 lg:px-16 pt-10 pb-20">


      <div className="absolute top-1/2 -right-20 w-[400px] h-[400px] bg-[#15B1E8]/10 rounded-full blur-[100px] -z-10 pointer-events-none" />
      
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
        <div className="flex-1 space-y-5 max-w-lg">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-[1.15] text-[#283646] tracking-tight">
            Welcome{" "}
            <span className="text-[#F59E0B]">Home</span>{" "}
            to
            <br />
            <span className="text-[#15B1E8]">Exocloud Indonesia</span>
          </h1>

          <p className="text-[#283646]/60 text-sm md:text-base max-w-sm leading-relaxed">
            We are your safe space to grow and expand your network.
            Kindly explore our programs!
          </p>

          <Button
            className="bg-[#F59E0B] hover:bg-[#E08D00] text-white rounded-full px-7 py-2.5 text-sm font-bold shadow-sm transition-all active:scale-95 flex items-center gap-2 w-fit border-none h-11"
          >
            Explore Programs
            <HiArrowCircleRight className="text-lg" />
          </Button>
        </div>

    <div className="flex-1 flex justify-center md:justify-end">
      <div className="relative w-full max-w-[500px]">
        <img
          src="/images/hero-banner.png"
          alt="Exocloud Activities"
          className="w-full h-auto drop-shadow-2xl relative z-10"
        />

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#15B1E8]/5 rounded-full blur-3xl -z-0 pointer-events-none" />
      </div>
    </div>
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="bg-[#EEF8FD] rounded-2xl px-6 py-4 flex flex-wrap md:flex-nowrap justify-between items-center gap-4">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-3 flex-1 min-w-[180px]"
              >
                <div className="bg-white rounded-xl p-2.5 shrink-0 shadow-sm">
                  <Icon className="text-[#15B1E8] text-2xl" />
                </div>
                <div>
                  <p className="font-bold text-[#10316B] text-sm leading-tight">
                    {item.title}
                  </p>
                  <p className="text-[#283646]/50 text-[11px] mt-0.5 leading-snug">
                    {item.desc}
                  </p>
                </div>
                {idx < 2 && (
                  <div className="hidden md:block w-px h-8 bg-[#15B1E8]/20 ml-auto shrink-0" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}