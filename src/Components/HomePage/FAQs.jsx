import React, { useState } from "react";

const faqs = [
  {
    id: 1,
    question: "How does PestFind work?",
    answer:
      "Tell us about your pest problem and location. PestFind coordinates your request with a suitable service partner.",
  },
  {
    id: 2,
    question: "Does PestFind directly provide pest-control services?",
    answer:
      "PestFind coordinates your request with suitable pest-control service partners rather than directly providing the service.",
  },
  {
    id: 3,
    question: "When is my booking confirmed?",
    answer:
      "Your booking is confirmed once the selected service partner accepts your request.",
  },
  {
    id: 4,
    question: "Can I request a specific date and time?",
    answer:
      "Yes. You can provide your preferred date and time when submitting your request.",
  },
  {
    id: 5,
    question: "What if I don't know the treatment?",
    answer:
      "That's okay. Tell us about the pest problem and we can help coordinate the appropriate service.",
  },
  {
    id: 6,
    question: "Can businesses use PestFind?",
    answer:
      "Yes. PestFind can help businesses find suitable pest-control service partners for their needs.",
  },
];

const FAQs = () => {
  const [open, setOpen] = useState(null);

  const toggleFAQ = (id) => {
    setOpen((current) => (current === id ? null : id));
  };

  return (
    <section className="bg-white px-8 py-12 sm:px-6 sm:py-16 lg:px-25 lg:py-20">
      <div className="mx-auto w-full max-w-7xl">
        {/* Section heading */}
        <div className="mb-7 max-w-3xl sm:mb-9 lg:mb-10">
          <p className="mb-3 text-2xl font-bold  text-green-700 sm:text-4xl">
            FAQs
          </p>
          <h2 className="text-md font-bold leading-tight tracking-tight text-gray-950 sm:text-xl lg:text-xl">
            Questions before you request?
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-600 sm:text-base">
            Find out how PestFind works, what happens after you submit a request,
            and how to choose the right service.
          </p>
        </div>

        {/* Responsive FAQ grid: one column on mobile, two on larger screens */}
        <div className="grid grid-cols-1 items-start gap-3 sm:gap-4 md:grid-cols-2 lg:gap-5">
          {faqs.map((faq) => {
            const isOpen = open === faq.id;
            const answerId = `faq-answer-${faq.id}`;

            return (
              <article
                key={faq.id}
                className={`min-w-0 overflow-hidden rounded-2xl border bg-white transition-colors duration-200 sm:rounded-3xl ${
                  isOpen
                    ? "border-green-700/40 shadow-[0_8px_24px_rgba(0,122,67,0.07)]"
                    : "border-gray-200 shadow-sm hover:border-green-700/30"
                }`}
              >
                <h3>
                  <button
                    type="button"
                    onClick={() => toggleFAQ(faq.id)}
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    className="flex min-h-16 w-full items-center gap-3 px-4 py-4 text-left outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-green-700 sm:min-h-[76px] sm:gap-4 sm:px-5 sm:py-5"
                  >
                    <span
                      aria-hidden="true"
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors duration-200 sm:h-9 sm:w-9 ${
                        isOpen
                          ? "bg-green-700 text-white"
                          : "bg-green-50 text-green-700"
                      }`}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        className={`h-4 w-4 transition-transform duration-300 sm:h-[18px] sm:w-[18px] ${
                          isOpen ? "rotate-90" : "rotate-0"
                        }`}
                      >
                        <path
                          d="m9 18 6-6-6-6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>

                    <span className="min-w-0 flex-1 text-sm font-semibold leading-6 text-gray-900 sm:text-base">
                      {faq.question}
                    </span>

                    <span
                      aria-hidden="true"
                      className={`ml-1 shrink-0 text-xl leading-none transition-transform duration-300 ${
                        isOpen ? "rotate-45 text-green-700" : "text-gray-400"
                      }`}
                    >
                      +
                    </span>
                  </button>
                </h3>

                <div
                  id={answerId}
                  aria-hidden={!isOpen}
                  className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-4 pb-5 pl-[60px] text-sm leading-6 text-gray-600 sm:px-5 sm:pb-6 sm:pl-[76px] sm:text-[15px]">
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
