import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const checklistPoints = [
  "Pest-risk checklist for offices, warehouses and factories",
  "Sample monthly Pest Report Card",
  "What to ask for in a pest control contract (AMC)",
  "Simple log sheet for audits and management",
];

const CommercialPestChecklist = () => {
  const sectionRef = useRef(null);
  const coverRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();

    mm.add(
      {
        reduceMotion: "(prefers-reduced-motion: reduce)",
        desktop: "(min-width: 768px)",
      },
      (context) => {
        if (context.conditions.reduceMotion) return;

        const heading = section.querySelector(".commercial-heading");
        const description = section.querySelector(".commercial-description");
        const points = gsap.utils.toArray(
          ".commercial-point",
          section
        );
        const button = section.querySelector(".commercial-button");
        const cover = coverRef.current;

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
          .from(cover, {
            x: -55,
            y: 25,
            rotate: -5,
            autoAlpha: 0,
            duration: 0.9,
          })
          .from(
            heading,
            {
              y: 30,
              autoAlpha: 0,
              duration: 0.7,
            },
            "-=0.55"
          )
          .from(
            description,
            {
              y: 20,
              autoAlpha: 0,
              duration: 0.6,
            },
            "-=0.35"
          )
          .from(
            points,
            {
              x: 20,
              autoAlpha: 0,
              duration: 0.45,
              stagger: 0.12,
            },
            "-=0.25"
          )
          .from(
            button,
            {
              y: 18,
              autoAlpha: 0,
              duration: 0.5,
            },
            "-=0.2"
          );

        // Cover hover effect on desktop
        if (context.conditions.desktop) {
          const enter = () => {
            gsap.to(cover, {
              y: -7,
              rotate: -1,
              scale: 1.025,
              duration: 0.35,
              ease: "power2.out",
              overwrite: "auto",
            });
          };

          const leave = () => {
            gsap.to(cover, {
              y: 0,
              rotate: -2,
              scale: 1,
              duration: 0.35,
              ease: "power2.out",
              overwrite: "auto",
            });
          };

          cover.addEventListener("mouseenter", enter);
          cover.addEventListener("mouseleave", leave);

          return () => {
            cover.removeEventListener("mouseenter", enter);
            cover.removeEventListener("mouseleave", leave);
          };
        }
      },
      section
    );

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-white px-10 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-15"
      id="free-commercial-checklist"
    >
      {/* Background accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-green-50/80 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-emerald-50/70 blur-3xl"
      />

      <div className="relative mx-auto grid w-full max-w-[1120px] grid-cols-1 items-center gap-12 md:gap-14 lg:grid-cols-[0.72fr_1.55fr] lg:gap-16">

        {/* LEFT: PDF COVER */}
        <div className="flex min-w-0 justify-center lg:justify-start">
          <div
            ref={coverRef}
            className="relative w-full max-w-[290px] sm:max-w-[320px] lg:max-w-[300px]"
          >
            {/* Shadow layer */}
            <div
              aria-hidden="true"
              className="absolute inset-0 translate-x-3 translate-y-4 rotate-3 rounded-[20px] bg-[#dcebe1]"
            />

            {/* Main cover */}
            <div className="relative flex min-h-[390px] rotate-[-2deg] flex-col overflow-hidden rounded-[18px] border border-[#e1eae3] bg-white px-6 py-7 shadow-[0_20px_50px_rgba(10,55,30,0.12)] transition-shadow duration-300 sm:min-h-[430px] sm:px-8 sm:py-4">
              {/* Green spine */}
              <div className="absolute bottom-0 left-0 top-0 w-[9px] bg-[#006b35]" />

              {/* Top label */}
              <div className="pl-2">
                <span className="inline-flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[2px] text-[#006b35] sm:text-xs">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-700" />
                  Free PDF
                </span>
              </div>

              {/* Document icon */}
              <div className="mt-9 flex h-12 w-12 items-center justify-center rounded-xl bg-[#eff7f1] text-[#006b35]">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-6 w-6"
                  aria-hidden="true"
                >
                  <path
                    d="M7 3.75h7l5 5V20a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2V5.75a2 2 0 0 1 2-2Z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14 4v5h5M8.5 13h7M8.5 16.5h7"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              {/* Cover title */}
              <div className="mt-7 pl-2">
                <h3 className="max-w-[245px] text-[25px] font-bold leading-[1.2] tracking-[-0.04em] text-[#101a13] sm:text-[28px]">
                  Commercial
                  <br />
                  Pest-Risk
                  <br />
                  Checklist
                  <span className="block text-[#006b35]">
                    + Sample Report Card
                  </span>
                </h3>

                <p className="mt-4 max-w-[230px] text-xs leading-5 text-[#718078]">
                  A practical resource for better pest management and
                  service documentation.
                </p>
              </div>

              {/* Bottom branding */}
              <div className="mt-auto border-t border-[#e9efea] pt-5 pl-2">
                <p className="text-sm font-extrabold tracking-tight text-[#17251b]">
                  Pest<span className="text-[#006b35]">Find</span>
                </p>
                <p className="mt-1 text-[10px] tracking-wide text-[#8a958e]">
                  Pest Control Made Easier.
                </p>
              </div>
            </div>

            {/* Floating PDF badge */}
            <div className="absolute -right-3 top-8 flex items-center gap-2 rounded-full border border-green-100 bg-white px-3 py-2 shadow-lg sm:-right-5">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-50 text-[#006b35]">
                <svg
                  viewBox="0 0 20 20"
                  fill="none"
                  className="h-3.5 w-3.5"
                  aria-hidden="true"
                >
                  <path
                    d="M5 10h10M10 5v10"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <span className="text-[10px] font-bold text-[#006b35]">
                FREE RESOURCE
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT: CONTENT */}
        <div className="min-w-0">
          <div className="commercial-heading">
            <span className="mb-4 inline-flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[2px] text-[#006b35] sm:text-xs">
              <span className="h-[2px] w-7 bg-[#006b35]" />
              Commercial pest care resources
            </span>

            <h2 className="max-w-[750px] text-[30px] font-bold leading-[1.14] tracking-[-0.04em] text-[#101a13] sm:text-4xl lg:text-[42px]">
              Free: Commercial Pest-Risk Checklist
              <span className="text-[#006b35]">
                {" "}and a Sample Pest Report Card
              </span>
            </h2>
          </div>

          <p className="commercial-description mt-5 max-w-[720px] text-sm leading-7 text-[#647168] sm:text-base sm:leading-8">
            Use the checklist to see where your sites are exposed, and
            the sample report to understand what good service
            documentation looks like. You get the PDF right after
            you submit the form.
          </p>

          {/* Checklist points */}
          <ul className="mt-6 flex flex-col gap-4 sm:mt-7 sm:gap-[18px]">
            {checklistPoints.map((point) => (
              <li
                key={point}
                className="commercial-point flex min-w-0 items-start gap-3"
              >
                <span className="mt-[6px] flex h-2.5 w-2.5 shrink-0 rounded-full bg-[#006b35]" />
                <span className="text-[13px] font-semibold leading-6 text-[#17251b] sm:text-[15px]">
                  {point}
                </span>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="commercial-button mt-8 sm:mt-9">
            <Link
              to="/#pest-request-form"
              className="group inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-xl bg-[#006b35] px-7 py-3.5 text-sm font-bold text-white shadow-[0_8px_22px_rgba(0,107,53,0.16)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#00572b] hover:shadow-[0_12px_28px_rgba(0,107,53,0.23)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#006b35] focus-visible:ring-offset-4 sm:w-auto sm:text-base"
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

            <p className="mt-3 text-xs leading-5 text-[#849087]">
              Free resource for offices, warehouses and commercial facilities.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommercialPestChecklist;