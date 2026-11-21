import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CTA = () => {
  const sectionRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ==========================================
      // MAIN CTA ANIMATION
      // ==========================================

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".cta-box",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      tl.from(".cta-box", {
        y: 60,
        opacity: 0,
        scale: 0.97,
        duration: 0.8,
        ease: "power3.out",
      })
        .from(
          ".cta-label",
          {
            y: 15,
            opacity: 0,
            duration: 0.4,
            ease: "power3.out",
          },
          "-=0.5"
        )
        .from(
          ".cta-heading-line",
          {
            y: 40,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out",
          },
          "-=0.3"
        )
        .from(
          ".cta-text",
          {
            y: 20,
            opacity: 0,
            duration: 0.5,
            ease: "power3.out",
          },
          "-=0.3"
        )
        .from(
          ".cta-button",
          {
            x: 30,
            opacity: 0,
            scale: 0.85,
            duration: 0.6,
            ease: "back.out(1.7)",
          },
          "-=0.3"
        );

      // ==========================================
      // DECORATIVE ANIMATIONS
      // ==========================================

      gsap.from(".cta-circle-large", {
        scale: 0.5,
        rotation: -30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".cta-box",
          start: "top 85%",
        },
      });

      gsap.from(".cta-circle-small", {
        scale: 0,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ".cta-box",
          start: "top 85%",
        },
      });

      gsap.from(".cta-glow", {
        scale: 0.5,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".cta-box",
          start: "top 85%",
        },
      });

      // ==========================================
      // FLOATING ANIMATIONS
      // ==========================================

      gsap.to(".cta-circle-large", {
        x: 12,
        y: 10,
        rotation: 8,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".cta-circle-small", {
        x: -10,
        y: 8,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".cta-glow", {
        x: -15,
        y: 10,
        scale: 1.05,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // ==========================================
      // BUTTON HOVER
      // ==========================================

      const button =
        sectionRef.current?.querySelector(".cta-button");

      if (button) {
        const enter = () => {
          gsap.to(button, {
            y: -4,
            scale: 1.05,
            duration: 0.25,
            ease: "power2.out",
          });

          gsap.to(".cta-button-icon", {
            x: 4,
            duration: 0.2,
            ease: "power2.out",
          });

          gsap.to(".cta-button-shine", {
            x: "220%",
            duration: 0.6,
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

          gsap.to(".cta-button-icon", {
            x: 0,
            duration: 0.2,
            ease: "power2.out",
          });

          gsap.set(".cta-button-shine", {
            x: "-150%",
          });
        };

        button.addEventListener("mouseenter", enter);
        button.addEventListener("mouseleave", leave);

        button._enter = enter;
        button._leave = leave;
      }
    }, sectionRef);

    return () => {
      const button =
        sectionRef.current?.querySelector(".cta-button");

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

      ctx.revert();
    };
  }, []);

  // ==========================================
  // SCROLL TO FORM
  // ==========================================

  const goToForm = () => {
    const form = document.getElementById(
      "pest-request-form"
    );

    if (form) {
      form.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="overflow-hidden bg-gradient-to-r from-gray-100 to-gray-200 px-6 py-8 lg:px-25"
    >
      <div className="cta-box relative overflow-hidden rounded-[28px] bg-green-900 px-7 py-9 sm:px-10 sm:py-10 lg:px-12 lg:py-11">

        {/* ==========================================
            GLOW
        ========================================== */}

        <div className="cta-glow pointer-events-none absolute -right-16 top-1/2 h-56 w-56 -translate-y-1/2 rounded-full bg-green-700/40 blur-3xl" />

        {/* ==========================================
            LARGE CIRCLE
        ========================================== */}

        <div className="cta-circle-large pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full border border-green-700/60" />

        {/* ==========================================
            SMALL CIRCLE
        ========================================== */}

        <div className="cta-circle-small pointer-events-none absolute right-[20%] top-8 h-14 w-14 rounded-full border border-green-600/40" />

        {/* ==========================================
            CONTENT
        ========================================== */}

        <div className="relative z-10 flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">

          {/* LEFT */}

          <div className="max-w-2xl">

            {/* Label */}

            <div className="cta-label mb-3 inline-flex items-center gap-2 rounded-full border border-green-700/50 bg-green-800/50 px-3 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-green-400" />

              <span className="text-[9px] font-bold uppercase tracking-[1.8px] text-green-100">
                PestFind • Get Started
              </span>
            </div>

            {/* Heading */}

            <h2 className="overflow-hidden text-3xl font-black leading-[1] tracking-[-0.5px] text-white sm:text-4xl md:text-5xl">

              <span className="cta-heading-line block font-bold">
                Pest Control Nahi,
              </span>

              <span className="cta-heading-line block text-white flex gap-4">
              <span className="text-white font-bold">PestFind</span> <span className="text-white font-bold">karo.</span>
              </span>

            </h2>

            {/* Text */}

            <p className="cta-text mt-4 max-w-lg text-sm leading-6 text-green-100/75 sm:text-base">
              One simple request. Tell us what you need and
              PestFind handles the coordination.
            </p>
          </div>

          {/* BUTTON */}

          <div>
            <button
              type="button"
              onClick={goToForm}
              className="cta-button group relative flex w-fit items-center gap-2 overflow-hidden rounded-xl bg-white px-5 py-3.5 text-sm font-bold text-green-900 shadow-lg"
            >
              {/* Shine */}

              <span className="cta-button-shine pointer-events-none absolute -left-1/2 top-0 h-full w-1/3 -skew-x-12 bg-white/50" />

              {/* Text */}

              <span className="relative z-10">
                Find My Pest Service
              </span>

              {/* Arrow */}

              <span className="cta-button-icon relative z-10 text-lg">
                →
              </span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};

export default CTA;