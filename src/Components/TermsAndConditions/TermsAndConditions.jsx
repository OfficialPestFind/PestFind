import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Footer from "../Footer/Footer";

gsap.registerPlugin(ScrollTrigger);

const termsSections = [
  {
    number: "01",
    title: "What We Do",
    paragraphs: [
      "Pest Find is a free online platform that helps customers easily discover and book pest-control services from independent pest-control agencies available through our platform.",
    ],
  },

  {
    number: "02",
    title: "How We Work",
    paragraphs: [
      "Customers can submit their pest-control requirements through Pest Find, and we facilitate the connection between the customer and the relevant pest-control agency. The selected agency is responsible for communicating with the customer and providing the requested service.",
    ],
  },

  {
    number: "03",
    title: "Role and Responsibility of PestFind",
    paragraphs: [
      "Pest Find acts solely as a platform that facilitates access and booking between customers and independent pest-control agencies. Pest Find does not directly provide, supervise, or physically perform pest-control services.",
      "Any issue relating to the quality, safety, conduct, pricing, treatment, damage, delay, or performance of a pest-control service is primarily between the customer and the respective agency. Pest Find will not be responsible for the agency's acts, omissions, service quality, or failure to perform the service.",
      "Customers may contact Pest Find regarding booking-related assistance, and we may assist in communicating with the concerned agency where reasonably possible.",
    ],
  },

  {
    number: "04",
    title: "Cancellation Policy",
    paragraphs: [
      "Customers may cancel a confirmed booking up to 4 hours before the scheduled service slot.",
      "Cancellations made less than 4 hours before the scheduled slot may be subject to the concerned agency's cancellation terms, if applicable.",
    ],
  },

  {
    number: "05",
    title: "Customer Support & Working Hours",
    paragraphs: [
      "Pest Find operates from 10:00 AM to 7:00 PM. Customers and agencies may expect responses and booking-related assistance during these working hours. Requests received outside working hours will generally be addressed during the next working period.",
    ],
  },

  {
    number: "06",
    title: "Pest Find as a Platform",
    paragraphs: [
      "Pest Find is a technology platform and does not physically perform pest-control services.",
      "The actual pest-control service is provided independently by the agency selected or connected through the platform. Pest Find does not employ or directly operate the technicians providing the service unless expressly stated otherwise.",
    ],
  },

  {
    number: "07",
    title: "Data Security & Privacy",
    paragraphs: [
      "Pest Find takes reasonable measures to protect the personal and business information shared by users and agencies through the platform. Information provided to Pest Find will be handled with appropriate care and reasonable security measures.",
    ],
  },

  {
    number: "08",
    title: "Use of Information",
    paragraphs: [
      "Pest Find will not sell or misuse user or agency information for unrelated purposes.",
      "Information collected through the platform will be used only for legitimate platform-related purposes, such as processing enquiries and bookings, facilitating communication between customers and agencies, providing customer support, improving the platform, and complying with applicable legal requirements.",
    ],
  },

  {
    number: "09",
    title: "Rescheduling Policy",
    paragraphs: [
      "Rescheduling is currently not available through Pest Find.",
      "If a customer needs to change the scheduled service time, they may contact Pest Find or the concerned agency. Any change will be subject to the agency's availability and confirmation.",
    ],
  },

  {
    number: "10",
    title: "Free Platform for Customers",
    paragraphs: [
      "Pest Find is currently free for customers to use.",
      "Customers do not pay Pest Find any platform or booking fee for using the platform, unless Pest Find clearly communicates otherwise in the future.",
    ],
  },

  {
    number: "11",
    title: "Payment Structure",
    paragraphs: [
      "Payments for pest-control services are made directly to the concerned pest-control agency.",
      "Pest Find does not collect or receive payment for the pest-control service on behalf of the agency, unless expressly stated otherwise.",
      "The agency is responsible for communicating its service charges, applicable taxes, payment terms, and any other service-related costs to the customer.",
    ],
  },

  {
    number: "12",
    title: "Agency Independence",
    paragraphs: [
      "Each pest-control agency available through Pest Find operates independently and is responsible for its own services, employees, technicians, pricing, equipment, materials, licences, permissions, and compliance with applicable laws.",
    ],
  },

  {
    number: "13",
    title: "Changes to These Terms",
    paragraphs: [
      "Pest Find reserves the right to update or modify these Terms & Conditions from time to time. Any updated terms will be made available through the Pest Find platform.",
    ],
  },

  {
    number: "14",
    title: "Contact & Support",
    paragraphs: [
      "For questions, booking assistance, or concerns regarding these Terms & Conditions, customers and agencies may contact Pest Find through the contact details provided on our platform.",
    ],
  },

  {
    number: "15",
    title: "Reviews & Ratings",
    paragraphs: [
      "PestFind may invite ratings/reviews after service and may moderate content that is fraudulent, abusive, discriminatory, defamatory, irrelevant, unlawful or otherwise violates platform rules.",
    ],
  },

  {
    number: "16",
    title: "Customer Information",
    paragraphs: [
      "Customer information may be shared with the concerned agency to process enquiries, coordinate bookings, deliver services, provide support and comply with applicable law. Further details belong in the Privacy Policy.",
    ],
  },
];

const TermsAndConditions = () => {
  const pageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ----------------------------------------
      // HERO
      // ----------------------------------------
      gsap.from(".terms-logo", {
        y: -15,
        scale: 0.96,
        duration: 0.7,
        ease: "power3.out",
      });

      gsap.from(".terms-heading-block", {
        y: 35,
        duration: 0.8,
        delay: 0.1,
        ease: "power3.out",
      });

      gsap.from(".terms-back-link", {
        x: 20,
        duration: 0.6,
        delay: 0.25,
        ease: "power3.out",
      });

      // ----------------------------------------
      // INTRO
      // ----------------------------------------
      gsap.from(".terms-intro", {
        y: 30,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".terms-intro",
          start: "top 88%",
          once: true,
        },
      });

      // ----------------------------------------
      // TERMS SECTIONS
      // No opacity animation.
      // Content remains visible even if GSAP
      // is interrupted.
      // ----------------------------------------
      gsap.utils.toArray(".terms-section").forEach((section, index) => {
        gsap.from(section, {
          y: 30,
          duration: 0.65,
          delay: index * 0.02,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 92%",
            once: true,
          },
        });
      });

      // ----------------------------------------
      // SUPPORT
      // ----------------------------------------
      gsap.from(".terms-support", {
        y: 30,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".terms-support",
          start: "top 90%",
          once: true,
        },
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={pageRef}
      className="min-h-screen bg-gray-50 text-gray-900"
    >
      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-5xl px-5 py-7 sm:px-8 lg:px-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

            {/* Logo + Title */}
            <div className="terms-heading-block flex items-center gap-4">
              <div className="terms-logo flex h-14 w-14 shrink-0 items-center justify-center">
                {/* 
                  Put your exact PestFind logo here.
                  Example location:
                  public/pestfind-logo.png
                */}
                <img
                  src="./PestFindOnlyLogo.svg"
                  alt="PestFind"
                  className="h-full w-full object-cover"
                />
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-[2px] text-green-700">
                  PestFind
                </p>

                <h1 className="mt-1 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                  Terms & Conditions
                </h1>
              </div>
            </div>

            {/* Back */}
            <Link
              to="/"
              className="terms-back-link inline-flex w-fit items-center gap-2 text-sm font-semibold text-green-700 transition-all duration-300 hover:gap-3 hover:text-green-800"
            >
              <span>←</span>
              Back to PestFind
            </Link>
          </div>
        </div>
      </header>

      {/* =====================================================
          MAIN
      ===================================================== */}

      <main className="mx-auto max-w-5xl px-5 py-10 sm:px-8 sm:py-14 lg:px-10 lg:py-16">

        {/* Intro */}
        <div className="terms-intro mb-10 border-b border-gray-300 pb-8">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[2px] text-green-700">
              Customer Terms & Conditions
            </p>

            <h2 className="mt-2 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Terms governing your use of PestFind
            </h2>

            <p className="mt-4 text-sm leading-7 text-gray-600 sm:text-base sm:leading-8">
              The following terms explain how PestFind operates, how customer
              requests are handled, and the responsibilities of PestFind,
              customers, and independent pest-control agencies.
            </p>
          </div>
        </div>

        {/* =====================================================
            TERMS
        ===================================================== */}

        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          {termsSections.map((section) => (
            <section
              key={section.number}
              className="terms-section border-b border-gray-200 px-5 py-8 last:border-b-0 sm:px-8 sm:py-10"
            >
              <div className="grid gap-5 sm:grid-cols-[70px_1fr] sm:gap-8">

                {/* Number */}
                <div>
                  <span className="inline-flex h-9 min-w-9 items-center justify-center rounded-md bg-green-50 px-2 text-xs font-bold tracking-wider text-green-700">
                    {section.number}
                  </span>
                </div>

                {/* Content */}
                <div className="min-w-0">

                  <h3 className="text-lg font-bold leading-7 text-gray-900 sm:text-xl">
                    {section.title}
                  </h3>

                  <div className="mt-4 space-y-4 text-sm leading-7 text-gray-600 sm:text-base sm:leading-8">
                    {section.paragraphs.map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>

                </div>
              </div>
            </section>
          ))}
        </div>

        {/* =====================================================
            SUPPORT
        ===================================================== */}

        <div className="terms-support mt-10 border-t border-gray-200 pt-8">
          <h3 className="text-lg font-bold text-gray-900">
            Need booking assistance?
          </h3>

          <p className="mt-2 max-w-3xl text-sm leading-7 text-gray-600 sm:text-base">
            For questions, booking assistance, or concerns regarding these
            Terms & Conditions, customers and agencies may contact Pest Find
            through the contact details provided on our platform.
          </p>

          <Link
            to="/#pest-request-form"
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-green-700 px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-green-800 hover:shadow-md"
          >
            Return to PestFind
            <span>→</span>
          </Link>
        </div>
      </main>

      {/* =====================================================
          FOOTER
      ===================================================== */}
    <Footer />
    </div>
  );
};

export default TermsAndConditions;