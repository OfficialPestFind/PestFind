import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  ArrowUpRight,
  AlertTriangle,
  BookOpen,
  Bug,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  CircleHelp,
  Clock3,
  HeartPulse,
  House,
  Info,
  Leaf,
  Lightbulb,
  ListChecks,
  Package,
  Search,
  ShieldCheck,
  Sparkles,
  Utensils,
  Wind,
  Wrench,
} from "lucide-react";
import Footer from "../Footer/Footer";

const tocItems = [
  { id: "quick-answer", label: "Quick answer" },
  { id: "why-they-return", label: "Why they keep coming back" },
  { id: "cockroach-types", label: "Types of cockroaches" },
  { id: "infestation-signs", label: "Signs of infestation" },
  { id: "health-risks", label: "Health risks" },
  { id: "step-by-step", label: "Step-by-step control plan" },
  { id: "home-remedies", label: "DIY remedies" },
  { id: "treatment-comparison", label: "Gel vs spray vs fogging" },
  { id: "professional-help", label: "When to call a professional" },
  { id: "prevention", label: "Prevention checklist" },
  { id: "faqs", label: "FAQs" },
];

const guideTopics = [
  "Why cockroaches keep coming back, even in clean homes",
  "How to identify the type of cockroach you have",
  "Signs of an infestation and the health risks",
  "A step-by-step plan, DIY remedies that work, and myths that do not",
  "Gel vs spray vs fogging, compared",
  "When to call a professional, what a visit includes, and how to choose a service",
  "A prevention checklist and answers to common questions",
];

const causes = [
  ["Food left out", "Crumbs, open packets, pet food left overnight", "Use airtight containers, wipe counters at night, lift pet bowls"],
  ["Water and moisture", "Leaking taps, wet sink, damp drains", "Fix leaks, dry the sink at night, clean drains weekly"],
  ["Cracks and gaps", "Gaps behind cabinets, around pipes and switchboards", "Seal with silicone or cement"],
  ["Clutter", "Cardboard boxes, old newspapers, piled storage", "Remove cardboard and keep storage off the floor"],
  ["Outside entry", "Drains, balcony doors, neighbouring flats", "Fit drain covers and door sweeps; treat shared building issues together"],
  ["Monsoon and heat", "Sudden increase after heavy rain or in summer", "Treat before the season starts and check drains"],
];

const cockroachTypes = [
  {
    name: "German cockroach",
    size: "1.1–1.6 cm",
    look: "Light brown, with two dark stripes behind the head.",
    hiding: "Kitchen, bathroom, behind fridge and stove.",
    treatment: "Gel bait works best; follow-up visits are often needed.",
    color: "from-amber-100 to-orange-50",
  },
  {
    name: "American cockroach",
    size: "3.5–4 cm",
    look: "Reddish brown, large, and able to glide short distances.",
    hiding: "Drains, basements and sewer lines.",
    treatment: "Treat drains and entry points.",
    color: "from-orange-100 to-amber-50",
  },
  {
    name: "Oriental cockroach",
    size: "2.5–3 cm",
    look: "Dark brown to black with a shiny body.",
    hiding: "Cool, damp places and under sinks.",
    treatment: "Fix moisture and address drains.",
    color: "from-slate-200 to-stone-100",
  },
  {
    name: "Brown-banded cockroach",
    size: "1–1.5 cm",
    look: "Light brown bands across the wings.",
    hiding: "Dry, warm places: upper cabinets, electronics and furniture.",
    treatment: "Check beyond the kitchen.",
    color: "from-yellow-100 to-stone-100",
  },
];

const infestationSigns = [
  { title: "Droppings", copy: "Black specks like ground pepper or coffee grounds, often near sinks, stoves and cabinet corners.", Icon: Search },
  { title: "Egg cases", copy: "Small brown capsules left behind walls, drawers or appliances.", Icon: Package },
  { title: "Musty smell", copy: "A stale, oily odour in closed cabinets.", Icon: Wind },
  { title: "Smear marks", copy: "Dark streaks along walls and drain edges.", Icon: Bug },
  { title: "Shed skins", copy: "Pale, papery shells left by growing nymphs.", Icon: Leaf },
  { title: "Damaged packaging", copy: "Chewed boxes of flour, cereal or pet food.", Icon: Utensils },
];

const controlSteps = [
  { title: "Locate", copy: "Use a torch at night to check behind the fridge, under the sink and inside cabinet hinges. Sticky traps can help identify hotspots." },
  { title: "Starve", copy: "Store food in airtight containers, empty the bin nightly and remove standing water." },
  { title: "Clean", copy: "Degrease the back of the stove and gaps beside appliances. Vacuum droppings and egg cases, then wipe with detergent." },
  { title: "Seal", copy: "Close gaps around pipes, tiles and cabinets with suitable sealant. Cover drains." },
  { title: "Treat", copy: "If using a labelled gel bait, place it in appropriate cracks, hinges and corners near hiding spots. Do not spray insecticide over bait or clean it away unless the product label says to." },
  { title: "Monitor and repeat", copy: "Check traps every few days and follow the product label for reapplication. Many cases need follow-up over several weeks." },
];

const remedies = [
  ["Boric acid powder", "Partly effective", "A slow-acting poison. Use only as directed on the product label and keep away from children and pets."],
  ["Food-grade diatomaceous earth", "Limited", "Works only when dry and may be ineffective in damp areas. Avoid breathing dust."],
  ["Baking soda and sugar", "Weak evidence", "There is little evidence that it reliably controls an infestation."],
  ["Bay leaves, neem and essential oils", "Limited", "May repel in small spaces but will not reliably eliminate a nest."],
  ["Soapy water spray", "Contact only", "Affects only the cockroaches it directly touches."],
  ["Sticky traps", "Monitoring", "Useful for finding hotspots and tracking activity, but not a cure on their own."],
];

const treatmentMethods = [
  ["Gel bait", "German cockroaches, kitchens and cracks", "Days to weeks; can reach hiding places when used correctly", "Correct placement matters. Do not spray over bait."],
  ["Residual spray", "Selected surfaces, drains or entry points as directed", "Fast knockdown of exposed insects", "Can scatter pests; follow the label and re-entry instructions."],
  ["Fogging or misting", "Specific situations as part of a professional plan", "Fast in exposed areas", "May not reach cracks where cockroaches hide; may require vacating the area."],
  ["Insecticidal dust", "Appropriate voids or hard-to-reach areas", "Generally slower", "Use only in labelled locations; professional help may be appropriate."],
  ["Insect growth regulator", "Interrupting development of young pests", "Slower; usually part of a broader plan", "Often used with other control methods, not as the only step."],
  ["Sticky traps", "Monitoring activity", "No direct population control", "Helps measure activity; does not solve an infestation by itself."],
];

const visitSteps = [
  "Inspect the kitchen, bathrooms, drains, cabinets and appliances.",
  "Identify the cockroach type and estimate the infestation level.",
  "Explain a treatment plan before work starts.",
  "Use suitable targeted methods according to the inspection and product labels.",
  "Explain preparation steps and written re-entry guidance.",
  "Arrange follow-up when needed to check results and adjust the plan.",
];

const preventionGroups = [
  { title: "Daily", Icon: CalendarDays, tasks: ["Wipe counters and the stove after cooking.", "Empty the kitchen bin before sleeping.", "Dry the sink and avoid leaving dirty dishes overnight."] },
  { title: "Weekly", Icon: Sparkles, tasks: ["Clean drains according to appropriate household guidance.", "Vacuum behind and under appliances.", "Check pet-food areas and store food bags in sealed containers."] },
  { title: "Monthly", Icon: Wrench, tasks: ["Check for leaks under sinks and around pipes.", "Replace or recheck sticky traps.", "Inspect gaps around pipes, cabinets and doors."] },
  { title: "Before monsoon or moving in", Icon: House, tasks: ["Seal cracks and fit suitable drain covers.", "Inspect parcels and cardboard before bringing them inside.", "Inspect the property before furniture is moved in."] },
];

const faqs = [
  { q: "What kills cockroaches instantly?", a: "Contact sprays may kill visible cockroaches, but they do not reach every hiding place. Baits can take longer and must be placed and used exactly as their label directs." },
  { q: "How long does it take to get rid of cockroaches?", a: "A light problem may improve over 2–4 weeks with targeted control and cleaning. Larger infestations can take longer and may require more than one professional visit." },
  { q: "Does one cockroach mean an infestation?", a: "Not always. However, repeated sightings, daytime activity, droppings or nymphs can indicate more cockroaches are hiding nearby. Traps can help you assess activity." },
  { q: "Do cockroaches mean my home is dirty?", a: "No. Cockroaches look for food, water and shelter, and can enter through drains, pipes, shared walls, parcels or groceries. Cleaning helps treatment work better, but cleanliness alone is not a guarantee." },
  { q: "Why do cockroaches come out at night?", a: "Cockroaches are mostly nocturnal. They search for food and water at night and hide in dark, protected areas during the day." },
  { q: "Where do cockroaches hide during the day?", a: "Common hiding places include behind fridges and stoves, under sinks, cabinet hinges, appliances, gaps around pipework and drains." },
  { q: "Can cockroaches come up through drains?", a: "Some species use drains and sewer lines as entry routes. Suitable drain covers, repairs and a targeted control plan may reduce entry." },
  { q: "Is cockroach treatment safe for children and pets?", a: "Risk depends on the product and how it is applied. Tell the provider about children and pets, follow the product label, and keep people and animals away for the specified re-entry period." },
  { q: "How often should I arrange cockroach control?", a: "It depends on the property, species and activity. Ask the technician to recommend a schedule after inspection and explain any follow-up visits." },
  { q: "When should I call a professional?", a: "Consider professional inspection if you see cockroaches in daytime, find nymphs of different sizes, see activity in several rooms, share the problem with neighbouring flats, or do not see improvement after about two weeks of suitable control." },
];

function SectionHeading({ number, eyebrow, title, description }) {
  return (
    <div className="mb-6 flex items-start gap-4" data-reveal>
      <span className="mt-1 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#0B7A43] text-sm font-black text-white shadow-lg shadow-green-900/10">
        {number}
      </span>
      <div className="min-w-0">
        {eyebrow && <p className="mb-1 text-xs font-extrabold uppercase tracking-[0.18em] text-[#0B7A43]">{eyebrow}</p>}
        <h2 className="text-2xl font-black tracking-tight text-[#11251B] sm:text-3xl">{title}</h2>
        {description && <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">{description}</p>}
      </div>
    </div>
  );
}

function ResponsiveTable({ headers, rows, firstColumnStrong = false }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#DDE9E1] bg-white shadow-sm" data-reveal>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-left text-sm">
          <thead className="bg-[#EAF5ED] text-[#173D2A]">
            <tr>
              {headers.map((header) => (
                <th key={header} className="px-4 py-3 text-xs font-extrabold uppercase tracking-wide sm:text-sm">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E8EFEA]">
            {rows.map((row, index) => (
              <tr key={`${row[0]}-${index}`} className="transition-colors hover:bg-[#F8FBF8]">
                {row.map((cell, cellIndex) => (
                  <td key={`${cellIndex}-${String(cell).slice(0, 12)}`} className={`px-4 py-3 align-top leading-6 text-slate-600 ${firstColumnStrong && cellIndex === 0 ? "font-bold text-[#203B2B]" : ""}`}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="border-t border-[#E8EFEA] bg-[#FBFDFC] px-4 py-2 text-xs text-slate-500">On smaller screens, swipe horizontally to view all columns.</p>
    </div>
  );
}

function Note({ type = "info", title, children }) {
  const styles = {
    info: { shell: "border-sky-100 bg-sky-50 text-sky-950", icon: "text-sky-700", Icon: Info },
    warning: { shell: "border-amber-100 bg-amber-50 text-amber-950", icon: "text-amber-700", Icon: AlertTriangle },
    success: { shell: "border-emerald-100 bg-emerald-50 text-emerald-950", icon: "text-emerald-700", Icon: CheckCircle2 },
  };
  const chosen = styles[type] || styles.info;
  const Icon = chosen.Icon;
  return (
    <div className={`my-6 flex gap-3 rounded-2xl border p-4 sm:p-5 ${chosen.shell}`} data-reveal>
      <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${chosen.icon}`} aria-hidden="true" />
      <div className="text-sm leading-6">
        {title && <p className="mb-1 font-extrabold">{title}</p>}
        {children}
      </div>
    </div>
  );
}

export default function CockroachControlGuide() {
  const pageRef = useRef(null);
  const progressRef = useRef(null);
  const [activeSection, setActiveSection] = useState("quick-answer");
  const [openFaq, setOpenFaq] = useState(0);
  const [mobileTocOpen, setMobileTocOpen] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const root = pageRef.current;
    if (!root) return undefined;

    const ctx = gsap.context(() => {
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (!reducedMotion) {
        gsap.from(".pf-hero-copy > *", {
          y: 24,
          opacity: 0,
          duration: 0.75,
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.1,
        });

        gsap.from(".pf-hero-image", {
          scale: 1.06,
          opacity: 0.75,
          duration: 1.25,
          ease: "power2.out",
        });

        gsap.utils.toArray("[data-reveal]").forEach((element) => {
          gsap.from(element, {
            y: 22,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: element,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          });
        });
      }

      ScrollTrigger.create({
        trigger: root,
        start: "top top",
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
          start: "top 35%",
          end: "bottom 35%",
          onEnter: () => setActiveSection(id),
          onEnterBack: () => setActiveSection(id),
        });
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const jumpTo = (id) => {
    setActiveSection(id);
    setMobileTocOpen(false);
    const target = pageRef.current?.querySelector(`#${id}`);
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div ref={pageRef} className="min-h-screen overflow-clip bg-[#FBFCFA] text-[#203329] selection:bg-emerald-100 selection:text-emerald-950">
      <div className="fixed left-0 right-0 top-0 z-[60] h-1 origin-left bg-transparent" aria-hidden="true">
        <div ref={progressRef} className="h-full origin-left scale-x-0 bg-[#13A05F] shadow-[0_0_12px_rgba(19,160,95,0.45)]" />
      </div>

      {/* Hero */}
      <section className="relative isolate min-h-[440px] overflow-hidden bg-[#0D2117] sm:min-h-[500px] lg:min-h-[550px]">
        <img src="/images/cockroach-hero.jpg" alt="Cockroach on a kitchen counter, illustrating a household pest problem" className="pf-hero-image absolute inset-0 h-full w-full object-cover object-[62%_50%]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07170F]/95 via-[#07170F]/80 to-[#07170F]/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07170F]/55 via-transparent to-[#07170F]/10" />
        <div className="relative mx-auto flex min-h-[440px] max-w-7xl items-end px-4 pb-10 pt-14 sm:min-h-[500px] sm:px-6 sm:pb-14 lg:min-h-[550px] lg:items-center lg:px-8 lg:py-16">
          <div className="pf-hero-copy max-w-3xl text-white">
            <div className="mb-5 flex flex-wrap items-center gap-3 text-xs font-bold text-emerald-100">
              <span className="rounded-full border border-emerald-200/25 bg-emerald-400/15 px-3 py-1.5 uppercase tracking-[0.16em] text-emerald-100">Pest control guide</span>
              <span className="inline-flex items-center gap-1.5 text-white/75"><Clock3 className="h-3.5 w-3.5" /> 12 min read</span>
            </div>
            <p className="mb-3 text-sm font-bold tracking-wide text-emerald-200">PestFind field guide</p>
            <h1 className="max-w-3xl text-4xl font-black leading-[1.06] tracking-tight sm:text-5xl lg:text-6xl">
              The Complete Guide to <span className="text-emerald-300">Cockroach Control</span>
            </h1>
            <p className="mt-4 max-w-2xl text-lg font-semibold leading-8 text-white/90 sm:text-xl">How to Get Rid of Cockroaches for Good</p>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/75 sm:text-base">
              It is 11 pm. You switch on the kitchen light and a cockroach runs behind the fridge. You kill it, wipe the counter and tell yourself it was only one. A week later, you see another.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 text-xs font-semibold text-white/75 sm:text-sm">
              <span className="inline-flex items-center gap-2"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10"><Leaf className="h-4 w-4 text-emerald-300" /></span> PestFind Team</span>
              <span className="inline-flex items-center gap-2"><CalendarDays className="h-4 w-4 text-emerald-300" /> Updated October 28, 2026</span>
              <span className="inline-flex items-center gap-2"><Clock3 className="h-4 w-4 text-emerald-300" /> 12 min read</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main article layout */}
      <main className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-8 sm:px-6 sm:py-10 lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-10 lg:px-8 lg:py-12">
        <aside className="hidden lg:block">
          <div className="sticky top-6 space-y-5">
            <div className="overflow-hidden rounded-2xl border border-[#E2ECE5] bg-white shadow-sm" data-reveal>
              <div className="border-b border-[#E7EFE9] px-5 py-4">
                <p className="text-sm font-black text-[#163524]">On this page</p>
                <p className="mt-1 text-xs text-slate-500">Jump to a section</p>
              </div>
              <nav className="p-2" aria-label="Table of contents">
                {tocItems.map((item, index) => (
                  <button key={item.id} type="button" onClick={() => jumpTo(item.id)} className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-xs font-semibold transition ${activeSection === item.id ? "bg-[#EAF6EE] text-[#087741]" : "text-slate-600 hover:bg-slate-50 hover:text-[#087741]"}`}>
                    <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-black ${activeSection === item.id ? "bg-[#0B7A43] text-white" : "bg-slate-100 text-slate-500"}`}>{String(index + 1).padStart(2, "0")}</span>
                    <span>{item.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            <div className="rounded-2xl bg-gradient-to-br from-[#0B7A43] to-[#07532F] p-5 text-white shadow-lg shadow-green-950/10" data-reveal>
              <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white/15"><ShieldCheck className="h-5 w-5" /></span>
              <h3 className="text-lg font-black leading-snug">Need professional cockroach control?</h3>
              <p className="mt-2 text-sm leading-6 text-white/75">Get guidance on suitable treatment options for your home.</p>
              <a href="/#pest-request-form" className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-4 py-3 text-sm font-extrabold text-[#086538] transition hover:bg-emerald-50">Book a service <ArrowRight className="h-4 w-4" /></a>
              <div className="mt-4 space-y-2 text-xs text-white/80">
                <p className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-emerald-200" /> Ask about product labels</p>
                <p className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-emerald-200" /> Get re-entry instructions</p>
                <p className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-emerald-200" /> Discuss follow-up visits</p>
              </div>
            </div>
          </div>
        </aside>

        <article className="min-w-0">
          {/* Mobile contents */}
          <div className="mb-6 lg:hidden" data-reveal>
            <button type="button" onClick={() => setMobileTocOpen((value) => !value)} className="flex w-full items-center justify-between rounded-2xl border border-[#DDE9E1] bg-white px-4 py-3.5 text-sm font-extrabold text-[#173D2A] shadow-sm">
              <span className="inline-flex items-center gap-2"><BookOpen className="h-4 w-4 text-[#0B7A43]" /> Table of contents</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${mobileTocOpen ? "rotate-180" : ""}`} />
            </button>
            {mobileTocOpen && (
              <nav className="mt-2 grid grid-cols-1 gap-1 rounded-2xl border border-[#DDE9E1] bg-white p-2 sm:grid-cols-2" aria-label="Mobile table of contents">
                {tocItems.map((item, index) => (
                  <button key={item.id} onClick={() => jumpTo(item.id)} className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-semibold text-slate-600 transition hover:bg-[#EAF6EE] hover:text-[#087741]">
                    <span className="text-xs font-black text-[#0B7A43]">{String(index + 1).padStart(2, "0")}</span>{item.label}
                  </button>
                ))}
              </nav>
            )}
          </div>

          <div className="mb-7 grid gap-5 md:grid-cols-[0.9fr_1.1fr] md:items-center" data-reveal>
            <div className="overflow-hidden rounded-2xl shadow-sm ring-1 ring-black/5">
              <img src="/images/cockroach-kitchen.jpg" alt="Cockroach near a kitchen sink, a common area to inspect" className="h-52 w-full object-cover sm:h-64 md:h-60" loading="lazy" />
            </div>
            <div className="text-sm leading-7 text-slate-600 sm:text-base">
              <p>This is how many cockroach problems start. One cockroach you see may mean others are hiding in walls, drains and cabinets, and sprays alone may not reach them.</p>
              <p className="mt-3">This guide explains why cockroaches keep coming back, what you can do step by step, and when it is time to look for professional pest control near you. Each section starts with a common concern and ends with a practical next step.</p>
            </div>
          </div>

          <section id="quick-answer" className="scroll-mt-24" data-reveal>
            <div className="rounded-3xl border border-emerald-100 bg-gradient-to-br from-[#EAF8EF] to-white p-5 sm:p-7">
              <div className="flex items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#CDEFD9] text-[#087741]"><Lightbulb className="h-6 w-6" /></span>
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#087741]">Quick answer</p>
                  <h2 className="mt-1 text-xl font-black tracking-tight text-[#12291C] sm:text-2xl">How do you get rid of cockroaches?</h2>
                  <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
                    Remove food and water sources, seal cracks, use a suitable labelled cockroach bait in hiding spots, and monitor activity over the following weeks. If cockroaches remain after about two weeks, appear in daytime or are present in several rooms, consider a professional inspection.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="my-8 rounded-3xl border border-[#E6EEE8] bg-white p-5 shadow-sm sm:p-7" data-reveal>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E9F6ED] text-[#087741]"><ListChecks className="h-5 w-5" /></span>
              <h2 className="text-xl font-black tracking-tight text-[#12291C]">What this guide covers</h2>
            </div>
            <div className="mt-5 grid gap-x-6 gap-y-3 sm:grid-cols-2">
              {guideTopics.map((topic) => (
                <p key={topic} className="flex gap-2.5 text-sm leading-6 text-slate-600"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#14945A]" />{topic}</p>
              ))}
            </div>
          </section>

          <section id="why-they-return" className="scroll-mt-24 py-3">
            <SectionHeading number="01" eyebrow="Understand the source" title="Why do I keep seeing cockroaches in my house?" />
            <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_220px] md:items-start">
              <div>
                <p className="mb-3 rounded-xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm leading-6 text-rose-950"><strong>The pain:</strong> You clean every day, yet cockroaches keep coming back.</p>
                <p className="text-sm leading-7 text-slate-600 sm:text-base"><strong className="text-[#203B2B]">The answer:</strong> Cockroaches seek food, water, shelter and entry points. A clean home can still get cockroaches because they may travel through pipes, shared walls, grocery bags and parcels. Removing their access to food and moisture and sealing gaps helps reduce activity.</p>
              </div>
              <div className="hidden overflow-hidden rounded-2xl border border-[#E2ECE5] md:block">
                <img src="/images/cockroach-kitchen.jpg" alt="Kitchen sink and counter area that can be inspected for pest activity" className="h-44 w-full object-cover" loading="lazy" />
              </div>
            </div>
            <div className="mt-6"><ResponsiveTable headers={["Cause", "What it looks like", "The fix"]} rows={causes} firstColumnStrong /></div>
            <Note type="warning" title="Myth: Cockroaches only live in dirty homes.">They look for food, water and shelter, and any home can offer these. Cleaning helps, but it is not the only factor.</Note>
          </section>

          <section id="cockroach-types" className="scroll-mt-24 py-3">
            <SectionHeading number="02" eyebrow="Identify the pest" title="What type of cockroach do I have?" description="Four types are common in homes: German, American, Oriental and brown-banded. Appearance and hiding place can help you narrow it down, but an inspection may be needed." />
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {cockroachTypes.map((type, index) => (
                <div key={type.name} className="group overflow-hidden rounded-2xl border border-[#E0EAE3] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-green-950/5" data-reveal>
                  <div className={`relative flex h-24 items-center justify-center overflow-hidden bg-gradient-to-br ${type.color}`}>
                    <div className="absolute inset-0 opacity-40" style={{ backgroundImage: "radial-gradient(#647568 0.7px, transparent 0.7px)", backgroundSize: "10px 10px" }} />
                    <Bug className="relative h-12 w-12 text-[#5D4A32] transition-transform duration-300 group-hover:scale-110" strokeWidth={1.2} />
                    <span className="absolute right-3 top-3 rounded-full bg-white/80 px-2 py-1 text-[10px] font-black uppercase tracking-wider text-[#33533D]">Type {index + 1}</span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-black capitalize text-[#142D1E]">{type.name}</h3>
                    <p className="mt-2 text-xs font-bold uppercase tracking-wide text-[#0B7A43]">Size: {type.size}</p>
                    <p className="mt-3 text-sm leading-6 text-slate-600"><strong className="text-slate-800">Look:</strong> {type.look}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-600"><strong className="text-slate-800">Hiding places:</strong> {type.hiding}</p>
                    <p className="mt-2 border-t border-[#E8EFEA] pt-3 text-sm leading-6 text-slate-600"><strong className="text-slate-800">Treatment note:</strong> {type.treatment}</p>
                  </div>
                </div>
              ))}
            </div>
            <Note type="warning" title="Look for young cockroaches, too.">Nymphs are small and wingless. Seeing nymphs of different sizes can mean cockroaches are breeding inside your home.</Note>
          </section>

          <section id="infestation-signs" className="scroll-mt-24 py-3">
            <SectionHeading number="03" eyebrow="Spot the warning signs" title="What are the signs of a cockroach infestation?" description="The clearest signs include droppings, egg cases, a musty smell and cockroaches seen in daytime. Cockroaches avoid light, so daytime sightings may indicate crowded hiding spaces." />
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {infestationSigns.map(({ title, copy, Icon }) => (
                <div key={title} className="flex gap-3 rounded-2xl border border-[#E3ECE6] bg-white p-4 shadow-sm transition hover:border-emerald-200 hover:shadow-md" data-reveal>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EAF6EE] text-[#0B7A43]"><Icon className="h-5 w-5" /></span>
                  <div><h3 className="font-extrabold text-[#183B28]">{title}</h3><p className="mt-1 text-sm leading-6 text-slate-600">{copy}</p></div>
                </div>
              ))}
            </div>
            <Note type="info" title="Try a two-night trap check.">Place 3–4 sticky traps near the sink, behind the stove and under the fridge for two nights, following trap instructions. Numerous catches or nymphs of different sizes may indicate an established infestation that needs a more comprehensive plan.</Note>
          </section>

          <section id="health-risks" className="scroll-mt-24 py-3">
            <SectionHeading number="04" eyebrow="Protect your household" title="Are cockroaches dangerous to my family?" description="Cockroaches can contaminate food and kitchen surfaces after moving through drains and waste. Their droppings and shed skins can also contain allergens associated with asthma and allergy symptoms." />
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-[#E0EAE3] bg-white p-5" data-reveal><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-[#0B7A43]"><Utensils className="h-5 w-5" /></span><h3 className="mt-4 font-black text-[#173D2A]">Food contamination</h3><p className="mt-2 text-sm leading-6 text-slate-600">Cover food, wash utensils left out overnight and clean preparation surfaces before cooking.</p></div>
              <div className="rounded-2xl border border-[#E0EAE3] bg-white p-5" data-reveal><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-[#0B7A43]"><HeartPulse className="h-5 w-5" /></span><h3 className="mt-4 font-black text-[#173D2A]">Allergies and asthma</h3><p className="mt-2 text-sm leading-6 text-slate-600">Cockroach allergens can be an indoor trigger, particularly for sensitive people and children.</p></div>
              <div className="rounded-2xl border border-[#E0EAE3] bg-white p-5" data-reveal><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-[#0B7A43]"><ShieldCheck className="h-5 w-5" /></span><h3 className="mt-4 font-black text-[#173D2A]">Higher-risk households</h3><p className="mt-2 text-sm leading-6 text-slate-600">Infants, older adults and people with asthma may need quicker action and extra care around treatment.</p></div>
            </div>
            <Note type="info" title="When to get health advice.">If someone has repeated asthma symptoms, allergic reactions or symptoms after possible exposure to a pest-control product, seek advice from a qualified health professional. This guide is general information and does not replace medical advice.</Note>
          </section>

          <section id="step-by-step" className="scroll-mt-24 py-3">
            <SectionHeading number="05" eyebrow="A practical plan" title="How do I get rid of cockroaches at home, step by step?" description="Sprays may kill cockroaches you see, but not every insect hiding nearby. A more complete plan combines inspection, sanitation, exclusion, targeted treatment and monitoring." />
            <div className="space-y-3">
              {controlSteps.map((step, index) => (
                <div key={step.title} className="group flex gap-4 rounded-2xl border border-[#E1EBE4] bg-white p-4 transition hover:border-emerald-200 hover:shadow-md sm:p-5" data-reveal>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#EAF6EE] text-sm font-black text-[#087741] transition group-hover:bg-[#0B7A43] group-hover:text-white">{String(index + 1).padStart(2, "0")}</span>
                  <div><h3 className="text-base font-black text-[#183B28]">{step.title}</h3><p className="mt-1 text-sm leading-7 text-slate-600">{step.copy}</p></div>
                </div>
              ))}
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-3" data-reveal>
              <div className="rounded-2xl bg-[#F0F8F2] p-4"><p className="text-xs font-black uppercase tracking-wide text-[#0B7A43]">Week 1</p><p className="mt-2 text-sm leading-6 text-slate-700">Monitor hotspots and remove food and moisture sources.</p></div>
              <div className="rounded-2xl bg-[#F0F8F2] p-4"><p className="text-xs font-black uppercase tracking-wide text-[#0B7A43]">Weeks 2–3</p><p className="mt-2 text-sm leading-6 text-slate-700">Check progress and follow the product label or treatment plan for follow-up.</p></div>
              <div className="rounded-2xl bg-[#F0F8F2] p-4"><p className="text-xs font-black uppercase tracking-wide text-[#0B7A43]">Week 4 onward</p><p className="mt-2 text-sm leading-6 text-slate-700">Continue prevention and monitor traps for renewed activity.</p></div>
            </div>
          </section>

          <section id="home-remedies" className="scroll-mt-24 py-3">
            <SectionHeading number="06" eyebrow="DIY options" title="Which home remedies for cockroaches actually work?" description="Some home remedies affect individual cockroaches or help monitor activity, but most do not reliably eliminate an established nest." />
            <ResponsiveTable headers={["Remedy", "Likely usefulness", "Important note"]} rows={remedies} firstColumnStrong />
            <Note type="warning" title="Keep products away from children and pets.">Even products sold for household use can be harmful if misused. Read and follow the label, avoid inhaling dust and do not apply a product to places not listed on its label.</Note>
          </section>

          <section id="treatment-comparison" className="scroll-mt-24 py-3">
            <SectionHeading number="07" eyebrow="Compare methods" title="Cockroach gel vs spray vs fogging: which is best?" description="The right method depends on the species, location and infestation level. Targeted baits can be useful in kitchens and cracks; sprays or fogging may have specific uses but should not replace a complete control plan." />
            <ResponsiveTable headers={["Method", "Best suited for", "Speed / reach", "Main limitation"]} rows={treatmentMethods} firstColumnStrong />
            <Note type="success" title="A practical rule. ">Combine monitoring, cleaning, sealing gaps and properly selected treatment. Do not mix methods or apply products together unless their labels or a qualified professional say it is appropriate.</Note>
          </section>

          <section id="professional-help" className="scroll-mt-24 py-3">
            <SectionHeading number="08" eyebrow="Know when to call" title="When should I call pest control for cockroaches?" description="Consider professional help if cockroaches appear during the day, show up in several rooms, continue after about two weeks of suitable control, or the source may be shared with neighbouring homes." />
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                "Daytime sightings or activity in multiple rooms",
                "No clear improvement after around two weeks of suitable treatment",
                "Nymphs of different sizes suggest breeding indoors",
                "The problem is shared with neighbouring flats or a food business",
                "Children, older adults or someone with asthma lives in the home",
                "You need a documented plan, safety guidance or follow-up service",
              ].map((item) => <div key={item} className="flex items-start gap-3 rounded-xl border border-[#E0EAE3] bg-white p-4 text-sm leading-6 text-slate-700" data-reveal><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#14945A]" />{item}</div>)}
            </div>
            <div className="mt-6 rounded-3xl border border-[#DCE9E0] bg-white p-5 sm:p-7" data-reveal>
              <div className="flex items-center gap-3"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EAF6EE] text-[#0B7A43]"><ShieldCheck className="h-5 w-5" /></span><h3 className="text-xl font-black text-[#142D1E]">What to expect from a professional visit</h3></div>
              <ol className="mt-5 space-y-3">
                {visitSteps.map((step, index) => <li key={step} className="flex gap-3 text-sm leading-6 text-slate-600"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#EAF6EE] text-xs font-black text-[#087741]">{index + 1}</span>{step}</li>)}
              </ol>
            </div>
            <div className="mt-5 rounded-2xl border border-amber-100 bg-amber-50 p-5" data-reveal>
              <h3 className="font-black text-amber-950">Questions to ask before booking</h3>
              <ul className="mt-3 grid gap-2 text-sm leading-6 text-amber-950/85 sm:grid-cols-2">
                <li>• Which product and active ingredient will be used?</li>
                <li>• What is the required re-entry time?</li>
                <li>• Are follow-up visits and a written warranty included?</li>
                <li>• Can you provide a treatment plan and service report?</li>
                <li>• What training does the technician have?</li>
                <li>• Do you cover my area and what affects the price?</li>
              </ul>
            </div>
            <a href="/#pest-request-form" className="mt-6 flex flex-col gap-4 rounded-3xl bg-gradient-to-r from-[#0B7A43] to-[#07552F] p-6 text-white shadow-xl shadow-green-950/10 transition hover:shadow-2xl sm:flex-row sm:items-center sm:justify-between sm:p-7" data-reveal>
              <span><span className="block text-xs font-extrabold uppercase tracking-[0.16em] text-emerald-200">PestFind service request</span><span className="mt-2 block text-2xl font-black">Still seeing cockroaches?</span><span className="mt-2 block max-w-2xl text-sm leading-6 text-white/75">Request help coordinating a pest-control service and ask about treatment methods, preparation and follow-up.</span></span>
              <span className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-black text-[#087741]">Book a service <ArrowRight className="h-4 w-4" /></span>
            </a>
          </section>

          <section id="prevention" className="scroll-mt-24 py-3">
            <SectionHeading number="09" eyebrow="Keep activity down" title="How do I stop cockroaches from coming back?" description="Prevention works best when it becomes a routine. Remove food and water access, reduce hiding places and regularly inspect the common entry points." />
            <div className="grid gap-4 sm:grid-cols-2">
              {preventionGroups.map(({ title, Icon, tasks }) => (
                <div key={title} className="rounded-2xl border border-[#E0EAE3] bg-white p-5 shadow-sm" data-reveal>
                  <div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF6EE] text-[#0B7A43]"><Icon className="h-5 w-5" /></span><h3 className="text-lg font-black text-[#183B28]">{title}</h3></div>
                  <ul className="mt-4 space-y-3">{tasks.map((task) => <li key={task} className="flex gap-2.5 text-sm leading-6 text-slate-600"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#14945A]" />{task}</li>)}</ul>
                </div>
              ))}
            </div>
          </section>

          <section id="faqs" className="scroll-mt-24 py-3">
            <SectionHeading number="10" eyebrow="Common questions" title="Cockroach control FAQs" description="Quick answers to common questions about removing cockroaches and keeping them away." />
            <div className="space-y-3">
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div key={faq.q} className={`overflow-hidden rounded-2xl border bg-white transition ${isOpen ? "border-emerald-200 shadow-md shadow-green-950/5" : "border-[#E0EAE3] shadow-sm"}`} data-reveal>
                    <button type="button" onClick={() => setOpenFaq(isOpen ? -1 : index)} aria-expanded={isOpen} className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left sm:px-5">
                      <span className="flex items-start gap-3"><CircleHelp className="mt-0.5 h-5 w-5 shrink-0 text-[#0B7A43]" /><span className="font-extrabold leading-6 text-[#173D2A]">{faq.q}</span></span>
                      <ChevronDown className={`h-5 w-5 shrink-0 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                    </button>
                    {isOpen && <div className="border-t border-[#E8EFEA] px-4 pb-5 pt-4 pl-12 text-sm leading-7 text-slate-600 sm:px-5 sm:pl-14">{faq.a}</div>}
                  </div>
                );
              })}
            </div>
          </section>

          <section className="mt-8 rounded-3xl border border-[#DCE9E0] bg-[#F1F8F3] p-5 sm:p-7" data-reveal>
            <div className="flex items-start gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-[#0B7A43] shadow-sm"><BookOpen className="h-5 w-5" /></span>
              <div>
                <h2 className="text-xl font-black text-[#173D2A]">Cockroach control in 60 seconds</h2>
                <p className="mt-2 text-sm leading-7 text-slate-600">Cockroaches look for food, water and hiding places. Identify likely entry points, clean food and moisture sources, seal gaps, choose an appropriate labelled control method and monitor activity. If the problem is persistent, widespread or connected to a shared building, consider a professional inspection.</p>
              </div>
            </div>
            <div className="mt-5 flex flex-col gap-3 border-t border-[#DCE9E0] pt-5 sm:flex-row">
              <a href="/#pest-request-form" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0B7A43] px-5 py-3 text-sm font-extrabold text-white transition hover:bg-[#075D34]">Request pest-control help <ArrowRight className="h-4 w-4" /></a>
              <a href="/blog" className="inline-flex items-center justify-center gap-2 rounded-full border border-[#B9D3C3] bg-white px-5 py-3 text-sm font-extrabold text-[#165333] transition hover:bg-emerald-50">Explore more guides <ArrowUpRight className="h-4 w-4" /></a>
            </div>
          </section>

          <p className="mt-7 text-xs leading-6 text-slate-500">Editorial note: This article is general information, not a substitute for product-label directions or advice from a qualified pest-management professional. Product availability, approved use, treatment methods and re-entry times vary. Always follow the product label and the technician's written instructions.</p>
        </article>
      </main>

      <Footer />
    </div>
  );
}
