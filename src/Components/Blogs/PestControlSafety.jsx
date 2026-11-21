import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Leaf,
  PawPrint,
  ShieldCheck,
  Sparkles,
  Utensils,
  Baby,
  AlertTriangle,
  ClipboardCheck,
  House,
} from "lucide-react";
import Footer from "../Footer/Footer";

gsap.registerPlugin(ScrollTrigger);

const heroImage =
  "https://www.ecomip.com.br/professional_pest_control.png";
const petsImage =
  "https://static.evolution24.media/clients/client_94/haustierfreundliche-familienwohnung-mit-spielen-und-komfort_1779dcead32e65ef6571b75229fc2b6f.webp";
const kitchenImage =
  "https://www.sesoris.com/images/blog/tempat-penyimpanan-makanan-hero.webp";

const contents = [
  ["quick-answer", "Quick answer"],
  ["chemicals", "Chemicals and risk"],
  ["children", "Children and pregnancy"],
  ["pets", "Pets at home"],
  ["kitchen", "Food and the kitchen"],
  ["reentry", "When can you return?"],
  ["claims", "Herbal and odourless claims"],
  ["company-checks", "Choosing a safe company"],
  ["checklist", "Before, during and after"],
  ["exposure", "If someone is exposed"],
  ["myths", "Myths vs facts"],
  ["faqs", "FAQs"],
];

const chemicalRows = [
  {
    name: "Pyrethroid sprays",
    examples: "Deltamethrin, cypermethrin",
    use: "Cockroaches, ants, mosquitoes and flies",
    safety:
      "Follow the label and technician instructions. These products can be toxic to fish; some products, including permethrin, are especially dangerous to cats.",
  },
  {
    name: "Gel baits",
    examples: "Small, targeted placements",
    use: "Cockroaches and ants",
    safety:
      "Usually placed in small spots or cracks. Keep children and pets away from bait placements and follow the product label.",
  },
  {
    name: "Insect growth regulators",
    examples: "Products that interrupt pest development",
    use: "Managing immature pests",
    safety:
      "Often used alongside other control methods. Ask which product is being used and follow its label instructions.",
  },
  {
    name: "Termite treatments",
    examples: "Soil, wall-void or injection treatments",
    use: "Termites",
    safety:
      "Ask for the product name, the treated areas, re-entry instructions and any warranty in writing.",
  },
  {
    name: "Rodent baits",
    examples: "Anticoagulant baits",
    use: "Rats and mice",
    safety:
      "Can be dangerous if swallowed by children or pets. Ask that baits are secured in appropriate tamper-resistant stations.",
  },
  {
    name: "Fumigants",
    examples: "Gas treatments",
    use: "Specific severe or specialist infestations",
    safety:
      "Can be highly toxic and require trained operators, evacuation and formal clearance before re-entry.",
  },
];

const petRows = [
  ["Dogs", "Licking treated floors or swallowing bait", "Keep dogs out until the stated re-entry time; keep bait inaccessible."],
  ["Cats", "Some products, including permethrin, can be especially toxic", "Tell the technician you have a cat and ask for product-specific precautions."],
  ["Birds", "Fumes and sprays", "Move birds away from treatment areas and follow the product-specific ventilation instructions."],
  ["Fish", "Sprays or aerosols reaching aquarium water", "Protect the aquarium and keep products away from the water; ask the technician for instructions."],
  ["Small pets and reptiles", "Fumes and residue", "Arrange a safe location away from treatment and follow the technician's return instructions."],
];

const reentryRows = [
  ["Gel bait in cracks", "Re-entry may be short when little or no spray is used. Keep children and pets away from bait spots."],
  ["Residual spray", "Stay out until the treated area is dry and ventilated as instructed. Ask for the exact time."],
  ["Misting or fogging", "May require longer exclusion and thorough ventilation. Follow the label and technician's directions."],
  ["Termite drilling or injection", "Follow the product-specific instructions and keep people and pets away from treated or drilled areas."],
  ["Fumigation", "Return only after the licensed operator confirms clearance and says the property is safe to re-enter."],
  ["Rodent bait stations", "Leaving may not always be necessary, but children and pets must be kept away from the stations."],
];

const claimRows = [
  ["Herbal", "May refer to plant-derived ingredients, such as neem or essential oils.", "Which ingredient is used, and is it suitable for this pest?"],
  ["Odourless", "Means it has little or no noticeable smell; it is not a safety rating.", "What is the active ingredient and when can we return?"],
  ["Chemical-free", "Usually a marketing phrase; ask what method and product are actually used.", "What exactly will be applied or installed?"],
  ["Eco-friendly / green", "Could refer to a lower-impact product or method, but the term alone is not proof.", "Which standard, certification or label supports the claim?"],
  ["Child- and pet-safe", "Safety depends on the product, amount, placement and following instructions.", "What precautions and re-entry time apply to my household?"],
];

const companyChecks = [
  ["Licence and qualifications", "Ask about the operator's licence and applicable state requirements."],
  ["Product details", "Request the product name and active ingredient; confirm it is approved for the intended use in India."],
  ["Safety information", "Ask for the label or safety data sheet and written handling instructions."],
  ["Inspection first", "The provider should inspect to identify the pest, source and entry points before recommending treatment."],
  ["Trained technicians", "Ask about staff training, protective equipment and safe application practices."],
  ["Written re-entry time", "Get clear instructions for adults, children and pets before the visit."],
  ["Special needs", "Mention infants, pregnancy, asthma, allergies, older adults and pets in advance."],
  ["Records and warranty", "Ask for a service report listing the product, treated areas, date and any warranty."],
];

const faqs = [
  [
    "Is pest control safe for babies?",
    "Risk depends on the product and how it is applied. Tell the provider about the baby, ask about targeted treatments and keep the baby away until the product label and technician's instructions say it is safe to return. Clean child-contact surfaces as directed.",
  ],
  [
    "Is pest control safe for dogs and cats?",
    "Precautions vary by product and species. Keep pets away from treated areas until the specified time, secure bait placements and tell the technician which pets live in the home. Some products, including permethrin, are especially dangerous to cats.",
  ],
  [
    "How long should I stay out after pest control?",
    "There is no single time for every treatment. Follow the product label and written instructions from the technician. Sprays may require drying and ventilation; fumigation requires formal clearance before re-entry.",
  ],
  [
    "Is pest control safe during pregnancy?",
    "Tell the provider before treatment and ask about the product, exposure precautions and re-entry time. Avoid the treated area as instructed, ventilate as directed and contact a healthcare professional if you have personal concerns.",
  ],
  [
    "Is pest control safe for food and kitchens?",
    "Remove or seal food and utensils, cover water containers and follow preparation instructions. Clean food-contact surfaces as directed before cooking. Do not remove bait placements unless the technician or product instructions say to.",
  ],
  [
    "Is herbal or odourless pest control automatically safer?",
    "No. These descriptions are not safety ratings. Ask for the active ingredient, how it will be applied, whether it is suitable for the pest and the required precautions.",
  ],
  [
    "What should I do if someone may have been exposed?",
    "Move away from the treated area and seek medical or veterinary advice promptly. For skin or eye contact, rinse with clean water and follow professional instructions. Keep the product label available and do not induce vomiting unless a medical professional tells you to.",
  ],
];

function SectionHeading({ id, eyebrow, title, description }) {
  return (
    <div className="mb-7 max-w-3xl">
      {eyebrow && (
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-emerald-700">
          {eyebrow}
        </p>
      )}
      <h2 id={id} className="text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl lg:text-[2.5rem] lg:leading-tight">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}

function CheckList({ items }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-sm leading-6 text-slate-700 sm:text-base">
          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-800">
            <Check size={13} strokeWidth={3} />
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function TableWrap({ headers, rows }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-[650px] w-full border-collapse text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
            <tr>
              {headers.map((header) => (
                <th key={header} className="px-5 py-4 font-bold">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((row, index) => (
              <tr key={`${row[0]}-${index}`} className="align-top transition-colors hover:bg-emerald-50/40">
                {row.map((cell, cellIndex) => (
                  <td key={`${cellIndex}-${String(cell).slice(0, 18)}`} className={`px-5 py-4 leading-6 ${cellIndex === 0 ? "font-semibold text-slate-900" : "text-slate-600"}`}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function PestControlSafetyBlog() {
  const pageRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return undefined;

    const context = gsap.context(() => {
      gsap.set(".pf-reading-progress", { scaleX: 0, transformOrigin: "left center" });
      gsap.to(".pf-reading-progress", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: pageRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.25,
        },
      });

      gsap.from(".pf-hero-copy > *", {
        y: 22,
        opacity: 0,
        duration: 0.75,
        stagger: 0.1,
        ease: "power3.out",
        clearProps: "all",
      });
      gsap.from(".pf-hero-image", {
        y: 20,
        opacity: 0,
        scale: 0.985,
        duration: 0.9,
        delay: 0.15,
        ease: "power3.out",
        clearProps: "all",
      });

      gsap.utils.toArray(".pf-reveal").forEach((element) => {
        gsap.from(element, {
          y: 26,
          opacity: 0,
          duration: 0.65,
          ease: "power2.out",
          clearProps: "all",
          scrollTrigger: {
            trigger: element,
            start: "top 88%",
            once: true,
          },
        });
      });
    }, pageRef);

    return () => context.revert();
  }, []);

  return (
    <div ref={pageRef} className="min-h-screen overflow-clip bg-[#f6f8f5] text-slate-900 selection:bg-emerald-200 selection:text-emerald-950">
      <div className="pf-reading-progress fixed inset-x-0 top-0 z-[60] h-1 origin-left bg-emerald-600" />

      

      <main>
        {/* Hero */}
        <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-14 pt-10 sm:px-6 sm:pb-20 sm:pt-16 lg:grid-cols-[1.03fr_.97fr] lg:gap-14 lg:px-8 lg:pb-24 lg:pt-20">
          <div className="pf-hero-copy relative z-10">
            <div className="mb-6 flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-emerald-800">
              <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5">PestFind Journal</span>
              <span className="text-slate-400">Safety guide</span>
            </div>
            <h1 className="max-w-3xl text-4xl font-bold leading-[1.08] tracking-[-0.045em] text-slate-950 sm:text-5xl lg:text-[4.35rem]">
              Pest control safety for <span className="text-emerald-700">kids, pets and food.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
              Know what to cover, which questions to ask and when it is safe to return home. A practical guide to making informed decisions before and after a pest treatment.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3 text-sm text-slate-500">
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 ring-1 ring-slate-200"><BookOpen size={15} className="text-emerald-700" /> Practical guide</span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 ring-1 ring-slate-200"><Clock3 size={15} className="text-emerald-700" /> Safety checklist included</span>
            </div>
            <a href="#quick-answer" className="mt-9 inline-flex items-center gap-2 text-sm font-bold text-emerald-800 transition hover:gap-3">
              Read the guide <ArrowDownRight size={17} />
            </a>
          </div>

          <div className="pf-hero-image relative">
            <div className="absolute -inset-4 -rotate-2 rounded-[2rem] bg-emerald-100/80 sm:-inset-5 sm:rounded-[2.5rem]" />
            <div className="relative overflow-hidden rounded-[1.7rem] bg-slate-200 shadow-[0_30px_80px_-38px_rgba(15,23,42,0.45)] sm:rounded-[2.2rem]">
              <img
                src={heroImage}
                alt="Pest control technician using professional protective equipment during a residential treatment"
                className="h-[340px] w-full object-cover object-center sm:h-[480px] lg:h-[540px]"
                fetchPriority="high"
                onError={(event) => {
                  event.currentTarget.src = "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1400&q=85";
                }}
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 via-slate-950/35 to-transparent p-5 pt-24 sm:p-7 sm:pt-28">
                <div className="flex items-start gap-3 text-white">
                  <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/30 backdrop-blur"><ShieldCheck size={21} /></span>
                  <div>
                    <p className="font-semibold">Safety starts with clear instructions</p>
                    <p className="mt-1 text-sm leading-6 text-white/80">Always ask for the product name and written re-entry guidance.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-5 -left-2 hidden items-center gap-3 rounded-2xl border border-white bg-white p-4 shadow-xl sm:flex lg:-left-8">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700"><ClipboardCheck size={22} /></span>
              <span><span className="block text-sm font-bold text-slate-900">Prepare. Treat. Re-enter.</span><span className="mt-1 block text-xs text-slate-500">A simple safety sequence</span></span>
            </div>
          </div>
        </section>

        {/* Quick answer band */}
        <section id="quick-answer" className="pf-reveal border-y border-emerald-100 bg-[#eaf4ec]">
          <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 sm:py-10 lg:grid-cols-[240px_1fr] lg:gap-12 lg:px-8 lg:py-12">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-800">Quick answer</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">Is pest control safe?</h2>
            </div>
            <div>
              <p className="text-base leading-7 text-slate-700 sm:text-lg sm:leading-8">
                Risk depends on the product, application and household. Use a qualified provider, follow the product label and written instructions, keep children and pets away for the specified time, and ask when the treated area can be re-entered. No treatment should be assumed risk-free.
              </p>
              <div className="mt-5 flex items-start gap-3 rounded-xl border border-emerald-200 bg-white/80 p-4 text-sm leading-6 text-slate-700">
                <AlertTriangle size={19} className="mt-0.5 shrink-0 text-emerald-800" />
                <p><strong className="text-slate-950">Before the visit:</strong> get the product name, preparation steps and re-entry time in writing. Tell the provider about children, pregnancy, older adults, asthma, allergies and every pet in the home.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Article + TOC */}
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-16 lg:px-8">
          <aside className="hidden lg:block">
            <div className="sticky top-28 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-slate-500">In this guide</p>
              <nav className="space-y-1.5" aria-label="Article contents">
                {contents.map(([id, label], index) => (
                  <a key={id} href={`#${id}`} className="group flex items-center gap-3 rounded-lg px-2.5 py-2 text-sm text-slate-600 transition hover:bg-emerald-50 hover:text-emerald-800">
                    <span className="w-5 text-[10px] font-bold text-slate-400 group-hover:text-emerald-700">{String(index + 1).padStart(2, "0")}</span>
                    <span>{label}</span>
                  </a>
                ))}
              </nav>
              <div className="mt-5 border-t border-slate-100 pt-5">
                <a href="/#pest-request-form" className="flex items-center justify-between gap-3 rounded-xl bg-emerald-700 px-4 py-3 text-sm font-bold text-white transition hover:bg-emerald-800">
                  Request pest help <ArrowUpRight size={16} />
                </a>
              </div>
            </div>
          </aside>

          <article className="min-w-0 space-y-16 sm:space-y-20">
            <section id="chemicals" className="pf-reveal scroll-mt-28" aria-labelledby="chemicals-title">
              <SectionHeading id="chemicals-title" eyebrow="01 · Know what is used" title="What chemicals are used in pest control?" description="Different products have different risks. The name of the active ingredient, how it is applied and the label instructions matter more than a broad claim such as “mild” or “strong”." />
              <p className="mb-6 leading-7 text-slate-600">Common residential treatments may include sprays, gel baits, insect growth regulators and termite products. Rodent baits and fumigants need particularly careful handling. Ask the provider what will be used and why it is appropriate for your pest problem.</p>
              <TableWrap headers={["Product type", "Typical use", "Safety point"]} rows={chemicalRows.map((row) => [`${row.name}${row.examples ? ` · ${row.examples}` : ""}`, row.use, row.safety])} />
              <div className="mt-5 flex gap-3 rounded-2xl bg-amber-50 p-5 ring-1 ring-amber-100">
                <AlertTriangle className="mt-0.5 shrink-0 text-amber-700" size={21} />
                <p className="text-sm leading-6 text-amber-950"><strong>Never accept improvised fumigation.</strong> Gas treatments can be highly toxic and should be handled only by trained, qualified operators with proper evacuation and clearance procedures. Ask whether the product is approved for the intended use in India.</p>
              </div>
            </section>

            <section id="children" className="pf-reveal scroll-mt-28" aria-labelledby="children-title">
              <SectionHeading id="children-title" eyebrow="02 · Protect sensitive household members" title="Children, pregnancy and older adults" description="Children can have more contact with floors and low surfaces. Tell the provider about infants, pregnancy, older adults and anyone with asthma or allergies before the treatment begins." />
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700"><Baby size={23} /></span>
                  <h3 className="mt-4 text-lg font-semibold text-slate-950">Before treatment</h3>
                  <div className="mt-4"><CheckList items={["Tell the provider about infants, pregnancy and health sensitivities.", "Ask whether targeted methods, such as gel bait or crack treatment, are suitable.", "Remove or cover toys, bottles, feeding items and pacifiers.", "Get preparation and re-entry steps in writing."]} /></div>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-50 text-sky-700"><ShieldCheck size={23} /></span>
                  <h3 className="mt-4 text-lg font-semibold text-slate-950">Before returning</h3>
                  <div className="mt-4"><CheckList items={["Keep children out until the stated re-entry conditions are met.", "Ventilate as directed by the product label and technician.", "Clean child-contact surfaces as instructed.", "Store baits and any leftover products securely out of reach."]} /></div>
                </div>
              </div>
              <p className="mt-5 text-sm leading-6 text-slate-600">Pregnant people, people with asthma or allergies, and older adults should discuss individual concerns with an appropriate healthcare professional and follow the product-specific instructions.</p>
            </section>

            <section id="pets" className="pf-reveal scroll-mt-28" aria-labelledby="pets-title">
              <SectionHeading id="pets-title" eyebrow="03 · Plan for pets" title="Is pest control safe for dogs, cats, birds and fish?" description="Pets differ in how they may be exposed. Tell the technician which animals live in the home and follow the product-specific instructions for moving them, protecting food and water, and returning safely." />
              <div className="mb-6 overflow-hidden rounded-3xl bg-slate-100">
                <img src={petsImage} alt="Dog and cat relaxing in a bright, pet-friendly living room" className="h-60 w-full object-cover sm:h-80" loading="lazy" onError={(event) => { event.currentTarget.style.display = "none"; }} />
              </div>
              <TableWrap headers={["Pet", "Main exposure concern", "What to do"]} rows={petRows} />
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {[
                  [PawPrint, "Move bowls", "Remove food and water bowls before treatment; wash them before putting them back."],
                  [ShieldCheck, "Block access", "Keep pets away from treated areas and every bait station for the stated period."],
                  [AlertTriangle, "Call a vet", "If a pet seems unwell, contact a veterinarian promptly and share the product name or label."],
                ].map(([Icon, title, copy]) => (
                  <div key={title} className="rounded-2xl border border-slate-200 bg-white p-5">
                    <Icon size={21} className="text-emerald-700" />
                    <h3 className="mt-3 font-semibold text-slate-950">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{copy}</p>
                  </div>
                ))}
              </div>
            </section>

            <section id="kitchen" className="pf-reveal scroll-mt-28" aria-labelledby="kitchen-title">
              <SectionHeading id="kitchen-title" eyebrow="04 · Keep food protected" title="Food safety and the kitchen" description="The kitchen often needs attention because pests can hide near food, water and cupboards. Preparation and correct product placement are essential." />
              <div className="mb-7 overflow-hidden rounded-3xl bg-slate-100">
                <img src={kitchenImage} alt="Food stored in sealed transparent containers on a clean kitchen counter" className="h-56 w-full object-cover sm:h-72" loading="lazy" onError={(event) => { event.currentTarget.style.display = "none"; }} />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-white p-6">
                  <h3 className="flex items-center gap-2 font-semibold text-slate-950"><Utensils size={19} className="text-emerald-700" /> Before treatment</h3>
                  <div className="mt-4"><CheckList items={["Empty cupboards and the space under the sink if requested.", "Seal food, grains, oil and spices in closed containers.", "Remove or cover plates, cookware and utensils.", "Protect water filters and drinking-water containers."]} /></div>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-6">
                  <h3 className="flex items-center gap-2 font-semibold text-slate-950"><CheckCircle2 size={19} className="text-emerald-700" /> After treatment</h3>
                  <div className="mt-4"><CheckList items={["Wait until the stated re-entry time has passed.", "Clean food-contact surfaces as instructed before preparing food.", "Wash dishes and utensils that were left uncovered.", "Do not wipe away bait placements unless instructed."]} /></div>
                </div>
              </div>
              <p className="mt-5 rounded-xl bg-slate-100 p-4 text-sm leading-6 text-slate-700"><strong className="text-slate-950">For restaurants and food businesses:</strong> request written records of products, treated areas and dates. Schedule work when the premises are not handling food where possible, and protect exposed food and packaging.</p>
            </section>

            <section id="reentry" className="pf-reveal scroll-mt-28" aria-labelledby="reentry-title">
              <SectionHeading id="reentry-title" eyebrow="05 · Know when to return" title="How long should you stay out after pest control?" description="There is no universal re-entry time. It depends on the product, the application method and the label. Get the exact instruction from the technician before the visit ends." />
              <TableWrap headers={["Treatment type", "General guidance"]} rows={reentryRows} />
              <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
                <p className="font-semibold text-emerald-950">Ask before the technician leaves</p>
                <p className="mt-2 text-sm leading-6 text-emerald-900">“What is the exact re-entry time for this product, when should we ventilate, and are there any surfaces we should not clean?” Ask for the answer in writing.</p>
              </div>
            </section>

            <section id="claims" className="pf-reveal scroll-mt-28" aria-labelledby="claims-title">
              <SectionHeading id="claims-title" eyebrow="06 · Look beyond the label" title="Are herbal, odourless or ‘chemical-free’ treatments safer?" description="These phrases describe marketing claims, not a complete safety assessment. A product's ingredients, application, amount and label instructions are the more useful details." />
              <TableWrap headers={["Claim", "What it may mean", "What to ask"]} rows={claimRows} />
              <div className="mt-7 rounded-3xl bg-green-800 p-6 text-white sm:p-8">
                <div className="flex items-start gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-400/15 text-emerald-300"><Leaf size={25} /></span>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">A practical approach</p>
                    <h3 className="mt-2 text-xl font-semibold sm:text-2xl">Ask about integrated pest management</h3>
                    <p className="mt-3 leading-7 text-slate-300">Integrated pest management combines inspection, prevention and monitoring with targeted treatment where needed. It focuses on the cause of the pest problem rather than relying only on widespread spraying.</p>
                  </div>
                </div>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {["Inspect to identify the pest and its entry points", "Reduce food, water and clutter that support pests", "Seal cracks and improve screens or drain covers", "Use targeted treatment and follow-up monitoring"].map((step, index) => (
                    <div key={step} className="flex gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-400/15 text-xs font-bold text-emerald-300">0{index + 1}</span>
                      <p className="text-sm leading-6 text-slate-200">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section id="company-checks" className="pf-reveal scroll-mt-28" aria-labelledby="company-title">
              <SectionHeading id="company-title" eyebrow="07 · Ask before booking" title="How to check whether a pest control company is safety-focused" description="A reliable provider should explain the treatment, give clear instructions and answer reasonable safety questions. Use this checklist when comparing service providers." />
              <div className="grid gap-3 sm:grid-cols-2">
                {companyChecks.map(([title, copy], index) => (
                  <div key={title} className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-sm font-extrabold text-emerald-800">{index + 1}</span>
                    <div>
                      <h3 className="font-semibold text-slate-950">{title}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{copy}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-sm leading-6 text-slate-500">PestFind should add verified, specific information about its provider screening, licences and service records here before publishing any claims about its own process.</p>
            </section>

            <section id="checklist" className="pf-reveal scroll-mt-28" aria-labelledby="checklist-title">
              <SectionHeading id="checklist-title" eyebrow="08 · Save this checklist" title="Before, during and after treatment" description="Use this quick preparation list so important steps are not missed on service day." />
              <div className="space-y-4">
                {[
                  { title: "Before the visit", icon: ClipboardCheck, tone: "emerald", items: ["Tell the provider about infants, pregnancy, asthma, allergies, older adults and pets.", "Remove or cover food, utensils, toys, pet bowls and water filters.", "Protect aquariums as directed and move birds or small pets away from treatment.", "Read the written preparation plan and note the product name."] },
                  { title: "During the visit", icon: House, tone: "sky", items: ["Keep people and pets out of the treatment area as instructed.", "Do not touch treated surfaces or bait placements.", "Follow the technician's ventilation and access instructions."] },
                  { title: "After the visit", icon: CheckCircle2, tone: "amber", items: ["Return only after the stated re-entry time and conditions are met.", "Clean food-contact, child-contact and pet-resting surfaces as instructed.", "Wash exposed utensils and pet bowls.", "Keep bait placements in place unless advised otherwise.", "Save the service report and product information."] },
                ].map(({ title, icon: Icon, items }) => (
                  <div key={title} className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
                    <h3 className="flex items-center gap-3 text-lg font-semibold text-slate-950"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700"><Icon size={21} /></span>{title}</h3>
                    <div className="mt-5"><CheckList items={items} /></div>
                  </div>
                ))}
              </div>
            </section>

            <section id="exposure" className="pf-reveal scroll-mt-28" aria-labelledby="exposure-title">
              <SectionHeading id="exposure-title" eyebrow="09 · Act quickly" title="What if a person or pet may have been exposed?" description="If someone feels unwell after treatment or may have contacted a product, move them away from the treated area and seek appropriate medical or veterinary advice promptly." />
              <div className="rounded-3xl border border-rose-200 bg-rose-50 p-6 sm:p-8">
                <div className="flex gap-3">
                  <AlertTriangle size={23} className="mt-0.5 shrink-0 text-rose-700" />
                  <div>
                    <h3 className="text-lg font-semibold text-rose-950">Potential exposure needs prompt attention</h3>
                    <p className="mt-2 text-sm leading-6 text-rose-900">Warning signs may include headache, dizziness, nausea, vomiting, skin or eye irritation, coughing, breathing difficulty, tremors or unusual weakness. Pets may also drool, vomit, tremble or behave unusually.</p>
                  </div>
                </div>
                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <div className="rounded-2xl bg-white/85 p-5">
                    <h4 className="font-semibold text-slate-950">For a person</h4>
                    <CheckList items={["Move to fresh air and away from the treated area.", "Remove contaminated clothing.", "Rinse affected skin or eyes with clean water.", "Contact a doctor or emergency services; in India, call 112 for emergencies.", "Keep the product name or label available."]} />
                  </div>
                  <div className="rounded-2xl bg-white/85 p-5">
                    <h4 className="font-semibold text-slate-950">For a pet</h4>
                    <CheckList items={["Move the pet away from the treated area.", "Contact a veterinarian immediately.", "Take the product name or label with you.", "Do not use home remedies unless the vet advises."]} />
                  </div>
                </div>
                <p className="mt-5 text-xs leading-5 text-rose-900">This section is general information, not medical or veterinary advice. Before publishing, verify current poison-information contact details and have this section reviewed by a qualified professional.</p>
              </div>
            </section>

            <section id="myths" className="pf-reveal scroll-mt-28" aria-labelledby="myths-title">
              <SectionHeading id="myths-title" eyebrow="10 · Myth check" title="Pest control safety: myths vs facts" description="Smell, marketing words and the amount sprayed are not reliable measures of product safety or effectiveness." />
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                {[
                  ["A strong smell means it works better.", "Smell does not measure strength or effectiveness. Follow the product label."],
                  ["Odourless means safe.", "A lack of smell does not mean a product is harmless."],
                  ["Natural or herbal products are always safe.", "Plant-derived products can still cause harm and may not work for every pest."],
                  ["More chemical means faster results.", "Overuse can increase exposure risks. Correct placement and following the label matter."],
                  ["It is safe to return immediately.", "Follow the exact re-entry and ventilation instructions for the treatment."],
                  ["Pest control is only about chemicals.", "Inspection, exclusion, cleaning and monitoring are important parts of lasting control."],
                ].map(([myth, fact], index) => (
                  <div key={myth} className={`grid gap-3 p-5 sm:grid-cols-[.85fr_1.15fr] sm:gap-6 ${index ? "border-t border-slate-100" : ""}`}>
                    <div className="flex gap-2 text-sm font-semibold leading-6 text-slate-700"><span className="text-rose-500">×</span>{myth}</div>
                    <div className="flex gap-2 text-sm leading-6 text-slate-600"><Check size={17} className="mt-0.5 shrink-0 text-emerald-700" />{fact}</div>
                  </div>
                ))}
              </div>
            </section>

            <section id="faqs" className="pf-reveal scroll-mt-28" aria-labelledby="faqs-title">
              <SectionHeading id="faqs-title" eyebrow="11 · Common questions" title="Pest control safety FAQs" description="Quick answers to the questions households most often ask before arranging a treatment." />
              <div className="space-y-3">
                {faqs.map(([question, answer], index) => (
                  <details key={question} className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm open:border-emerald-200 open:bg-emerald-50/30 sm:p-6" open={index === 0}>
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-slate-950 marker:hidden">
                      <span>{question}</span>
                      <ChevronDown size={19} className="shrink-0 text-slate-400 transition-transform group-open:rotate-180 group-open:text-emerald-700" />
                    </summary>
                    <p className="mt-4 max-w-3xl pr-2 text-sm leading-7 text-slate-600 sm:text-base">{answer}</p>
                  </details>
                ))}
              </div>
            </section>

            {/* Conclusion */}
            <section className="pf-reveal overflow-hidden rounded-[2rem] bg-green-800 p-7 text-white sm:p-10 lg:p-12">
              <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300/25 bg-emerald-300/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-emerald-200"><Sparkles size={14} /> Key takeaways</div>
                  <h2 className="mt-5 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">A safer treatment starts with better questions.</h2>
                  <p className="mt-4 max-w-2xl leading-7 text-slate-300">Ask what product will be used, why it is appropriate, which precautions apply and when you can return. Protect food, children and pets, and keep the service record for future reference.</p>
                </div>
                <a href="/#pest-request-form" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-extrabold text-emerald-950 transition hover:-translate-y-0.5 hover:bg-emerald-300">
                  Request pest help <ArrowRight size={17} />
                </a>
              </div>
            </section>
          </article>
        </div>

        {/* Related resources */}
        <section className="border-t border-slate-200 bg-white py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="pf-reveal mb-7 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700">Keep learning</p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">Make your home less inviting to pests</h2>
              </div>
              <a href="/blog" className="inline-flex items-center gap-2 text-sm font-bold text-emerald-800 hover:gap-3">Explore the journal <ArrowRight size={16} /></a>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {[
                { icon: House, title: "Seal entry points", text: "Look for gaps around doors, pipes and windows, and fix the conditions that attract pests." },
                { icon: Utensils, title: "Protect food and water", text: "Store food in closed containers, clean spills and reduce standing water." },
                { icon: ClipboardCheck, title: "Keep service records", text: "Save product names, treatment dates and written aftercare instructions." },
              ].map(({ icon: Icon, title, text }) => (
                <div key={title} className="pf-reveal rounded-2xl border border-slate-200 bg-[#f8faf8] p-6 transition hover:-translate-y-1 hover:shadow-lg">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800"><Icon size={22} /></span>
                  <h3 className="mt-4 font-semibold text-slate-950">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
