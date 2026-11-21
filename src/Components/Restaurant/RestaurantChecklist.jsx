import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const checklistPoints = [
  "Where pests hide in a commercial kitchen",
  "Daily and weekly checklist for your team",
  "What to record before an inspection",
  "10 questions to ask any pest control agency",
];

const KitchenPestChecklist = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 82%",
          once: true,
        },
        defaults: {
          ease: "power3.out",
        },
      });

      timeline
        .from(".kitchen-pdf", {
          x: -55,
          y: 20,
          rotate: -5,
          autoAlpha: 0,
          duration: 0.9,
        })
        .from(
          ".kitchen-content > *",
          {
            y: 25,
            autoAlpha: 0,
            duration: 0.65,
            stagger: 0.12,
          },
          "-=0.55"
        );

      // Subtle floating animation
      gsap.to(".kitchen-pdf", {
        y: -7,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1,
      });

    }, section);

    return () => ctx.revert();
  }, []);

  const handlePdfEnter = (event) => {
    if (
      window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      gsap.to(event.currentTarget, {
        rotate: 0,
        scale: 1.025,
        duration: 0.35,
        ease: "power2.out",
        overwrite: "auto",
      });
    }
  };

  const handlePdfLeave = (event) => {
    gsap.to(event.currentTarget, {
      rotate: -2,
      scale: 1,
      duration: 0.35,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  return (
    <section
      ref={sectionRef}
      id="free-restaurant-checklist"
      className="relative w-full overflow-hidden bg-white px-8 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-15"
    >
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 md:gap-14 lg:grid-cols-[0.72fr_1.5fr] lg:gap-16">

        {/* PDF COVER */}
        <div className="flex justify-center lg:justify-start">
          <div
            onMouseEnter={handlePdfEnter}
            onMouseLeave={handlePdfLeave}
            className="kitchen-pdf relative w-[230px] max-w-full sm:w-[275px]"
          >
            {/* Soft shadow */}
            <div className="absolute inset-0 translate-x-3 translate-y-4 rounded-2xl bg-[#006b35]/10 blur-xl" />

            {/* PDF document */}
            <div className="relative flex aspect-[0.72/1] flex-col overflow-hidden rounded-[18px] border border-[#e0e9e3] border-l-[9px] border-l-[#006b35] bg-white p-5 shadow-[0_15px_40px_rgba(16,40,25,0.09)] sm:p-7">

              <div className="text-[10px] font-extrabold uppercase tracking-[2px] text-[#006b35] sm:text-xs">
                Free PDF
              </div>

              <div className="my-auto">
                <div className="mb-3 h-1 w-10 rounded-full bg-[#dcefe2]" />

                <h3 className="text-xl font-bold leading-tight tracking-tight text-[#101a13] sm:text-[23px]">
                  Kitchen Pest-Check Checklist
                </h3>

                <p className="mt-3 text-[11px] leading-5 text-gray-500 sm:text-xs">
                  A practical guide for commercial kitchen teams.
                </p>
              </div>

              <div>
                <p className="text-xs font-bold tracking-tight text-[#006b35]">
                  PestFind
                </p>
                <p className="mt-2 text-[10px] text-gray-400 sm:text-xs">
                  Pest Control Made Easier.
                </p>
              </div>

              {/* Decorative bottom line */}
              <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-[#006b35] to-[#b8dfc6]" />
            </div>

            {/* PDF label */}
            <div className="absolute -right-3 -top-3 flex h-11 w-11 items-center justify-center rounded-full border border-[#dcefe2] bg-white text-[#006b35] shadow-lg sm:-right-4 sm:-top-4">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path
                  d="M7 3h7l5 5v13H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinejoin="round"
                />
                <path
                  d="M14 3v6h5M8 14h8M8 17h6"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="kitchen-content min-w-0">

          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#eff7f1] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[1.5px] text-[#006b35] sm:text-xs">
            <span className="h-2 w-2 rounded-full bg-[#006b35]" />
            Free commercial kitchen guide
          </div>

          <h2 className="max-w-3xl text-3xl font-bold leading-[1.13] tracking-[-0.035em] text-[#101a13] sm:text-4xl lg:text-[43px]">
            Free: the Kitchen <span className="text-green-700">
                Pest-Check Checklist
              </span>
          </h2>

          <p className="mt-4 max-w-3xl text-sm leading-7 text-[#647168] sm:text-base sm:leading-8">
            A one-page checklist your kitchen team can use every week.
            Identify common pest risks, improve daily checks and prepare
            for inspections. Get the PDF after you submit the form.
          </p>

          {/* Checklist */}
          <ul className="mt-6 flex flex-col gap-4 sm:mt-7 sm:gap-[18px]">
            {checklistPoints.map((point) => (
              <li
                key={point}
                className="flex items-start gap-3 text-[13px] font-semibold leading-6 text-[#18251c] sm:text-[15px]"
              >
                <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#e8f5ec] text-[#006b35]">
                  <svg
                    viewBox="0 0 20 20"
                    fill="none"
                    className="h-3.5 w-3.5"
                    aria-hidden="true"
                  >
                    <path
                      d="m4 10 4 4 8-8"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span>{point}</span>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="mt-8">
            <Link
              to="/#pest-request-form"
              className="group inline-flex min-h-[52px] w-full items-center justify-center gap-3 rounded-xl bg-[#006b35] px-7 py-3.5 text-sm font-bold text-white shadow-[0_8px_20px_rgba(0,107,53,0.16)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#00552a] hover:shadow-[0_12px_25px_rgba(0,107,53,0.22)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#006b35] focus-visible:ring-offset-4 sm:w-auto sm:text-base"
            >
              Fill the form to get it
              <svg
                viewBox="0 0 20 20"
                fill="none"
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              >
                <path
                  d="M4 10h11m-5-5 5 5-5 5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>

            <p className="mt-3 text-xs leading-5 text-gray-400">
              Free resource for commercial kitchen teams.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KitchenPestChecklist;