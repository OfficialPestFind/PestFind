import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: "01",
    title: "Fill the form",
    description:
      "Takes about a minute. Tell us your place, area and what you need.",
  },
  {
    number: "02",
    title: "We match you",
    description:
      "PestFind picks a verified partner that suits your place, pest and location.",
  },
  {
    number: "03",
    title: "Partner contacts you",
    description:
      "They reach out within 24 hours and plan the visit around your time.",
  },
];

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

const supportsHover = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(hover: hover) and (pointer: fine)").matches;

const HowItWorks = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || prefersReducedMotion()) return undefined;

    const ctx = gsap.context(() => {
      const eyebrow = section.querySelector(".how-eyebrow");
      const heading = section.querySelector(".how-heading");
      const subtitle = section.querySelector(".how-subtitle");
      const cards = gsap.utils.toArray(".how-step-card", section);
      const cta = section.querySelector(".how-cta");

      const isSmallScreen = window.matchMedia("(max-width: 639px)").matches;
      const distance = isSmallScreen ? 16 : 28;

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 82%",
          once: true,
        },
        defaults: { ease: "power3.out" },
      });

      if (eyebrow) {
        timeline.from(eyebrow, {
          y: distance,
          autoAlpha: 0,
          duration: 0.45,
        });
      }

      if (heading) {
        timeline.from(
          heading,
          {
            y: distance,
            autoAlpha: 0,
            duration: 0.65,
          },
          "-=0.2"
        );
      }

      if (subtitle) {
        timeline.from(
          subtitle,
          {
            y: isSmallScreen ? 10 : 16,
            autoAlpha: 0,
            duration: 0.5,
          },
          "-=0.35"
        );
      }

      if (cards.length) {
        timeline.from(
          cards,
          {
            y: distance,
            autoAlpha: 0,
            scale: 0.99,
            duration: 0.6,
            stagger: isSmallScreen ? 0.08 : 0.13,
            clearProps: "transform",
          },
          "-=0.18"
        );
      }

      if (cta) {
        timeline.from(
          cta,
          {
            y: 12,
            autoAlpha: 0,
            duration: 0.45,
          },
          "-=0.15"
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  const handleCardEnter = (event) => {
    if (!supportsHover() || prefersReducedMotion()) return;

    const card = event.currentTarget;
    const number = card.querySelector(".how-step-number");

    gsap.to(card, {
      y: -5,
      borderColor: "#b7d5c2",
      boxShadow: "0 18px 38px rgba(0, 77, 39, 0.09)",
      duration: 0.25,
      ease: "power2.out",
      overwrite: "auto",
    });

    if (number) {
      gsap.to(number, {
        scale: 1.08,
        backgroundColor: "#075b30",
        duration: 0.25,
        ease: "power2.out",
        overwrite: "auto",
      });
    }
  };

  const handleCardLeave = (event) => {
    if (!supportsHover() || prefersReducedMotion()) return;

    const card = event.currentTarget;
    const number = card.querySelector(".how-step-number");

    gsap.to(card, {
      y: 0,
      borderColor: "#d6e3da",
      boxShadow: "0 1px 3px rgba(15, 23, 42, 0.035)",
      duration: 0.25,
      ease: "power2.out",
      overwrite: "auto",
    });

    if (number) {
      gsap.to(number, {
        scale: 1,
        backgroundColor: "#006b35",
        duration: 0.25,
        ease: "power2.out",
        overwrite: "auto",
      });
    }
  };

  const handleCtaEnter = (event) => {
    if (!supportsHover() || prefersReducedMotion()) return;

    gsap.to(event.currentTarget, {
      y: -2,
      scale: 1.02,
      boxShadow: "0 12px 26px rgba(0, 107, 53, 0.22)",
      duration: 0.2,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const handleCtaLeave = (event) => {
    if (!supportsHover() || prefersReducedMotion()) return;

    gsap.to(event.currentTarget, {
      y: 0,
      scale: 1,
      boxShadow: "0 8px 20px rgba(0, 107, 53, 0.15)",
      duration: 0.2,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  return (
    <section
      ref={sectionRef}
      aria-labelledby="how-it-works-title"
      className="relative isolate w-full overflow-hidden bg-white"
    >
      {/* Soft background details */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-28 h-64 w-64 rounded-full bg-white/65 blur-3xl sm:h-80 sm:w-80"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-36 -left-24 h-72 w-72 rounded-full bg-[#e4f1e8]/80 blur-3xl sm:h-96 sm:w-96"
      />

      <div className="relative mx-auto w-full max-w-6xl px-8 py-12 sm:px-10 sm:py-14 md:px-8 md:py-16 lg:px-1 lg:py-[72px]">
        {/* Section heading */}
        <div className="mb-7 max-w-2xl sm:mb-9 lg:mb-10">
          <p className="how-eyebrow mb-2 text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#006b35] sm:mb-3 sm:text-xs sm:tracking-[0.2em]">
            Simple from start to finish
          </p>

          <h2
            id="how-it-works-title"
            className="how-heading text-[clamp(2rem,5vw,2.5rem)] font-bold leading-[1.08] tracking-[-0.035em] text-[#07130d]"
          >
            How <span className="text-[#767676] font-medium">Pest</span><span className="text-[#006b35]">Find</span> works
          </h2>

          <p className="how-subtitle mt-3 max-w-xl text-sm leading-6 text-[#53645a] sm:mt-4 sm:text-base sm:leading-7">
            No searching, no comparing quotes, no chasing.
          </p>
        </div>

        {/* Step cards */}
        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:gap-5">
          {steps.map((step, index) => (
            <article
              key={step.number}
              onMouseEnter={handleCardEnter}
              onMouseLeave={handleCardLeave}
              className="how-step-card group relative flex h-full min-h-[166px] min-w-0 flex-col overflow-hidden rounded-2xl border border-[#d6e3da] bg-green-700 p-5 transition-colors duration-200 sm:min-h-[178px] sm:rounded-[20px] sm:p-6 lg:min-h-[176px] lg:p-6"
            >
              <div className="mb-4 flex items-center justify-between gap-3 sm:mb-4 ">
                <span className="how-step-number inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white bg-green-800">
                  {index + 1}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-white sm:text-[11px]">
                  Step {step.number}
                </span>
              </div>

              <h3 className="text-base font-bold leading-snug tracking-[-0.01em] text-white sm:text-lg">
                {step.title}
              </h3>

              <p className="mt-2 max-w-sm text-[13px] leading-[1.65] text-white sm:text-sm sm:leading-6">
                {step.description}
              </p>

              {/* Subtle card accent */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute bottom-0 left-5 right-5 h-px bg-gradient-to-r from-transparent via-[#dcece2] to-transparent sm:left-6 sm:right-6"
              />
            </article>
          ))}
        </div>

        {/* Action */}
        <div className="how-cta mt-7 flex flex-col items-start gap-3 sm:mt-8">
          <Link
            to="/#pest-request-form"
            onMouseEnter={handleCtaEnter}
            onMouseLeave={handleCtaLeave}
            className="group inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-xl bg-[#006b35] px-6 py-3.5 text-sm font-bold text-white shadow-[0_8px_20px_rgba(0,107,53,0.15)] transition-colors duration-200 hover:bg-[#00572b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#006b35] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f2f8f4] sm:w-auto sm:min-w-[209px]"
          >
            <span>Get My Pest Partner</span>
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

          <p className="text-xs leading-5 text-[#64746a] sm:text-[13px]">
            Free to submit. A matched partner contacts you within 24 hours.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
