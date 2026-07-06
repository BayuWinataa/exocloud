"use client";

import Image from "next/image";
import { useState } from "react";
import { HiChatBubbleLeftRight } from "react-icons/hi2";

const reviews = [
  {
    id: 1,
    name: "Hana",
    role: "Delegasi IEES",
    avatar: "/images/hana_testi.webp",
    quote:
      "Saya senang banget dan bahagia, apalagi kami dapat ilmu secara langsung dari IEES dan paling berkesan ketika di Swiss karena sudah impian saya dari lama.",
  },
  {
    id: 2,
    name: "Zulfa Wahyu Pradana",
    role: "Peserta IFIC",
    avatar: "/images/zulfa_testi.webp",
    quote:
      "Internasional Bootcamp menurut saya cukup menyenangkan dan sangat bahagia terlebih saya memiliki teman teman baru.",
  },
  {
    id: 3,
    name: "Kalisa",
    role: "Peserta IFIC",
    avatar: "/images/kalisa_testi.webp",
    quote:
      "Seru banget tapi cape karena kita jalan jalan juga kemudian dapat pengalaman baru juga kita naik MRT, bus dan lain lain.",
  },
];

function Avatar({ src, name }: { src: string; name: string }) {
  const [hasError, setHasError] = useState(false);
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="h-12 w-12 rounded-full bg-[#E7F0FC] flex items-center justify-center overflow-hidden shrink-0">
      {hasError ? (
        <span className="text-[#15B1E8] font-bold text-sm">{initials}</span>
      ) : (
        <Image
          src={src}
          alt={name}
          className="w-full h-full object-cover"
          onError={() => setHasError(true)}
          width={50}
          height={50}
        />
      )}
    </div>
  );
}

export default function Review() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#283646]">
            What <span className="text-[#15B1E8]">Exogen</span> Says
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <figure
              key={review.id}
              className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col gap-5"
            >
              <figcaption className="flex items-center gap-3">
                <Avatar src={review.avatar} name={review.name} />
                <div>
                  <div className="font-bold text-[#283646] text-sm leading-tight">
                    {review.name}
                  </div>
                  <div className="text-[#283646] text-xs font-medium mt-0.5">
                    {review.role}
                  </div>
                </div>
              </figcaption>

              <div className="border-t border-gray-100" />

              <blockquote className="text-[#283646]/70 leading-relaxed text-sm italic flex-1">
                <p>&ldquo;{review.quote}&rdquo;</p>
              </blockquote>

              <HiChatBubbleLeftRight className="text-[#15B1E8]/20 text-3xl self-end" />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
