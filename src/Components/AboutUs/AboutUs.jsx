import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Footer from "../Footer/Footer";

gsap.registerPlugin(ScrollTrigger);

const AboutUs = () => {
  const pageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ================================
      // HERO ANIMATION
      // ================================

      const isMobile = window.matchMedia("(max-width: 639px)").matches;

      const tl = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      tl.from(".about-card", {
        x: isMobile ? -24 : -60,
        opacity: 0,
        scale: 0.95,
        duration: 0.8,
      })

        .from(
          ".about-content",
          {
            x: isMobile ? 24 : 60,
            opacity: 0,
            duration: 0.8,
          },
          "-=0.5"
        )

        .from(
          ".about-tag",
          {
            y: 20,
            opacity: 0,
            duration: 0.5,
          },
          "-=0.4"
        )

        .from(
          ".about-title",
          {
            y: 30,
            opacity: 0,
            duration: 0.7,
          },
          "-=0.3"
        )

        .from(
          ".about-text",
          {
            y: 20,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1,
          },
          "-=0.4"
        )

        .from(
          ".about-button",
          {
            y: 20,
            opacity: 0,
            scale: 0.95,
            duration: 0.5,
            stagger: 0.1,
          },
          "-=0.3"
        );

      // ================================
      // FLOATING P
      // ================================

      gsap.to(".about-p", {
        y: isMobile ? -6 : -12,
        rotation: 5,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // ================================
      // BUTTON HOVER
      // ================================

      const buttons = gsap.utils.toArray(".about-button");

      buttons.forEach((button) => {
        const mouseEnter = () => {
          gsap.to(button, {
            y: -3,
            scale: 1.05,
            duration: 0.25,
            ease: "power2.out",
          });
        };

        const mouseLeave = () => {
          gsap.to(button, {
            y: 0,
            scale: 1,
            duration: 0.25,
            ease: "power2.out",
          });
        };

        button.addEventListener("mouseenter", mouseEnter);
        button.addEventListener("mouseleave", mouseLeave);

        button._mouseEnter = mouseEnter;
        button._mouseLeave = mouseLeave;
      });

      // ================================
      // TRUST SECTION HEADING
      // ================================

      gsap.from(".trust-heading", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".trust-heading",
          start: "top 85%",
        },
      });

      // ================================
      // TRUST CARDS SCROLL ANIMATION
      // ================================

      gsap.from(".trust-card", {
        y: 50,
        opacity: 0,
        scale: 0.95,
        duration: 0.7,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".trust-cards",
          start: "top 80%",
        },
      });

    }, pageRef);

    return () => {
      const buttons = pageRef.current?.querySelectorAll(".about-button");

      buttons?.forEach((button) => {
        button.removeEventListener(
          "mouseenter",
          button._mouseEnter
        );

        button.removeEventListener(
          "mouseleave",
          button._mouseLeave
        );
      });

      ctx.revert();
    };
  }, []);

  // ================================
  // SIMPLE CARD HOVER
  // ================================

  const handleMouseEnter = (e) => {
    gsap.to(e.currentTarget, {
      y: -8,
      scale: 1.02,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = (e) => {
    gsap.to(e.currentTarget, {
      y: 0,
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  return (
    <div ref={pageRef} className="bg-white">

      {/* =========================
          ABOUT HERO
      ========================= */}

      <section className="bg-gradient-to-r from-gray-100 to-gray-200 px-6 py-8 sm:px-6 sm:py-10 lg:px-25 lg:py-15">

        <div className="flex min-w-0 flex-col gap-7 sm:gap-10 lg:flex-row lg:items-center">

          {/* LEFT GREEN CARD */}
          <div className="about-card relative min-h-[300px] w-full overflow-hidden rounded-[24px] bg-green-800 p-6 sm:min-h-[340px] sm:rounded-[28px] sm:p-10 lg:w-[42%]">

            {/* Decorative Circle */}
            <div className="absolute -right-10 -top-16 h-52 w-52 rounded-full bg-green-600/40"></div>

            {/* Large P */}
            <div className="about-p absolute right-4 top-6 text-[112px] font-bold leading-none text-green-500/30 sm:right-8 sm:top-8 sm:text-[150px]">
              P
            </div>

            {/* Content */}
            <div className="relative z-10 flex h-full flex-col justify-between">

              <div>
                <p className="text-xs font-bold tracking-[2px] text-green-100">
                  ABOUT PESTFIND
                </p>
              </div>

              <div className="mt-14 sm:mt-20">
                <h2 className="max-w-xs text-3xl font-bold leading-tight text-white sm:text-4xl">
                  Good pest care
                  <br />
                  should feel
                  <br />
                  easier.
                </h2>

                <p className="mt-6 max-w-xs text-sm leading-6 text-green-100">
                  That's the idea behind the brand — less confusion,
                  more confidence.
                </p>
              </div>

            </div>
          </div>


          {/* RIGHT CONTENT */}
          <div className="about-content min-w-0 w-full lg:w-[55%]">

            <p className="about-tag mb-2 text-[10px] font-bold tracking-[2px] text-green-700">
              ABOUT PESTFIND
            </p>

            <h1 className="about-title max-w-3xl break-words text-[clamp(1.9rem,7vw,2.5rem)] font-bold leading-[1.08] text-[#0d2119] sm:text-5xl sm:leading-[1.05]">
              Finding pest care should not become{" "}<br className="hidden sm:block" />
              <span className="text-green-700">
                another problem.
              </span>
            </h1>

            <p className="about-text mt-3 text-xs text-gray-500">
              PestFind makes pest-care discovery and coordination easier.
            </p>

            <p className="about-text mt-5 max-w-2xl text-sm leading-6 text-gray-600">
              Pest problems are stressful enough. PestFind is designed to make
              the process more approachable: tell us about your space, see the
              options that make sense, and move forward with less friction.
            </p>

            <p className="about-text mt-4 max-w-2xl text-sm leading-6 text-gray-600">
              For agencies, it's a cleaner way to meet customers who already
              have a real need. For customers, it's a simpler way to get to the
              right conversation.
            </p>

            {/* Buttons */}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">

              <Link
                to="/"
                className="about-button inline-flex w-full items-center justify-center rounded-full bg-green-700 px-5 py-3 text-center text-sm font-bold text-white sm:w-auto"
              >
                Find my pest care →
              </Link>

              <Link
                to="/become-agency"
                className="about-button inline-flex w-full items-center justify-center rounded-full border border-green-200 bg-white px-5 py-3 text-center text-sm font-bold text-green-700 sm:w-auto"
              >
                Partner with us
              </Link>

            </div>

          </div>

        </div>
      </section>


      {/* =========================
          TRUST SECTION
      ========================= */}

      <section className="bg-white px-4 py-10 sm:px-6 sm:py-12 lg:px-20">

        {/* Heading */}
        <div className="trust-heading mb-8 w-full max-w-xl rounded-2xl bg-[#f5faf7] px-5 py-5 sm:mb-14 sm:px-12">

          <p className="mb-2 text-xs font-bold tracking-[2px] text-gray-500">
            WHAT WE CARE ABOUT
          </p>

          <h2 className="text-3xl font-bold leading-tight text-[#0d2119] sm:text-4xl">
            Trust is designed
            <br />
            in the details.
          </h2>

        </div>


        {/* Cards */}
        <div className="trust-cards grid grid-cols-1 gap-5 sm:grid-cols-2 lg:flex lg:flex-wrap">

          {/* Card 1 */}
          <div
            className="trust-card relative min-w-0 cursor-pointer sm:min-w-0 lg:min-w-[240px] lg:flex-1"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >

            {/* Green Offset Layer */}
            <div className="absolute inset-0 translate-x-2 translate-y-2 rounded-[28px] border-[3px] border-black bg-green-700"></div>

            {/* Main Card */}
            <div className="relative min-h-[200px] rounded-[24px] border-[3px] border-black bg-white p-5 sm:min-h-[230px] sm:rounded-[28px] sm:p-6">

              <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-700">
                <i className="ri-focus-3-line text-lg"></i>
              </div>

              <h3 className="text-xl font-bold text-black">
                Our Mission
              </h3>

              <p className="mt-4 text-sm leading-6 text-gray-600">
                Make pest-care discovery simpler and clearer.
              </p>

            </div>
          </div>


          {/* Card 2 */}
          <div
            className="trust-card relative min-w-0 cursor-pointer sm:min-w-0 lg:min-w-[240px] lg:flex-1"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >

            <div className="absolute inset-0 translate-x-2 translate-y-2 rounded-[28px] border-[3px] border-black bg-green-700"></div>

            <div className="relative min-h-[200px] rounded-[24px] border-[3px] border-black bg-white p-5 sm:min-h-[230px] sm:rounded-[28px] sm:p-6">

              <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-700">
                <i className="ri-search-line text-lg"></i>
              </div>

              <h3 className="text-xl font-bold text-black">
                How PestFind Works
              </h3>

              <p className="mt-4 text-sm leading-6 text-gray-600">
                Understand the requirement, coordinate a suitable partner and
                organise communication.
              </p>

            </div>
          </div>


          {/* Card 3 */}
          <div
            className="trust-card relative min-w-0 cursor-pointer sm:min-w-0 lg:min-w-[240px] lg:flex-1"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >

            <div className="absolute inset-0 translate-x-2 translate-y-2 rounded-[28px] border-[3px] border-black bg-green-700"></div>

            <div className="relative min-h-[200px] rounded-[24px] border-[3px] border-black bg-white p-5 sm:min-h-[230px] sm:rounded-[28px] sm:p-6">

              <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-700">
                <i className="ri-heart-3-line text-lg"></i>
              </div>

              <h3 className="text-xl font-bold text-black">
                Customer First
              </h3>

              <p className="mt-4 text-sm leading-6 text-gray-600">
                Reduce searching, calls and confusion.
              </p>

            </div>
          </div>


          {/* Card 4 */}
          <div
            className="trust-card relative min-w-0 cursor-pointer sm:min-w-0 lg:min-w-[240px] lg:flex-1"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >

            <div className="absolute inset-0 translate-x-2 translate-y-2 rounded-[28px] border-[3px] border-black bg-green-700"></div>

            <div className="relative min-h-[200px] rounded-[24px] border-[3px] border-black bg-white p-5 sm:min-h-[230px] sm:rounded-[28px] sm:p-6">

              <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-700">
                <i className="ri-arrow-up-line text-lg"></i>
              </div>

              <h3 className="text-xl font-bold text-black">
                Partner Network
              </h3>

              <p className="mt-4 text-sm leading-6 text-gray-600">
                Create a structured local request channel.
              </p>

            </div>
          </div>

        </div>

      </section>


      {/* =========================
          FOOTER
      ========================= */}

      <Footer />

    </div>
  );
};

export default AboutUs;