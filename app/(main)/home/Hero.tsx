"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { HiArrowCircleRight } from "react-icons/hi";

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
      <div className="relative w-full max-w-[700px]">
        <Image
          src="/images/hero-banner.png"
          alt="Exocloud Activities"
          className="w-full h-auto drop-shadow-2xl relative z-10"
          width={500}
          height={500}
          priority
        />

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#15B1E8]/5 rounded-full blur-3xl -z-0 pointer-events-none" />
      </div>
    </div>
      </div>

    </section>
  );
}