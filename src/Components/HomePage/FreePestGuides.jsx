import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const guides = [
  {
    number: "01",
    eyebrow: "RESIDENTIAL GUIDE",
    title: "Residential Pest-Safe Checklist",
    description:
      "Where pests hide at home, a room-by-room check, a seasonal pest calendar, and the right questions to ask a service partner.",
    image: "/images/home-pest-safe-checklist.jpg",
    imageAlt:
      "Family organising pantry food in a bright home kitchen with a pet nearby",
  },
  {
    number: "02",
    eyebrow: "KITCHEN GUIDE",
    title: "Kitchen Pest-Check Checklist",
    description:
      "A practical weekly check for kitchen teams, including what to inspect, what to record, and how to prepare for an inspection.",
    image: "/images/kitchen-pest-checklist.jpg",
    imageAlt:
      "Food safety professional inspecting a clean commercial kitchen",
  },
  {
    number: "03",
    eyebrow: "BUSINESS GUIDE",
    title: "Commercial Pest-Risk Checklist",
    description:
      "A clear risk check for offices, warehouses, and factories, with useful prompts for maintaining a monthly pest activity record.",
    image: "/images/commercial-pest-risk-checklist.jpg",
    imageAlt:
      "Facilities professional reviewing a warehouse with a tablet",
  },
];

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const supportsHover = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(hover: hover) and (pointer: fine)").matches;

const ArrowIcon = ({ className = "h-4 w-4" }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 20 20"
    fill="none"
    className={className}
  >
    <path
      d="M4 10h11M10 5l5 5-5 5"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const FreePestGuides = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || prefersReducedMotion()) return undefined;

    const ctx = gsap.context(() => {
      const heading = section.querySelector(".free-guides-heading");
      const subtitle = section.querySelector(".free-guides-subtitle");
      const cards = gsap.utils.toArray(".free-guide-card", section);
      const cta = section.querySelector(".free-guides-cta");

      const timeline = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: section,
          start: "top 82%",
          once: true,
        },
      });

      if (heading) {
        timeline.from(heading, {
          y: 24,
          autoAlpha: 0,
          duration: 0.65,
        });
      }

      if (subtitle) {
        timeline.from(
          subtitle,
          { y: 16, autoAlpha: 0, duration: 0.5 },
          "-=0.32"
        );
      }

      if (cards.length) {
        timeline.from(
          cards,
          {
            y: 34,
            autoAlpha: 0,
            scale: 0.985,
            duration: 0.62,
            stagger: 0.13,
          },
          "-=0.18"
        );
      }

      if (cta) {
        timeline.from(
          cta,
          { y: 14, autoAlpha: 0, duration: 0.45 },
          "-=0.18"
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  const handleCardEnter = (event) => {
    if (!supportsHover() || prefersReducedMotion()) return;

    const card = event.currentTarget;
    const image = card.querySelector(".free-guide-image");

    gsap.to(card, {
      y: -5,
      borderColor: "#b9d7c4",
      boxShadow: "0 20px 42px rgba(7, 70, 39, 0.10)",
      duration: 0.28,
      ease: "power2.out",
      overwrite: "auto",
    });

    if (image) {
      gsap.to(image, {
        scale: 1.055,
        duration: 0.55,
        ease: "power2.out",
        overwrite: "auto",
      });
    }
  };

  const handleCardLeave = (event) => {
    const card = event.currentTarget;
    const image = card.querySelector(".free-guide-image");

    gsap.to(card, {
      y: 0,
      borderColor: "#dce8df",
      boxShadow: "0 2px 8px rgba(15, 23, 42, 0.035)",
      duration: 0.28,
      ease: "power2.out",
      overwrite: "auto",
    });

    if (image) {
      gsap.to(image, {
        scale: 1,
        duration: 0.45,
        ease: "power2.out",
        overwrite: "auto",
      });
    }
  };

  const handleButtonEnter = (event) => {
    if (!supportsHover() || prefersReducedMotion()) return;

    gsap.to(event.currentTarget, {
      y: -2,
      scale: 1.015,
      duration: 0.2,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const handleButtonLeave = (event) => {
    gsap.to(event.currentTarget, {
      y: 0,
      scale: 1,
      duration: 0.2,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  return (
    <section
      ref={sectionRef}
      aria-labelledby="free-pest-guides-title"
      className="relative isolate w-full overflow-hidden bg-[#f2f8f4]"
    >
      {/* Soft background details */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-28 -top-32 h-72 w-72 rounded-full bg-white/70 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-36 -left-28 h-80 w-80 rounded-full bg-[#e2f0e7]/70 blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-[1080px] px-7 py-12 sm:px-6 sm:py-14 md:px-8 lg:px-0 lg:py-[68px]">
        {/* Section heading */}
        <div className="free-guides-heading mb-2">
          
          <h2
            id="free-pest-guides-title"
            className="max-w-3xl text-[30px] font-bold leading-[1.12] tracking-[-0.035em] text-[#07130d] sm:text-4xl lg:text-[45px]"
          >
            Free guides after you <span className="text-[#006b35]">fill the form</span>
          </h2>
        </div>

        <p className="free-guides-subtitle mb-7 text-md leading-6 text-[#53645a] sm:mb-9 sm:text-base sm:leading-7">
          Submit once and download the guides straight away.
        </p>

        {/* Guide cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-5">
          {guides.map((guide, index) => (
            <article
              key={guide.number}
              onMouseEnter={handleCardEnter}
              onMouseLeave={handleCardLeave}
              className="free-guide-card group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-[#dce8df] bg-white shadow-[0_2px_8px_rgba(15,23,42,0.035)] transition-colors duration-300 sm:rounded-[20px]"
            >
              {/* Image */}
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#e7f1ea]">
                <img
                  src={guide.image}
                  alt={guide.imageAlt}
                  loading="lazy"
                  decoding="async"
                  className="free-guide-image h-full w-full object-cover"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-[#071b10]/55 via-transparent to-black/5"
                />
                <span className="absolute left-4 top-4 inline-flex items-center rounded-full border border-white/50 bg-white/90 px-3 py-1.5 text-[9px] font-extrabold tracking-[0.13em] text-[#075a30] shadow-sm backdrop-blur-sm sm:left-5 sm:top-5 sm:text-[10px]">
                  {guide.eyebrow}
                </span>
                <span className="absolute bottom-3 right-4 text-sm font-bold tracking-[0.12em] text-white/90 drop-shadow sm:bottom-4 sm:right-5">
                  {guide.number}
                </span>
              </div>

              {/* Card content */}
              <div className="flex flex-1 flex-col p-5 sm:p-5 lg:p-6">
                <div className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-[#16804a]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#16804a]" />
                  Free checklist
                </div>

                <h3 className="text-lg font-bold leading-snug tracking-[-0.02em] text-[#07130d] sm:text-xl">
                  {guide.title}
                </h3>

                <p className="mt-3 flex-1 text-[13px] leading-[1.7] text-[#53645a] sm:text-sm">
                  {guide.description}
                </p>

                <div className="mt-5 flex items-center justify-between border-t border-[#edf2ee] pt-4 text-xs font-semibold text-[#006b35]">
                  <span>Included with your request</span>
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-[#eef7f1] transition-colors group-hover:bg-[#dff0e5]">
                    <ArrowIcon />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="free-guides-cta mt-7 flex flex-col items-start gap-3 sm:mt-8">
          <Link
            to="/#pest-request-form"
            onMouseEnter={handleButtonEnter}
            onMouseLeave={handleButtonLeave}
            className="group inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-xl bg-[#006b35] px-6 py-3.5 text-sm font-bold text-white shadow-[0_8px_20px_rgba(0,107,53,0.16)] transition-colors duration-200 hover:bg-[#00572b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#006b35] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f2f8f4] sm:w-auto sm:min-w-[245px]"
          >
            <span>Fill the form to get them</span>
            <ArrowIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
          <p className="text-xs leading-5 text-[#64746a] sm:text-[13px]">
            Free to submit. Your guides are provided after you complete the
            request form.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FreePestGuides;
