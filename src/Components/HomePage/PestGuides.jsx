import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "remixicon/fonts/remixicon.css";

gsap.registerPlugin(ScrollTrigger);

// Pexels images are loaded from the Pexels CDN. Photo links are included for credit/source context.
const guides = [
  {
    number: "01",
    category: "Home & family safety",
    title: "Pest Control Safety ",
    description:
      "Learn how to protect children, pets, and food during pest control treatment, with practical steps to take before and after a service visit.",
    image:
      "https://images.pexels.com/photos/7677739/pexels-photo-7677739.jpeg?auto=compress&cs=tinysrgb&w=1200",
    imageAlt: "Family relaxing at home with their dog, representing household and pet safety",
    photoPage:
      "https://www.pexels.com/photo/a-happy-family-sitting-on-gray-sofa-with-their-dog-7677739/",
    photoCredit: "PNW Production",
    readTime: "8 min read",
    href: "/blog/pest-control-safety",
    imagePosition: "center 42%",
  },
  {
    number: "02",
    category: "Cockroach control",
    title: "The Complete Guide to Cockroach Control",
    description:
      "Find out why cockroaches keep returning, how to spot an infestation, which control methods may help, and when to call a professional.",
    image:
      "https://images.pexels.com/photos/11022142/pexels-photo-11022142.jpeg?auto=compress&cs=tinysrgb&w=1200",
    imageAlt: "Detailed macro photograph of a cockroach",
    photoPage:
      "https://www.pexels.com/photo/cockroach-in-macro-photography-11022142/",
    photoCredit: "Erik Karits",
    readTime: "12 min read",
    href: "/blog/cockroach-control",
    imagePosition: "center 50%",
  },
  {
    number: "03",
    category: "Choosing a service",
    title: "Pest Control Near Me",
    description:
      "Learn how to compare quotes, check service credentials, ask the right questions, and choose a pest control provider with confidence.",
    image:
      "https://images.pexels.com/photos/19789841/pexels-photo-19789841.jpeg?auto=compress&cs=tinysrgb&w=1200",
    imageAlt: "Pest control specialist using professional fumigation equipment outside a home",
    photoPage:
      "https://www.pexels.com/photo/smoke-used-for-pest-control-19789841/",
    photoCredit: "Garda Pest Control Indonesia",
    readTime: "9 min read",
    href: "/blog/pest-control-near-me",
    imagePosition: "center 48%",
  },
];

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const canHover = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(hover: hover) and (pointer: fine)").matches;

const PestGuides = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || prefersReducedMotion()) return undefined;

    const ctx = gsap.context(() => {
      const heading = section.querySelector(".guide-heading");
      const buttons = gsap.utils.toArray(".guide-button", section);
      const cards = gsap.utils.toArray(".guide-card", section);
      const grid = section.querySelector(".guide-grid");

      if (heading) {
        gsap.from(heading, {
          y: 28,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: heading, start: "top 88%", once: true },
        });
      }

      buttons.forEach((button) => {
        gsap.from(button, {
          y: 14,
          opacity: 0,
          duration: 0.55,
          ease: "power3.out",
          scrollTrigger: { trigger: button, start: "top 92%", once: true },
        });
      });

      if (cards.length && grid) {
        gsap.from(cards, {
          y: 34,
          opacity: 0,
          duration: 0.7,
          stagger: 0.14,
          ease: "power3.out",
          clearProps: "transform",
          scrollTrigger: { trigger: grid, start: "top 86%", once: true },
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  const handleCardEnter = (event) => {
    if (!canHover() || prefersReducedMotion()) return;

    const card = event.currentTarget;
    const image = card.querySelector(".guide-image");

    gsap.to(card, {
      y: -6,
      duration: 0.28,
      ease: "power2.out",
      boxShadow: "0 22px 55px rgba(15, 55, 35, 0.14)",
      borderColor: "rgba(22, 163, 74, 0.35)",
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
    const image = card.querySelector(".guide-image");

    gsap.to(card, {
      y: 0,
      duration: 0.28,
      ease: "power2.out",
      boxShadow: "0 2px 8px rgba(15, 23, 42, 0.045)",
      borderColor: "rgba(226, 232, 240, 0.95)",
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
    if (!canHover() || prefersReducedMotion()) return;
    gsap.to(event.currentTarget, {
      y: -2,
      duration: 0.2,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const handleButtonLeave = (event) => {
    gsap.to(event.currentTarget, {
      y: 0,
      duration: 0.2,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  return (
    <section
      ref={sectionRef}
      aria-labelledby="pest-guides-heading"
      className="relative isolate overflow-hidden bg-[#f7faf7] px-4 py-12 sm:px-6 sm:py-16 lg:px-10 lg:py-20 xl:px-25"
    >
      {/* Soft background accents */}
      <div
        className="pointer-events-none absolute -right-24 -top-24 -z-10 h-72 w-72 rounded-full bg-emerald-100/60 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-28 -left-20 -z-10 h-80 w-80 rounded-full bg-green-100/50 blur-3xl"
        aria-hidden="true"
      />

      <div className="mx-auto w-full max-w-7xl">
        {/* Section heading */}
        <div className="mb-8 flex min-w-0 flex-col gap-5 sm:mb-10 md:flex-row md:items-end md:justify-between md:gap-8 lg:mb-12">
          <div className="guide-heading min-w-0 max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-green-100 bg-white px-3 py-1.5 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-green-600" aria-hidden="true" />
              <span className="text-[10px] font-extrabold uppercase tracking-[1.7px] text-green-800 sm:text-xs">
                PestFind Knowledge Hub
              </span>
            </div>

            <h2
              id="pest-guides-heading"
              className="max-w-3xl text-3xl font-bold leading-[1.12] tracking-tight text-slate-950 sm:text-4xl lg:text-5xl"
            >
              Better knowledge.
              <span className="block text-green-700 sm:inline"> Better pest care.</span>
            </h2>

            <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
              Clear, practical guides to help you understand pest problems, compare your options, and make more confident decisions for your home or business.
            </p>
          </div>

          <Link
            to="/blogs"
            onMouseEnter={handleButtonEnter}
            onMouseLeave={handleButtonLeave}
            className="guide-button inline-flex min-h-12 w-full shrink-0 items-center justify-center gap-2 self-start rounded-full bg-green-700 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-green-900/10 transition-colors hover:bg-green-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2 sm:w-fit md:self-auto"
          >
            Explore all articles
            <i className="ri-arrow-right-line text-lg" aria-hidden="true" />
          </Link>
        </div>

        {/* Professional image cards */}
        <div className="guide-grid grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-5">
          {guides.map((guide) => (
            <article
              key={guide.title}
              onMouseEnter={handleCardEnter}
              onMouseLeave={handleCardLeave}
              className="guide-card group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-[0_2px_8px_rgba(15,23,42,0.045)] will-change-transform sm:rounded-3xl"
            >
              {/* Image */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-gradient-to-br from-green-100 to-slate-200">
                <img
                  src={guide.image}
                  alt={guide.imageAlt}
                  loading="lazy"
                  decoding="async"
                  className="guide-image absolute inset-0 h-full w-full object-cover"
                  style={{ objectPosition: guide.imagePosition }}
                  onError={(event) => {
                    // Preserve the card's gradient background if a remote image is unavailable.
                    event.currentTarget.style.display = "none";
                  }}
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/65 via-slate-950/5 to-slate-950/15"
                  aria-hidden="true"
                />

                <span className="absolute left-4 top-4 inline-flex max-w-[calc(100%-2rem)] items-center rounded-full border border-white/25 bg-slate-950/45 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[1.2px] text-white shadow-sm backdrop-blur-md sm:left-5 sm:top-5 sm:text-[11px]">
                  {guide.category}
                </span>

                <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 text-xs font-medium text-white/95 sm:bottom-5 sm:left-5">
                  <i className="ri-book-open-line text-base" aria-hidden="true" />
                  {guide.readTime}
                </span>

                <a
                  href={guide.photoPage}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`View photo by ${guide.photoCredit} on Pexels`}
                  className="absolute bottom-4 right-4 rounded-full bg-white/90 px-2.5 py-1.5 text-[10px] font-semibold text-slate-700 opacity-90 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 sm:bottom-5 sm:right-5"
                >
                  Photo: Pexels
                </a>
              </div>

              {/* Card body */}
              <div className="flex flex-1 flex-col p-5 sm:p-6 lg:p-7">
                <div className="mb-3 flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[1.6px] text-green-700 sm:text-[11px]">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-green-50 text-xs font-bold tracking-normal text-green-800 ring-1 ring-inset ring-green-100">
                    {guide.number}
                  </span>
                  <span>PestFind Insights</span>
                </div>

                <h3 className="text-xl font-bold leading-snug tracking-tight text-slate-950 transition-colors group-hover:text-green-800 sm:text-[22px]">
                  {guide.title}
                </h3>

                <p className="mt-3 flex-1 text-sm leading-6 text-slate-600 sm:leading-7">
                  {guide.description}
                </p>

                <div className="mt-6 border-t border-slate-100 pt-4">
                  <Link
                    to={guide.href}
                    className="guide-button inline-flex min-h-10 items-center gap-2 rounded-lg text-sm font-bold text-green-800 outline-none transition-colors hover:text-green-950 focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-4"
                  >
                    Read the guide
                    <i
                      className="ri-arrow-right-up-line text-lg transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom call to action */}
        
      </div>
    </section>
  );
};

export default PestGuides;
