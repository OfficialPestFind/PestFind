import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  AlertTriangle,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  BookOpen,
  BriefcaseBusiness,
  Building2,
  CalendarClock,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  CircleDollarSign,
  ClipboardCheck,
  ClipboardList,
  Clock3,
  FileText,
  Home,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Search,
  ShieldCheck,
  ShieldAlert,
  Star,
  Users,
  Wrench,
  X,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=2000&q=88";
const INSPECTION_IMAGE =
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85";

const tocItems = [
  { id: "quick-answer", label: "Quick answer" },
  { id: "why-confusing", label: "Why choosing feels confusing" },
  { id: "shortlist", label: "Build a shortlist" },
  { id: "cost", label: "Pest control cost" },
  { id: "questions", label: "10 questions to ask" },
  { id: "visit", label: "What happens during a visit" },
  { id: "frequency", label: "How often you need treatment" },
  { id: "residential-commercial", label: "Residential vs commercial" },
  { id: "contract", label: "One-time vs annual plan" },
  { id: "safety", label: "Safety for children and pets" },
  { id: "red-flags", label: "Warning signs" },
  { id: "prepare", label: "Prepare your home" },
  { id: "faqs", label: "FAQs" },
];

const providerRows = [
  [
    "National or large brand",
    "Trained staff, standard process, written contracts and a wider service range.",
    "Often higher price; the technician may change between visits.",
    "Apartments, offices and businesses that need records.",
  ],
  [
    "Local independent company",
    "Faster response, flexible pricing and local knowledge.",
    "Quality varies; check the licence and reviews carefully.",
    "Homes and small shops in one area.",
  ],
  [
    "Unlicensed or one-person operator",
    "May offer the lowest price.",
    "No verified licence, unclear products, no warranty or follow-up.",
    "Not recommended, especially where children or pets live.",
  ],
];

const costFactors = [
  ["Size of the home", "Larger homes need more time and product."],
  ["Type of pest", "Termites, bed bugs and rodents often need more work than ants or cockroaches."],
  ["Severity", "A large infestation may need stronger or repeated treatment."],
  ["Method", "Gel, spray, dust, injection and drilling have different costs."],
  ["Number of visits", "Follow-up visits can make the treatment more effective."],
  ["Warranty", "A longer written warranty may be included in the quote."],
  ["Access and location", "Hard-to-reach areas, high floors or large compounds can add time."],
];

const quoteRows = [
  ["Scope", "Which rooms and which pests are covered?"],
  ["Visits", "How many visits are included, and when?"],
  ["Warranty", "How long is it, what is covered, and is it in writing?"],
  ["Re-treatment", "Is a repeat visit included if pests return?"],
  ["Products", "Which product names and active ingredients will be used?"],
  ["Taxes", "Is GST included or extra?"],
];

const hiringQuestions = [
  "Are you licensed? Can you share the licence details?",
  "Which products will you use, and what are their active ingredients?",
  "Will you inspect the property before giving a quote?",
  "Which pest do you believe is present, and how did you identify it?",
  "How many visits are included?",
  "Is there a written warranty, and what does it cover?",
  "How long must we stay out, and when can children and pets return?",
  "Who will visit my home? Is the technician trained and carrying ID?",
  "How should I prepare my home before treatment?",
  "What is the total cost, including taxes and any extra charges?",
];

const visitSteps = [
  ["Inspection", "The technician checks kitchens, bathrooms, drains, cabinets, balconies and entry points for pests and signs of activity."],
  ["Identification", "The pest and the likely level of infestation are identified, often with photos."],
  ["Plan and quote", "The method, products, number of visits and total cost are explained before work starts."],
  ["Treatment", "The method depends on the pest—for example, gel bait and crack treatment for cockroaches, or drilling and injection for termites."],
  ["Instructions", "You are told how long to stay out, what to clean and what to avoid afterwards."],
  ["Follow-up", "A later visit checks the results and re-treats where needed."],
];

const frequencyRows = [
  ["General home prevention", "Every 3–6 months", "Helps address recurring issues before they establish."],
  ["Active cockroaches or ants", "Follow-up in 2–3 weeks", "Newly hatched nymphs or eggs may survive the first visit."],
  ["Termites", "Annual inspection is common", "Damage can be hidden and slow to appear."],
  ["Rodents", "Ongoing monitoring", "They may return if entry points remain open."],
  ["Bed bugs", "Two or three visits over several weeks", "Eggs can hatch after the first treatment."],
  ["Mosquitoes", "Seasonal; before and during monsoon", "Breeding can rise where water stagnates."],
  ["New home or renovation", "Before moving in", "Empty rooms are easier to inspect and treat."],
  ["Restaurant or food business", "Monthly or more often, as needed", "Audits may require up-to-date pest-control records."],
];

const residentialCommercialRows = [
  ["Main goal", "Remove pests and protect the household.", "Protect food, stock, reputation and business operations."],
  ["Schedule", "One-time or recurring every few months.", "Regular fixed schedule, often monthly."],
  ["Records", "Service report.", "Detailed logs may be needed for audits."],
  ["Scale", "Rooms and a home.", "Kitchens, storage, loading areas and larger premises."],
  ["Timing", "Usually a daytime visit.", "Often after hours to reduce disruption."],
  ["Contract", "More flexible.", "Often an annual contract."],
];

const contractRows = [
  ["Best for", "A single, small problem or before moving in.", "Repeat problems, shared buildings and businesses."],
  ["Cost", "Lower upfront cost.", "May cost less per visit across the year."],
  ["Follow-up", "May be limited.", "Scheduled visits may be included."],
  ["Warranty", "Often shorter.", "May cover the full contract term."],
  ["Risk to consider", "Pests return and you pay again.", "You may pay for visits you do not need."],
];

const redFlags = [
  "No licence or verifiable company address.",
  "A fixed price over the phone without an inspection.",
  "Pressure to book or pay immediately for a special price.",
  "An unusually low quote compared with other written quotes.",
  "Refusal to name the products or use of a ‘secret formula’ explanation.",
  "No written agreement, service report, warranty or follow-up plan.",
  "Promises such as ‘100% permanent’ or ‘pests will never return.’",
  "No follow-up visit for problems that commonly need one.",
  "Full payment requested upfront for a multi-visit service.",
  "No technician ID, uniform or clear company identity.",
  "Reviews that look copied or were all posted within a few days.",
];

const prepBefore = [
  "Empty kitchen cabinets and the area under the sink.",
  "Cover or store food, utensils and pet bowls.",
  "Move furniture slightly away from walls where asked.",
  "Cover fish tanks and move pets out of treatment areas.",
  "Tell the technician about allergies, infants and pregnancy.",
];
const prepAfter = [
  "Stay out for the exact time provided by the technician and product label.",
  "Ventilate the home before returning, as instructed.",
  "Do not wipe treated cracks and corners unless advised.",
  "Some pests may still appear for a few days as they leave hiding places.",
  "Do not spray another insecticide over bait or treated spots.",
  "Keep the follow-up date and contact the company if pests continue.",
];

const faqs = [
  [
    "How do I find the best pest control near me?",
    "Search for providers with recent local reviews, read lower-rated reviews, check licence details and product information, then compare three written quotes. Prefer a company that inspects first and explains follow-up visits and warranty terms.",
  ],
  [
    "How much does pest control cost?",
    "Cost depends on property size, pest type, severity, treatment method, number of visits and warranty. Ask for at least three written quotes and compare exactly what each includes.",
  ],
  [
    "Is professional pest control worth it?",
    "It can be worthwhile when a problem is large, keeps returning, or involves pests such as termites, bed bugs or rodents. For a small new problem, prevention and appropriate DIY steps may be enough.",
  ],
  [
    "How long does a pest-control visit take?",
    "A home visit commonly takes one to a few hours, depending on the size of the property and the pest. Full results may take weeks and may require a follow-up visit.",
  ],
  [
    "How long should I stay out after treatment?",
    "Follow the technician's instructions and the product label. Re-entry time depends on the product and method; ask for the exact time in writing.",
  ],
  [
    "Is pest control safe for pets and babies?",
    "Risk is lower when a trained technician uses approved products as labelled and you follow re-entry instructions. Tell the company about infants, pregnancy, pets, asthma or allergies and ask what products will be used.",
  ],
  [
    "How often should I get pest control?",
    "For recurring problems, many homes arrange treatment every three to six months. Active infestations may need a follow-up in two to three weeks; the right schedule depends on the pest and property.",
  ],
  [
    "Should I choose a one-time treatment or an annual plan?",
    "A one-time treatment may suit a single light problem. An annual plan may suit recurring issues, shared buildings and businesses when its scheduled visits and warranty are useful to you.",
  ],
  [
    "Do I need pest control if I only see a few pests?",
    "Not always, but repeat sightings, daytime activity or pests in multiple rooms deserve attention. Check for signs of activity and ask a professional if the issue continues.",
  ],
  [
    "What should I ask before hiring a pest-control company?",
    "Ask about licensing, product names, inspection, visits included, warranty, re-entry times, technician identity, preparation instructions and the total cost in writing.",
  ],
];

function SectionHeading({ eyebrow, number, title, description }) {
  return (
    <div className="pcg-section-heading pcg-reveal mb-6">
      <div className="mb-2 flex items-center gap-3">
        {number && (
          <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e6f5ec] text-sm font-extrabold text-[#087a43] ring-1 ring-[#ccebd9]">
            {number}
          </span>
        )}
        {eyebrow && (
          <span className="rounded-full border border-[#b6e2c9] bg-[#f0faf4] px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#087a43]">
            {eyebrow}
          </span>
        )}
      </div>
      <h2 className="max-w-4xl text-2xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-3xl lg:text-[2.1rem]">
        {title}
      </h2>
      {description && <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">{description}</p>}
      <div className="mt-4 h-1 w-14 rounded-full bg-[#0d9252]" />
    </div>
  );
}

function DataTable({ headers, rows, minWidth = "min-w-[640px]" }) {
  return (
    <div className="pcg-reveal overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className={`w-full ${minWidth} border-collapse text-left text-sm`}>
          <thead className="bg-[#e8f6ee] text-slate-900">
            <tr>
              {headers.map((header) => (
                <th key={header} className="border-b border-[#d3e9dc] px-4 py-3 font-bold">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={`${row[0]}-${index}`} className={index % 2 ? "bg-slate-50/60" : "bg-white"}>
                {row.map((cell, cellIndex) => (
                  <td key={`${cellIndex}-${String(cell).slice(0, 10)}`} className={`border-b border-slate-100 px-4 py-3.5 align-top leading-6 text-slate-600 last:border-b-0 ${cellIndex === 0 ? "font-bold text-slate-900" : ""}`}>
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

function CheckList({ items, columns = 1, numbered = false }) {
  return (
    <ul className={`grid gap-3 ${columns === 2 ? "sm:grid-cols-2" : "grid-cols-1"}`}>
      {items.map((item, index) => (
        <li key={item} className="flex items-start gap-3 text-sm leading-6 text-slate-700">
          <span className={`mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${numbered ? "bg-[#0d9252] text-white" : "bg-[#e5f5ec] text-[#087a43]"} text-xs font-bold`}>
            {numbered ? index + 1 : <Check size={14} strokeWidth={3} />}
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function PestControlNearMeGuide() {
  const rootRef = useRef(null);
  const progressRef = useRef(null);
  const [mobileTocOpen, setMobileTocOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("quick-answer");
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const ctx = gsap.context(() => {
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reducedMotion) return;

      gsap.from(".pcg-hero-content > *", {
        y: 22,
        opacity: 0,
        duration: 0.72,
        stagger: 0.09,
        ease: "power3.out",
        delay: 0.08,
      });

      gsap.utils.toArray(".pcg-reveal", root).forEach((element) => {
        gsap.fromTo(
          element,
          { y: 20, opacity: 0.35 },
          {
            y: 0,
            opacity: 1,
            duration: 0.65,
            ease: "power2.out",
            scrollTrigger: { trigger: element, start: "top 90%", once: true },
          }
        );
      });

      ScrollTrigger.create({
        trigger: root.querySelector(".pcg-article-start"),
        start: "top top",
        endTrigger: root.querySelector(".pcg-article-end"),
        end: "bottom bottom",
        onUpdate: (self) => {
          if (progressRef.current) gsap.set(progressRef.current, { scaleX: self.progress });
        },
      });

      tocItems.forEach(({ id }) => {
        const section = root.querySelector(`#${id}`);
        if (!section) return;
        ScrollTrigger.create({
          trigger: section,
          start: "top 32%",
          end: "bottom 32%",
          onEnter: () => setActiveSection(id),
          onEnterBack: () => setActiveSection(id),
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  const handleTocClick = (id) => {
    setMobileTocOpen(false);
    const element = rootRef.current?.querySelector(`#${id}`);
    element?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div ref={rootRef} className="min-h-screen bg-[#fbfdfb] font-sans text-slate-900 selection:bg-[#c9f0d8] selection:text-[#064e2d]">
      <div className="fixed inset-x-0 top-0 z-[70] h-1 origin-left bg-[#0d9252]" ref={progressRef} style={{ transform: "scaleX(0)" }} />

      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-[#071d15] text-white">
        <img src={HERO_IMAGE} alt="A residential property interior" className="absolute inset-0 -z-20 h-full w-full object-cover object-center" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#061a12] via-[#061a12]/90 to-[#061a12]/25" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#061a12]/55 via-transparent to-[#061a12]/10" />
        <div className="mx-auto grid min-h-[440px] max-w-7xl items-center px-4 py-12 sm:px-6 sm:py-16 lg:min-h-[490px] lg:grid-cols-[1.12fr_.88fr] lg:px-17">
          <div className="pcg-hero-content max-w-3xl">
            
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/25 bg-emerald-400/10 px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.18em] text-emerald-200">
              <MapPin size={13} /> Service selection guide
            </span>
            <h1 className="mt-5 max-w-3xl text-4xl font-black leading-[1.06] tracking-tight sm:text-5xl lg:text-[3.55rem]">
              Pest Control Near Me:
              <span className="mt-1 block text-[#8ff0b4]">How to Choose the Right Service</span>
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/80 sm:text-lg sm:leading-8">
              Compare companies with confidence. Learn what affects the cost, what a good service includes, which questions to ask and the warning signs to avoid.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-white/75">
              <span className="inline-flex items-center gap-2"><span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15"><Users size={14} /></span> PestFind Team</span>
              <span className="inline-flex items-center gap-2"><CalendarClock size={16} /> Oct 28, 2026</span>
              <span className="inline-flex items-center gap-2"><Clock3 size={16} /> 10 min read</span>
            </div>
            <div className="mt-8 flex gap-3">
              <a href="/#pest-request-form" className="inline-flex items-center gap-2 rounded-full bg-[#14a35c] px-3 py-2 text-sm font-extrabold text-white shadow-lg shadow-black/15 transition hover:-translate-y-0.5 hover:bg-[#0e8d4d]">Get a free quote <ArrowRight size={16} /></a>
              <button type="button" onClick={() => handleTocClick("quick-answer")} className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/15">Read the guide <ArrowUpRight size={16} /></button>
            </div>
          </div>
          <div className="hidden justify-end lg:flex">
            <div className="max-w-[300px] rounded-3xl border border-white/15 bg-white/10 p-5 shadow-2xl shadow-black/20 backdrop-blur-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#dff8e9] text-[#087a43]"><ClipboardCheck size={25} /></div>
              <p className="text-sm font-bold text-white">Choose on value, not price alone</p>
              <p className="mt-2 text-sm leading-6 text-white/75">Compare the inspection, treatment scope, follow-up visits, product information and written warranty—not only the first quote.</p>
              <div className="mt-4 flex items-center gap-2 text-xs font-bold text-emerald-200"><CheckCircle2 size={15} /> A practical hiring checklist</div>
            </div>
          </div>
        </div>
      </section>

      {/* Article layout */}
      <div className="pcg-article-start mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 sm:py-10 lg:grid-cols-[230px_minmax(0,1fr)] lg:gap-10 lg:px-8 lg:py-12">
        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-5">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="mb-3 flex items-center gap-2"><BookOpen size={17} className="text-[#087a43]" /><h2 className="text-sm font-extrabold">On this page</h2></div>
              <nav className="space-y-1" aria-label="Article table of contents">
                {tocItems.map((item) => (
                  <button key={item.id} type="button" onClick={() => handleTocClick(item.id)} className={`flex w-full items-start gap-2 rounded-lg px-2.5 py-2 text-left text-xs leading-5 transition ${activeSection === item.id ? "bg-[#e9f8ef] font-bold text-[#087a43]" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"}`}>
                    <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${activeSection === item.id ? "bg-[#0d9252]" : "bg-slate-300"}`} />{item.label}
                  </button>
                ))}
              </nav>
            </div>
            <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-[#087a43] to-[#07542f] p-5 text-white shadow-lg shadow-emerald-900/10">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white/15"><ShieldCheck size={22} /></div>
              <h3 className="text-lg font-extrabold leading-tight">Need help choosing a service?</h3>
              <p className="mt-2 text-sm leading-6 text-white/75">Share your pest concern with PestFind to start coordinating your next steps.</p>
              <a href="/#pest-request-form" className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-extrabold text-[#087a43] transition hover:bg-emerald-50">Get a free quote <ArrowRight size={15} /></a>
              <div className="mt-4 space-y-2 border-t border-white/15 pt-4 text-xs text-white/85">
                <p className="flex items-center gap-2"><CheckCircle2 size={14} /> Clear service coordination</p>
                <p className="flex items-center gap-2"><CheckCircle2 size={14} /> Compare scope and follow-up</p>
              </div>
            </div>
          </div>
        </aside>

        <main className="min-w-0">
          <div className="pcg-reveal grid gap-5 md:grid-cols-[.85fr_1.15fr] md:items-center">
            <div className="overflow-hidden rounded-2xl shadow-sm ring-1 ring-black/5">
              <img src={INSPECTION_IMAGE} alt="Bright, well-maintained residential interior" className="h-56 w-full object-cover sm:h-64 md:h-60" loading="lazy" />
            </div>
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#087a43]">Start with the real problem</p>
              <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">It is 10 pm and you have just found cockroaches, termite marks or a rat in your home. You search “pest control near me” and see dozens of companies, similar star ratings and widely different prices. Who do you trust?</p>
              <p className="mt-3 text-sm leading-7 text-slate-600">This guide explains how to compare providers, what a quote should include, which questions to ask before hiring and which warning signs to avoid.</p>
            </div>
          </div>

          <section id="quick-answer" className="scroll-mt-28 pcg-reveal mt-8 rounded-3xl border border-[#d5efdf] bg-gradient-to-br from-[#effaf3] to-[#f8fcf9] p-5 sm:p-7">
            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#d5f3e1] text-[#087a43]"><BadgeCheck size={25} /></span>
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.17em] text-[#087a43]">Quick answer</p>
                <h2 className="mt-1 text-xl font-extrabold tracking-tight text-slate-950">How do you choose a pest control service?</h2>
                <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">Check that the company is licensed, inspects before quoting, names the products it uses, gives a written treatment plan with follow-up visits and a warranty, and has recent reviews from your area. Compare at least three quotes on what is included—not only on price.</p>
              </div>
            </div>
          </section>

          <section className="pcg-reveal mt-8 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
            <div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700"><BookOpen size={20} /></span><h2 className="text-lg font-extrabold">What this guide covers</h2></div>
            <CheckList columns={2} items={[
              "Why choosing a company feels confusing and the three types of providers",
              "What affects cost and how to compare quotes",
              "Ten questions to ask before you hire",
              "What happens during a visit and how often you may need one",
              "Residential versus commercial service",
              "One-time treatment versus an annual plan",
              "Safety for children, pets and food",
              "Warning signs and home-preparation steps",
            ]} />
          </section>

          <section id="why-confusing" className="scroll-mt-28 mt-12">
            <SectionHeading number="01" eyebrow="Compare providers" title="Why is choosing a pest control company so confusing?" description="Every company claims to be the best, prices vary widely, and it can be hard to tell who will actually solve the problem. The confusion often comes from different provider types, different quote inclusions and claims that are hard to check." />
            <DataTable headers={["Provider type", "Typical strengths", "Typical weaknesses", "Best for"]} rows={providerRows} minWidth="min-w-[820px]" />
            <div className="mt-4 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-950">
              <AlertTriangle size={19} className="mt-0.5 shrink-0 text-amber-600" /><p><strong>Keep in mind:</strong> These are general patterns, not rules. Judge each company against the checks in this guide, not on its size alone.</p>
            </div>
          </section>

          <section id="shortlist" className="scroll-mt-28 mt-12">
            <SectionHeading number="02" eyebrow="A 10-minute plan" title="How to build a shortlist in 10 minutes" description="Use a consistent process to narrow your choices before you call or book." />
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                [Search, "Search locally", "Use a map search and note four or five companies with plenty of recent reviews."],
                [Star, "Read mixed reviews", "Read lower-rated reviews first to see how the company handles problems."],
                [FileText, "Check the details", "Look for service areas, pests covered and licence information on the website."],
                [MessageCircle, "Ask people nearby", "Ask neighbours or your building society which company they have used."],
                [Phone, "Call your top three", "Ask each provider the same ten questions before comparing quotes."],
                [ClipboardCheck, "Compare in writing", "Keep each quote and compare the included work, follow-up and warranty."],
              ].map(([Icon, title, description]) => (
                <div key={title} className="pcg-reveal group rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:border-[#b9e5cb] hover:shadow-lg hover:shadow-emerald-900/5">
                  <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#e8f7ee] text-[#087a43] transition group-hover:bg-[#087a43] group-hover:text-white"><Icon size={21} /></span>
                  <h3 className="font-extrabold text-slate-950">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="cost" className="scroll-mt-28 mt-12">
            <SectionHeading number="03" eyebrow="Understand the quote" title="How much does pest control cost?" description="The cost depends on the size of your home, the pest, the severity of the problem, the method, the number of visits and the warranty. A low quote covering one visit may cost more in the long run than a quote with necessary follow-ups." />
            <DataTable headers={["Factor", "Why it changes the price"]} rows={costFactors} minWidth="min-w-[540px]" />
            <h3 className="pcg-reveal mb-4 mt-7 text-lg font-extrabold">Compare quotes fairly</h3>
            <DataTable headers={["Compare this", "Ask"]} rows={quoteRows} minWidth="min-w-[520px]" />
            <div className="pcg-reveal mt-4 rounded-2xl border border-[#cfe9d9] bg-[#f0faf4] p-5">
              <div className="flex items-start gap-3"><CircleDollarSign className="mt-0.5 shrink-0 text-[#087a43]" size={23} /><div><h4 className="font-extrabold">Why the cheapest quote can cost more</h4><p className="mt-1 text-sm leading-6 text-slate-700">It may cover only one visit, skip follow-ups or add charges later. Compare the total cost over the full warranty period, not just the first-visit price. Ask for a written quote that lists every included visit and charge.</p></div></div>
            </div>
          </section>

          <section id="questions" className="scroll-mt-28 mt-12">
            <SectionHeading number="04" eyebrow="Before you hire" title="10 questions to ask a pest control company" description="A good company should answer clearly and in writing. If a provider avoids basic questions or pressures you to book immediately, pause before committing." />
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              {hiringQuestions.map((question, index) => (
                <div key={question} className={`flex items-start gap-4 p-4 sm:p-5 ${index !== hiringQuestions.length - 1 ? "border-b border-slate-100" : ""}`}>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#087a43] text-xs font-extrabold text-white">{String(index + 1).padStart(2, "0")}</span>
                  <p className="pt-1 text-sm font-semibold leading-6 text-slate-800">{question}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="visit" className="scroll-mt-28 mt-12">
            <SectionHeading number="05" eyebrow="Know what to expect" title="What happens during a pest control visit?" description="A proper visit includes inspection, identification, a plan and quote, treatment, instructions and follow-up. A technician who sprays and leaves without explaining the work has left important questions unanswered." />
            <div className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {visitSteps.map(([title, description], index) => (
                <div key={title} className="pcg-reveal relative rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="mb-4 flex items-center justify-between"><span className="text-3xl font-black tracking-tight text-[#b8e8ca]">0{index + 1}</span><span className="h-9 w-9 rounded-xl bg-[#e9f8ef]" /></div>
                  <h3 className="text-base font-extrabold text-slate-950">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-2xl bg-slate-900 p-5 text-white sm:flex sm:items-center sm:justify-between sm:gap-6"><div><h3 className="font-extrabold">What should you receive?</h3><p className="mt-1 text-sm leading-6 text-white/70">Ask for a written service report listing the pest, areas treated, products used and the next visit date.</p></div><FileText size={30} className="mt-4 shrink-0 text-emerald-300 sm:mt-0" /></div>
          </section>

          <section id="frequency" className="scroll-mt-28 mt-12">
            <SectionHeading number="06" eyebrow="Plan ahead" title="How often do I need pest control?" description="The right frequency depends on the pest, your building and the season. Use these typical ranges as a discussion starter, and ask the technician to confirm the schedule after inspection." />
            <DataTable headers={["Situation", "Typical frequency", "Why"]} rows={frequencyRows} minWidth="min-w-[700px]" />
          </section>

          <section id="residential-commercial" className="scroll-mt-28 mt-12">
            <SectionHeading number="07" eyebrow="Choose the right service" title="Residential vs commercial pest control" description="Residential service focuses on the home and family. Commercial service also needs predictable schedules, records and a plan that minimises disruption to business operations." />
            <DataTable headers={["Factor", "Residential", "Commercial"]} rows={residentialCommercialRows} minWidth="min-w-[650px]" />
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="pcg-reveal rounded-2xl border border-slate-200 bg-white p-5"><span className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#e8f7ee] text-[#087a43]"><Home size={21} /></span><h3 className="font-extrabold">For homes</h3><p className="mt-2 text-sm leading-6 text-slate-600">Look for a clear treatment plan, safety instructions, an appropriate follow-up and a service report.</p></div>
              <div className="pcg-reveal rounded-2xl border border-slate-200 bg-white p-5"><span className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#e8f7ee] text-[#087a43]"><Building2 size={21} /></span><h3 className="font-extrabold">For businesses</h3><p className="mt-2 text-sm leading-6 text-slate-600">Ask about fixed schedules, detailed treatment logs, after-hours availability and records needed for audits.</p></div>
            </div>
          </section>

          <section id="contract" className="scroll-mt-28 mt-12">
            <SectionHeading number="08" eyebrow="Compare service plans" title="One-time treatment or annual contract: which is better?" description="A one-time treatment may fit a small, isolated issue. An annual plan can make sense for recurring problems, shared buildings or businesses—provided the visits and terms are useful to you." />
            <DataTable headers={["Factor", "One-time treatment", "Annual contract"]} rows={contractRows} minWidth="min-w-[650px]" />
            <div className="pcg-reveal mt-4 rounded-2xl border border-slate-200 bg-white p-5">
              <h3 className="mb-4 font-extrabold">Before signing an annual plan, check:</h3>
              <CheckList columns={2} items={[
                "Number of visits and the months they fall in",
                "What happens if pests appear between visits",
                "Cancellation terms and refund rules",
                "Which pests are included and which cost extra",
                "Whether the warranty remains valid if you move",
              ]} />
            </div>
          </section>

          <section id="safety" className="scroll-mt-28 mt-12">
            <SectionHeading number="09" eyebrow="Safety first" title="Is pest control safe for children, pets and food?" description="Risk is lower when a trained, licensed technician uses approved products at the label dose and you follow the drying and re-entry instructions. No treatment is risk-free, so ask questions and avoid claims such as ‘100% safe’." />
            <div className="grid gap-4 md:grid-cols-2">
              <div className="pcg-reveal overflow-hidden rounded-2xl border border-slate-200 bg-white">
                <img src={HERO_IMAGE} alt="Residential setting used to illustrate home pest-control planning" className="h-40 w-full object-cover" loading="lazy" />
                <div className="p-5"><h3 className="font-extrabold">Questions to ask</h3><CheckList items={[
                  "Ask for the product name and active ingredient.",
                  "Ask how long to stay out and when children and pets may return.",
                  "Mention infants, pregnancy, elderly people, asthma and allergies.",
                  "Ask what claims like ‘herbal’ or ‘odourless’ mean in practice.",
                ]} /></div>
              </div>
              <div className="pcg-reveal rounded-2xl border border-[#d1e9dc] bg-[#f0faf4] p-5 sm:p-6">
                <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white text-[#087a43] shadow-sm"><ShieldCheck size={23} /></span>
                <h3 className="text-lg font-extrabold">Before treatment</h3>
                <CheckList items={[
                  "Cover or remove food and utensils.",
                  "Cover fish tanks and move pets out of treatment areas.",
                  "Keep children away until the area is safe to re-enter.",
                  "Ventilate and clean food-contact surfaces as instructed.",
                ]} />
                <p className="mt-4 border-t border-[#d2e9dc] pt-4 text-xs leading-5 text-slate-600">Always follow the product label and the technician's written instructions for the specific treatment.</p>
              </div>
            </div>
          </section>

          <section id="red-flags" className="scroll-mt-28 mt-12">
            <SectionHeading number="10" eyebrow="Avoid these red flags" title="What are the warning signs of a bad pest control company?" description="Look closely if a provider cannot explain its products, skips inspections or makes promises no service can reasonably guarantee. A reliable company welcomes questions." />
            <div className="grid gap-3 sm:grid-cols-2">
              {redFlags.map((flag, index) => (
                <div key={flag} className="pcg-reveal flex items-start gap-3 rounded-xl border border-rose-100 bg-white p-4">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-rose-50 text-rose-600"><ShieldAlert size={16} /></span>
                  <p className="text-sm leading-6 text-slate-700">{flag}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="prepare" className="scroll-mt-28 mt-12">
            <SectionHeading number="11" eyebrow="A simple checklist" title="How do I prepare my home for pest control?" description="Good preparation helps the treatment reach the right areas. Ask your provider for instructions specific to the products and methods being used." />
            <div className="grid gap-5 md:grid-cols-2">
              <div className="pcg-reveal rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
                <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#e8f7ee] text-[#087a43]"><ClipboardCheck size={22} /></span>
                <h3 className="text-lg font-extrabold">Before the visit</h3>
                <div className="mt-4"><CheckList items={prepBefore} /></div>
              </div>
              <div className="pcg-reveal rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
                <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#e8f7ee] text-[#087a43]"><CheckCircle2 size={22} /></span>
                <h3 className="text-lg font-extrabold">After the visit</h3>
                <div className="mt-4"><CheckList items={prepAfter} /></div>
              </div>
            </div>
          </section>

          <section id="faqs" className="scroll-mt-28 mt-12">
            <SectionHeading number="12" eyebrow="Helpful answers" title="Pest control near me: FAQs" description="Quick answers to common questions when choosing a pest-control provider." />
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
              {faqs.map(([question, answer], index) => {
                const isOpen = openFaq === index;
                return (
                  <div key={question} className={index !== faqs.length - 1 ? "border-b border-slate-200" : ""}>
                    <button type="button" onClick={() => setOpenFaq(isOpen ? -1 : index)} aria-expanded={isOpen} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition hover:bg-slate-50 sm:px-6">
                      <span className="text-sm font-bold leading-6 text-slate-900 sm:text-base">{question}</span>
                      <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${isOpen ? "bg-[#087a43] text-white" : "bg-slate-100 text-slate-600"}`}>{isOpen ? <ChevronUp size={17} /> : <ChevronDown size={17} />}</span>
                    </button>
                    {isOpen && <div className="px-5 pb-5 pr-12 text-sm leading-7 text-slate-600 sm:px-6 sm:pr-16">{answer}</div>}
                  </div>
                );
              })}
            </div>
          </section>

          <section className="pcg-reveal mt-12 rounded-3xl border border-slate-200 bg-white p-5 sm:p-7">
            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#e8f7ee] text-[#087a43]"><ClipboardList size={25} /></span>
              <div>
                <h2 className="text-xl font-extrabold">How to choose pest control in 60 seconds</h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">The right service is not necessarily the cheapest or the biggest. Choose a provider that inspects first, identifies the pest, explains the plan in writing, lists the products used, includes appropriate follow-up and warranty terms, and answers safety questions clearly.</p>
                <div className="mt-4"><CheckList columns={2} items={[
                  "Compare three written quotes.",
                  "Confirm licence and product details.",
                  "Check visits, warranty and re-treatment.",
                  "Get safety and re-entry instructions in writing.",
                  "Avoid pressure tactics and guaranteed permanent claims.",
                ]} /></div>
              </div>
            </div>
          </section>

          <section className="pcg-article-end pcg-reveal relative mt-12 overflow-hidden rounded-3xl bg-[#071d15] p-6 text-white sm:p-9 lg:p-10">
            <img src={HERO_IMAGE} alt="Residential home interior" className="absolute inset-0 h-full w-full object-cover opacity-20" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#061a12] via-[#061a12]/95 to-[#07542f]/70" />
            <div className="relative z-10 max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/25 bg-emerald-300/10 px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.17em] text-emerald-200"><ShieldCheck size={13} /> PestFind</span>
              <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight sm:text-4xl">Need help with a pest problem?</h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-white/75 sm:text-base">Use the PestFind request form to share your concern and property details. The team can review the request and coordinate next steps.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href="/#pest-request-form" className="inline-flex items-center gap-2 rounded-full bg-[#14a35c] px-5 py-3 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-[#0e8d4d]">Request pest control <ArrowRight size={16} /></a>
                <a href="/blog" className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10">Explore more guides <ArrowUpRight size={16} /></a>
              </div>
            </div>
          </section>
        </main>
      </div>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} PestFind. Practical guidance for choosing pest-control services.</p>
          <div className="flex flex-wrap gap-4"><a href="/terms-and-conditions" className="hover:text-[#087a43]">Terms &amp; Conditions</a><a href="/privacy-policy" className="hover:text-[#087a43]">Privacy Policy</a><a href="/blog" className="hover:text-[#087a43]">Blog</a></div>
        </div>
      </footer>
    </div>
  );
}
