import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Bug,
  CheckCircle2,
  Clock3,
  Leaf,
  MapPin,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Footer from "../Footer/Footer";

gsap.registerPlugin(ScrollTrigger);

const blogPosts = [
  {
    id: "pest-control-safety",
    category: "Safety",
    categoryLabel: "Safety & prevention",
    title: "Pest Control Safety: What Families, Pets & Food Need to Know",
    description:
      "A practical guide to preparing your home, protecting children and pets, and knowing which questions to ask before treatment.",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "Bright, clean living room in a family home",
    readTime: "8 min read",
    href: "/PestControlSafety",
    icon: ShieldCheck,
    accent: "bg-emerald-50 text-emerald-800",
    featured: true,
  },
  {
    id: "cockroach-control-guide",
    category: "Cockroach control",
    categoryLabel: "Pest guides",
    title: "The Complete Guide to Cockroach Control",
    description:
      "Learn where cockroaches hide, what attracts them, and how an inspection-led plan can help control the problem at its source.",
    image:
      "https://images.unsplash.com/photo-1764886773965-1f3b3a008632?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "Macro photograph of a cockroach on a textured surface",
    readTime: "7 min read",
    href: "/CockroachControlGuide",
    icon: Bug,
    accent: "bg-amber-50 text-amber-800",
    featured: false,
  },
  {
    id: "pest-control-near-me",
    category: "Local guide",
    categoryLabel: "Choosing a provider",
    title: "Pest Control Near Me: How to Choose the Right Service",
    description:
      "Know what to ask about inspections, treatment methods, safety instructions and follow-up before choosing a pest control provider.",
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "Professional home-care service preparing for a clean and safe space",
    readTime: "6 min read",
    href: "/PestControlNearMe",
    icon: MapPin,
    accent: "bg-sky-50 text-sky-800",
    featured: false,
  },
];

const categoryFilters = [
  { label: "All articles", value: "All" },
  { label: "Safety", value: "Safety" },
  { label: "Cockroach control", value: "Cockroach control" },
  { label: "Local guides", value: "Local guide" },
];

function BlogCard({ post, index }) {
  const Icon = post.icon;

  return (
    <article className="pf-blog-card group flex h-full flex-col overflow-hidden rounded-[1.6rem] border border-slate-200/80 bg-white shadow-[0_12px_38px_rgba(16,44,31,0.045)] transition-shadow duration-300 hover:shadow-[0_22px_60px_rgba(16,44,31,0.12)]">
      <Link
        to={post.href}
        aria-label={`Read ${post.title}`}
        className="relative block aspect-[1.42/1] overflow-hidden bg-slate-100"
      >
        <img
          src={post.image}
          alt={post.imageAlt}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.055]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 via-transparent to-transparent opacity-70" />
        <span className={`absolute left-5 top-5 inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-[11px] font-bold uppercase tracking-[0.12em] ${post.accent}`}>
          <Icon size={14} strokeWidth={2.2} />
          {post.categoryLabel}
        </span>
        {post.featured && (
          <span className="absolute bottom-5 left-5 inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/95 px-3 py-1.5 text-xs font-semibold text-emerald-900 shadow-sm">
            <Sparkles size={13} /> Editor's pick
          </span>
        )}
        <span className="absolute bottom-5 right-5 flex h-11 w-11 translate-y-2 items-center justify-center rounded-full bg-white text-emerald-800 opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight size={20} />
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-5 sm:p-6 lg:p-7">
        <div className="mb-4 flex items-center gap-2 text-xs font-medium text-slate-500">
          <BookOpen size={14} className="text-emerald-700" />
          <span>PestFind Journal</span>
          <span className="text-slate-300">/</span>
          <Clock3 size={14} />
          <span>{post.readTime}</span>
        </div>

        <h2 className="text-xl font-bold leading-snug tracking-[-0.035em] text-slate-950 transition-colors group-hover:text-emerald-800 sm:text-[1.35rem]">
          <Link to={post.href} className="focus:outline-none focus-visible:rounded focus-visible:ring-2 focus-visible:ring-emerald-600">
            {post.title}
          </Link>
        </h2>

        <p className="mt-3 flex-1 text-sm leading-6 text-slate-600 sm:text-[15px] sm:leading-7">
          {post.description}
        </p>

        <div className="mt-6 border-t border-slate-100 pt-5">
          <Link
            to={post.href}
            className="inline-flex items-center gap-2 text-sm font-bold text-emerald-800 transition-all hover:gap-3 focus:outline-none focus-visible:rounded focus-visible:ring-2 focus-visible:ring-emerald-600"
          >
            Read article <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function Blogs() {
  const pageRef = useRef(null);
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredPosts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return blogPosts.filter((post) => {
      const matchesCategory = activeCategory === "All" || post.category === activeCategory;
      const matchesQuery =
        !normalizedQuery ||
        `${post.title} ${post.description} ${post.categoryLabel}`.toLowerCase().includes(normalizedQuery);
      return matchesCategory && matchesQuery;
    });
  }, [query, activeCategory]);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    const ctx = gsap.context(() => {
      gsap.from(".pf-blog-eyebrow, .pf-blog-title, .pf-blog-intro, .pf-blog-search", {
        y: 22,
        opacity: 0,
        duration: 0.75,
        stagger: 0.11,
        ease: "power3.out",
        clearProps: "all",
      });

      gsap.from(".pf-blog-hero-art", {
        y: 26,
        opacity: 0,
        scale: 0.97,
        duration: 0.9,
        delay: 0.15,
        ease: "power3.out",
        clearProps: "all",
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".pf-blog-card");
      if (!cards.length) return;

      gsap.fromTo(
        cards,
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.68,
          stagger: 0.12,
          ease: "power3.out",
          clearProps: "all",
          scrollTrigger: {
            trigger: ".pf-blog-grid",
            start: "top 86%",
            once: true,
          },
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, [filteredPosts.length]);

  return (
    <main ref={pageRef} className="min-h-screen overflow-hidden bg-[#f7faf8] text-slate-900">
      
      {/* Intro */}
      <section className="relative mx-auto max-w-7xl px-4 pb-9 pt-12 sm:px-6 sm:pb-12 sm:pt-16 lg:px-15 lg:pb-14 lg:pt-15">
        <div className="pointer-events-none absolute -right-24 -top-16 h-72 w-72 rounded-full bg-emerald-100/70 blur-3xl" />
        <div className="pointer-events-none absolute -left-20 bottom-0 h-52 w-52 rounded-full bg-lime-100/60 blur-3xl" />

        <div className="relative grid items-center gap-9 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div className="pf-blog-hero-copy">
            <div className="pf-blog-eyebrow mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-3.5 py-2 text-[11px] font-bold uppercase tracking-[0.17em] text-emerald-800 shadow-sm sm:text-xs">
              <Leaf size={14} /> Practical advice. Healthier spaces.
            </div>

            <h1 className="pf-blog-title max-w-3xl text-4xl font-bold leading-[1.06] tracking-[-0.055em] text-slate-950 sm:text-5xl lg:text-[4.3rem]">
              A smarter way to keep your home <span className="text-emerald-700">pest-free.</span>
            </h1>

            <p className="pf-blog-intro mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:mt-6 sm:text-lg sm:leading-8">
              Straightforward guides to pest prevention, safer treatment choices and finding the right help when you need it.
            </p>

            <div className="pf-blog-search mt-7 flex w-full max-w-xl items-center gap-3 rounded-2xl border border-slate-200 bg-white p-2 shadow-[0_12px_32px_rgba(16,44,31,0.06)] focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-600/10 sm:mt-8">
              <span className="ml-2 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-800">
                <Search size={19} />
              </span>
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search pest control guides..."
                aria-label="Search blog articles"
                className="min-w-0 flex-1 border-0 bg-transparent py-2 text-sm text-slate-800 outline-none placeholder:text-slate-400 focus:ring-0 sm:text-base"
              />
              <span className="hidden rounded-xl bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-500 sm:inline-flex">{filteredPosts.length} guides</span>
            </div>
          </div>

          <div className="pf-blog-hero-art relative mx-auto w-full max-w-xl lg:ml-auto">
            <div className="absolute -right-3 -top-3 z-10 hidden h-24 w-24 rounded-[1.8rem] border border-white/80 bg-white/70 shadow-xl backdrop-blur-md sm:block" />
            <div className="absolute -bottom-4 -right-7 z-10 hidden rounded-2xl border border-emerald-100 bg-white p-4 shadow-[0_18px_40px_rgba(16,44,31,0.13)] sm:block">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800"><CheckCircle2 size={20} /></span>
                <span>
                  <span className="block text-sm font-bold text-slate-900">Know before you book</span>
                  <span className="mt-0.5 block text-xs text-slate-500">Clear, practical guidance</span>
                </span>
              </div>
            </div>
            <div className="relative aspect-[1.22/1] overflow-hidden rounded-[2rem] border-[6px] border-white shadow-[0_28px_80px_rgba(16,44,31,0.17)] sm:rounded-[2.5rem]">
              <img
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1500&q=90"
                alt="Bright and well-kept modern home interior"
                className="h-full w-full object-cover"
                fetchPriority="high"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/5 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 text-white sm:p-8">
                <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.15em] backdrop-blur-md">
                  <Sparkles size={13} /> The PestFind journal
                </span>
                <p className="max-w-md text-2xl font-bold leading-tight tracking-[-0.035em] sm:text-3xl">Small habits. Better prevention. More peace of mind.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article list */}
      <section id="articles" className="mx-auto max-w-7xl scroll-mt-8 px-4 pb-16 pt-7 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24">
        <div className="mb-7 flex flex-col justify-between gap-5 border-b border-slate-200 pb-6 sm:mb-9 sm:flex-row sm:items-end sm:pb-7">
          <div>
            <p className="mb-2 text-xs font-extrabold uppercase tracking-[0.2em] text-emerald-700">Browse the journal</p>
            <h2 className="text-2xl font-bold tracking-[-0.045em] text-slate-950 sm:text-3xl">Guides for a healthier home</h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-slate-500 sm:text-right">Helpful reading for prevention, treatment decisions and choosing a service provider.</p>
        </div>

        <div className="mb-7 flex gap-2 overflow-x-auto pb-2 sm:mb-9 sm:flex-wrap sm:overflow-visible sm:pb-0" aria-label="Filter blog articles">
          {categoryFilters.map((filter) => {
            const isActive = activeCategory === filter.value;
            return (
              <button
                key={filter.value}
                type="button"
                onClick={() => setActiveCategory(filter.value)}
                aria-pressed={isActive}
                className={`shrink-0 rounded-full border px-4 py-2.5 text-xs font-bold transition-all sm:px-5 sm:text-sm ${
                  isActive
                    ? "border-emerald-700 bg-emerald-700 text-white shadow-md shadow-emerald-900/10"
                    : "border-slate-200 bg-white text-slate-600 hover:border-emerald-300 hover:text-emerald-800"
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        {filteredPosts.length > 0 ? (
          <div className="pf-blog-grid grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3 xl:gap-7" aria-live="polite">
            {filteredPosts.map((post, index) => (
              <BlogCard key={post.id} post={post} index={index} />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
            <Search className="mx-auto text-slate-400" size={28} />
            <h3 className="mt-4 text-lg font-bold text-slate-900">No guides found</h3>
            <p className="mt-2 text-sm text-slate-500">Try another search term or choose a different category.</p>
            <button
              onClick={() => { setQuery(""); setActiveCategory("All"); }}
              className="mt-5 rounded-full bg-emerald-700 px-5 py-2.5 text-sm font-bold text-white hover:bg-emerald-800"
              type="button"
            >
              Clear filters
            </button>
          </div>
        )}

        <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-[1.7rem] border border-emerald-900/10 bg-white p-5 shadow-sm sm:mt-10 sm:flex-row sm:items-center sm:p-7 lg:p-8">
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-800">
              <ShieldCheck size={23} />
            </span>
            <div>
              <h3 className="text-lg font-bold tracking-tight text-slate-950">Need help with a pest problem?</h3>
              <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-600">Use what you've learned and tell PestFind what you need help with.</p>
            </div>
          </div>
          <Link
            to="/#pest-request-form"
            className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-full bg-emerald-700 px-5 py-3 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-emerald-800 sm:w-auto"
          >
            Find pest help <ArrowRight size={17} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>

    
  );
}
