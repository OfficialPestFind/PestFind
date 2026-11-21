import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Footer from "../Footer/Footer";
import BecomeAgencyForm from "../Form/BecomeAgencyForm";

gsap.registerPlugin(ScrollTrigger);

const BecomeAgency = () => {
  const pageRef = useRef(null);

  // =========================================================
  // GSAP ANIMATIONS
  // =========================================================

  useEffect(() => {
    const ctx = gsap.context(() => {
      // =================================
      // HERO ANIMATION
      // =================================

      const tl = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      tl.from(".agency-tag", {
        y: 25,
        opacity: 0,
        duration: 0.6,
      })

        .from(
          ".agency-title",
          {
            x: -60,
            opacity: 0,
            duration: 0.9,
          },
          "-=0.3"
        )

        .from(
          ".agency-description",
          {
            y: 30,
            opacity: 0,
            duration: 0.6,
          },
          "-=0.5"
        )

        .from(
          ".agency-button",
          {
            y: 20,
            opacity: 0,
            scale: 0.9,
            duration: 0.5,
          },
          "-=0.3"
        )

        .from(
          ".agency-benefit",
          {
            x: -20,
            opacity: 0,
            duration: 0.4,
            stagger: 0.12,
          },
          "-=0.2"
        )

        .from(
          ".agency-form",
          {
            x: 70,
            opacity: 0,
            scale: 0.95,
            duration: 0.9,
          },
          "-=0.7"
        )

        .from(
          ".agency-note",
          {
            y: 20,
            opacity: 0,
            duration: 0.5,
          },
          "-=0.4"
        );

      // =================================
      // FORM FLOATING ANIMATION
      // =================================

      gsap.to(".agency-form", {
        y: 0,
        duration: 2.5,
        ease: "sine.inOut",
        delay: 1,
      });

      // =================================
      // HERO CTA HOVER
      // =================================

      const button =
        pageRef.current?.querySelector(".agency-button");

      if (button) {
        const enter = () => {
          gsap.to(button, {
            y: -3,
            scale: 1.05,
            duration: 0.25,
            ease: "power2.out",
          });
        };

        const leave = () => {
          gsap.to(button, {
            y: 0,
            scale: 1,
            duration: 0.25,
            ease: "power2.out",
          });
        };

        button.addEventListener("mouseenter", enter);
        button.addEventListener("mouseleave", leave);

        button._enter = enter;
        button._leave = leave;
      }

      // =================================
      // TERMS BUTTON HOVER
      // =================================

      const termsButton =
        pageRef.current?.querySelector(
          ".agency-terms-button"
        );

      if (termsButton) {
        const enter = () => {
          gsap.to(termsButton, {
            y: -3,
            scale: 1.03,
            duration: 0.25,
            ease: "power2.out",
          });
        };

        const leave = () => {
          gsap.to(termsButton, {
            y: 0,
            scale: 1,
            duration: 0.25,
            ease: "power2.out",
          });
        };

        termsButton.addEventListener("mouseenter", enter);
        termsButton.addEventListener("mouseleave", leave);

        termsButton._enter = enter;
        termsButton._leave = leave;
      }

      // =================================
      // WHY PARTNER HEADING
      // =================================

      gsap.from(".agency-section-heading", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".agency-section-heading",
          start: "top 85%",
        },
      });

      // =================================
      // CARDS SCROLL ANIMATION
      // =================================

      gsap.from(".agency-card", {
        y: 50,
        opacity: 0,
        scale: 0.95,
        duration: 0.7,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".agency-cards",
          start: "top 80%",
        },
      });

      // =================================
      // TERMS SECTION ANIMATION
      // =================================

      gsap.from(".agency-terms-section", {
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".agency-terms-section",
          start: "top 88%",
        },
      });
    }, pageRef);

    return () => {
      const button =
        pageRef.current?.querySelector(".agency-button");

      if (button) {
        button.removeEventListener(
          "mouseenter",
          button._enter
        );

        button.removeEventListener(
          "mouseleave",
          button._leave
        );
      }

      const termsButton =
        pageRef.current?.querySelector(
          ".agency-terms-button"
        );

      if (termsButton) {
        termsButton.removeEventListener(
          "mouseenter",
          termsButton._enter
        );

        termsButton.removeEventListener(
          "mouseleave",
          termsButton._leave
        );
      }

      ctx.revert();
    };
  }, []);

  // =========================================================
  // CARD HOVER
  // =========================================================

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

  // =========================================================
  // JSX
  // =========================================================

  return (
    <div ref={pageRef} className="min-h-screen overflow-x-clip bg-white">

      {/* ==================================================
          HERO SECTION
      ================================================== */}

      <section className="bg-gradient-to-r from-gray-100 to-gray-200 px-4 py-8 sm:px-6 sm:py-10 lg:px-12 lg:py-7 xl:px-25">

        <div className="mx-auto flex w-full max-w-7xl flex-col items-stretch justify-between gap-8 sm:gap-10 lg:flex-row lg:items-center lg:gap-8">

          {/* ==================================================
              LEFT SIDE
          ================================================== */}

          <div className="flex w-full min-w-0 flex-col justify-start lg:min-h-[calc(100vh-64px)] lg:w-[52%] lg:-translate-y-3">

            {/* Small Heading */}
            <p className="agency-tag mb-3 text-[11px] font-bold tracking-[1.8px] text-green-700 sm:mb-4 sm:text-xs sm:tracking-[2px]">
              PARTNER WITH PESTFIND
            </p>

            {/* Main Heading */}
            <h1 className="agency-title max-w-3xl text-4xl font-bold leading-[1.05] text-[#0d2119] sm:text-5xl md:text-6xl lg:text-[64px]">
              Grow With{" "}
              <span className="text-green-700">
                PestFind.
              </span>
            </h1>

            {/* Description */}
            <p className="agency-description mt-4 w-full max-w-xl rounded-xl bg-[#f1f8f4] p-3 text-base leading-6 text-gray-600 sm:mt-6 sm:p-4 sm:text-lg sm:leading-7">
              Become a PestFind service partner and receive
              relevant customer requests for the areas you
              serve.
            </p>

            {/* CTA */}
            <Link
              to="/become-agency"
              className="agency-button mt-4 inline-flex w-full items-center justify-center rounded-xl bg-orange-500 px-5 py-3.5 text-center text-sm font-bold leading-5 text-white shadow-lg shadow-orange-500/20 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 sm:w-fit sm:px-6 sm:py-4 sm:text-base"
            >
              Become a PestFind Agency →
            </Link>

            {/* Benefits */}
            <div className="mt-6 grid grid-cols-1 gap-3 text-sm text-gray-600 sm:grid-cols-2 sm:gap-x-5 sm:gap-y-3 lg:grid-cols-1 lg:gap-4">

              <p className="agency-benefit">
                <span className="mr-2 text-green-700">
                  ✓
                </span>
                Relevant Leads
              </p>

              <p className="agency-benefit">
                <span className="mr-2 text-green-700">
                  ✓
                </span>
                Local Opportunities
              </p>

              <p className="agency-benefit">
                <span className="mr-2 text-green-700">
                  ✓
                </span>
                Organised Requests
              </p>

              <p className="agency-benefit">
                <span className="mr-2 text-green-700">
                  ✓
                </span>
                Simple Communication
              </p>

            </div>

          </div>

          {/* ==================================================
              RIGHT SIDE
          ================================================== */}

          <div className="mb-2 w-full min-w-0 px-0 sm:px-1 lg:mb-0 lg:w-[48%]">

            <div className="agency-form flex h-fit w-full min-w-0 items-center justify-center overflow-hidden rounded-2xl bg-white shadow-lg shadow-gray-700/10 sm:rounded-[30px]">

              <BecomeAgencyForm />

            </div>

          </div>

        </div>

      </section>


      {/* ==================================================
          WHY PARTNER SECTION
      ================================================== */}

      <section className="bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-20 lg:py-20">

        {/* Heading */}

        <div className="agency-section-heading mx-auto mb-8 max-w-2xl px-1 text-center sm:mb-10">

          <h2 className="text-3xl font-bold leading-tight text-[#0d2119] sm:text-4xl md:text-5xl">
            Why partner with PestFind?
          </h2>

        </div>


        {/* ==================================================
            CARDS
        ================================================== */}

        <div className="agency-cards mx-auto grid w-full max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">

          {/* CARD 1 */}

          <div
            className="agency-card min-w-0 rounded-2xl bg-green-700 p-5 shadow-lg shadow-gray-700/15 sm:rounded-[28px] sm:p-6"
            onMouseEnter={handleCardEnter}
            onMouseLeave={handleCardLeave}
          >

            <div className="mb-5 flex h-8 w-8 items-center justify-center rounded-lg bg-green-50 text-xs font-bold text-green-700">
              01
            </div>

            <h3 className="text-lg font-bold text-white">
              Relevant requests
            </h3>

            <p className="mt-3 text-sm leading-5 text-white">
              Receive opportunities aligned with the areas
              and services you provide.
            </p>

          </div>


          {/* CARD 2 */}

          <div
            className="agency-card min-w-0 rounded-2xl bg-green-700 p-5 shadow-lg shadow-gray-700/15 sm:rounded-[28px] sm:p-6"
            onMouseEnter={handleCardEnter}
            onMouseLeave={handleCardLeave}
          >

            <div className="mb-5 flex h-8 w-8 items-center justify-center rounded-lg bg-green-50 text-xs font-bold text-green-700">
              02
            </div>

            <h3 className="text-lg font-bold text-white">
              Local opportunities
            </h3>

            <p className="mt-3 text-sm leading-5 text-white">
              Build demand in the locations where your team
              operates.
            </p>

          </div>


          {/* CARD 3 */}

          <div
            className="agency-card min-w-0 rounded-2xl bg-green-700 p-5 shadow-lg shadow-gray-700/15 sm:rounded-[28px] sm:p-6"
            onMouseEnter={handleCardEnter}
            onMouseLeave={handleCardLeave}
          >

            <div className="mb-5 flex h-8 w-8 items-center justify-center rounded-lg bg-green-50 text-xs font-bold text-green-700">
              03
            </div>

            <h3 className="text-lg font-bold text-white">
              Organised communication
            </h3>

            <p className="mt-3 text-sm leading-5 text-white">
              Clear customer requirements and preferred
              timing.
            </p>

          </div>


          {/* CARD 4 */}

          <div
            className="agency-card min-w-0 rounded-2xl bg-green-700 p-5 shadow-lg shadow-gray-700/15 sm:rounded-[28px] sm:p-6"
            onMouseEnter={handleCardEnter}
            onMouseLeave={handleCardLeave}
          >

            <div className="mb-5 flex h-8 w-8 items-center justify-center rounded-lg bg-green-50 text-xs font-bold text-green-700">
              04
            </div>

            <h3 className="text-lg font-bold text-white">
              Simple process
            </h3>

            <p className="mt-3 text-sm leading-5 text-white">
              Respond to the request and coordinate the
              confirmed service.
            </p>

          </div>

        </div>


        {/* ==================================================
            TERMS & CONDITIONS
        ================================================== */}

        <div className="agency-terms-section mx-auto mt-12 flex w-full max-w-6xl flex-col items-center border-t border-gray-200 px-1 pt-8 text-center sm:mt-14 sm:pt-9">

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f1f8f4] text-lg text-green-700">
            ↓
          </div>

          <h3 className="mt-4 text-lg font-bold text-[#0d2119] sm:text-xl">
            Agency Terms & Conditions
          </h3>

          <p className="mt-2 max-w-lg text-sm leading-6 text-gray-500 sm:px-2">
            Review the terms and conditions governing
            PestFind agency and partner participation.
          </p>

          <a
            href="/PestFind_Agency_Terms_Conditions.pdf"
            download="PestFind_Agency_Terms_Conditions.pdf"
            className="agency-terms-button group mt-5 inline-flex w-full max-w-md items-center justify-center gap-3 rounded-xl border border-[#0d2119] bg-white px-4 py-3 text-center text-sm font-bold leading-5 text-[#0d2119] shadow-sm transition-all duration-300 hover:bg-[#0d2119] hover:text-white hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d2119] focus-visible:ring-offset-2 sm:w-auto sm:px-7 sm:py-3.5"
          >

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="17"
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

            <span>
              Download Agency Terms & Conditions
            </span>

          </a>

        </div>


        {/* ==================================================
            DESCRIPTION
        ================================================== */}

        <p className="mx-auto mt-8 max-w-2xl px-1 text-center text-base font-bold leading-6 text-gray-700 sm:mt-10 sm:text-lg">

          PestFind gives agencies a clear, brand-friendly way
          to receive customer requests that already include
          the details needed for a useful{" "}

          <span className="text-green-700">
            first call.
          </span>

        </p>

      </section>


      {/* ==================================================
          FOOTER
      ================================================== */}

      <Footer />

    </div>
  );
};

export default BecomeAgency;