import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/base/button/Button";
import { Image } from "@/components/base/Image";
import {
  SPOTLIGHT_BENEFITS,
  SPOTLIGHT_HOW_IT_WORKS,
  SPOTLIGHT_JOIN_STEPS,
} from "@/features/spotlight/constants";
import SpotlightBackButton from "@/features/spotlight/components/SpotlightBackButton";

export const Route = createFileRoute("/_public/spotlight/")({
  component: SpotlightLandingPage,
  staticData: {
    maxWidth: "none",
    hideSpotlightRoute: true,
    hideHeader: "all",
  },
});

const MARKETING_IMAGES = [
  "/spotlight-marketing-person-1.avif",
  "/spotlight-marketing-person-2.avif",
];

function SpotlightLandingPage() {
  return (
    <div
      className="w-full mx-auto overflow-hidden relative"
      style={{
        background:
          "linear-gradient(180deg, #dff4ff 0%, #eef8fc 45%, #eadcf2 100%)",
        fontFamily: "'Montserrat', sans-serif",
      }}
    >
      {/* Hero */}
      <section className="relative px-12 pt-10 pb-0 min-h-232.5 max-sm:px-4 max-sm:pt-8">
        <div className="absolute top-10 left-12 z-30 max-sm:left-4">
          <SpotlightBackButton />
        </div>
        {/* Top image cards */}
        <div className="absolute top-10 left-30 flex items-start z-10 max-[1100px]:left-1/2 max-[1100px]:-translate-x-1/2">
          {/* First image — tilted left, z-20 so its corner stays on top */}
          <div className="w-46 h-64 border-10 border-white shadow-[0_12px_24px_rgba(0,0,0,0.15)] -rotate-6 z-20 relative max-sm:w-30 max-sm:h-42.5 max-sm:border-8">
            <Image
              src={MARKETING_IMAGES[0]}
              alt="spotlight preview 1"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Second image — tilted right, shifted left so only bottom-left corner overlaps first's bottom-right */}
          <div className="w-46 h-64 border-10 border-white shadow-[0_12px_24px_rgba(0,0,0,0.15)] rotate-6 -ml-6 mt-4 z-10 relative max-sm:w-30 max-sm:h-42.5 max-sm:border-8 max-sm:-ml-4">
            <Image
              src={MARKETING_IMAGES[1]}
              alt="spotlight preview 2"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Hero content */}
        <div className="ml-130 pt-10 relative z-20 max-[1100px]:ml-0 max-[1100px]:pt-77.5 max-[1100px]:text-center">
          <p className="text-[#7d1fd2] text-3xl font-extrabold leading-none max-sm:text-2xl">
            WELCOME TO
          </p>
          <p
            className="text-[#014e72] font-extrabold leading-none tracking-tight mt-2.5 max-sm:tracking-tight"
            style={{ fontSize: "clamp(44px, 6vw, 68px)" }}
          >
            AAVAK Spotlight
          </p>
          <span className="inline-block mt-3.5 bg-[#d9a6ff] text-[#5f2687] px-3.5 py-1.5 text-lg font-semibold max-sm:text-sm">
            Be A Part Of Aavak Spotlight!
          </span>
        </div>

        {/* Tagline */}
        <p className="mt-44 text-center text-[#6527a1] text-xl font-bold max-sm:mt-20 max-sm:text-base max-sm:leading-relaxed">
          Unlock premium earnings, track your growth, and level up your{" "}
          <span className="bg-[#10a5ff] text-base text-white px-1">
            creator journey.
          </span>
        </p>

        {/* Description */}
        <p className="max-w-190 mx-auto mt-5 text-center text-[#6f31a7] text-lg leading-relaxed font-medium max-sm:text-sm">
          Spotlight is AAVAK&apos;s exclusive program designed to reward
          high-performing creators. It&apos;s not just a platform; it&apos;s a
          career path.
        </p>

        {/* Benefit heading */}
        <p className="mt-16 text-center text-[#6727a3] text-lg font-bold">
          Get <span className="underline text-lg">Exclusive Benefits Like</span>
        </p>

        {/* Benefits */}
        <div className="mt-9 flex justify-center gap-16 flex-wrap max-sm:gap-8">
          {SPOTLIGHT_BENEFITS.map((benefit) => (
            <div key={benefit.label} className="text-center">
              <Image
                src={benefit.image}
                alt={benefit.label}
                className="size-28 object-contain mx-auto mb-1"
              />
              <p className="text-[#5c2993] text-sm font-bold">
                {benefit.label}
              </p>
            </div>
          ))}
        </div>

        {/* Big headline */}
        <p
          className="text-center mt-20 font-bold leading-none tracking-tight bg-linear-to-r from-[#00587a] to-[#10a5ff] bg-clip-text text-transparent max-sm:mt-16"
          style={{
            fontSize: "clamp(42px, 6vw, 74px)",
            fontFamily: "'Oswald', sans-serif",
          }}
        >
          SHOP . SNAP . SHARE . REPEAT .
        </p>

        {/* How it works cards */}
        <div className="mt-14 grid grid-cols-3 gap-7 px-14 max-[1100px]:grid-cols-1 max-sm:px-4">
          {SPOTLIGHT_HOW_IT_WORKS.map((item) => (
            <div
              key={item.title}
              className="bg-[#f0def8] relative overflow-hidden px-5 py-6"
            >
              <h3 className="text-[#67289f] text-lg font-bold mb-3 relative z-20">
                {item.title}
              </h3>
              <p className="text-[#7c3cae] text-sm max-w-55 relative z-20">
                {item.description}
              </p>
              <Image
                src={item.image}
                alt={item.title}
                className="absolute right-0 -top-28 w-44 h-48 object-cover z-20 object-top"
              />
              {/* Card bottom fold */}
              <div
                className="absolute -left-5 -bottom-6 h-11 bg-[#e5cbf4] -rotate-4 z-0"
                style={{ width: "120%" }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Join section */}
      <section className="mt-20 text-center px-5 pt-16 pb-28 relative">
        <h2 className="text-[#6727a3] text-xl font-bold underline mb-11">
          How to Join
        </h2>

        <div className="flex justify-center items-start flex-wrap gap-0 max-sm:flex-col max-sm:gap-6 max-sm:items-center">
          {SPOTLIGHT_JOIN_STEPS.map((step, i) => (
            <div key={step.number} className="w-42.5 relative">
              {i < SPOTLIGHT_JOIN_STEPS.length - 1 && (
                <div className="w-full h-px bg-[#8ab47f] absolute top-3.5 left-1/2 z-10 max-sm:hidden" />
              )}
              <div className="size-8 rounded-full bg-[#0a9140] text-white text-xs font-bold flex items-center justify-center mx-auto mb-3.5 relative z-20">
                {step.number}
              </div>
              <p className="text-[#707070] text-sm font-medium">{step.label}</p>
            </div>
          ))}
        </div>

        <p className="mt-10 text-[#6728a2] text-sm font-semibold">
          Download Guideline ↓
        </p>

        <Button
          variant="filled"
          className="mt-6 bg-[#d18bff] text-[#5e2687] hover:bg-[#c47aee]"
        >
          Join AAVAK Spotlight
        </Button>
      </section>
    </div>
  );
}
