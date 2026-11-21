
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import gsap from "gsap";
import HowItWorks from "./HowItWorks";
import PestProblems from "./PestProblems";
import SpaceCare from "./SpaceCare";
import PestGuides from "./PestGuides";
import FAQs from "./FAQs";
import CTA from "./CTA";
import Footer from "../Footer/Footer";
import PestForm from "../Form/PestForm";
import FreePestGuides from "./FreePestGuides";


const HomePage = () => {

  const [selectedTreatment, setSelectedTreatment] = useState("");
  const heroRef = useRef(null);
  const location = useLocation();

  const benefits = [
  "One 1-minute form instead of a day of phone calls",
  "A verified partner matched to your place and area",
  "Free checklists you can use the same day",
];

  // Scroll to the request form when navigating with a hash
  // Scroll to sections when navigating with a hash
// Handle navigation to page sections, including repeated clicks
useEffect(() => {
  if (!location.hash) return;

  const targetId = decodeURIComponent(location.hash.substring(1));

  const timer = setTimeout(() => {
    const target = document.getElementById(targetId);

    target?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, 200);

  return () => clearTimeout(timer);
}, [location.hash, location.pathname, location.key]);

  // GSAP hero entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      timeline
        .from(".hero-tag", {
          y: 20,
          autoAlpha: 0,
          duration: 0.5,
        })
        .from(
          ".hero-title",
          {
            y: 30,
            autoAlpha: 0,
            duration: 0.7,
          },
          "-=0.25"
        )
        .from(
          ".hero-description",
          {
            y: 20,
            autoAlpha: 0,
            duration: 0.6,
          },
          "-=0.35"
        )
        .from(
          ".hero-buttons",
          {
            y: 15,
            autoAlpha: 0,
            duration: 0.5,
          },
          "-=0.3"
        )
        .from(
          ".hero-form",
          {
            y: 25,
            autoAlpha: 0,
            duration: 0.7,
          },
          "-=0.35"
        )
        .from(
          ".hero-note",
          {
            y: 10,
            autoAlpha: 0,
            duration: 0.4,
          },
          "-=0.2"
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Scroll to pest request form when sticky mobile button is clicked
  const handleFindPestCare = () => {
    document.getElementById("pest-request-form")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const scrollToPestRequestForm = () => {
  const form = document.getElementById("pest-request-form");

  if (!form) return;

  form.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};

  return (
    <div
      ref={heroRef}
      className="w-full min-w-0 pb-20 md:pb-0"
    >
      {/* ================= HERO SECTION ================= */}

      <section
        className="
          relative w-full overflow-hidden
          bg-gradient-to-b from-green-50 to-gray-100
          min-h-[calc(100svh-3.5rem)]
          md:min-h-[calc(100svh-4rem)]
        "
      >
        <div
          className="
            mx-auto grid w-full max-w-7xl
            grid-cols-1 items-center
            gap-8 px-8 py-10
            sm:gap-10 sm:px-6 sm:py-12
            lg:min-h-[calc(100svh-4rem)]
            lg:grid-cols-2 lg:gap-8
            lg:px-15 lg:py-10
          "
        >
          {/* ================= LEFT CONTENT ================= */}

          <div
            className="
              flex min-w-0 flex-col justify-center
              lg:py-8 lg:pr-4 lg:-translate-y-18
            "
          >
            <p
              className="
                hero-tag mb-4
                text-xs font-bold uppercase
                tracking-[2px] text-green-700
                sm:mb-5 sm:text-sm
              "
            >
              FOR HOMES, BUSSINESSS AND RESTAURANTS
            </p>

            <h1
              className="
                hero-title max-w-xl
                text-4xl font-bold leading-[1.08]
                tracking-tight text-black
                sm:text-5xl
                lg:text-5xl
                xl:text-6xl
              "
            >
              Pest Control <span></span>
              
              <span className="text-green-700">
                Made
              </span>

              <br className="hidden sm:block" />

              <span className="text-green-700">
                Easier
              </span>
            </h1>

            <p
              className="
                hero-description mt-5 max-w-xl
                text-base leading-7 text-gray-600
                sm:mt-6 sm:text-lg
              "
            >
              <span className="font-bold text-gray-800">
                Fill one short form.
              </span>{" "}
              PestFind matches you with the right verified pest control partner, so you stop searching, comparing and chasing.
            </p>

            <ul className="mt-6 flex max-w-[620px] flex-col gap-2 sm:mt-7 sm:gap-4">
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

            {/* CTA Buttons */}

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
                Find my pest care →
              </Link>

              <Link
                to="/#space-care"
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
                Choose Where You Need Help
              </Link>
            </div>
          </div>

          {/* ================= RIGHT CONTENT ================= */}

          <div
            className="
              flex w-full min-w-0
              flex-col items-center justify-center
              gap-3
              lg:pl-2
            "
          >
            {/* Request Form */}

            <div
              id="pest-request-form"
              className="
                hero-form w-full min-w-0
                max-w-xl scroll-mt-10
              "
            >
              <PestForm
                selectedTreatment={selectedTreatment}
              />
            </div>

            {/* Service Area */}

            <p
              className="
                flex w-full max-w-xl flex-wrap
                items-center justify-center gap-x-2 gap-y-1
                text-center text-xs leading-5
                text-gray-500 sm:text-sm
              "
            >
              <span className="text-green-700" aria-hidden="true">
                📍
              </span>

              <span>
                Serving{" "}
                <span className="font-medium text-gray-700">
                  Mumbai, Thane, Navi Mumbai
                </span>{" "}
                &amp;{" "}
                <span className="font-medium text-gray-700">
                  Kalyan-Dombivli
                </span>
              </span>
            </p>

            {/* Trust Note */}

            
          </div>
        </div>
      </section>

      {/* ================= OTHER SECTIONS ================= */}

      <HowItWorks />

      <PestProblems
        onPestSelect={setSelectedTreatment}
      />

      <SpaceCare />

      <FreePestGuides />

      <PestGuides />

      <FAQs />

      <CTA />

      <Footer />

      {/* ================= STICKY MOBILE CTA ================= */}

      <div
        className="
          fixed inset-x-0 bottom-0 z-50
          border-t border-gray-200
          bg-white/95 p-3
          pb-[calc(0.75rem+env(safe-area-inset-bottom))]
          shadow-[0_-4px_20px_rgba(0,0,0,0.08)]
          backdrop-blur-md
          md:hidden
        "
      >
        <button
          type="button"
          onClick={handleFindPestCare}
          className="
            flex min-h-12 w-full
            items-center justify-center gap-2
            rounded-full bg-green-700
            px-5 py-3 text-base font-bold text-white
            shadow-lg shadow-green-900/20
            transition duration-200
            hover:bg-green-800
            active:scale-[0.98]
            focus-visible:outline-2
            focus-visible:outline-offset-2
            focus-visible:outline-green-700
          "
        >
          Find My Pest Care
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  );
};

export default HomePage;
