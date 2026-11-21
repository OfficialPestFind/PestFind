
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Footer from "../Footer/Footer";
import FreeHomePestChecklist from "./FreeHomePestChecklist";
import ResidentialFaq from "./ResidentialFaq";
import HowItWorks from "../HomePage/HowItWorks";

gsap.registerPlugin(ScrollTrigger);

const Residential = () => {
  const pageRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // HERO ANIMATION
      const heroTimeline = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      heroTimeline
        .from(".res-tag", {
          y: 30,
          opacity: 0,
          duration: 0.6,
        })
        .from(
          ".res-title",
          {
            x: -80,
            opacity: 0,
            duration: 1,
          },
          "-=0.3"
        )
        .from(
          ".res-description",
          {
            x: -50,
            opacity: 0,
            duration: 0.7,
          },
          "-=0.5"
        )
        .from(
          ".res-button",
          {
            y: 30,
            opacity: 0,
            scale: 0.9,
            duration: 0.6,
          },
          "-=0.3"
        )
        .from(
          ".res-benefit",
          {
            x: -30,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1,
          },
          "-=0.2"
        )
        .from(
          ".res-image",
          {
            x: 80,
            opacity: 0,
            scale: 0.9,
            duration: 1,
          },
          "-=0.8"
        );

        

      // IMAGE FLOATING ANIMATION
      gsap.to(".res-image", {
        y: -8,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1.5,
      });

      // HERO IMAGE HOVER
      const imageBox = document.querySelector(".res-image-box");
      const image = document.querySelector(".res-image");

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

      // FEATURE SECTION HEADING
      gsap.from(".context-heading", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".context-heading",
          start: "top 85%",
        },
      });

      // FEATURE DESCRIPTION
      gsap.from(".context-description", {
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".context-description",
          start: "top 85%",
        },
      });

      // CARDS SCROLL ANIMATION
      gsap.from(".context-card", {
        y: 70,
        opacity: 0,
        scale: 0.9,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".context-cards",
          start: "top 80%",
        },
      });

      // CARD HOVER ANIMATION
      const cards = gsap.utils.toArray(".context-card");

      cards.forEach((card) => {
        const icon = card.querySelector(".context-icon");

        const enter = () => {
          gsap.to(card, {
            y: -10,
            scale: 1.02,
            duration: 0.3,
            ease: "power2.out",
            boxShadow: "0 20px 35px rgba(0, 0, 0, 0.15)",
          });

          if (icon) {
            gsap.to(icon, {
              scale: 1.2,
              rotate: 8,
              duration: 0.3,
              ease: "back.out(1.7)",
            });
          }
        };

        const leave = () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
            boxShadow: "0 0px 0px rgba(0,0,0,0)",
          });

          if (icon) {
            gsap.to(icon, {
              scale: 1,
              rotate: 0,
              duration: 0.3,
              ease: "power2.out",
            });
          }
        };

        card.addEventListener("mouseenter", enter);
        card.addEventListener("mouseleave", leave);

        card._enter = enter;
        card._leave = leave;
      });

      // CTA BUTTON HOVER
      const button = document.querySelector(".res-button");

      if (button) {
        const buttonEnter = () => {
          gsap.to(button, {
            scale: 1.05,
            y: -3,
            duration: 0.25,
            ease: "power2.out",
          });
        };

        const buttonLeave = () => {
          gsap.to(button, {
            scale: 1,
            y: 0,
            duration: 0.25,
            ease: "power2.out",
          });
        };

        button.addEventListener("mouseenter", buttonEnter);
        button.addEventListener("mouseleave", buttonLeave);

        button._enter = buttonEnter;
        button._leave = buttonLeave;
      }

      // CLEANUP
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

        cards.forEach((card) => {
          card.removeEventListener("mouseenter", card._enter);
          card.removeEventListener("mouseleave", card._leave);
        });

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
      };
    }, pageRef);

    return () => ctx.revert();
  }, []);

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
          min-h-0
          bg-gradient-to-r from-gray-100 to-gray-200
          px-8 py-8
          sm:min-h-[650px] sm:px-6 sm:py-12
          lg:px-30
        "
      >
        <div
          className="
            flex flex-col items-center justify-between
            gap-8
            sm:gap-12
            lg:flex-row
          "
        >
          {/* LEFT CONTENT */}

          <div className="w-full min-w-0 lg:w-[65%]">
            {/* Small Heading */}

            <div className="res-tag mb-4 flex items-center gap-3">
              <span className="h-[2px] w-7 shrink-0 bg-green-700" />

              <p className="text-xs font-bold tracking-[2px] text-green-700">
                RESIDENTIAL
              </p>
            </div>

            {/* Heading */}

            <h1
              className="
                res-title max-w-4xl
                text-3xl font-bold leading-[1.1]
                text-[#0d2119]
                sm:text-5xl
                md:text-6xl
                lg:text-[58px]
              "
            >
              Your Pest Problem Is Not Your 
              <br className="hidden sm:block" />{" "}
              <span className="text-green-700">
                Problem Anymore
              </span>
            </h1>

            {/* Description */}

            <p
              className="
                res-description mt-5 max-w-xl
                text-base leading-6 text-gray-600
                sm:mt-7 sm:text-lg sm:leading-7
              "
            >
              Seen a cockroach at 11 PM? Do not spend the night searching and calling agencies. Fill one short form and PestFind matches your home with a verified pest control partner
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
                sm:mt-8 sm:w-auto sm:flex-row sm:flex-wrap
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
                Get my pest care →
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
  Get the free home checklist
</Link>
            </div>
          </div>

          {/* RIGHT IMAGE */}

          <div className="res-image w-full min-w-0 lg:w-[40%]">
            <div
              className="
                res-image-box relative w-full
                h-[260px] overflow-hidden
                rounded-[20px] border-[2px] border-black
                sm:h-[470px] sm:rounded-[30px] lg:-translate-y-6
              "
            >
              <img
                src="/images/HappyFamily.jpg"
                alt="Happy family at home"
                className="h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-black/10" />
            </div>
          </div>
        </div>
      </section>

      {/* ================= BUILT AROUND YOU ================= */}

      <section
        className="
          bg-[#f5faf7]
          px-8 py-10
          sm:px-6 sm:py-14
          lg:px-30
        "
      >
        {/* Heading */}

        <div
          className="
            mb-8 flex flex-col justify-between
            gap-5
            sm:mb-10 sm:gap-8
            lg:flex-row lg:items-end
          "
        >
          <div className="context-heading">
            <p className="mb-3 text-xs font-bold tracking-[2px] text-green-700">
              BUILT AROUND YOU
            </p>

            <h2
              className="
                max-w-xl text-3xl font-bold leading-tight
                text-[#0d2119]
                sm:text-4xl md:text-5xl
              "
            >
              Good care starts
              <br />
              with good context.
            </h2>
          </div>

          <p className="context-description max-w-md text-sm leading-6 text-gray-500">
            Instead of making you translate your problem into technical
            terms, PestFind begins with the details that matter to your
            day-to-day life.
          </p>
        </div>

        {/* ================= CARDS ================= */}

        <div className="context-cards mb-10 flex flex-wrap gap-5">
          {/* Card 1 */}

          <div className="context-card relative min-w-[240px] flex-1 cursor-pointer">
            <div className="absolute inset-0 translate-x-2 translate-y-2 rounded-[28px] border-[3px] border-black bg-green-700" />

            <div
              className="
                relative h-auto min-h-[200px]
                rounded-[28px] border-[3px]
                border-black bg-white p-5
                sm:h-[200px]
              "
            >
              <div className="context-icon flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-700">
                <i className="ri-pulse-line" />
              </div>

              <h3 className="mt-5 text-lg font-bold">
                Right treatment
              </h3>

              <p className="mt-3 text-sm leading-5 text-gray-500">
                Choose a familiar treatment or start general — you don't
                need to diagnose the problem alone.
              </p>
            </div>
          </div>

          {/* Card 2 */}

          <div className="context-card relative min-w-[240px] flex-1 cursor-pointer">
            <div className="absolute inset-0 translate-x-2 translate-y-2 rounded-[28px] border-[3px] border-black bg-green-700" />

            <div
              className="
                relative h-auto min-h-[200px]
                rounded-[28px] border-[3px]
                border-black bg-white p-5
                sm:h-[200px]
              "
            >
              <div className="context-icon flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-700">
                <i className="ri-ruler-line" />
              </div>

              <h3 className="mt-5 text-lg font-bold">
                Right size
              </h3>

              <p className="mt-3 text-sm leading-5 text-gray-500">
                Area and property type help make the quote more useful from
                the first conversation.
              </p>
            </div>
          </div>

          {/* Card 3 */}

          <div className="context-card relative min-w-[240px] flex-1 cursor-pointer">
            <div className="absolute inset-0 translate-x-2 translate-y-2 rounded-[28px] border-[3px] border-black bg-green-700" />

            <div
              className="
                relative h-auto min-h-[200px]
                rounded-[28px] border-[3px]
                border-black bg-white p-5
                sm:h-[200px]
              "
            >
              <div className="context-icon flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-700">
                <i className="ri-money-rupee-circle-line" />
              </div>

              <h3 className="mt-5 text-lg font-bold">
                Right range
              </h3>

              <p className="mt-3 text-sm leading-5 text-gray-500">
                A budget preference sets expectations early, without awkward
                back-and-forth.
              </p>
            </div>
          </div>

          {/* Card 4 */}

          <div className="context-card relative min-w-[240px] flex-1 cursor-pointer">
            <div className="absolute inset-0 translate-x-2 translate-y-2 rounded-[28px] border-[3px] border-black bg-green-700" />

            <div
              className="
                relative h-auto min-h-[200px]
                rounded-[28px] border-[3px]
                border-black bg-white p-5
                sm:h-[200px]
              "
            >
              <div className="context-icon flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-700">
                <i className="ri-time-line" />
              </div>

              <h3 className="mt-5 text-lg font-bold">
                Right time
              </h3>

              <p className="mt-3 text-sm leading-5 text-gray-500">
                Pick a date and time window that works around your home or
                operation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= Residential How It Works ================= */}

      <HowItWorks />

      {/* ================= Residential Checklist ================= */}

      <FreeHomePestChecklist />

      {/* ================= Residential FAQ ================= */}

      <ResidentialFaq />

      {/* ================= FOOTER ================= */}

      <Footer />
    </div>
  );
};

export default Residential;
