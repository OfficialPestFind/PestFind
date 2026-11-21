import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "remixicon/fonts/remixicon.css";

gsap.registerPlugin(ScrollTrigger);

const spaces = [
  {
    title: "Residential",
    description: "Protect the place you call home.",
    button: "Get Residential Pest Care",
    link: "/residential",
    image: "/images/Residential.jpg",
    alt: "Modern residential living room",
    icon: "ri-home-5-line",
  },
  {
    title: "Commercial",
    description: "Keep your workplace protected.",
    button: "Get Commercial Pest Care",
    link: "/commercial",
    image: "/images/Office.jpg",
    alt: "Modern commercial office interior",
    icon: "ri-building-2-line",
  },
  {
    title: "Restaurant",
    description: "Clean kitchen. Confident guests.",
    button: "Get Restaurant Pest Care",
    link: "/restaurant",
    image: "/images/Restaurant.jpg",
    alt: "Elegant modern restaurant interior",
    icon: "ri-restaurant-line",
  },
];

const BackgroundDecoration = () => (
  <div
    aria-hidden="true"
    className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
  >
    <div className="absolute -left-32 -top-36 h-72 w-72 rounded-full bg-[#e5f5e9]/70 blur-3xl sm:-left-40 sm:-top-40 sm:h-[450px] sm:w-[450px]" />
    <div className="absolute -right-32 top-8 h-72 w-72 rounded-full bg-[#e2f4e9]/70 blur-3xl sm:-right-24 sm:-top-20 sm:h-[370px] sm:w-[500px]" />

    <svg
      className="absolute -right-20 -top-12 hidden h-[330px] w-[650px] opacity-60 lg:block"
      viewBox="0 0 650 330"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M-30 280C100 45 205 310 340 170S500 -10 690 20"
        stroke="#d9eee2"
        strokeWidth="40"
        strokeLinecap="round"
      />
      <path
        d="M10 310C140 75 245 340 380 200S540 20 730 50"
        stroke="#e7f5ec"
        strokeWidth="22"
        strokeLinecap="round"
      />
      <path
        d="M350 125C374 90 405 80 419 74C413 105 391 126 350 125Z"
        fill="#81bd83"
      />
      <path
        d="M478 170C497 126 530 107 550 100C541 140 514 164 478 170Z"
        fill="#4d9d56"
      />
      <path
        d="M350 125L414 80M478 170L543 107"
        stroke="#a8d4a9"
        strokeWidth="2"
      />
    </svg>
  </div>
);

const SectionHeading = () => (
  <div className="space-heading mb-8 sm:mb-9 lg:mb-10">
    <div className="mb-3 flex flex-wrap items-center gap-3 sm:gap-5">
      <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#08723b] sm:text-xs sm:tracking-[0.19em] md:text-sm">
        For every kind of space
      </p>
      <span className="h-[2px] w-10 bg-[#178049] sm:w-16" />
    </div>

    <h3 className="max-w-4xl text-3xl lg:text-6xl font-bold leading-[1.05] tracking-[-0.045em] text-black">
      Pest care for where life <span className="text-[#08743b]">happens.</span>
    </h3>

    <p className="mt-4 max-w-2xl text-sm leading-6 text-[#656975] sm:text-base sm:leading-7 lg:text-lg">
      Safe, effective and reliable pest control for homes, workplaces and
      restaurants.
    </p>
  </div>
);

const SpaceCard = ({ space }) => (
  <article className="space-card group relative isolate flex min-h-[360px] flex-col overflow-hidden rounded-[22px] bg-[#e9eee9] shadow-[0_14px_34px_rgba(10,75,40,0.10)] ring-1 ring-black/[0.04] sm:min-h-[370px] sm:rounded-[26px] lg:min-h-[390px] 2xl:min-h-[430px]">
    <img
      src={space.image}
      alt={space.alt}
      loading="lazy"
      className="space-image absolute inset-0 h-full w-full object-cover object-center"
    />

    {/* Layered overlays keep the text legible across different image crops. */}
    <div
      aria-hidden="true"
      className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 via-[52%] to-black/5"
    />
    <div
      aria-hidden="true"
      className="absolute inset-0 bg-black/[0.08] transition-colors duration-300 group-hover:bg-black/[0.03]"
    />

    <div className="absolute left-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-2xl bg-white/95 shadow-lg backdrop-blur-sm sm:left-6 sm:top-6 sm:h-14 sm:w-14">
      <i
        className={`space-icon ${space.icon} text-2xl leading-none text-[#08743b] sm:text-3xl`}
        aria-hidden="true"
      />
    </div>

    <div className="relative z-10 mt-auto flex min-h-[200px] flex-col items-start justify-end p-5 sm:min-h-[215px] sm:p-6 lg:p-7">
      <h3 className="text-xl font-bold leading-tight tracking-[-0.035em] text-white sm:text-[1.75rem]">
        {space.title}
      </h3>

      <span className="mt-3 h-1 w-12 rounded-full bg-[#35d76d] sm:w-[61px]" />

      <p className="mt-3 text-sm font-medium leading-6 text-white/90 sm:text-base">
        {space.description}
      </p>

      <Link
        to={space.link}
        className="mt-5 inline-flex min-h-12 w-full items-center justify-between gap-3 rounded-full border border-[#43ec80]/70 bg-gradient-to-r from-[#079b4c] to-[#00a84d] py-1.5 pl-4 pr-1.5 text-sm font-bold text-white shadow-[0_5px_20px_rgba(0,120,55,0.20)] transition-colors duration-300 hover:from-[#07833f] hover:to-[#008d40] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#48d987]/50 sm:min-h-[54px] sm:pl-5 sm:text-base"
      >
        <span className="min-w-0 flex-1 whitespace-normal text-left leading-snug">
          {space.button}
        </span>
        <span className="space-arrow flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-[#08743b] sm:h-11 sm:w-11">
          <i
            className="ri-arrow-right-line text-xl leading-none sm:text-2xl"
            aria-hidden="true"
          />
        </span>
      </Link>
    </div>
  </article>
);

const SpaceCare = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const eventCleanups = [];

    const context = gsap.context(() => {
      if (!prefersReducedMotion) {
        const heading = section.querySelector(".space-heading");
        const cardsContainer = section.querySelector(".space-cards");
        const cards = gsap.utils.toArray(".space-card", section);

        gsap.from(heading, {
          y: 28,
          opacity: 0,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: {
            trigger: heading,
            start: "top 88%",
            once: true,
          },
        });

        gsap.from(cards, {
          y: 36,
          opacity: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsContainer,
            start: "top 86%",
            once: true,
          },
        });
      }

      // Enable hover-only motion on devices with a precise pointer.
      const canHover = window.matchMedia(
        "(hover: hover) and (pointer: fine)"
      ).matches;

      if (!canHover || prefersReducedMotion) return;

      const cards = gsap.utils.toArray(".space-card", section);

      cards.forEach((card) => {
        const image = card.querySelector(".space-image");
        const icon = card.querySelector(".space-icon");
        const arrow = card.querySelector(".space-arrow");

        const handleMouseEnter = () => {
          gsap.to(card, {
            y: -6,
            duration: 0.25,
            ease: "power2.out",
            boxShadow: "0 26px 48px rgba(10, 75, 40, 0.18)",
            overwrite: "auto",
          });
          gsap.to(image, {
            scale: 1.055,
            duration: 0.65,
            ease: "power2.out",
            overwrite: "auto",
          });
          gsap.to(icon, {
            scale: 1.06,
            duration: 0.25,
            ease: "back.out(1.7)",
            overwrite: "auto",
          });
          gsap.to(arrow, {
            x: 3,
            duration: 0.2,
            ease: "power2.out",
            overwrite: "auto",
          });
        };

        const handleMouseLeave = () => {
          gsap.to(card, {
            y: 0,
            duration: 0.25,
            ease: "power2.out",
            boxShadow: "0 14px 34px rgba(10, 75, 40, 0.10)",
            overwrite: "auto",
          });
          gsap.to(image, {
            scale: 1,
            duration: 0.5,
            ease: "power2.out",
            overwrite: "auto",
          });
          gsap.to(icon, {
            scale: 1,
            duration: 0.25,
            ease: "power2.out",
            overwrite: "auto",
          });
          gsap.to(arrow, {
            x: 0,
            duration: 0.2,
            ease: "power2.out",
            overwrite: "auto",
          });
        };

        card.addEventListener("mouseenter", handleMouseEnter);
        card.addEventListener("mouseleave", handleMouseLeave);

        eventCleanups.push(() => {
          card.removeEventListener("mouseenter", handleMouseEnter);
          card.removeEventListener("mouseleave", handleMouseLeave);
        });
      });
    }, section);

    return () => {
      eventCleanups.forEach((cleanup) => cleanup());
      context.revert();
    };
  }, []);

  return (
    <section
      id="space-care"
      ref={sectionRef}
      className="relative isolate overflow-hidden bg-[#f8fbf8] px-8 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20 xl:px-25 2xl:py-24"
    >
      <BackgroundDecoration />

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <SectionHeading />

        <div className="space-cards grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:gap-6 xl:grid-cols-3">
          {spaces.map((space) => (
            <SpaceCard key={space.title} space={space} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpaceCare;
