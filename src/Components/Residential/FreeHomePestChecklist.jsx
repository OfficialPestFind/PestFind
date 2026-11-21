import React, { useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const checklistItems = [
  "5 corners where pests hide in most homes",
  "A room-by-room prevention checklist",
  "A monsoon and summer pest calendar",
  "10 questions to ask any pest control agency",
];

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const supportsHover = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(hover: hover) and (pointer: fine)").matches;

const FreeHomePestChecklist = () => {
  const sectionRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || prefersReducedMotion()) return undefined;

    const ctx = gsap.context(() => {
      const cover = section.querySelector(".checklist-cover");
      const content = section.querySelector(".checklist-content");
      const bullets = section.querySelectorAll(".checklist-item");
      const button = section.querySelector(".checklist-cta");

      const timeline = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: section,
          start: "top 82%",
          once: true,
        },
      });

      if (cover) {
        timeline.from(cover, {
          x: -38,
          y: 18,
          rotate: -7,
          autoAlpha: 0,
          duration: 0.85,
        });
      }

      if (content) {
        timeline.from(
          content,
          { x: 34, autoAlpha: 0, duration: 0.75 },
          "-=0.55"
        );
      }

      if (bullets.length) {
        timeline.from(
          bullets,
          { x: 16, autoAlpha: 0, duration: 0.42, stagger: 0.1 },
          "-=0.3"
        );
      }

      if (button) {
        timeline.from(
          button,
          { y: 14, autoAlpha: 0, scale: 0.97, duration: 0.45 },
          "-=0.15"
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  const handleCtaClick = (event) => {
    // When already on the homepage, scroll directly. This also supports
    // clicking the same CTA repeatedly without relying on a route change.
    if (location.pathname === "/") {
      const form = document.getElementById("pest-request-form");

      if (form) {
        event.preventDefault();
        form.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }

    // On another route, the hash lets HomePage handle the scroll after navigation.
    if (location.pathname !== "/") {
      event.preventDefault();
      navigate("/#pest-request-form");
    }
  };

  const handleCoverEnter = (event) => {
    if (!supportsHover() || prefersReducedMotion()) return;

    gsap.to(event.currentTarget, {
      y: -6,
      rotate: -1,
      duration: 0.3,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const handleCoverLeave = (event) => {
    gsap.to(event.currentTarget, {
      y: 0,
      rotate: -2,
      duration: 0.35,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const handleButtonEnter = (event) => {
    if (!supportsHover() || prefersReducedMotion()) return;
    gsap.to(event.currentTarget, {
      y: -3,
      scale: 1.02,
      duration: 0.22,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const handleButtonLeave = (event) => {
    gsap.to(event.currentTarget, {
      y: 0,
      scale: 1,
      duration: 0.22,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  return (
    <section
      ref={sectionRef}
      aria-labelledby="free-checklist-title"
      className="relative isolate w-full overflow-hidden bg-white"
      id="free-home-checklist"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-28 top-10 h-72 w-72 rounded-full bg-emerald-50/70 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-green-50/80 blur-3xl"
      />

      <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-9 px-7 py-14 sm:gap-10 sm:px-8 sm:py-16 md:grid-cols-[minmax(210px,0.72fr)_minmax(0,1.55fr)] md:gap-10 lg:gap-16 lg:px-10 lg:py-20">
        {/* PDF cover */}
        <div className="flex min-w-0 justify-center md:justify-start">
          <div
            className="checklist-cover relative w-[min(78%,270px)] min-w-[220px] max-w-[290px] origin-center rounded-[18px] border border-[#dce8df] border-l-[9px] border-l-[#006b35] bg-white px-5 py-6 shadow-[0_22px_55px_rgba(10,55,30,0.13)] sm:w-[260px] sm:px-6 sm:py-7 md:w-full md:min-w-0 md:max-w-[280px] md:-rotate-2"
            onMouseEnter={handleCoverEnter}
            onMouseLeave={handleCoverLeave}
          >
            <div className="flex items-center justify-between gap-3">
              <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#006b35] sm:text-[11px]">
                Free PDF
              </span>
              <span className="rounded-full bg-[#edf7f0] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.12em] text-[#006b35]">
                PestFind
              </span>
            </div>

            <div className="my-9 sm:my-12 md:my-14">
              <div className="mb-3 h-1 w-9 rounded-full bg-[#b8d9c4]" />
              <h3 className="max-w-[205px] text-[23px] font-extrabold leading-[1.12] tracking-[-0.035em] text-[#0a1c12] sm:text-[25px]">
                Home Pest-Safe <span className="text-[#006b35]">Checklist</span>
              </h3>
              <p className="mt-3 max-w-[205px] text-xs leading-5 text-[#68786e]">
                A practical room-by-room guide for a more pest-aware home.
              </p>
            </div>

            <div className="border-t border-dashed border-[#d8e5dc] pt-4">
              <p className="text-[11px] font-extrabold tracking-tight text-[#102218]">
                PestFind
              </p>
              <p className="mt-1 text-[10px] leading-4 text-[#7a8980]">
                Pest Control Made Easier.
              </p>
            </div>

            <div
              aria-hidden="true"
              className="absolute -bottom-3 -right-3 -z-10 h-full w-full rounded-[18px] border border-[#e4eee7] bg-[#f4faf6]"
            />
          </div>
        </div>

        {/* Content */}
        <div className="checklist-content min-w-0 text-center md:text-left">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#d8e9de] bg-[#f2f8f4] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#006b35] sm:text-[11px]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#078342]" />
            Free home guide
          </div>

          <h2
            id="free-checklist-title"
            className="mx-auto max-w-3xl text-[30px] font-bold leading-[1.12] tracking-[-0.04em] text-[#07130d] sm:text-4xl lg:mx-0 lg:text-[46px]"
          >
            Free: the Home <span className="text-[#006b35]">Pest-Safe Checklist</span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-[#53645a] sm:text-base sm:leading-7 lg:mx-0 lg:text-[17px]">
            A simple checklist for every room of your home. Get the PDF right
            after you submit the form.
          </p>

          <ul className="mx-auto mt-6 flex max-w-2xl flex-col gap-3 text-left sm:mt-7 sm:gap-3.5 lg:mx-0">
            {checklistItems.map((item) => (
              <li
                key={item}
                className="checklist-item flex items-start gap-3 text-[13px] font-semibold leading-6 text-[#14251b] sm:text-[15px]"
              >
                <span className="mt-[9px] h-2 w-2 shrink-0 rounded-full bg-[#078342] shadow-[0_0_0_4px_rgba(7,131,66,0.09)]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-col items-stretch gap-3 sm:mt-8 sm:flex-row sm:items-center">
            <Link
              to="/#pest-request-form"
              onClick={handleCtaClick}
              onMouseEnter={handleButtonEnter}
              onMouseLeave={handleButtonLeave}
              className="checklist-cta group inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-xl bg-[#006b35] px-6 py-3.5 text-sm font-bold text-white shadow-[0_10px_24px_rgba(0,107,53,0.18)] transition-colors duration-200 hover:bg-[#00572b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#006b35] focus-visible:ring-offset-2 sm:w-fit sm:min-w-[214px]"
            >
              <span>Fill the form to get it</span>
              <svg
                aria-hidden="true"
                viewBox="0 0 20 20"
                fill="none"
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
              >
                <path
                  d="M4 10h11M10 5l5 5-5 5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default FreeHomePestChecklist;
