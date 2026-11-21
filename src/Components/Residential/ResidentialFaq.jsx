import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const faqData = [
  {
    question: "How quickly will someone contact me?",
    answer:
      "Once you submit your request, PestFind reviews your details and matches you with a suitable pest control partner. A matched partner will generally contact you within 24 hours to discuss your requirements and arrange the next steps.",
  },
  {
    question: "Can I get a one-time treatment or regular pest care?",
    answer:
      "Yes. You can request a one-time pest treatment or discuss recurring pest management with your matched service partner. The recommended schedule depends on your property, pest problem and treatment requirements.",
  },
  {
    question: "I do not know which pest I have.",
    answer:
      "That's completely fine. Select the 'Not Sure' option in the request form and describe what you have noticed. Your matched pest control partner can help identify the problem and suggest the appropriate treatment.",
  },
  {
    question: "I have kids or pets at home.",
    answer:
      "Let your service partner know about children, pets and any specific household concerns before treatment. Ask about the products being used, preparation instructions and the recommended time before re-entry.",
  },
  {
    question: "I manage a housing society.",
    answer:
      "PestFind can help you submit enquiries for residential communities and shared spaces. Mention your society's requirements, property details and service areas so a suitable partner can discuss your needs.",
  },
];

const FAQs = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const itemRefs = useRef([]);
  const answerRefs = useRef([]);

  const [openIndex, setOpenIndex] = useState(null);

  // Scroll entrance animations
  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) return;

      gsap.from(headingRef.current, {
        y: 30,
        autoAlpha: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 88%",
          once: true,
        },
      });

      gsap.from(itemRefs.current.filter(Boolean), {
        y: 25,
        autoAlpha: 0,
        duration: 0.65,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 78%",
          once: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  // Accordion animation
  const toggleFAQ = (index) => {
    const currentPanel = answerRefs.current[index];

    if (!currentPanel) return;

    const isClosing = openIndex === index;

    // Close currently open panel
    if (openIndex !== null) {
      const previousPanel = answerRefs.current[openIndex];

      if (previousPanel) {
        gsap.killTweensOf(previousPanel);

        gsap.to(previousPanel, {
          height: 0,
          autoAlpha: 0,
          duration: 0.35,
          ease: "power2.inOut",
        });
      }
    }

    if (isClosing) {
      setOpenIndex(null);
      return;
    }

    setOpenIndex(index);

    gsap.killTweensOf(currentPanel);

    gsap.fromTo(
      currentPanel,
      {
        height: 0,
        autoAlpha: 0,
      },
      {
        height: "auto",
        autoAlpha: 1,
        duration: 0.45,
        ease: "power3.out",
      }
    );
  };

  const handleMouseEnter = (event) => {
    if (
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    gsap.to(event.currentTarget, {
      y: -2,
      duration: 0.2,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = (event) => {
    gsap.to(event.currentTarget, {
      y: 0,
      duration: 0.2,
      ease: "power2.out",
    });
  };

  return (
    <section
      ref={sectionRef}
      id="faqs"
      className="relative w-full overflow-hidden bg-[#f2f8f4] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-15"
    >
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-white/70 blur-3xl"
      />

      <div className="relative mx-auto max-w-[1080px]">

        {/* Section heading */}
        <div
          ref={headingRef}
          className="mb-9 max-w-2xl sm:mb-12"
        >
          <span className="mb-3 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[2px] text-[#006b35] sm:text-2xl">
            <span className="h-2 w-2 rounded-full bg-[#006b35]" />
            FAQs
          </span>

          <h2 className="text-3xl font-bold leading-tight tracking-[-0.04em] text-[#07130d] sm:text-4xl lg:text-[35px]">
            Questions, answered
          </h2>

          <p className="mt-3 max-w-xl text-sm leading-7 text-[#596a60] sm:text-base">
            Everything you need to know about finding the right
            pest control partner with PestFind.
          </p>
        </div>

        {/* FAQ list */}
        <div className="max-w-[900px] space-y-3 sm:space-y-4">
          {faqData.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <article
                key={faq.question}
                ref={(el) => (itemRefs.current[index] = el)}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className={`overflow-hidden rounded-2xl border bg-white transition-colors duration-300 ${
                  isOpen
                    ? "border-[#a9cbb7] shadow-[0_8px_28px_rgba(0,80,40,0.07)]"
                    : "border-[#dce7df] shadow-[0_2px_8px_rgba(15,23,42,0.025)]"
                }`}
              >
                {/* Question button */}
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  className="flex min-h-[68px] w-full items-center justify-between gap-4 px-5 py-5 text-left sm:min-h-[76px] sm:px-6 sm:py-5 lg:px-7"
                >
                  <span className="flex min-w-0 items-center gap-4">
                    <span
                      className={`hidden h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold sm:flex ${
                        isOpen
                          ? "bg-[#006b35] text-white"
                          : "bg-[#f0f6f2] text-[#006b35]"
                      }`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="text-[14px] font-bold leading-6 text-[#101b14] sm:text-base lg:text-[17px]">
                      {faq.question}
                    </span>
                  </span>

                  {/* Plus / minus icon */}
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${
                      isOpen
                        ? "bg-[#006b35] text-white"
                        : "bg-[#eff6f1] text-[#006b35]"
                    }`}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="h-4 w-4"
                    >
                      <path
                        d="M12 5v14M5 12h14"
                        stroke="currentColor"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                        className={`origin-center transition-transform duration-300 ${
                          isOpen ? "rotate-45" : "rotate-0"
                        }`}
                      />
                    </svg>
                  </span>
                </button>

                {/* Answer panel */}
                <div
                  id={`faq-answer-${index}`}
                  ref={(el) => (answerRefs.current[index] = el)}
                  aria-hidden={!isOpen}
                  className="h-0 overflow-hidden opacity-0"
                >
                  <div className="border-t border-[#edf2ee] px-5 pb-6 pt-4 sm:px-6 sm:pb-6 sm:pl-[76px] lg:px-7 lg:pl-[83px]">
                    <p className="max-w-3xl text-[13px] leading-7 text-[#596a60] sm:text-sm sm:leading-7">
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

export default FAQs;