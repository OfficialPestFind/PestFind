import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HowItWorks from "../HomePage/HowItWorks";
import Footer from "../Footer/Footer";
import PestReportSection from "./PestReportSection";
import CommercialPageChecklist from "./CommercialPageChecklist";
import CommercialFaq from "./CommercialFaq";

gsap.registerPlugin(ScrollTrigger);

const Commercial = () => {
  const pageRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ================================
      // HERO ANIMATION
      // ================================

      const tl = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      tl.from(".commercial-tag", {
        y: 25,
        opacity: 0,
        duration: 0.6,
      })
        .from(
          ".commercial-title",
          {
            x: -60,
            opacity: 0,
            duration: 0.9,
          },
          "-=0.3"
        )
        .from(
          ".commercial-description",
          {
            y: 30,
            opacity: 0,
            duration: 0.6,
          },
          "-=0.5"
        )
        .from(
          ".commercial-button",
          {
            y: 20,
            opacity: 0,
            scale: 0.9,
            duration: 0.5,
          },
          "-=0.3"
        )
        .from(
          ".commercial-benefit",
          {
            x: -20,
            opacity: 0,
            duration: 0.4,
            stagger: 0.1,
          },
          "-=0.2"
        )
        .from(
          ".commercial-image-box",
          {
            x: 70,
            opacity: 0,
            scale: 0.95,
            duration: 0.9,
          },
          "-=0.7"
        );

      // ================================
      // FLOATING IMAGE
      // ================================

      gsap.to(".commercial-image-box", {
        y: -10,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1,
      });

      // ================================
      // IMAGE HOVER
      // ================================

      const imageBox = pageRef.current?.querySelector(
        ".commercial-image-box"
      );

      const image = pageRef.current?.querySelector(
        ".commercial-image"
      );

      if (imageBox && image) {
        const imageEnter = () => {
          gsap.to(image, {
            scale: 1.06,
            duration: 0.5,
            ease: "power2.out",
          });
        };

        const imageLeave = () => {
          gsap.to(image, {
            scale: 1,
            duration: 0.5,
            ease: "power2.out",
          });
        };

        imageBox.addEventListener("mouseenter", imageEnter);
        imageBox.addEventListener("mouseleave", imageLeave);

        imageBox._imageEnter = imageEnter;
        imageBox._imageLeave = imageLeave;
      }

      // ================================
      // SECOND SECTION HEADING
      // ================================

      gsap.from(".commercial-section-heading", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".commercial-section-heading",
          start: "top 85%",
        },
      });

      // ================================
      // CARDS SCROLL ANIMATION
      // ================================

      gsap.from(".commercial-card", {
        y: 50,
        opacity: 0,
        scale: 0.95,
        duration: 0.7,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".commercial-cards",
          start: "top 80%",
        },
      });

      // Cleanup native image listeners
      return () => {
        if (imageBox) {
          imageBox.removeEventListener(
            "mouseenter",
            imageBox._imageEnter
          );

          imageBox.removeEventListener(
            "mouseleave",
            imageBox._imageLeave
          );
        }
      };
    }, pageRef);

    return () => ctx.revert();
  }, []);

  // ================================
  // CARD HOVER
  // ================================

  const handleCardEnter = (e) => {
    gsap.to(e.currentTarget, {
      y: -8,
      scale: 1.02,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleCardLeave = (e) => {
    gsap.to(e.currentTarget, {
      y: 0,
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  // ================================
  // BUTTON HOVER
  // ================================

  const handleButtonEnter = (e) => {
    gsap.to(e.currentTarget, {
      y: -3,
      scale: 1.05,
      duration: 0.25,
      ease: "power2.out",
    });
  };

  const handleButtonLeave = (e) => {
    gsap.to(e.currentTarget, {
      y: 0,
      scale: 1,
      duration: 0.25,
      ease: "power2.out",
    });
  };

  const benefits = [
  "One 1-minute form instead of a day of phone calls",
  "A verified partner matched to your place and area",
  "Free checklists you can use the same day",
];

  return (
    <div
      ref={pageRef}
      className="min-w-0 overflow-x-clip bg-white"
    >
      {/* =========================
          HERO SECTION
      ========================= */}

      <section
        className="
          min-h-0
          bg-gradient-to-r from-gray-100 to-gray-200
          px-8 py-8
          sm:min-h-[600px] sm:px-6 sm:py-10
          lg:px-30
        "
      >
        <div
          className="
            flex flex-col items-center justify-between
            gap-8
            sm:gap-10
            lg:flex-row
          "
        >
          {/* LEFT SIDE */}

          <div className="w-full min-w-0 lg:w-[58%]">
            {/* Small Heading */}

            <div className="commercial-tag mb-4 flex items-center gap-3 sm:mb-5">
              <span className="h-[2px] w-7 shrink-0 bg-green-700" />

              <p className="text-xs font-bold tracking-[2px] text-green-700">
                COMMERCIAL
              </p>
            </div>

            {/* Main Heading */}

            <h1
              className="
                commercial-title max-w-3xl
                text-3xl font-bold leading-[1.1]
                text-[#0d2119]
                sm:text-5xl
                md:text-6xl
                lg:text-[58px]
              "
            >
              One form. One verified pest partner for
              <br className="hidden sm:block" />{" "}
              <span className="text-green-700">
                every site.
              </span>
            </h1>

            {/* Description */}

            <p
              className="
                commercial-description mt-5 max-w-2xl
                 p-3
                text-base leading-6 text-gray-600
                sm:mt-6 sm:p-0
                sm:text-md sm:leading-7
              "
            >
              Managing pest control across vendors, sites and invoices is a job nobody wants. Tell PestFind what you run, and we match you with a verified agency that can cover it and report on it.
            </p>

            {/* Benefits */}

            <ul className="mt-6 flex max-w-[620px] flex-col gap-2 sm:mt-7 sm:gap-2">
              {benefits.map((benefit) => (
                <li
                  key={benefit}
                  className="hero-benefit flex min-w-0 items-start gap-3 text-[12px] font-semibold leading-6 text-slate-950 sm:text-[15px] md:text-base"
                >
                  <span className="mt-[3px] inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#006b35] text-white">
                    <i className="ri-check-line text-[14px]" aria-hidden="true" />
                  </span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>

            <div
                          className="
                            hero-buttons mt-7 flex w-full
                            flex-col gap-3
                            sm:mt-5 sm:w-auto sm:flex-row sm:flex-wrap
                          "
                        >
                          <Link
                            to="/"
                            className="
                              hero-primary
                              min-h-12 items-center justify-center
                              rounded-full bg-green-700
                              px-5 py-3 text-center text-base
                              font-bold text-white
                              shadow-lg shadow-green-900/20
                              transition duration-200
                              hover:-translate-y-1 hover:scale-[1.02]
                              hover:bg-green-800
                              focus-visible:outline-2
                              focus-visible:outline-offset-4
                              focus-visible:outline-green-700
                              sm:w-auto sm:text-lg hidden sm:inline-flex
                            "
                          >
                            Get Matched for My Business →
                          </Link>
            
                          <Link
              to="#free-commercial-checklist"
              onClick={(e) => {
                e.preventDefault();
            
                document
                  .getElementById("free-commercial-checklist")
                  ?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
              }}
              className="
                hero-secondary inline-flex
                min-h-12 items-center justify-center
                rounded-full border-2 border-green-300
                bg-white px-5 py-3 text-center
                text-base font-bold text-green-700
                transition duration-200
                hover:-translate-y-1 hover:bg-green-50
                focus-visible:outline-2
                focus-visible:outline-offset-4
                focus-visible:outline-green-700
                sm:w-auto sm:text-lg
              "
            >
              Get the free Commercial checklist
            </Link>
                        </div>
          </div>

          {/* RIGHT IMAGE */}

          <div className="w-full min-w-0 lg:w-[38%] lg:-translate-y-">
            <div
              className="
                commercial-image-box relative
                h-[260px] w-full overflow-hidden
                rounded-[20px] border-[3px] border-black
                sm:h-[470px] sm:rounded-[30px]
              "
            >
              <img
                src="/images/Office.jpg"
                alt="Office"
                className="commercial-image h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-black/10" />
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          BUILD FOR EVERY SPACE
      ========================= */}

      <section
        className="
          bg-white px-8 py-12
          sm:px-6 sm:py-16
          lg:px-20
        "
      >
        {/* Heading */}

        <div
          className="
            commercial-section-heading mb-8
            px-0
            sm:mb-10 sm:px-10
          "
        >
          <p className="mb-2 text-xs font-bold tracking-[2px] text-green-700">
            BUILD FOR EVERY SPACE
          </p>

          <h2
            className="
              max-w-xl text-3xl font-bold leading-tight
              text-[#0d2119]
              sm:text-4xl md:text-5xl
            "
          >
            Whatever Your Space,
            <br className="hidden sm:block" /> We’re Ready
          </h2>
        </div>

        {/* CARDS */}

        <div
          className="
            commercial-cards flex flex-wrap gap-4
            px-0
            sm:px-10
          "
        >
          {/* Card 1 */}

          <div
            className="
              commercial-card w-full min-w-0 cursor-pointer
              rounded-[28px] bg-green-700 p-4
              shadow-md shadow-gray-700
              md:w-[calc(50%-8px)]
            "
            onMouseEnter={handleCardEnter}
            onMouseLeave={handleCardLeave}
          >
            <div className="flex items-center justify-between gap-5">
              <div className="min-w-0">
                <h3 className="text-base font-bold text-white">
                  Office
                </h3>

                <p className="mt-2 text-sm leading-6 text-white">
                  Keep workspaces clean and comfortable.
                </p>
              </div>
            </div>
          </div>

          {/* Card 2 */}

          <div
            className="
              commercial-card w-full min-w-0 cursor-pointer
              rounded-[28px] bg-green-700 p-4
              shadow-md shadow-gray-700
              md:w-[calc(50%-8px)]
            "
            onMouseEnter={handleCardEnter}
            onMouseLeave={handleCardLeave}
          >
            <div className="flex items-center justify-between gap-5">
              <div className="min-w-0">
                <h3 className="text-base font-bold text-white">
                  Retail
                </h3>

                <p className="mt-2 text-sm leading-6 text-white">
                  Protect customer-facing spaces.
                </p>
              </div>
            </div>
          </div>

          {/* Card 3 */}

          <div
            className="
              commercial-card w-full min-w-0 cursor-pointer
              rounded-[28px] bg-green-700 p-4
              shadow-md shadow-gray-700
              md:w-[calc(50%-8px)]
            "
            onMouseEnter={handleCardEnter}
            onMouseLeave={handleCardLeave}
          >
            <div className="flex items-center justify-between gap-5">
              <div className="min-w-0">
                <h3 className="text-base font-bold text-white">
                  Warehouse
                </h3>

                <p className="mt-2 text-sm leading-6 text-white">
                  Coordinate pest care around operations.
                </p>
              </div>
            </div>
          </div>

          {/* Card 4 */}

          <div
            className="
              commercial-card w-full min-w-0 cursor-pointer
              rounded-[28px] bg-green-700 p-4
              shadow-md shadow-gray-700
              md:w-[calc(50%-8px)]
            "
            onMouseEnter={handleCardEnter}
            onMouseLeave={handleCardLeave}
          >
            <div className="flex items-center justify-between gap-5">
              <div className="min-w-0">
                <h3 className="text-base font-bold text-white">
                  Other commercial
                </h3>

                <p className="mt-2 text-sm leading-6 text-white">
                  Tell us what your business needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= Commercial How It Works ================= */}
      
            <HowItWorks />

      {/* ================= Commercial Pest Report Section ================= */}

          <PestReportSection />

      {/* ================= Commercial Page Checklist ================= */}

      <CommercialPageChecklist />

      {/* ================= Commercial FAQ ================= */}

      <CommercialFaq />

      {/* =========================
          FOOTER
      ========================= */}

      <Footer />
    </div>
  );
};

export default Commercial;
