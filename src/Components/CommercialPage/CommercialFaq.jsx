import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: "How quickly will someone contact me?",
    answer:
      "After you submit your request, PestFind reviews your requirements and works to match you with a suitable service partner. A matched partner aims to contact you within 24 hours.",
  },
  {
    question: "Can PestFind handle multiple sites or cities?",
    answer:
      "Yes. You can share details for multiple offices, warehouses, factories or other commercial locations. Our team can review your requirements and help coordinate suitable service partners based on your locations.",
  },
  {
    question: "Can I get an annual contract (AMC)?",
    answer:
      "Yes. You can discuss ongoing pest management and annual maintenance contract requirements with the matched service partner. The treatment schedule and terms can be agreed upon directly.",
  },
  {
    question: "What kind of premises do you work with?",
    answer:
      "PestFind supports requests for offices, retail spaces, restaurants, commercial kitchens, warehouses, factories, clinics and other business premises.",
  },
  {
    question: "Do I get service reports?",
    answer:
      "Service documentation depends on the partner and the agreed scope of work. You can discuss visit records, treatment details, observations and follow-up recommendations before confirming the service.",
  },
];

const CommercialFaq = () => {
  const sectionRef = useRef(null);
  const contentRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const heading = section.querySelector(".faq-heading");
      const items = gsap.utils.toArray(".faq-item", section);

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 82%",
          once: true,
        },
        defaults: {
          ease: "power3.out",
        },
      });

      timeline
        .from(heading, {
          y: 28,
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

  useEffect(() => {
    contentRefs.current.forEach((content, index) => {
      if (!content) return;

      if (index === activeIndex) {
        gsap.to(content, {
          height: "auto",
          autoAlpha: 1,
          duration: 0.4,
          ease: "power2.out",
          overwrite: true,
        });
      } else {
        gsap.to(content, {
          height: 0,
          autoAlpha: 0,
          duration: 0.3,
          ease: "power2.inOut",
          overwrite: true,
        });
      }
    });
  }, [activeIndex]);

  const toggleFaq = (index) => {
    setActiveIndex((current) => (current === index ? null : index));
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#f1f7f3] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24"
      aria-labelledby="commercial-faq-title"
    >
      {/* Subtle background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-28 -top-28 h-72 w-72 rounded-full bg-white/70 blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-[1120px]">
        {/* Heading */}
        <div className="faq-heading mb-8 sm:mb-10 lg:mb-12">
          <span className="mb-3 inline-flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[2px] text-[#006b35] sm:text-lg">
            <span className="h-[2px] w-7 bg-[#006b35]" />
            Commercial FAQs
          </span>

          <h2
            id="commercial-faq-title"
            className="max-w-2xl text-3xl font-bold leading-tight tracking-[-0.04em] text-[#101a13] sm:text-4xl lg:text-[46px]"
          >
            Questions,
            <span className="text-[#006b35]"> answered.</span>
          </h2>

          <p className="mt-3 max-w-xl text-sm leading-6 text-[#647168] sm:text-base sm:leading-7">
            Everything you need to know before arranging pest control
            for your business.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="flex max-w-[870px] flex-col gap-3 sm:gap-3.5">
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;
            const answerId = `commercial-faq-answer-${index}`;

            return (
              <article
                key={faq.question}
                className={`faq-item overflow-hidden rounded-2xl border bg-white transition-colors duration-300 ${
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

                  {/* Plus / Minus */}
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

                {/* Animated answer */}
                <div
                  id={answerId}
                  ref={(element) => {
                    contentRefs.current[index] = element;
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

export default CommercialFaq;