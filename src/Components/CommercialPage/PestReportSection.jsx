import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const reportData = [
  {
    site: "Warehouse A",
    visit: "Done",
    activity: "Low",
    activityStyle: "bg-emerald-50 text-emerald-700",
  },
  {
    site: "Office, Floor 3",
    visit: "Done",
    activity: "None",
    activityStyle: "bg-green-50 text-green-700",
  },
  {
    site: "Pantry and canteen",
    visit: "Follow-up",
    activity: "Medium",
    activityStyle: "bg-amber-50 text-amber-700",
  },
];

const PestReportSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const media = gsap.matchMedia();

    media.add(
      {
        reduceMotion: "(prefers-reduced-motion: reduce)",
        desktop: "(min-width: 768px)",
        mobile: "(max-width: 767px)",
      },
      (context) => {
        const { reduceMotion } = context.conditions;

        if (reduceMotion) return;

        const heading = section.querySelector(".report-heading");
        const description = section.querySelector(".report-description");
        const button = section.querySelector(".report-button");
        const card = section.querySelector(".report-card");
        const rows = gsap.utils.toArray(".report-row", section);

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            once: true,
          },
          defaults: {
            ease: "power3.out",
          },
        });

        timeline
          .from(heading, {
            y: 30,
            autoAlpha: 0,
            duration: 0.7,
          })
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
            button,
            {
              y: 15,
              autoAlpha: 0,
              duration: 0.5,
            },
            "-=0.3"
          )
          .from(
            card,
            {
              x: 45,
              y: 20,
              autoAlpha: 0,
              duration: 0.8,
            },
            "-=0.65"
          )
          .from(
            rows,
            {
              x: 15,
              autoAlpha: 0,
              duration: 0.45,
              stagger: 0.12,
            },
            "-=0.35"
          );

        // Subtle report card hover effect on desktop
        const hoverQuery = window.matchMedia(
          "(hover: hover) and (pointer: fine)"
        );

        if (hoverQuery.matches) {
          const enter = () => {
            gsap.to(card, {
              y: -6,
              boxShadow: "0 24px 55px rgba(0, 75, 40, 0.12)",
              duration: 0.3,
              ease: "power2.out",
            });
          };

          const leave = () => {
            gsap.to(card, {
              y: 0,
              boxShadow: "0 12px 35px rgba(0, 75, 40, 0.07)",
              duration: 0.3,
              ease: "power2.out",
            });
          };

          card.addEventListener("mouseenter", enter);
          card.addEventListener("mouseleave", leave);

          return () => {
            card.removeEventListener("mouseenter", enter);
            card.removeEventListener("mouseleave", leave);
          };
        }
      },
      section
    );

    return () => media.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#f2f8f4] px-8 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-15"
    >
      {/* Soft background accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-white/70 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-32 h-80 w-80 rounded-full bg-[#dceee2]/60 blur-3xl"
      />

      <div className="relative mx-auto grid w-full max-w-[1120px] grid-cols-1 items-center gap-10 md:gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">

        {/* LEFT CONTENT */}
        <div className="min-w-0">
          <div className="report-heading">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-green-200 bg-white/80 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[1.8px] text-green-800 sm:text-xs">
              <span className="h-2 w-2 rounded-full bg-green-700" />
              Transparent pest care
            </span>

            <h2 className="max-w-[600px] text-[32px] font-bold leading-[1.12] tracking-[-0.04em] text-[#0b1710] sm:text-4xl md:text-[42px] lg:text-[46px]">
              Know what was done,
              <span className="text-green-800"> every month.</span>
            </h2>
          </div>

          <p className="report-description mt-5 max-w-[550px] text-sm leading-7 text-[#58675e] sm:text-base sm:leading-8">
            Good pest control is visible. A simple report card shows
            activity, visits and the next action, so you can answer
            management or an auditor in one place.
          </p>

          {/* Supporting points */}
          <div className="report-description mt-6 flex flex-col gap-3">
            {[
              "Clear records of service visits",
              "A simple view of pest activity",
              "Follow-up actions made easier to track",
            ].map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 text-sm font-medium text-[#25372c]"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-800 text-white">
                  <svg
                    viewBox="0 0 20 20"
                    fill="none"
                    className="h-3.5 w-3.5"
                    aria-hidden="true"
                  >
                    <path
                      d="m5 10 3 3 7-7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                {item}
              </div>
            ))}
          </div>

          <div className="report-button mt-8">
            <Link
              to="/#pest-request-form"
              className="group inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-xl bg-[#006b35] px-7 py-3.5 text-sm font-bold text-white shadow-[0_8px_22px_rgba(0,107,53,0.18)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#00572b] hover:shadow-[0_12px_28px_rgba(0,107,53,0.24)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-4 sm:w-auto sm:text-base"
            >
              Get matched
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
          </div>

          <p className="mt-4 text-xs leading-5 text-[#718078]">
            Simple service visibility for homes, offices and businesses.
          </p>
        </div>

        {/* RIGHT REPORT CARD */}
        <div className="min-w-0">
          <div className="report-card overflow-hidden rounded-2xl border border-[#dce8df] bg-white shadow-[0_12px_35px_rgba(0,75,40,0.07)] sm:rounded-[22px]">

            {/* Card header */}
            <div className="flex items-center justify-between gap-3 bg-[#006b35] px-5 py-4 text-white sm:px-7">
              <div>
                <p className="text-sm font-bold tracking-wide sm:text-base">
                  Pest Report Card
                </p>
                <p className="mt-1 text-[10px] text-green-100 sm:text-xs">
                  Monthly service overview
                </p>
              </div>

              <span className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white sm:text-xs">
                Sample
              </span>
            </div>

            {/* Report table */}
            <div className="w-full">
              {/* Table headings */}
              <div className="grid grid-cols-[1.35fr_0.8fr_0.65fr] gap-2 border-b border-[#e6ece8] bg-[#fbfdfb] px-4 py-4 text-[10px] font-bold uppercase tracking-[1px] text-[#758078] sm:px-6 sm:text-xs">
                <span>Site</span>
                <span>Visit</span>
                <span>Activity</span>
              </div>

              {/* Report rows */}
              {reportData.map((row) => (
                <div
                  key={row.site}
                  className="report-row grid grid-cols-[1.35fr_0.8fr_0.65fr] items-center gap-2 border-b border-[#e8eee9] px-4 py-5 transition-colors duration-200 hover:bg-[#f8fbf9] sm:px-6"
                >
                  <span className="min-w-0 break-words text-[12px] font-semibold text-[#26342b] sm:text-sm">
                    {row.site}
                  </span>

                  <span
                    className={`text-[11px] font-medium sm:text-sm ${
                      row.visit === "Done"
                        ? "text-[#35483b]"
                        : "text-amber-700"
                    }`}
                  >
                    {row.visit}
                  </span>

                  <span>
                    <span
                      className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-[10px] font-bold sm:px-3 sm:text-xs ${row.activityStyle}`}
                    >
                      {row.activity}
                    </span>
                  </span>
                </div>
              ))}
            </div>

            {/* Card footer */}
            <div className="flex flex-col gap-2 bg-[#fbfdfb] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <p className="text-[10px] leading-5 text-[#7b867f] sm:text-xs">
                Illustration only. Your partner supplies your actual reports.
              </p>

              <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-green-800 sm:text-xs">
                <span className="h-1.5 w-1.5 rounded-full bg-green-600" />
                Sample report
              </span>
            </div>
          </div>

          {/* Small note under card */}
          <p className="mt-4 text-center text-[10px] leading-5 text-[#718078] sm:text-xs">
            Example layout for service reporting and follow-up visibility.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PestReportSection;