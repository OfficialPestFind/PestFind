
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Footer from "../Footer/Footer";
import HowItWorks from "../HomePage/HowItWorks";
import RestaurantChecklist from "./RestaurantChecklist";
import RestaurantFaq from "./RestaurantFaq";

gsap.registerPlugin(ScrollTrigger);

const Restaurant = () => {
  const pageRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // HERO ANIMATION

      const tl = gsap.timeline();

      tl.from(".restaurant-tag", {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
      })
        .from(
          ".restaurant-title",
          {
            x: -50,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.3"
        )
        .from(
          ".restaurant-description",
          {
            y: 30,
            opacity: 0,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.4"
        )
        .from(
          ".restaurant-button",
          {
            y: 20,
            opacity: 0,
            duration: 0.5,
            ease: "power3.out",
          },
          "-=0.3"
        )
        .from(
          ".restaurant-benefit",
          {
            x: -20,
            opacity: 0,
            duration: 0.4,
            stagger: 0.1,
            ease: "power3.out",
          },
          "-=0.2"
        )
        .from(
          ".restaurant-image-box",
          {
            x: 60,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.7"
        );

      // FLOATING IMAGE ANIMATION

      gsap.to(".restaurant-image-box", {
        y: -10,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1,
      });

      // IMAGE HOVER ANIMATION

      const imageBox = document.querySelector(".restaurant-image-box");
      const image = document.querySelector(".restaurant-image");

      if (imageBox && image) {
        const imageEnter = () => {
          gsap.to(image, {
            scale: 1.06,
            duration: 0.6,
            ease: "power2.out",
          });
        };

        const imageLeave = () => {
          gsap.to(image, {
            scale: 1,
            duration: 0.6,
            ease: "power2.out",
          });
        };

        imageBox.addEventListener("mouseenter", imageEnter);
        imageBox.addEventListener("mouseleave", imageLeave);

        imageBox._imageEnter = imageEnter;
        imageBox._imageLeave = imageLeave;
      }

      // SECOND SECTION HEADING

      gsap.from(".hospitality-heading", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".hospitality-heading",
          start: "top 85%",
        },
      });

      // SECOND SECTION DESCRIPTION

      gsap.from(".hospitality-description", {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".hospitality-description",
          start: "top 85%",
        },
      });

      // CARDS SCROLL ANIMATION

      gsap.from(".hospitality-card", {
        y: 50,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".hospitality-cards",
          start: "top 85%",
        },
      });

      // CLEANUP HOVER LISTENERS

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

  // CARD HOVER ANIMATION

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
      {/* ================= HERO ================= */}

      <section
        className="
          min-h-0 bg-[#f7faf8]
          px-8 py-8
          sm:min-h-[600px] sm:px-6
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
          {/* LEFT CONTENT */}

          <div className="w-full min-w-0 lg:w-[60%]">
            {/* Small Heading */}

            <div className="restaurant-tag mb-4 flex items-center gap-3">
              <span className="h-[2px] w-7 shrink-0 bg-green-700" />

              <p className="text-xs font-bold tracking-[2px] text-green-700">
                RESTAURANT
              </p>
            </div>

            {/* Heading */}

            <h1
              className="
                restaurant-title max-w-3xl
                text-3xl font-bold leading-[1.08]
                text-[#0d2119]
                sm:text-5xl
                md:text-6xl
                lg:text-[58px]
              "
            >
              Clean Spaces. Confident
              <br className="hidden sm:block" />{" "}
              <span className="text-green-700">
                Guests.
              </span>
            </h1>

            {/* Description */}

            <p
              className="
                restaurant-description mt-4 max-w-2xl
                bg-[#f1f8f4] p-3
                text-base leading-6 text-gray-600
                sm:p-4 sm:text-lg sm:leading-7
              "
            >
              Stop calling five agencies for five quotes. Tell us about your kitchen once, and PestFind matches you with a verified pest control partner who works around your service hours.
            </p>

            {/* Benefits */}

            <ul className="mt-6 flex max-w-[620px] flex-col gap-2 sm:mt-3 sm:gap-2">
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
                                        Get my pest partner →
                                      </Link>
                        
                                      <Link
                          to="#free-restaurant-checklist"
                          onClick={(e) => {
                            e.preventDefault();
                        
                            document
                              .getElementById("free-restaurant-checklist")
                              ?.scrollIntoView({
                                behavior: "smooth",
                                block: "start",
                              });
                          }}
                          className="
                            hero-secondary inline-flex
                            min-h-12 items-center justify-center
                            rounded-full border-2 border-green-300
                            bg-white px-5 py-1 text-center
                            text-base font-bold text-green-700
                            transition duration-200
                            hover:-translate-y-1 hover:bg-green-50
                            focus-visible:outline-2
                            focus-visible:outline-offset-4
                            focus-visible:outline-green-700
                            sm:w-auto sm:text-lg
                          "
                        >
                          Get the free Kitchen checklist
                        </Link>
                                    </div>
          </div>

          {/* RIGHT IMAGE */}

          <div className="w-full min-w-0 lg:w-[38%]">
            <div
              className="
                restaurant-image-box relative h-[260px]
                w-full overflow-hidden rounded-[20px]
                border-[2px] border-black
                sm:h-[470px] sm:rounded-[30px]
              "
            >
              <img
                src="/images/Kitchen.jpg"
                alt="Restaurant kitchen"
                className="restaurant-image h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-black/10" />
            </div>
          </div>
        </div>
      </section>

      {/* ================= HOSPITALITY SECTION ================= */}

      <section
        className="
          bg-white px-8 py-12
          sm:px-6 sm:py-16
          lg:px-30
        "
      >
        {/* Heading */}

        <div className="mx-auto mb-8 max-w-3xl text-center sm:mb-12">
          <h2
            className="
              hospitality-heading
              text-3xl font-bold leading-tight
              text-[#10251c]
              sm:text-4xl md:text-5xl
            "
          >
            Hospitality starts with a
            <br className="hidden sm:block" /> clean experience.
          </h2>

          <p
            className="
              hospitality-description mt-4
              text-sm leading-6 text-gray-500
              sm:mt-5
            "
          >
            Tell PestFind about your property and requirement. We'll
            coordinate the next step.
          </p>
        </div>

        {/* CARDS */}

        <div
          className="
            hospitality-cards mb-5
            flex flex-wrap gap-5
          "
        >
          {/* CARD 1 */}

          <div
            className="
              hospitality-card relative
              basis-full min-w-0 flex-1
              cursor-pointer
              sm:min-w-[250px] sm:basis-0
            "
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* Back Layer */}

            <div className="absolute inset-0 translate-x-2 translate-y-2 rounded-[28px] border-[3px] border-black bg-green-700" />

            {/* Main Card */}

            <div
              className="
                relative h-auto min-h-[200px]
                rounded-[28px] border-[3px]
                border-black bg-white p-4
                sm:h-[200px] sm:p-6
              "
            >
              <div className="mb-5 flex h-9 w-9 items-center justify-center rounded-xl bg-green-50 text-xs font-bold text-green-700 sm:mb-8">
                01
              </div>

              <h3 className="text-lg font-bold text-black">
                Property details
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                Hotel name, location and property size.
              </p>
            </div>
          </div>

          {/* CARD 2 */}

          <div
            className="
              hospitality-card relative
              basis-full min-w-0 flex-1
              cursor-pointer
              sm:min-w-[250px] sm:basis-0
            "
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* Back Layer */}

            <div className="absolute inset-0 translate-x-2 translate-y-2 rounded-[28px] border-[3px] border-black bg-green-700" />

            {/* Main Card */}

            <div
              className="
                relative h-auto min-h-[200px]
                rounded-[28px] border-[3px]
                border-black bg-white p-4
                sm:h-[200px] sm:p-6
              "
            >
              <div className="mb-5 flex h-9 w-9 items-center justify-center rounded-xl bg-green-50 text-xs font-bold text-green-700 sm:mb-8">
                02
              </div>

              <h3 className="text-lg font-bold text-black">
                Treatment
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                Choose the pest problem or tell us if you're unsure.
              </p>
            </div>
          </div>

          {/* CARD 3 */}

          <div
            className="
              hospitality-card relative
              basis-full min-w-0 flex-1
              cursor-pointer
              sm:min-w-[250px] sm:basis-0
            "
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* Back Layer */}

            <div className="absolute inset-0 translate-x-2 translate-y-2 rounded-[28px] border-[3px] border-black bg-green-700" />

            {/* Main Card */}

            <div
              className="
                relative h-auto min-h-[200px]
                rounded-[28px] border-[3px]
                border-black bg-white p-4
                sm:h-[200px] sm:p-6
              "
            >
              <div className="mb-5 flex h-9 w-9 items-center justify-center rounded-xl bg-green-50 text-xs font-bold text-green-700 sm:mb-8">
                03
              </div>

              <h3 className="text-lg font-bold text-black">
                Preferred slot
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                Tell us when your team would prefer service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= Restaurant How It Works ================= */}
            
                  <HowItWorks />

      {/* ================= Restaurant Checklist ================= */}   

      <RestaurantChecklist />

      {/* ================= Restaurant FAQ ================= */}

      <RestaurantFaq />

      {/* FOOTER */}

      <Footer />
    </div>
  );
};

export default Restaurant;
