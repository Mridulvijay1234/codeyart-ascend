import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  Globe2, Code2, Megaphone, TrendingUp, Brain, Workflow, Sparkles,
  ArrowRight, ArrowUpRight, Cpu, BarChart3, ShieldCheck, Rocket,
  Layers, Boxes, Database, Cloud, GitBranch, MonitorSmartphone,
  HeartPulse, GraduationCap, Building2, ShoppingBag, Factory,
  Wallet, Lightbulb, Store, Quote, Mail, Phone, MapPin, Send,
  Search, PenTool, Hammer, Beaker, PartyPopper, LineChart, Compass,
} from "lucide-react";

/* ---------- shared bits ---------- */
function SectionEyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full cy-glass px-4 py-1.5 text-xs font-medium tracking-[0.18em] uppercase text-[var(--cy-ink-2)]">
      <span className="size-1.5 rounded-full bg-[var(--cy-violet)] cy-anim-pulse" />
      {children}
    </div>
  );
}

function MagneticButton({
  children, variant = "primary", href = "#",
}: { children: ReactNode; variant?: "primary" | "ghost"; href?: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 15 });
  const sy = useSpring(y, { stiffness: 180, damping: 15 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.35);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.35);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  const base = "cy-magnetic-btn relative inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold transition-all";
  const styles = variant === "primary"
    ? "text-white shadow-[0_20px_50px_-15px_rgba(46,123,255,0.55)]"
    : "cy-glass-strong text-[var(--cy-ink)] hover:scale-[1.02]";

  return (
    <motion.a
      ref={ref} href={href}
      onMouseMove={onMove} onMouseLeave={onLeave}
      style={{ x: sx, y: sy, background: variant === "primary" ? "var(--cy-grad-primary)" : undefined }}
      className={`${base} ${styles}`}
    >
      {children}
    </motion.a>
  );
}

/* ---------- NAV ---------- */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 30);
    f(); window.addEventListener("scroll", f); return () => window.removeEventListener("scroll", f);
  }, []);
  const links = ["Templates", "Categories", "Pricing", "Showcase", "Stack", "Contact"];
  return (
    <header className="fixed top-0 inset-x-0 z-50 flex justify-center pt-4 px-4">
      <nav className={`flex items-center gap-6 rounded-full px-3 py-2 transition-all ${scrolled ? "cy-glass-strong" : "cy-glass"}`}>
        <a href="#" className="flex items-center gap-2 pl-3 pr-2">
          <span className="grid size-8 place-items-center rounded-xl text-white font-bold" style={{ background: "var(--cy-grad-primary)" }}>Z</span>
          <span className="font-semibold tracking-tight text-[var(--cy-ink)]">Zyvera</span>
        </a>
        <ul className="hidden md:flex items-center gap-1">
          {links.map(l => (
            <li key={l}><a href={`#${l.toLowerCase()}`} className="px-3 py-1.5 rounded-full text-sm text-[var(--cy-ink-2)] hover:bg-white/60 transition">{l}</a></li>
          ))}
        </ul>
        <a href="#contact" className="cy-magnetic-btn rounded-full px-5 py-2 text-sm font-semibold text-white" style={{ background: "var(--cy-grad-primary)" }}>
          Browse Templates
        </a>
      </nav>
    </header>
  );
}

/* ---------- HERO ---------- */
function Globe() {
  return (
    <div className="relative aspect-square w-full max-w-[560px] mx-auto">
      <div className="absolute inset-0 rounded-full" style={{ background: "radial-gradient(circle at 30% 30%, rgba(109,92,255,0.35), rgba(34,211,238,0.15) 45%, transparent 70%)", filter: "blur(20px)" }} />
      <svg viewBox="0 0 400 400" className="absolute inset-0 cy-anim-spin-slow">
        <defs>
          <radialGradient id="globeFill" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#e8edff" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#6d5cff" stopOpacity="0.05" />
          </radialGradient>
          <linearGradient id="meridian" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#6d5cff" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        <circle cx="200" cy="200" r="180" fill="url(#globeFill)" stroke="url(#meridian)" strokeWidth="1.2" />
        {[...Array(8)].map((_, i) => (
          <ellipse key={i} cx="200" cy="200" rx={180} ry={180 - i * 22} fill="none" stroke="url(#meridian)" strokeWidth="0.8" opacity={0.6} />
        ))}
        {[...Array(8)].map((_, i) => (
          <ellipse key={`v${i}`} cx="200" cy="200" rx={180 - i * 22} ry={180} fill="none" stroke="url(#meridian)" strokeWidth="0.8" opacity={0.5} />
        ))}
        {[...Array(40)].map((_, i) => {
          const a = (i / 40) * Math.PI * 2; const r = 180;
          const cx = 200 + Math.cos(a) * r * Math.random() * 0.9;
          const cy = 200 + Math.sin(a) * r * Math.random() * 0.9;
          return <circle key={`d${i}`} cx={cx} cy={cy} r={1.5} fill="#2e7bff" opacity="0.7" />;
        })}
      </svg>
      <svg viewBox="0 0 400 400" className="absolute inset-0 cy-anim-spin-rev">
        {[...Array(14)].map((_, i) => {
          const a = (i / 14) * Math.PI * 2;
          return <circle key={i} cx={200 + Math.cos(a) * 200} cy={200 + Math.sin(a) * 200} r="3" fill="#6d5cff" opacity="0.6" />;
        })}
      </svg>
      <div className="absolute -inset-10 rounded-full pointer-events-none" style={{ background: "conic-gradient(from 0deg, transparent, rgba(109,92,255,0.15), transparent 30%)" }} />
    </div>
  );
}

function FloatingCard({
  title, icon: Icon, color, x, y, delay = 0,
}: { title: string; icon: typeof Code2; color: string; x: string; y: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      style={{ left: x, top: y }}
      className="absolute"
    >
      <div className="cy-glass-strong rounded-2xl p-3 pr-5 flex items-center gap-3 cy-anim-float" style={{ animationDelay: `${delay}s` }}>
        <div className="grid size-10 place-items-center rounded-xl text-white" style={{ background: color }}>
          <Icon className="size-5" />
        </div>
        <div>
          <div className="text-[10px] uppercase tracking-wider text-[var(--cy-mute)]">Service</div>
          <div className="text-sm font-semibold text-[var(--cy-ink)]">{title}</div>
        </div>
      </div>
    </motion.div>
  );
}

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0); const my = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 60, damping: 18 });
  const py = useSpring(my, { stiffness: 60, damping: 18 });
  const tx = useTransform(px, (v) => v * 20);
  const ty = useTransform(py, (v) => v * 20);

  return (
    <section
      ref={ref}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
      className="relative min-h-screen overflow-hidden pt-36 pb-24 cy-mesh"
    >
      <div className="absolute inset-0 cy-grid-bg" />
      <motion.div style={{ x: tx, y: ty }} className="absolute -top-32 -left-32 size-[420px] rounded-full" >
        <div className="size-full rounded-full" style={{ background: "radial-gradient(circle, rgba(109,92,255,0.45), transparent 70%)", filter: "blur(40px)" }} />
      </motion.div>
      <motion.div style={{ x: useTransform(px, v => -v * 30), y: useTransform(py, v => -v * 30) }} className="absolute -bottom-32 -right-20 size-[500px] rounded-full">
        <div className="size-full rounded-full" style={{ background: "radial-gradient(circle, rgba(34,211,238,0.4), transparent 70%)", filter: "blur(50px)" }} />
      </motion.div>

      <div className="relative mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <SectionEyebrow>Premium Template Marketplace</SectionEyebrow>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.02] tracking-tight text-[var(--cy-ink)]"
          >
            Launch faster with{" "}
            <span className="cy-text-brand">ready-made</span> templates.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="mt-6 max-w-xl text-lg text-[var(--cy-mute)] leading-relaxed"
          >
            Production-ready e-commerce, SaaS, portfolio and landing page templates —
            built with React, Next.js & Tailwind. Buy once, ship in minutes.
          </motion.p>

          {/* search bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="mt-8 cy-glass-strong rounded-full p-1.5 pl-5 flex items-center gap-3 max-w-xl"
          >
            <Search className="size-5 text-[var(--cy-mute)]" />
            <input
              type="text"
              placeholder="Search templates — ecommerce, SaaS, portfolio…"
              className="flex-1 bg-transparent text-sm text-[var(--cy-ink)] placeholder:text-[var(--cy-mute)]/70 focus:outline-none"
            />
            <button className="rounded-full px-5 py-2.5 text-sm font-semibold text-white" style={{ background: "var(--cy-grad-primary)" }}>
              Search
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="mt-6 flex flex-wrap items-center gap-4"
          >
            <MagneticButton href="#templates">Browse Templates <ArrowRight className="size-4" /></MagneticButton>
            <MagneticButton variant="ghost" href="#showcase">Live Previews <ArrowUpRight className="size-4" /></MagneticButton>
          </motion.div>

          <div className="mt-10 flex flex-wrap items-center gap-6 text-xs text-[var(--cy-mute)]">
            <div className="flex -space-x-2">
              {["#6d5cff","#2e7bff","#22d3ee","#ff5fa8"].map(c => (
                <div key={c} className="size-7 rounded-full border-2 border-white" style={{ background: c }} />
              ))}
            </div>
            <div><b className="text-[var(--cy-ink)]">12,400+</b> developers shipping faster</div>
            <div className="flex items-center gap-1 text-amber-500">★★★★★ <span className="text-[var(--cy-mute)] ml-1">4.9/5 (2.1k reviews)</span></div>
          </div>
        </div>

        {/* Template preview stack */}
        <motion.div style={{ x: useTransform(px, v => v * -25), y: useTransform(py, v => v * -25) }} className="relative aspect-square max-w-[560px] mx-auto">
          {/* glow */}
          <div className="absolute inset-8 rounded-[40px]" style={{ background: "radial-gradient(circle at 50% 40%, rgba(109,92,255,0.35), rgba(34,211,238,0.15) 50%, transparent 75%)", filter: "blur(30px)" }} />

          {/* back template card */}
          <motion.div
            initial={{ opacity: 0, x: 40, rotate: 8 }} animate={{ opacity: 1, x: 0, rotate: 6 }}
            transition={{ delay: 0.4, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-2 top-6 w-[78%] aspect-[4/5] rounded-3xl overflow-hidden cy-glass-strong"
          >
            <div className="h-1/2 relative" style={{ background: "linear-gradient(135deg,#ff5fa8,#6d5cff)" }}>
              <div className="absolute inset-0 grid place-items-center text-white text-5xl font-semibold tracking-tight">Aura</div>
            </div>
            <div className="p-5">
              <div className="text-xs text-[var(--cy-mute)] uppercase tracking-widest">Fashion E-commerce</div>
              <div className="mt-1 font-semibold text-[var(--cy-ink)]">Aura Store Template</div>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-lg font-semibold cy-text-brand">$49</span>
                <span className="text-xs text-[var(--cy-mute)]">Next.js · Stripe</span>
              </div>
            </div>
          </motion.div>

          {/* front template card */}
          <motion.div
            initial={{ opacity: 0, y: 30, rotate: -8 }} animate={{ opacity: 1, y: 0, rotate: -4 }}
            transition={{ delay: 0.55, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-2 bottom-4 w-[78%] aspect-[4/5] rounded-3xl overflow-hidden cy-glass-strong cy-anim-float"
          >
            <div className="h-1/2 relative" style={{ background: "linear-gradient(135deg,#6d5cff,#22d3ee)" }}>
              <div className="absolute top-4 left-4 right-4 flex items-center gap-1.5">
                <span className="size-2.5 rounded-full bg-white/60" /><span className="size-2.5 rounded-full bg-white/40" /><span className="size-2.5 rounded-full bg-white/30" />
              </div>
              <div className="absolute inset-0 grid place-items-center text-white">
                <div className="text-center">
                  <ShoppingBag className="size-12 mx-auto" />
                  <div className="mt-2 text-3xl font-semibold tracking-tight">Nova Shop</div>
                </div>
              </div>
            </div>
            <div className="p-5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-widest text-white px-2 py-0.5 rounded-full" style={{ background: "var(--cy-grad-primary)" }}>Bestseller</span>
                <span className="text-xs text-amber-500">★ 4.9</span>
              </div>
              <div className="mt-2 font-semibold text-[var(--cy-ink)]">Nova E-commerce Kit</div>
              <div className="mt-1 text-xs text-[var(--cy-mute)]">Full-stack store · Cart · Checkout</div>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-2xl font-semibold cy-text-brand">$79</span>
                <button className="rounded-full px-3 py-1.5 text-xs font-semibold text-white" style={{ background: "var(--cy-grad-primary)" }}>Buy now</button>
              </div>
            </div>
          </motion.div>

          {/* floating stat chips */}
          <FloatingCard title="Instant Download" icon={Rocket} color="linear-gradient(135deg,#6d5cff,#2e7bff)" x="-12%" y="6%" delay={0.7} />
          <FloatingCard title="Lifetime Updates" icon={Sparkles} color="linear-gradient(135deg,#22d3ee,#2e7bff)" x="68%" y="-2%" delay={0.9} />
          <FloatingCard title="Stripe Checkout" icon={Wallet} color="linear-gradient(135deg,#ffb547,#ff5fa8)" x="74%" y="82%" delay={1.1} />
        </motion.div>
      </div>

      {/* category chips marquee */}
      <div className="relative mt-20 overflow-hidden">
        <div className="flex gap-4 cy-anim-marquee whitespace-nowrap">
          {[...Array(2)].flatMap((_, i) =>
            ["E-commerce", "SaaS Dashboard", "Portfolio", "Landing Page", "Agency", "Blog", "Marketplace", "Startup", "Mobile App", "Restaurant", "Real Estate", "Fitness"].map((b) => (
              <span key={`${i}-${b}`} className="cy-glass rounded-full px-5 py-2 text-sm font-semibold text-[var(--cy-ink-2)] shrink-0">{b}</span>
            ))
          )}
        </div>
      </div>
    </section>
  );
}


/* ---------- STATS ---------- */
function Counter({ end, suffix = "", duration = 1800 }: { end: number; suffix?: string; duration?: number }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      const t0 = performance.now();
      const tick = (t: number) => {
        const k = Math.min(1, (t - t0) / duration);
        setN(Math.round(end * (1 - Math.pow(1 - k, 3))));
        if (k < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      io.disconnect();
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [end, duration]);
  return <span ref={ref}>{n}{suffix}</span>;
}

export function Stats() {
  const items = [
    { v: 500, s: "+", l: "Projects Delivered" },
    { v: 100, s: "+", l: "Happy Clients" },
    { v: 10,  s: "+", l: "Industries Served" },
    { v: 98,  s: "%", l: "Client Satisfaction" },
  ];
  return (
    <section className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid md:grid-cols-2 gap-12 items-end mb-16">
          <div>
            <SectionEyebrow>Digital Future</SectionEyebrow>
            <h2 className="mt-5 text-4xl md:text-5xl font-semibold tracking-tight text-[var(--cy-ink)]">
              Numbers that prove our <span className="cy-text-brand">impact</span>.
            </h2>
          </div>
          <p className="text-[var(--cy-mute)] text-lg max-w-xl">
            From early-stage startups to Fortune 500 enterprises, we've shipped products
            that have moved markets and earned the trust of leaders across continents.
          </p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((it, i) => (
            <motion.div
              key={it.l}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.08 }}
              className="cy-glass rounded-3xl p-8"
            >
              <div className="text-5xl md:text-6xl font-semibold tracking-tight cy-text-gradient">
                <Counter end={it.v} suffix={it.s} />
              </div>
              <div className="mt-2 text-sm text-[var(--cy-mute)]">{it.l}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- SERVICES ECOSYSTEM (orbit) ---------- */
export function Services() {
  const services = [
    { icon: Megaphone, label: "Digital Marketing", desc: "Animated dashboards, analytics graphs, ad campaigns that scale.", color: "#6d5cff" },
    { icon: TrendingUp, label: "Sales Marketing", desc: "Lead funnels, CRM systems, conversion analytics that close deals.", color: "#2e7bff" },
    { icon: Code2, label: "Web Development", desc: "Live website experiences, UI systems, responsive everything.", color: "#22d3ee" },
    { icon: Cpu, label: "Software Development", desc: "SaaS platforms, dashboards, internal tools and APIs.", color: "#ff5fa8" },
    { icon: Brain, label: "AI Solutions", desc: "LLM apps, RAG search, computer vision, intelligent agents.", color: "#ffb547" },
    { icon: Workflow, label: "Business Automation", desc: "Workflow engines, ETL, no-code/low-code orchestration.", color: "#6d5cff" },
    { icon: Sparkles, label: "Branding & Growth", desc: "Identity, narrative, design systems and growth engineering.", color: "#2e7bff" },
  ];
  return (
    <section id="services" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center max-w-2xl mx-auto">
          <SectionEyebrow>Services Ecosystem</SectionEyebrow>
          <h2 className="mt-5 text-4xl md:text-5xl font-semibold tracking-tight text-[var(--cy-ink)]">
            One studio. <span className="cy-text-brand">Every</span> capability your business needs.
          </h2>
        </div>

        {/* orbit */}
        <div className="relative mx-auto mt-20 hidden lg:block aspect-square max-w-[680px]">
          {[1, 2, 3].map((k) => (
            <div key={k} className="absolute inset-0 rounded-full border border-[var(--cy-line)]" style={{ transform: `scale(${0.5 + k * 0.25})` }} />
          ))}
          <div className="absolute inset-0 grid place-items-center">
            <div className="cy-glass-strong rounded-3xl px-8 py-6 text-center">
              <div className="grid size-14 mx-auto place-items-center rounded-2xl text-white" style={{ background: "var(--cy-grad-primary)" }}>
                <Sparkles className="size-7" />
              </div>
              <div className="mt-3 text-sm font-semibold text-[var(--cy-ink)]">ZYVERA CORE</div>
              <div className="text-xs text-[var(--cy-mute)]">Strategy · Design · Engineering</div>
            </div>
          </div>
          {services.map((s, i) => {
            const a = (i / services.length) * Math.PI * 2 - Math.PI / 2;
            const r = 290;
            const left = `calc(50% + ${Math.cos(a) * r}px)`;
            const top = `calc(50% + ${Math.sin(a) * r}px)`;
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.6 }}
                style={{ left, top }}
                className="absolute -translate-x-1/2 -translate-y-1/2"
              >
                <div className="cy-glass-strong rounded-2xl p-4 flex items-center gap-3 w-56 hover:scale-105 transition">
                  <div className="grid size-10 shrink-0 place-items-center rounded-xl text-white" style={{ background: s.color }}>
                    <s.icon className="size-5" />
                  </div>
                  <div className="text-sm font-semibold text-[var(--cy-ink)]">{s.label}</div>
                </div>
              </motion.div>
            );
          })}
          {/* connecting lines */}
          <svg className="absolute inset-0 size-full pointer-events-none" viewBox="0 0 680 680">
            {services.map((_, i) => {
              const a = (i / services.length) * Math.PI * 2 - Math.PI / 2;
              return <line key={i} x1="340" y1="340" x2={340 + Math.cos(a) * 290} y2={340 + Math.sin(a) * 290} stroke="url(#orbitGrad)" strokeWidth="1" className="cy-anim-dash" />;
            })}
            <defs>
              <linearGradient id="orbitGrad"><stop offset="0%" stopColor="#6d5cff"/><stop offset="100%" stopColor="#22d3ee"/></linearGradient>
            </defs>
          </svg>
        </div>

        {/* grid for all viewports */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-20">
          {services.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.05 }}
              className="group relative cy-glass rounded-3xl p-8 overflow-hidden hover:-translate-y-1 transition-all"
            >
              <div className="absolute -top-20 -right-20 size-48 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                   style={{ background: `radial-gradient(circle, ${s.color}55, transparent 70%)`, filter: "blur(30px)" }} />
              <div className="grid size-12 place-items-center rounded-2xl text-white shadow-lg" style={{ background: s.color }}>
                <s.icon className="size-6" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-[var(--cy-ink)]">{s.label}</h3>
              <p className="mt-2 text-sm text-[var(--cy-mute)] leading-relaxed">{s.desc}</p>
              <a href="#contact" className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-[var(--cy-blue)]">
                Explore <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- AI SECTION ---------- */
export function AISection() {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 cy-mesh opacity-60" />
      <div className="relative mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <SectionEyebrow>AI & Innovation</SectionEyebrow>
          <h2 className="mt-5 text-4xl md:text-5xl font-semibold tracking-tight text-[var(--cy-ink)]">
            Powered by <span className="cy-text-brand">Artificial Intelligence</span>
          </h2>
          <p className="mt-5 text-lg text-[var(--cy-mute)] max-w-xl">
            We embed intelligence into every layer — from RAG search and copilots to
            computer vision pipelines and predictive analytics that turn data into decisions.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-3 max-w-md">
            {[
              { i: Brain, t: "LLM Agents" },
              { i: BarChart3, t: "Predictive Analytics" },
              { i: ShieldCheck, t: "Safety & Guardrails" },
              { i: Cpu, t: "MLOps Pipelines" },
            ].map(it => (
              <div key={it.t} className="cy-glass rounded-2xl px-4 py-3 flex items-center gap-3">
                <it.i className="size-5 text-[var(--cy-violet)]" />
                <span className="text-sm font-semibold text-[var(--cy-ink)]">{it.t}</span>
              </div>
            ))}
          </div>
        </div>
        {/* neural net */}
        <div className="relative aspect-square">
          <svg viewBox="0 0 500 500" className="size-full">
            <defs>
              <linearGradient id="netGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#6d5cff" />
                <stop offset="100%" stopColor="#22d3ee" />
              </linearGradient>
              <radialGradient id="nodeGlow"><stop offset="0%" stopColor="#6d5cff" stopOpacity="0.8"/><stop offset="100%" stopColor="#6d5cff" stopOpacity="0"/></radialGradient>
            </defs>
            {(() => {
              const layers = [4, 6, 6, 4];
              const xs = [80, 200, 320, 440];
              const nodes: { x: number; y: number }[][] = layers.map((n, li) => {
                const gap = 380 / (n + 1);
                return Array.from({ length: n }, (_, i) => ({ x: xs[li], y: 60 + gap * (i + 1) }));
              });
              return (
                <>
                  {nodes.slice(0, -1).flatMap((layer, li) =>
                    layer.flatMap((a, ai) =>
                      nodes[li + 1].map((b, bi) => (
                        <line key={`${li}-${ai}-${bi}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                          stroke="url(#netGrad)" strokeWidth="0.8" opacity="0.35" />
                      ))
                    )
                  )}
                  {nodes.flat().map((n, i) => (
                    <g key={i}>
                      <circle cx={n.x} cy={n.y} r="18" fill="url(#nodeGlow)" />
                      <circle cx={n.x} cy={n.y} r="6" fill="white" stroke="url(#netGrad)" strokeWidth="2">
                        <animate attributeName="r" values="5;8;5" dur={`${2 + (i % 4) * 0.5}s`} repeatCount="indefinite" />
                      </circle>
                    </g>
                  ))}
                </>
              );
            })()}
          </svg>
          <div className="absolute inset-0 grid place-items-center pointer-events-none">
            <div className="cy-glass-strong rounded-2xl px-5 py-3 text-xs font-semibold tracking-wider text-[var(--cy-ink)]">
              ZYVERA · NEURAL CORE
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- CASE STUDIES (horizontal scroll feel) ---------- */
export function CaseStudies() {
  const cases = [
    { title: "Nimbus Analytics", tag: "SaaS · AI", desc: "Real-time BI platform processing 8B events/day.", grad: "linear-gradient(135deg,#6d5cff,#2e7bff)" },
    { title: "Orbit Commerce", tag: "E-commerce", desc: "Headless storefront with 3.2× conversion lift.", grad: "linear-gradient(135deg,#ff5fa8,#6d5cff)" },
    { title: "Helios Health", tag: "Healthcare", desc: "Patient app deployed across 240 clinics.", grad: "linear-gradient(135deg,#22d3ee,#2e7bff)" },
    { title: "Quantia Banking", tag: "FinTech", desc: "Risk engine with sub-50ms inference.", grad: "linear-gradient(135deg,#ffb547,#ff5fa8)" },
    { title: "Lumen Learning", tag: "EdTech", desc: "Adaptive learning serving 1.2M students.", grad: "linear-gradient(135deg,#6d5cff,#22d3ee)" },
  ];
  return (
    <section id="work" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6 flex items-end justify-between mb-12 gap-6 flex-wrap">
        <div>
          <SectionEyebrow>Case Studies</SectionEyebrow>
          <h2 className="mt-5 text-4xl md:text-5xl font-semibold tracking-tight text-[var(--cy-ink)]">
            Selected <span className="cy-text-brand">work</span>.
          </h2>
        </div>
        <a href="#" className="text-sm font-semibold text-[var(--cy-blue)] inline-flex items-center gap-1">All projects <ArrowRight className="size-4" /></a>
      </div>
      <div className="overflow-x-auto pb-8 px-6 lg:px-[max(1.5rem,calc((100vw-80rem)/2))] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex gap-6 snap-x snap-mandatory">
          {cases.map((c, i) => (
            <motion.article
              key={c.title}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.06 }}
              className="snap-center shrink-0 w-[78vw] sm:w-[440px] aspect-[4/5] rounded-3xl overflow-hidden relative group cy-glass"
            >
              <div className="absolute inset-0" style={{ background: c.grad, opacity: 0.9 }} />
              <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.4), transparent 50%)" }} />
              <div className="absolute inset-0 flex flex-col justify-between p-7 text-white">
                <div className="flex items-center justify-between">
                  <span className="cy-glass-strong rounded-full px-3 py-1 text-[10px] font-semibold tracking-widest uppercase text-[var(--cy-ink)]">{c.tag}</span>
                  <ArrowUpRight className="size-6 opacity-80 group-hover:rotate-45 transition-transform" />
                </div>
                <div>
                  <h3 className="text-3xl font-semibold tracking-tight">{c.title}</h3>
                  <p className="mt-2 text-white/85 max-w-xs">{c.desc}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- INDUSTRIES ---------- */
export function Industries() {
  const items = [
    { i: HeartPulse, l: "Healthcare" }, { i: GraduationCap, l: "Education" },
    { i: Building2, l: "Real Estate" }, { i: ShoppingBag, l: "E-commerce" },
    { i: Factory, l: "Manufacturing" }, { i: Wallet, l: "Finance" },
    { i: Lightbulb, l: "Startups" }, { i: Store, l: "Retail" },
  ];
  return (
    <section id="industries" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center max-w-2xl mx-auto">
          <SectionEyebrow>Industries</SectionEyebrow>
          <h2 className="mt-5 text-4xl md:text-5xl font-semibold tracking-tight text-[var(--cy-ink)]">
            Built for <span className="cy-text-brand">every</span> domain.
          </h2>
        </div>
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-5">
          {items.map((it, i) => (
            <motion.div
              key={it.l}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.05 }}
              className="cy-glass rounded-3xl p-8 text-center group hover:-translate-y-1 transition"
            >
              <div className="mx-auto grid size-14 place-items-center rounded-2xl cy-glass-strong group-hover:scale-110 transition" >
                <it.i className="size-6 text-[var(--cy-violet)]" />
              </div>
              <div className="mt-4 text-sm font-semibold text-[var(--cy-ink)]">{it.l}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- PROCESS TIMELINE ---------- */
export function Process() {
  const steps = [
    { i: Search, t: "Discovery", d: "Deep research and problem framing." },
    { i: Compass, t: "Strategy", d: "Roadmaps that align tech with business." },
    { i: PenTool, t: "Design", d: "Pixel-perfect product and brand systems." },
    { i: Hammer, t: "Development", d: "Engineering at production grade." },
    { i: Beaker, t: "Testing", d: "QA, performance, security and accessibility." },
    { i: Rocket, t: "Launch", d: "Cloud-native deployments, zero downtime." },
    { i: LineChart, t: "Growth", d: "Iterate, measure, scale, repeat." },
  ];
  return (
    <section id="process" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center max-w-2xl mx-auto">
          <SectionEyebrow>Process</SectionEyebrow>
          <h2 className="mt-5 text-4xl md:text-5xl font-semibold tracking-tight text-[var(--cy-ink)]">
            A studio process built to <span className="cy-text-brand">ship</span>.
          </h2>
        </div>
        <div className="relative mt-20">
          <div className="absolute left-1/2 top-0 bottom-0 w-px hidden md:block" style={{ background: "linear-gradient(to bottom, transparent, #6d5cff, #22d3ee, transparent)" }} />
          <div className="space-y-10">
            {steps.map((s, i) => (
              <motion.div
                key={s.t}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6 }}
                className={`md:grid md:grid-cols-2 md:gap-12 items-center ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}
              >
                <div className={`cy-glass rounded-3xl p-7 ${i % 2 ? "md:text-left" : "md:text-right"}`}>
                  <div className="text-xs text-[var(--cy-mute)] tracking-widest">STEP {String(i + 1).padStart(2, "0")}</div>
                  <h3 className="mt-2 text-2xl font-semibold text-[var(--cy-ink)]">{s.t}</h3>
                  <p className="mt-2 text-[var(--cy-mute)]">{s.d}</p>
                </div>
                <div className="hidden md:grid place-items-center">
                  <div className="grid size-16 place-items-center rounded-2xl text-white shadow-lg" style={{ background: "var(--cy-grad-primary)" }}>
                    <s.i className="size-7" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- TESTIMONIALS ---------- */
export function Testimonials() {
  const items = [
    { n: "Priya Menon", r: "CPO, Nimbus", q: "Zyvera shipped a platform our team scaled to millions of users without a hiccup. Truly studio-grade.", a: "PM" },
    { n: "Daniel Cole", r: "CEO, Orbit Labs", q: "Best engineering partner we've worked with — design, code, growth: every detail considered.", a: "DC" },
    { n: "Aiko Tanaka", r: "VP, Helios Health", q: "They translated complex compliance into a product clinicians actually love. Magic.", a: "AT" },
    { n: "Marco Vidal", r: "CTO, Quantia", q: "Sub-50ms inference, beautiful UI, deployed in 6 weeks. We're long-term partners now.", a: "MV" },
  ];
  const [i, setI] = useState(0);
  useEffect(() => { const t = setInterval(() => setI(v => (v + 1) % items.length), 5000); return () => clearInterval(t); }, [items.length]);
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <SectionEyebrow>Testimonials</SectionEyebrow>
        <h2 className="mt-5 text-4xl md:text-5xl font-semibold tracking-tight text-[var(--cy-ink)]">
          Loved by <span className="cy-text-brand">leaders</span> who build the future.
        </h2>
        <div className="relative mt-16 h-[320px]">
          {items.map((it, idx) => (
            <motion.div
              key={it.n}
              initial={false}
              animate={{
                opacity: idx === i ? 1 : 0,
                scale: idx === i ? 1 : 0.92,
                rotateY: idx === i ? 0 : 12,
              }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 grid place-items-center"
              style={{ pointerEvents: idx === i ? "auto" : "none" }}
            >
              <div className="cy-glass-strong rounded-3xl p-10 max-w-2xl">
                <Quote className="size-8 text-[var(--cy-violet)] mx-auto" />
                <p className="mt-4 text-xl md:text-2xl text-[var(--cy-ink)] leading-snug">"{it.q}"</p>
                <div className="mt-6 flex items-center justify-center gap-3">
                  <div className="grid size-11 place-items-center rounded-full text-white font-semibold" style={{ background: "var(--cy-grad-primary)" }}>{it.a}</div>
                  <div className="text-left">
                    <div className="font-semibold text-[var(--cy-ink)]">{it.n}</div>
                    <div className="text-xs text-[var(--cy-mute)]">{it.r}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-2 flex justify-center gap-2">
          {items.map((_, idx) => (
            <button key={idx} onClick={() => setI(idx)} className={`h-1.5 rounded-full transition-all ${idx === i ? "w-8 bg-[var(--cy-violet)]" : "w-2 bg-[var(--cy-line)]"}`} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- TECH STACK ---------- */
export function TechStack() {
  const techs = [
    { i: Code2, l: "React" }, { i: Layers, l: "Next.js" }, { i: Boxes, l: "Node.js" },
    { i: Database, l: "MongoDB" }, { i: Cloud, l: "Firebase" }, { i: Brain, l: "Python" },
    { i: Sparkles, l: "AI APIs" }, { i: Cloud, l: "AWS" }, { i: GitBranch, l: "Docker" },
  ];
  return (
    <section id="stack" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center max-w-2xl mx-auto">
          <SectionEyebrow>Technology Stack</SectionEyebrow>
          <h2 className="mt-5 text-4xl md:text-5xl font-semibold tracking-tight text-[var(--cy-ink)]">
            A modern stack for <span className="cy-text-brand">modern</span> companies.
          </h2>
        </div>
        <div className="mt-16 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-9 gap-4">
          {techs.map((t, i) => (
            <motion.div
              key={t.l}
              initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.04 }}
              className="cy-glass rounded-2xl aspect-square grid place-items-center group hover:-translate-y-1 transition"
            >
              <div className="text-center">
                <t.i className="size-7 mx-auto text-[var(--cy-blue)] group-hover:scale-125 transition-transform" />
                <div className="mt-2 text-xs font-semibold text-[var(--cy-ink)]">{t.l}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- GLOBAL IMPACT ---------- */
export function GlobalImpact() {
  const nodes = [
    { x: 22, y: 38, l: "SF" }, { x: 28, y: 42, l: "NYC" }, { x: 47, y: 35, l: "London" },
    { x: 52, y: 40, l: "Berlin" }, { x: 60, y: 48, l: "Dubai" }, { x: 70, y: 50, l: "Bangalore" },
    { x: 78, y: 45, l: "Singapore" }, { x: 86, y: 64, l: "Sydney" }, { x: 40, y: 70, l: "São Paulo" },
  ];
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center max-w-2xl mx-auto">
          <SectionEyebrow>Global Impact</SectionEyebrow>
          <h2 className="mt-5 text-4xl md:text-5xl font-semibold tracking-tight text-[var(--cy-ink)]">
            Shipping from <span className="cy-text-brand">everywhere</span>, to everywhere.
          </h2>
        </div>
        <div className="relative mt-16 cy-glass rounded-[36px] p-8 md:p-12 overflow-hidden">
          <div className="absolute inset-0 cy-grid-bg opacity-50" />
          <div className="relative aspect-[2/1] w-full">
            <svg viewBox="0 0 100 60" className="absolute inset-0 size-full">
              <defs>
                <linearGradient id="lineGrad"><stop offset="0%" stopColor="#6d5cff"/><stop offset="100%" stopColor="#22d3ee"/></linearGradient>
              </defs>
              {nodes.map((n, i) => nodes.slice(i + 1).map((m, j) => (
                <line key={`${i}-${j}`} x1={n.x} y1={n.y} x2={m.x} y2={m.y}
                  stroke="url(#lineGrad)" strokeWidth="0.15" opacity="0.4"
                  className="cy-anim-dash" />
              )))}
              {nodes.map((n, i) => (
                <g key={i}>
                  <circle cx={n.x} cy={n.y} r="1.4" fill="url(#lineGrad)">
                    <animate attributeName="r" values="1.4;2.4;1.4" dur={`${2 + (i % 3)}s`} repeatCount="indefinite" />
                  </circle>
                  <circle cx={n.x} cy={n.y} r="3" fill="none" stroke="url(#lineGrad)" strokeWidth="0.3" opacity="0.3" />
                </g>
              ))}
            </svg>
          </div>
          <div className="relative mt-8 grid grid-cols-3 md:grid-cols-4 gap-4">
            {[
              { v: 32, s: "+", l: "Countries" },
              { v: 8,  s: "", l: "Time zones" },
              { v: 24, s: "/7", l: "Support" },
              { v: 12, s: "+", l: "Awards" },
            ].map(it => (
              <div key={it.l} className="cy-glass-strong rounded-2xl p-5 text-center">
                <div className="text-3xl font-semibold cy-text-gradient"><Counter end={it.v} suffix={it.s} /></div>
                <div className="text-xs text-[var(--cy-mute)] mt-1">{it.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- CONTACT ---------- */
export function Contact() {
  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 cy-mesh opacity-80" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 size-[600px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(109,92,255,0.25), transparent 70%)", filter: "blur(60px)" }} />
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="text-center max-w-2xl mx-auto">
          <SectionEyebrow>Contact</SectionEyebrow>
          <h2 className="mt-5 text-4xl md:text-6xl font-semibold tracking-tight text-[var(--cy-ink)]">
            Let's Build The <span className="cy-text-brand">Future</span> Together
          </h2>
          <p className="mt-5 text-lg text-[var(--cy-mute)]">
            Tell us about your project. We'll get back within 24 hours.
          </p>
        </div>

        <div className="mt-14 grid lg:grid-cols-5 gap-8">
          <form className="lg:col-span-3 cy-glass-strong rounded-3xl p-8 grid gap-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Name" placeholder="Jane Doe" />
              <Field label="Email" placeholder="jane@company.com" type="email" />
            </div>
            <Field label="Company" placeholder="Acme Inc." />
            <div>
              <label className="text-xs font-semibold tracking-wider uppercase text-[var(--cy-mute)]">Service</label>
              <select className="mt-2 w-full rounded-2xl px-4 py-3 bg-white/70 border border-[var(--cy-line)] text-sm text-[var(--cy-ink)] focus:outline-none focus:ring-2 focus:ring-[var(--cy-violet)]">
                <option>Web Development</option><option>Software Development</option>
                <option>AI Solutions</option><option>Digital Marketing</option>
                <option>Business Automation</option><option>Branding & Growth</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold tracking-wider uppercase text-[var(--cy-mute)]">Project Brief</label>
              <textarea rows={4} placeholder="A few sentences about what you're building…"
                className="mt-2 w-full rounded-2xl px-4 py-3 bg-white/70 border border-[var(--cy-line)] text-sm text-[var(--cy-ink)] focus:outline-none focus:ring-2 focus:ring-[var(--cy-violet)]" />
            </div>
            <button className="cy-magnetic-btn mt-2 inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-sm font-semibold text-white" style={{ background: "var(--cy-grad-primary)" }}>
              Send Message <Send className="size-4" />
            </button>
          </form>

          <div className="lg:col-span-2 grid gap-4">
            {[
              { i: Mail, l: "Email", v: "hello@zyvera.com" },
              { i: Phone, l: "Call", v: "+1 (415) 555-0190" },
              { i: MapPin, l: "Studio", v: "San Francisco · Bangalore · London" },
              { i: PartyPopper, l: "Careers", v: "We're hiring across 12 roles" },
            ].map(c => (
              <div key={c.l} className="cy-glass rounded-2xl p-5 flex items-center gap-4">
                <div className="grid size-11 place-items-center rounded-xl text-white" style={{ background: "var(--cy-grad-primary)" }}>
                  <c.i className="size-5" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-[var(--cy-mute)]">{c.l}</div>
                  <div className="text-sm font-semibold text-[var(--cy-ink)]">{c.v}</div>
                </div>
              </div>
            ))}
            <div className="cy-glass-strong rounded-2xl p-6">
              <div className="flex items-center gap-2 text-[var(--cy-ink)] font-semibold">
                <MonitorSmartphone className="size-5 text-[var(--cy-violet)]" /> AI Concierge
              </div>
              <p className="mt-2 text-sm text-[var(--cy-mute)]">Chat with our AI assistant for instant project scoping and estimates.</p>
              <button className="mt-4 text-sm font-semibold text-[var(--cy-blue)] inline-flex items-center gap-1">Launch chat <ArrowRight className="size-4" /></button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, type = "text", placeholder }: { label: string; type?: string; placeholder?: string }) {
  return (
    <div>
      <label className="text-xs font-semibold tracking-wider uppercase text-[var(--cy-mute)]">{label}</label>
      <input type={type} placeholder={placeholder}
        className="mt-2 w-full rounded-2xl px-4 py-3 bg-white/70 border border-[var(--cy-line)] text-sm text-[var(--cy-ink)] placeholder:text-[var(--cy-mute)]/60 focus:outline-none focus:ring-2 focus:ring-[var(--cy-violet)]" />
    </div>
  );
}

/* ---------- FOOTER ---------- */
export function Footer() {
  return (
    <footer className="relative pt-20 pb-10">
      <div className="mx-auto max-w-7xl px-6">
        <div className="cy-glass-strong rounded-[36px] p-10 grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <span className="grid size-9 place-items-center rounded-xl text-white font-bold" style={{ background: "var(--cy-grad-primary)" }}>Z</span>
              <span className="font-semibold text-lg tracking-tight text-[var(--cy-ink)]">Zyvera</span>
            </div>
            <p className="mt-4 text-sm text-[var(--cy-mute)] max-w-md">
              A global technology and digital transformation studio engineering the
              next generation of software, brands and growth systems.
            </p>
          </div>
          {[
            { h: "Services", l: ["Web", "Software", "AI", "Marketing", "Automation"] },
            { h: "Company", l: ["About", "Work", "Careers", "Blog", "Contact"] },
          ].map(col => (
            <div key={col.h}>
              <div className="text-xs uppercase tracking-widest text-[var(--cy-mute)]">{col.h}</div>
              <ul className="mt-4 space-y-2">
                {col.l.map(x => <li key={x}><a href="#" className="text-sm text-[var(--cy-ink)] hover:text-[var(--cy-blue)] transition">{x}</a></li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 text-xs text-[var(--cy-mute)]">
          <div>© {new Date().getFullYear()} Zyvera. All rights reserved.</div>
          <div className="flex gap-5"><a href="#">Privacy</a><a href="#">Terms</a><a href="#">Security</a></div>
        </div>
      </div>
    </footer>
  );
}
