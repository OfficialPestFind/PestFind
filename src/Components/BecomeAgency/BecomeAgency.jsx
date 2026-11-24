import React, { useEffect, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Footer from "../Footer/Footer";
import BecomeAgencyForm from "../Form/BecomeAgencyForm";

gsap.registerPlugin(ScrollTrigger);

const benefits = [
  {
    number: "01",
    title: "Relevant Requests",
    description:
      "Receive opportunities aligned with the areas and services your agency provides.",
    icon: "◎",
  },
  {
    number: "02",
    title: "Local Opportunities",
    description:
      "Build your business by connecting with customers in the locations you serve.",
    icon: "⌖",
  },
  {
    number: "03",
    title: "Organised Communication",
    description:
      "Access customer requirements and preferred service timings for better coordination.",
    icon: "↗",
  },
  {
    number: "04",
    title: "Simple Process",
    description:
      "Respond to customer requests and coordinate the confirmed service efficiently.",
    icon: "✓",
  },
];

const steps = [
  {
    number: "01",
    title: "Register Your Agency",
    description:
      "Complete the agency registration form with your business and contact details.",
  },
  {
    number: "02",
    title: "Share Your Services",
    description:
      "Tell us about your pest control services and the locations your agency covers.",
  },
  {
    number: "03",
    title: "Receive Requests",
    description:
      "Get relevant customer enquiries based on your service areas and offerings.",
  },
  {
    number: "04",
    title: "Connect With Customers",
    description:
      "Coordinate with customers, understand their requirements and arrange services.",
  },
];

const requirements = [
  "Pest control service providers",
  "Local pest control agencies",
  "Professional service teams",
  "Agencies serving defined locations",
];

const BecomeAgency = () => {
  const pageRef = useRef(null);

  // ==========================================
  // GSAP ANIMATIONS
  // ==========================================

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(
        "(prefers-reduced-motion: no-preference)",
        () => {
          // HERO ANIMATION

          const heroTimeline = gsap.timeline({
            defaults: {
              ease: "power3.out",
            },
          });

          heroTimeline
            .from(".agency-tag", {
              y: 20,
              opacity: 0,
              duration: 0.5,
            })
            .from(
              ".agency-title",
              {
                x: -45,
                opacity: 0,
                duration: 0.8,
              },
              "-=0.2"
            )
            .from(
              ".agency-description",
              {
                y: 25,
                opacity: 0,
                duration: 0.6,
              },
              "-=0.4"
            )
            .from(
              ".agency-button",
              {
                y: 15,
                opacity: 0,
                scale: 0.95,
                duration: 0.5,
              },
              "-=0.3"
            )
            .from(
              ".agency-benefit",
              {
                x: -15,
                opacity: 0,
                stagger: 0.1,
                duration: 0.4,
              },
              "-=0.2"
            )
            .from(
              ".agency-form",
              {
                x: 45,
                opacity: 0,
                scale: 0.97,
                duration: 0.8,
              },
              "-=0.6"
            );

          // SECTION HEADINGS

          gsap.utils.toArray(".agency-section-heading").forEach(
            (heading) => {
              gsap.from(heading, {
                y: 35,
                opacity: 0,
                duration: 0.7,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: heading,
                  start: "top 85%",
                  once: true,
                },
              });
            }
          );

          // BENEFIT CARDS

          gsap.from(".agency-card", {
            y: 45,
            opacity: 0,
            scale: 0.96,
            stagger: 0.12,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".agency-cards",
              start: "top 82%",
              once: true,
            },
          });

          // HOW IT WORKS

          gsap.from(".agency-step", {
            y: 35,
            opacity: 0,
            stagger: 0.15,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".agency-steps",
              start: "top 82%",
              once: true,
            },
          });

          // REQUIREMENTS

          gsap.from(".agency-requirement", {
            x: -20,
            opacity: 0,
            stagger: 0.1,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".agency-requirements",
              start: "top 85%",
              once: true,
            },
          });

          // TERMS SECTION

          gsap.from(".agency-terms-section", {
            y: 30,
            opacity: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".agency-terms-section",
              start: "top 88%",
              once: true,
            },
          });

          // FINAL CTA

          gsap.from(".agency-final-cta", {
            y: 35,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".agency-final-cta",
              start: "top 85%",
              once: true,
            },
          });
        }
      );
    }, pageRef);

    return () => {
      ctx.revert();
    };
  }, []);

  // ==========================================
  // CARD HOVER ANIMATIONS
  // ==========================================

  const handleCardEnter = (e) => {
    gsap.to(e.currentTarget, {
      y: -7,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleCardLeave = (e) => {
    gsap.to(e.currentTarget, {
      y: 0,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  // ==========================================
  // JSX
  // ==========================================

  return (
    <main
      ref={pageRef}
      className="min-h-screen overflow-x-clip bg-white"
    >
      {/* ==========================================
          01. HERO SECTION
      ========================================== */}

      <section className="relative overflow-hidden bg-gradient-to-br from-[#f4f8f5] via-[#eef4ef] to-[#e7eee9] px-7 py-12 sm:px-6 sm:py-16 lg:px-12 lg:py-20 xl:px-20">

        {/* Background Decoration */}

        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-green-700/5 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-24 left-0 h-64 w-64 rounded-full bg-orange-400/5 blur-3xl" />

        <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">

          {/* LEFT CONTENT */}

          <div className="flex min-w-0 flex-col items-start lg:-translate-y-50">

            {/* Tag */}

            <div className="agency-tag mb-5 inline-flex items-center gap-2 rounded-full border border-green-700/15 bg-white/80 px-4 py-2 ">

              <span className="h-2 w-2 rounded-full bg-green-600" />

              <span className="text-[10px] font-bold tracking-[2px] text-green-800 sm:text-xs">
                PARTNER WITH PESTFIND
              </span>

            </div>

            {/* Heading */}

            <h1 className="agency-title max-w-2xl text-4xl font-bold leading-[1.08] tracking-tight text-[#0d2119] sm:text-5xl md:text-6xl lg:text-[58px] xl:text-[58px]">

              Grow Your Business With{" "}

              <span className="text-green-700">
                PestFind.
              </span>

            </h1>

            {/* Description */}

            <p className="agency-description mt-6 max-w-xl text-base leading-7 text-gray-600 sm:text-lg sm:leading-8">

              Become a PestFind service partner and receive
              relevant customer requests for the areas you
              serve. Grow your reach and connect with more
              potential customers.

            </p>

            {/* Benefits */}

            <div className="mt-9 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:max-w-xl">

              {[
                "Relevant Customer Leads",
                "Local Business Opportunities",
                "Organised Requests",
                "Simple Communication",
              ].map((benefit, index) => (
                <div
                  key={index}
                  className="agency-benefit flex items-center gap-3"
                >

                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-700/10 text-xs font-bold text-green-700">
                    ✓
                  </span>

                  <span className="text-sm font-medium text-gray-700">
                    {benefit}
                  </span>

                </div>
              ))}

            </div>

          </div>

          {/* RIGHT FORM */}

          <div
            id="agency-registration"
            className="w-full min-w-0 scroll-mt-8 lg:-translate-y-6"
          >

            <div className="agency-form relative mx-auto w-full max-w-xl overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_20px_70px_rgba(0,0,0,0.09)] sm:rounded-[28px]">

              {/* Form Top Accent */}

              <div className="h-1.5 w-full bg-gradient-to-r from-green-700 via-green-500 to-orange-400" />

              <div className="w-full min-w-0 p-3 sm:p-5 lg:p-6">

                <BecomeAgencyForm />

              </div>

            </div>

            {/* Form Note */}

            <p className="agency-note mt-4 text-center text-xs leading-6 text-gray-500 sm:text-sm">

              Submit your details to express your interest
              in becoming a PestFind service partner.

            </p>

          </div>

        </div>

      </section>


      {/* ==========================================
          02. WHY PARTNER WITH PESTFIND
      ========================================== */}

      <section className="bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-16 lg:py-24">

        <div className="mx-auto max-w-7xl">

          {/* Section Heading */}

          <div className="agency-section-heading mx-auto mb-12 max-w-2xl text-center sm:mb-14">

            <span className="text-xs font-bold tracking-[2px] text-green-700">
              WHY CHOOSE PESTFIND
            </span>

            <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-[#0d2119] sm:text-4xl md:text-5xl">

              Why Partner With{" "}

              <span className="text-green-700">
                PestFind?
              </span>

            </h2>

            <p className="mt-5 text-sm leading-7 text-gray-500 sm:text-base">

              A straightforward way for pest control agencies
              to connect with customer enquiries and explore
              local business opportunities.

            </p>

          </div>

          {/* Benefit Cards */}

          <div className="agency-cards grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

            {benefits.map((benefit) => (
              <div
                key={benefit.number}
                onMouseEnter={handleCardEnter}
                onMouseLeave={handleCardLeave}
                className="agency-card group rounded-2xl border border-gray-100 bg-white p-6 shadow-[0_5px_25px_rgba(0,0,0,0.04)] transition-colors duration-300 hover:border-green-700/20 hover:shadow-[0_15px_35px_rgba(0,0,0,0.08)] sm:rounded-3xl sm:p-7"
              >

                {/* Card Number */}

                <div className="flex items-center justify-between">

                  <span className="text-xs font-bold tracking-widest text-gray-400">
                    {benefit.number}
                  </span>

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-2xl text-green-700 transition-colors duration-300 group-hover:bg-green-700 group-hover:text-white">
                    {benefit.icon}
                  </div>

                </div>

                {/* Card Content */}

                <h3 className="mt-7 text-lg font-bold text-[#0d2119]">
                  {benefit.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-gray-500">
                  {benefit.description}
                </p>

                {/* Bottom Accent */}

                <div className="mt-7 h-1 w-10 rounded-full bg-green-700/20 transition-all duration-300 group-hover:w-16 group-hover:bg-green-700" />

              </div>
            ))}

          </div>

        </div>

      </section>


      {/* ==========================================
          03. HOW IT WORKS
      ========================================== */}

      <section className="agency-sections bg-gradient-to-br from-[#f4f8f5] via-[#eef4ef] to-[#e7eee9] px-8 py-16 sm:px-6 sm:py-20 lg:px-16 lg:py-24">

        <div className="mx-auto max-w-7xl">

          {/* Heading */}

          <div className="agency-section-heading mx-auto mb-12 max-w-2xl text-center sm:mb-16">

            <span className="text-xs font-bold tracking-[2px] text-green-700">
              SIMPLE PARTNERSHIP PROCESS
            </span>

            <h2 className="mt-4 text-3xl font-bold leading-tight text-[#0d2119] sm:text-4xl md:text-5xl">

              How It <span className="text-green-700">Works</span>

            </h2>

            <p className="mt-4 text-sm leading-7 text-gray-500 sm:text-base">

              Getting started with PestFind is simple.
              Follow these steps to begin your agency partnership.

            </p>

          </div>

          {/* Steps */}

          <div className="agency-steps grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

            {steps.map((step, index) => (
              <div
                key={step.number}
                className="agency-step relative rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-7"
              >

                {/* Step Number */}

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-700 text-sm font-bold text-white shadow-lg shadow-green-700/15">
                  {step.number}
                </div>

                {/* Connector */}

                {index !== steps.length - 1 && (
                  <div className="absolute right-0 top-12 hidden h-px w-5 translate-x-full bg-green-700/20 lg:block" />
                )}

                <h3 className="mt-7 text-lg font-bold text-[#0d2119]">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-gray-500">
                  {step.description}
                </p>

              </div>
            ))}

          </div>

          {/* CTA */}

          <div className="mt-10 text-center">

            <a
              href="#agency-registration"
              className="inline-flex items-center gap-2 text-sm font-bold text-green-700 transition-colors hover:text-green-900"
            >

              Start Your Partnership

              <span className="text-lg">
                →
              </span>

            </a>

          </div>

        </div>

      </section>
      {/* ==========================================
          05. TERMS & CONDITIONS
      ========================================== */}

      <section className="agency-terms-section border-t border-gray-100 bg-white px-4 py-14 sm:px-6 sm:py-16 lg:px-16">

        <div className="mx-auto flex max-w-5xl flex-col items-center text-center">

          {/* Icon */}

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-700/10 text-green-700">

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <path d="M14 2v6h6" />
              <path d="M8 13h8" />
              <path d="M8 17h8" />
              <path d="M8 9h2" />
            </svg>

          </div>

          <span className="mt-5 text-xs font-bold tracking-[2px] text-green-700">
            IMPORTANT INFORMATION
          </span>

          <h2 className="mt-3 text-2xl font-extrabold text-[#0d2119] sm:text-3xl">
            Agency Terms & Conditions
          </h2>

          <p className="mt-4 max-w-xl text-sm leading-7 text-gray-500 sm:text-base">

            Before joining the PestFind partner network,
            review the terms and conditions governing agency
            participation and partnership responsibilities.

          </p>

          {/* Download Button */}

          <a
            href="/PestFind_Agency_Terms_Conditions.pdf"
            download="PestFind_Agency_Terms_Conditions.pdf"
            className="agency-terms-button group mt-7 inline-flex w-full items-center justify-center gap-3 rounded-xl border border-[#0d2119] bg-white px-6 py-4 text-sm font-bold text-[#0d2119] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-[#0d2119] hover:text-white hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2 sm:w-fit sm:px-8"
          >

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-y-1"
            >
              <path d="M12 3v12" />
              <path d="m7 10 5 5 5-5" />
              <path d="M5 21h14" />
            </svg>

            Download Agency Terms & Conditions

          </a>

        </div>

      </section>


      {/* ==========================================
          06. FINAL CTA
      ========================================== */}

      <section className="agency-final-cta bg-gradient-to-br from-[#f4f8f5] via-[#eef4ef] to-[#e7eee9] px-4 py-16 sm:px-6 sm:py-20 lg:px-16 lg:py-24">

        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-green-800 px-6 py-12 text-center shadow-xl shadow-green-900/10 sm:px-12 sm:py-16">

          {/* Background Decoration */}

          <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full border-[40px] border-white/5" />

          <div className="pointer-events-none absolute -bottom-28 -right-16 h-72 w-72 rounded-full border-[45px] border-white/5" />

          <div className="relative mx-auto max-w-3xl">

            <span className="text-xs font-bold tracking-[2px] text-green-100">
              YOUR BUSINESS. MORE OPPORTUNITIES.
            </span>

            <h2 className="mt-5 text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">

              Ready to Grow With PestFind?

            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-green-50 sm:text-base">

              Take the next step towards becoming a PestFind
              service partner. Register your agency and tell
              us about the services you provide.

            </p>

            <a
              href="#agency-registration"
              className="mt-8 inline-flex w-full items-center justify-center gap-3 rounded-xl bg-orange-600 px-7 py-4 text-sm font-bold text-white shadow-lg shadow-black/10 transition-all duration-300 hover:-translate-y-1 hover:bg-orange-700 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-green-700 sm:w-fit sm:text-base"
            >

              Become a PestFind Agency

              <span className="text-lg">
                →
              </span>

            </a>

          </div>

        </div>

      </section>


      {/* ==========================================
          07. FOOTER
      ========================================== */}

      <Footer />

    </main>
  );
};

export default BecomeAgency;