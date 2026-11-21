
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const pests = [
  {
    title: "Cockroach",
    treatment: "Cockroach Control",
    icon: "🪳",
    description: "Get help controlling cockroach infestations.",
  },
  {
    title: "Termite",
    treatment: "Termite Control",
    icon: "🏠",
    description: "Protect your property from termite damage.",
  },
  {
    title: "Bed Bug",
    treatment: "Bed Bug Control",
    icon: "🛏️",
    description: "Find suitable treatment for bed bug problems.",
  },
  {
    title: "Rodent",
    treatment: "Rodent Control",
    icon: "🐀",
    description: "Address rats, mice and rodent activity.",
  },
  {
    title: "Mosquito",
    treatment: "Mosquito Control",
    icon: "🦟",
    description: "Get help managing mosquitoes around your space.",
  },
  {
    title: "Ant",
    treatment: "Ant Control",
    icon: "🐜",
    description: "Find help with unwanted ant infestations.",
  },
  {
    title: "General Pest Control",
    treatment: "General Pest Control",
    icon: "🛡️",
    description: "Request help with common household pests.",
  },
  {
    title: "Not Sure",
    treatment: "Not Sure",
    icon: "❓",
    description: "Not sure what the pest is? Start here.",
  },
];

const PestProblems = ({ onPestSelect }) => {
  const sectionRef = useRef(null);

  // Scroll animations.
  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const heading = section.querySelector(".pest-heading");
      const description = section.querySelector(".pest-description");
      const grid = section.querySelector(".pest-grid");
      const cards = gsap.utils.toArray(".pest-card", section);

      gsap.from(heading, {
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: heading,
          start: "top 88%",
          once: true,
        },
      });

      gsap.from(description, {
        y: 20,
        opacity: 0,
        duration: 0.6,
        delay: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: description,
          start: "top 88%",
          once: true,
        },
      });

      gsap.from(cards, {
        y: 30,
        opacity: 0,
        scale: 0.97,
        duration: 0.6,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: grid,
          start: "top 86%",
          once: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  // Select a pest and scroll to the request form.
  const selectPest = (treatment) => {
    onPestSelect?.(treatment);

    const form = document.getElementById("pest-request-form");

    form?.scrollIntoView({
      behavior: window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches
        ? "auto"
        : "smooth",
      block: "start",
    });
  };

  // Hover animation for mouse and trackpad devices.
  const handleMouseEnter = (e) => {
    const canHover = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!canHover || reducedMotion) return;

    const card = e.currentTarget;
    const icon = card.querySelector(".pest-icon");

    gsap.to(card, {
      y: -5,
      scale: 1.015,
      duration: 0.25,
      ease: "power2.out",
      boxShadow: "0 16px 32px rgba(0, 0, 0, 0.10)",
      overwrite: "auto",
    });

    if (icon) {
      gsap.to(icon, {
        scale: 1.1,
        rotate: 5,
        duration: 0.25,
        ease: "power2.out",
        overwrite: "auto",
      });
    }
  };

  const handleMouseLeave = (e) => {
    const card = e.currentTarget;
    const icon = card.querySelector(".pest-icon");

    gsap.to(card, {
      y: 0,
      scale: 1,
      duration: 0.25,
      ease: "power2.out",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
      overwrite: "auto",
    });

    if (icon) {
      gsap.to(icon, {
        scale: 1,
        rotate: 0,
        duration: 0.25,
        ease: "power2.out",
        overwrite: "auto",
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="overflow-hidden bg-gradient-to-b from-gray-50 to-gray-100 px-8 py-12 sm:px-6 sm:py-16 lg:px-25 lg:py-20"
    >
      <div className="mx-auto w-full max-w-7xl">
        {/* Section heading */}
        <div className="mb-8 sm:mb-10 lg:mb-12">
          <p className="pest-heading mb-3 text-[10px] font-extrabold uppercase tracking-[1.5px] text-green-700 sm:mb-4 sm:text-xs sm:tracking-[2px]">
            Start with the problem
          </p>

          <h2 className="max-w-3xl text-3xl font-bold leading-tight tracking-tight text-gray-950 sm:text-4xl lg:text-5xl">
            What are you dealing with?
          </h2>

          <p className="pest-description mt-3 max-w-2xl text-sm leading-6 text-gray-600 sm:mt-4 sm:text-base">
            Select the pest causing trouble. We'll help you take
            the next step toward finding a suitable service partner.
          </p>
        </div>

        {/* Responsive pest cards */}
        <div className="pest-grid grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3= xl:grid-cols-4">
          {pests.map((pest) => (
            <button
              key={pest.treatment}
              type="button"
              onClick={() => selectPest(pest.treatment)}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              aria-label={`Select ${pest.title} pest treatment`}
              className="pest-card group flex h-full min-w-0 flex-col items-start rounded-2xl border border-gray-200/80 bg-white p-5 text-left shadow-[0_2px_8px_rgba(0,0,0,0.04)] outline-none transition-colors duration-200 hover:border-green-600/40 focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2 sm:rounded-3xl sm:p-6"
            >
              {/* Icon and indicator */}
              <div className="flex w-full items-center justify-between">
                <div className="pest-icon flex h-12 w-12 shrink-0 origin-center items-center justify-center rounded-2xl bg-green-50 text-2xl sm:h-14 sm:w-14 sm:text-3xl">
                  <span aria-hidden="true">{pest.icon}</span>
                </div>

                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 text-gray-400 transition-colors duration-200 group-hover:border-green-700 group-hover:bg-green-700 group-hover:text-white">
                  <i
                    className="ri-arrow-right-up-line text-lg"
                    aria-hidden="true"
                  />
                </span>
              </div>

              {/* Card text */}
              <h3 className="mt-5 text-base font-bold leading-snug text-gray-900 transition-colors duration-200 group-hover:text-green-800 sm:mt-6 sm:text-lg">
                {pest.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                {pest.description}
              </p>

              {/* Action hint */}
              <span className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-green-700 sm:text-sm">
                Select service
                <i
                  className="ri-arrow-right-line transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </span>
            </button>
          ))}
        </div>

        {/* Supporting note */}
        <p className="mt-6 text-center text-xs leading-5 text-gray-500 sm:mt-8 sm:text-sm">
          Not sure which option to choose? Select “Not Sure” to
          continue with your request.
        </p>
      </div>
    </section>
  );
};

export default PestProblems;
