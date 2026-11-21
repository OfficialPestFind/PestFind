import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: "How quickly will someone contact me?",
    answer:
      "Once you submit your request, PestFind reviews your requirements and works to match you with a suitable pest control partner. A matched partner aims to contact you within 24 hours.",
  },
  {
    question: "Can I get a one-time treatment or a regular contract?",
    answer:
      "You can request a one-time pest control treatment or discuss ongoing pest management through a regular service contract or Annual Maintenance Contract (AMC). The final schedule and terms can be discussed with your matched service partner.",
  },
  {
    question: "I am not sure which pest I have. Can I still apply?",
    answer:
      "Absolutely. You do not need to identify the pest before submitting your request. Select General Pest Control or Not Sure in the form and describe the problem. Your service partner can help assess the situation.",
  },
  {
    question: "I have more than one outlet.",
    answer:
      "You can share your requirements for multiple outlets. Include the relevant locations and service needs so our team can understand your requirements and help identify suitable service partners.",
  },
  {
    question: "Will treatment disturb my kitchen?",
    answer:
      "Treatment arrangements depend on the pest problem, treatment method and kitchen operations. Discuss your operating hours, food preparation schedule and safety requirements with the service partner before treatment begins.",
  },
];

const KitchenFaq = () => {
  const sectionRef = useRef(null);
  const answerRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(null);

  // Section entrance animation
  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const heading = section.querySelector(".kitchen-faq-heading");
      const items = gsap.utils.toArray(".kitchen-faq-item", section);

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          once: true,
        },
        defaults: {
          ease: "power3.out",
        },
      });

      timeline
        .from(heading, {
          y: 30,
          autoAlpha: 0,
          duration: 0.7,
        })
        .from(
          items,
          {
            y: 22,
            autoAlpha: 0,
            duration: 0.55,
            stagger: 0.1,
          },
          "-=0.3"
        );
    }, section);

    return () => ctx.revert();
  }, []);

  // Accordion animation
  useEffect(() => {
    answerRefs.current.forEach((answer, index) => {
      if (!answer) return;

      const isOpen = activeIndex === index;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(answer, {
          height: isOpen ? "auto" : 0,
          autoAlpha: isOpen ? 1 : 0,
        });
        return;
      }

      gsap.to(answer, {
        height: isOpen ? "auto" : 0,
        autoAlpha: isOpen ? 1 : 0,
        duration: isOpen ? 0.4 : 0.3,
        ease: isOpen ? "power2.out" : "power2.inOut",
        overwrite: "auto",
      });
    });
  }, [activeIndex]);

  const toggleFaq = (index) => {
    setActiveIndex((current) =>
      current === index ? null : index
    );
  };

  return (
    <section
      ref={sectionRef}
      aria-labelledby="kitchen-faq-title"
      className="relative w-full overflow-hidden bg-[#f1f7f3] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-16"
    >
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-white/70 blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-[1120px]">
        {/* Heading */}
        <div className="kitchen-faq-heading mb-8 sm:mb-10 lg:mb-12">
          <div className="mb-3 flex items-center gap-2">
            <span className="h-[2px] w-7 bg-[#006b35]" />
            <span className="text-[10px] font-extrabold uppercase tracking-[2px] text-[#006b35] sm:text-lg">
              Kitchen FAQs
            </span>
          </div>

          <h2
            id="kitchen-faq-title"
            className="max-w-2xl text-3xl font-bold leading-tight tracking-[-0.04em] text-[#101a13] sm:text-4xl lg:text-[46px]"
          >
            Questions,
            <span className="text-[#006b35]"> answered.</span>
          </h2>

          <p className="mt-3 max-w-xl text-sm leading-6 text-[#647168] sm:text-base sm:leading-7">
            Helpful answers to common questions about pest control
            for restaurants, cafes and commercial kitchens.
          </p>
        </div>

        {/* Accordion */}
        <div className="flex max-w-[870px] flex-col gap-3 sm:gap-3.5">
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;
            const answerId = `kitchen-faq-answer-${index}`;

            return (
              <article
                key={faq.question}
                className={`kitchen-faq-item overflow-hidden rounded-2xl border bg-white transition-colors duration-300 ${
                  isOpen
                    ? "border-[#b8d8c5] shadow-[0_8px_24px_rgba(0,70,35,0.06)]"
                    : "border-[#dce7df] shadow-[0_2px_5px_rgba(15,23,42,0.025)] hover:border-[#b8d8c5]"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                  className="group flex min-h-[68px] w-full items-center justify-between gap-4 px-4 py-4 text-left sm:min-h-[76px] sm:px-6 sm:py-5"
                >
                  <span className="min-w-0 text-[14px] font-bold leading-6 tracking-[-0.01em] text-[#17251b] sm:text-base md:text-[17px]">
                    {faq.question}
                  </span>

                  {/* Plus / Minus icon */}
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                      isOpen
                        ? "rotate-45 bg-[#006b35] text-white"
                        : "bg-[#eff7f1] text-[#006b35] group-hover:bg-[#dcefe2]"
                    }`}
                  >
                    <svg
                      viewBox="0 0 20 20"
                      fill="none"
                      className="h-4 w-4"
                      aria-hidden="true"
                    >
                      <path
                        d="M10 4v12M4 10h12"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </button>

                {/* Answer */}
                <div
                  id={answerId}
                  ref={(element) => {
                    answerRefs.current[index] = element;
                  }}
                  aria-hidden={!isOpen}
                  className="h-0 overflow-hidden opacity-0"
                  style={{ height: 0 }}
                >
                  <div className="border-t border-[#edf2ee] px-4 pb-5 pt-4 sm:px-6 sm:pb-6">
                    <p className="max-w-3xl text-[13px] leading-7 text-[#647168] sm:text-sm sm:leading-7">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        
      </div>
    </section>
  );
};

export default KitchenFaq;