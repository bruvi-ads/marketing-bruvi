import { motion, useScroll, useSpring, useInView, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";
import {
  ArrowRight, BarChart3, CheckCircle2, ChevronRight, LineChart,
  MessageSquare, Target, TrendingUp, ShieldCheck, Zap, Clock,
  ThumbsUp, Award, PhoneCall, Sparkles, Globe, Cpu, Layers,
  RefreshCw, ChevronDown, Star, Menu, X, Users, MapPin, Quote
} from "lucide-react";
import logo from "@assets/1000013259-removebg-preview_1780689594276.png";
import { Button } from "@/components/ui/button";
import { FeatureCard } from "@/components/FeatureCard";
import { SectionHeading } from "@/components/SectionHeading";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const WHATSAPP_URL = "https://wa.me/5511925710645";
const WHATSAPP_MSG = encodeURIComponent("Olá! Vim pelo site da Bruvi Ads e quero saber mais sobre os serviços.");
const WA_LINK = `${WHATSAPP_URL}?text=${WHATSAPP_MSG}`;

/* ── Animated counter ── */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.ceil(to / 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= to) { setVal(to); clearInterval(timer); }
      else setVal(start);
    }, 25);
    return () => clearInterval(timer);
  }, [inView, to]);
  return <span ref={ref}>{val}{suffix}</span>;
}

/* ── Magnetic button hook ── */
function useMagnet(strength = 0.3) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const handleMove = useCallback((e: MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * strength);
    y.set((e.clientY - rect.top - rect.height / 2) * strength);
  }, [strength, x, y]);
  const handleLeave = useCallback(() => { x.set(0); y.set(0); }, [x, y]);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);
    return () => { el.removeEventListener("mousemove", handleMove); el.removeEventListener("mouseleave", handleLeave); };
  }, [handleMove, handleLeave]);
  return { ref, x, y };
}

/* ── Floating particles ── */
function Particles() {
  const particles = Array.from({ length: 14 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 10 + 8,
    delay: Math.random() * 5,
  }));
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-primary/30"
          style={{ width: p.size, height: p.size, left: `${p.x}%`, top: `${p.y}%` }}
          animate={{ y: [-20, 20, -20], opacity: [0.2, 0.6, 0.2], scale: [1, 1.3, 1] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut", type: "tween" }}
        />
      ))}
    </div>
  );
}

/* ── Tilt card ── */
function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-50, 50], [7, -7]);
  const rotateY = useTransform(x, [-50, 50], [-7, 7]);
  const handleMove = (e: React.MouseEvent) => {
    const rect = ref.current!.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };
  const handleLeave = () => { x.set(0); y.set(0); };
  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`cursor-pointer ${className}`}
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.div>
  );
}

/* ── Typewriter ── */
function Typewriter({ words, className = "" }: { words: string[]; className?: string }) {
  const [idx, setIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const current = words[idx];
    if (!deleting && displayed.length < current.length) {
      const t = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 65);
      return () => clearTimeout(t);
    }
    if (!deleting && displayed.length === current.length) {
      const t = setTimeout(() => setDeleting(true), 2000);
      return () => clearTimeout(t);
    }
    if (deleting && displayed.length > 0) {
      const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 38);
      return () => clearTimeout(t);
    }
    if (deleting && displayed.length === 0) {
      setDeleting(false);
      setIdx((idx + 1) % words.length);
    }
  }, [displayed, deleting, idx, words]);
  return (
    <span className={className}>
      {displayed}
      <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.6, repeat: Infinity, type: "tween" }} className="inline-block w-0.5 h-[0.9em] bg-primary align-middle ml-1" />
    </span>
  );
}

/* ── Scroll progress bar ── */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  return (
    <motion.div
      style={{ scaleX, transformOrigin: "left" }}
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-orange-400 to-primary z-[9999]"
    />
  );
}

/* ── Floating WhatsApp ── */
function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={WA_LINK}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(34,197,94,0.5)] cursor-pointer"
          aria-label="Falar no WhatsApp"
        >
          <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity, type: "tween" }}>
            <MessageSquare className="w-7 h-7 text-white fill-white" />
          </motion.div>
          <motion.div
            className="absolute inset-0 rounded-full bg-green-400"
            animate={{ scale: [1, 1.5], opacity: [0.4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, type: "tween" }}
          />
        </motion.a>
      )}
    </AnimatePresence>
  );
}

/* ── Section fade-in wrapper ── */
function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ══════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════ */
export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const waMagnet = useMagnet(0.4);

  const navLinks = [
    { label: "Serviços", href: "#services" },
    { label: "Resultados", href: "#roi" },
    { label: "FAQ", href: "#faq" },
    { label: "Contato", href: "#contact" },
  ];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes slow-pan {
          0%,100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes grid-move {
          0% { transform: translateY(0); }
          100% { transform: translateY(40px); }
        }
        .hero-mesh {
          background-color: #070e20;
          background-image:
            radial-gradient(at 0% 0%, hsla(20,100%,20%,0.85) 0, transparent 55%),
            radial-gradient(at 100% 0%, hsla(215,100%,14%,0.9) 0, transparent 55%),
            radial-gradient(at 50% 100%, hsla(15,100%,18%,0.65) 0, transparent 55%);
          background-size: 200% 200%;
          animation: slow-pan 18s ease infinite;
        }
        .grid-bg::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
          background-size: 50px 50px;
          animation: grid-move 10s linear infinite;
          pointer-events: none;
        }
        .glow-text { text-shadow: 0 0 40px rgba(234,88,12,0.4); }
        .card-shine { position: relative; overflow: hidden; }
        .card-shine::after {
          content: '';
          position: absolute;
          top: -50%; left: -60%;
          width: 30%; height: 200%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent);
          transform: skewX(-20deg);
          transition: left 0.6s ease;
          pointer-events: none;
        }
        .card-shine:hover::after { left: 130%; }
        html { scroll-behavior: smooth; }
      ` }} />

      <ScrollProgress />
      <FloatingWhatsApp />

      <div className="min-h-screen bg-white font-sans overflow-x-hidden">

        {/* ── HEADER — always white ── */}
        <motion.header
          className="fixed top-0 w-full z-50 bg-white border-b border-gray-100 shadow-sm"
          initial={{ y: -80 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 220, damping: 28 }}
        >
          <div className="container mx-auto px-4 md:px-6 h-[68px] flex items-center justify-between">
            {/* Logo */}
            <motion.a href="/" whileHover={{ scale: 1.04 }} className="flex items-center">
              <img
                src={logo}
                alt="Bruvi Ads"
                className="h-12 w-auto object-contain"
                data-testid="img-logo-header"
              />
            </motion.a>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-7">
              {navLinks.map(l => (
                <a
                  key={l.label}
                  href={l.href}
                  className="text-sm font-semibold text-gray-600 hover:text-primary transition-colors"
                >
                  {l.label}
                </a>
              ))}
            </nav>

            {/* CTA + hamburger */}
            <div className="flex items-center gap-3">
              <motion.div ref={waMagnet.ref} style={{ x: waMagnet.x, y: waMagnet.y }} className="hidden sm:block">
                <Button
                  className="bg-primary hover:bg-primary/90 text-white font-bold shadow-md shadow-primary/20 hover:shadow-primary/35 transition-all hover:scale-105"
                  onClick={() => window.open(WA_LINK, "_blank")}
                  data-testid="button-cta-header"
                >
                  Falar com Especialista
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </motion.div>
              <button
                className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                onClick={() => setMobileMenuOpen(v => !v)}
                aria-label="Menu"
                data-testid="button-mobile-menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile menu dropdown */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
              >
                <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
                  {navLinks.map(l => (
                    <a
                      key={l.label}
                      href={l.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="py-3 px-4 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 hover:text-primary transition-colors"
                    >
                      {l.label}
                    </a>
                  ))}
                  <a
                    href={WA_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 py-3 px-4 rounded-lg bg-primary text-white font-bold text-center flex items-center justify-center gap-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <MessageSquare className="w-4 h-4" /> Falar no WhatsApp
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.header>

        {/* ── HERO ── */}
        <section className="relative pt-[72px] overflow-hidden hero-mesh grid-bg">
          <Particles />
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/8 to-transparent pointer-events-none" />

          <div className="container mx-auto px-4 md:px-6 relative z-10 py-16 md:py-20">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/8 border border-white/15 text-white/90 text-xs md:text-sm font-medium mb-6 backdrop-blur-sm"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                  </span>
                  <Sparkles className="w-4 h-4 text-primary" /> Agência de Performance Local — São Paulo
                </motion.div>

                {/* Headline */}
                <motion.h1
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.22, duration: 0.65 }}
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-[3.8rem] xl:text-7xl font-extrabold text-white leading-[1.06] mb-5 tracking-tight"
                >
                  Pare de Tentar.<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-orange-400 to-orange-300 glow-text">
                    <Typewriter words={["Comece a Vender.", "Domine o Digital.", "Escale Agora.", "Conquiste Clientes."]} />
                  </span>
                </motion.h1>

                {/* Subheadline */}
                <motion.p
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.38 }}
                  className="text-base md:text-lg lg:text-xl text-gray-300 mb-8 max-w-xl leading-relaxed"
                >
                  Transformamos negócios locais em <strong className="text-white">autoridades da região</strong>. Tráfego pago e posicionamento que colocam dinheiro no caixa — não apenas "likes".
                </motion.p>

                {/* CTAs */}
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-col sm:flex-row gap-3"
                >
                  <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}>
                    <Button
                      size="lg"
                      className="bg-primary hover:bg-primary/90 text-white h-14 px-7 text-base font-bold shadow-[0_12px_35px_rgba(234,88,12,0.45)] w-full sm:w-auto"
                      onClick={() => window.open(WA_LINK, "_blank")}
                      data-testid="button-cta-hero-primary"
                    >
                      QUERO DOMINAR MEU MERCADO
                      <ChevronRight className="ml-2 w-5 h-5" />
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                    <Button
                      size="lg"
                      variant="outline"
                      className="bg-white/6 border-white/20 text-white hover:bg-white/12 hover:text-white h-14 px-7 backdrop-blur-sm w-full sm:w-auto"
                      onClick={() => document.getElementById("problem")?.scrollIntoView({ behavior: "smooth" })}
                      data-testid="button-cta-hero-secondary"
                    >
                      SABER MAIS <ChevronDown className="ml-2 w-4 h-4" />
                    </Button>
                  </motion.div>
                </motion.div>

                {/* Trust badges */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.72 }}
                  className="flex flex-wrap gap-2.5 mt-7"
                >
                  {["Google Partner", "Meta Ads Certificado", "+50 Clientes Ativos"].map((badge, i) => (
                    <motion.div
                      key={badge}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.72 + i * 0.12 }}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/8 border border-white/12 text-xs text-white/70 font-medium"
                    >
                      <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                      {badge}
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* Hero visual — desktop only */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85, rotateY: 15 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ duration: 0.9, delay: 0.3, type: "spring" }}
                className="relative hidden xl:block"
              >
                <TiltCard>
                  <div className="relative z-10 rounded-2xl overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.65)] border border-white/10 card-shine">
                    <img
                      src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop"
                      alt="Marketing Analytics"
                      className="w-full h-auto object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex items-end p-8">
                      <div className="text-white">
                        <p className="font-black text-3xl drop-shadow-lg">Vendas Previsíveis</p>
                        <p className="text-white/80 text-base">O fim da dependência de indicações.</p>
                      </div>
                    </div>
                    <motion.div
                      animate={{ y: [-4, 4, -4] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", type: "tween" }}
                      className="absolute top-5 right-5 bg-white/12 backdrop-blur-md border border-white/20 rounded-xl px-4 py-2 text-white text-sm font-bold shadow-lg"
                    >
                      📈 ROI +500%
                    </motion.div>
                    <motion.div
                      animate={{ y: [4, -4, 4] }}
                      transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", type: "tween" }}
                      className="absolute bottom-[5.5rem] right-5 bg-green-500/20 backdrop-blur-md border border-green-400/30 rounded-xl px-4 py-2 text-green-300 text-sm font-bold"
                    >
                      ✓ 48h para primeiros leads
                    </motion.div>
                  </div>
                </TiltCard>
                <div className="absolute -top-14 -right-14 w-72 h-72 bg-primary/30 rounded-full blur-3xl animate-pulse pointer-events-none" />
                <div className="absolute -bottom-14 -left-14 w-72 h-72 bg-orange-600/20 rounded-full blur-3xl animate-pulse pointer-events-none" style={{ animationDelay: "1.2s" }} />
              </motion.div>
            </div>
          </div>

        </section>

        {/* ── STATS BAR ── */}
        <section className="py-10 bg-white border-b border-gray-100">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { val: 50, suffix: "+", label: "Clientes Ativos" },
                { val: 500, suffix: "%", label: "ROI Médio" },
                { val: 48, suffix: "h", label: "Primeiros Leads" },
                { val: 3, suffix: "x", label: "Retorno Médio" },
              ].map((s, i) => (
                <FadeIn key={s.label} delay={i * 0.1}>
                  <div className="group p-4 rounded-2xl hover:bg-primary/5 transition-colors">
                    <p className="text-3xl md:text-4xl font-black text-primary">
                      <Counter to={s.val} suffix={s.suffix} />
                    </p>
                    <p className="text-sm text-muted-foreground mt-1 font-medium">{s.label}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROBLEM ── */}
        <section id="problem" className="py-20 md:py-28 bg-white relative">
          <div className="container mx-auto px-4 md:px-6">
            <FadeIn>
              <div className="max-w-3xl mx-auto text-center mb-14">
                <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary mb-3">O problema</span>
                <h2 className="text-3xl md:text-5xl font-extrabold mb-5 text-foreground tracking-tight">A Dura Realidade do Negócio Local</h2>
                <p className="text-lg md:text-xl text-muted-foreground">Se você depende apenas de "boca a boca", não tem um negócio — tem um hobby perigoso.</p>
              </div>
            </FadeIn>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
              {[
                { icon: Clock, title: "Tempo Perdido", desc: "Esperar o cliente entrar na sua loja é a estratégia mais lenta e incerta que existe no marketing moderno." },
                { icon: Zap, title: "Vulnerabilidade", desc: "Seu concorrente está a um clique de distância de 'roubar' seu cliente com um anúncio melhor e mais barato." },
                { icon: TrendingUp, title: "Estagnação", desc: "Sem tráfego qualificado, seu faturamento nunca ultrapassa o teto do bairro — crescimento zero.", rotate: true },
              ].map((item, i) => (
                <FadeIn key={item.title} delay={i * 0.15}>
                  <TiltCard className={`${i === 2 ? "sm:col-span-2 md:col-span-1" : ""}`}>
                    <div className="p-6 md:p-8 rounded-2xl bg-red-50/60 border border-red-100 h-full card-shine">
                      <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-5">
                        <item.icon className={`text-red-500 ${item.rotate ? "rotate-180" : ""}`} />
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-red-950">{item.title}</h3>
                      <p className="text-red-900/70 leading-relaxed">{item.desc}</p>
                    </div>
                  </TiltCard>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROOF ── */}
        <section className="py-16 md:py-24 bg-secondary text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop')] opacity-5 bg-cover bg-center" />
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-center">
              <div>
                <FadeIn>
                  <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary mb-3">Dados reais</span>
                  <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">Os Números Não Mentem</h2>
                </FadeIn>
                <div className="space-y-5">
                  {[
                    { pct: 76, text: "dos consumidores visitam a loja física em até 24h após uma busca local no Google." },
                    { pct: 85, text: "das pessoas pesquisam online antes de decidir onde gastar seu dinheiro." },
                    { pct: 92, text: "dos usuários escolhem um negócio que aparece na 1ª página do Google." },
                  ].map((item, i) => (
                    <FadeIn key={item.pct} delay={i * 0.15}>
                      <div className="bg-white/5 p-5 rounded-2xl border border-white/10 backdrop-blur-sm flex items-start gap-4">
                        <div className="text-4xl md:text-5xl font-black text-primary shrink-0">
                          <Counter to={item.pct} suffix="%" />
                        </div>
                        <p className="text-base text-gray-200 mt-1.5 leading-relaxed">{item.text}</p>
                      </div>
                    </FadeIn>
                  ))}
                </div>
              </div>
              <FadeIn delay={0.3}>
                <TiltCard>
                  <div className="bg-gradient-to-br from-white/12 to-white/5 p-8 md:p-10 rounded-3xl border border-white/20 shadow-2xl card-shine">
                    <h3 className="text-2xl md:text-3xl font-bold mb-4">A Pergunta de Ouro:</h3>
                    <p className="text-lg text-gray-300 italic mb-8 leading-relaxed">"Quando pesquisarem pelo seu serviço na sua cidade, vão encontrar <span className="text-primary font-bold not-italic">você</span> — ou o concorrente?"</p>
                    <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                      <Button
                        className="w-full bg-primary hover:bg-primary/90 text-white h-14 text-base font-bold shadow-[0_0_25px_rgba(234,88,12,0.5)]"
                        onClick={() => window.open(WA_LINK, "_blank")}
                      >
                        QUERO SER O PRIMEIRO DA LISTA <ArrowRight className="ml-2 w-5 h-5" />
                      </Button>
                    </motion.div>
                  </div>
                </TiltCard>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* ── TECH STRIP ── */}
        <section className="py-10 bg-[#050A18] border-y border-white/5 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
              {[
                { icon: Layers, label: "BIG DATA" },
                { icon: Cpu, label: "AI OPTIMIZATION" },
                { icon: Globe, label: "ALCANCE LOCAL" },
                { icon: RefreshCw, label: "ESCALA REAL" },
                { icon: MapPin, label: "GEO-TARGETING" },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ scale: 1.12, color: "#EA580C" }}
                  className="flex items-center gap-2 text-white/35 font-bold text-xs md:text-sm transition-colors cursor-default"
                >
                  <item.icon className="w-5 h-5" /> {item.label}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SERVICES ── */}
        <section id="services" className="py-20 md:py-28 bg-gray-50/70">
          <div className="container mx-auto px-4 md:px-6">
            <FadeIn>
              <div className="text-center mb-14">
                <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary mb-3">O que fazemos</span>
                <SectionHeading
                  title="Nossa Artilharia de Vendas"
                  subtitle="Não fazemos apenas posts bonitinhos. Criamos máquinas de aquisição de clientes programadas para lucrar."
                />
              </div>
            </FadeIn>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
              {[
                { icon: Cpu, title: "Tráfego Pago Inteligente", desc: "Anúncios que perseguem seu cliente ideal até ele clicar. Focamos em ROI, não em métricas de vaidade.", delay: 0.1 },
                { icon: BarChart3, title: "Google Meu Negócio", desc: "Dominamos o mapa do Google. Apareça para quem está com o cartão na mão procurando pelo seu serviço.", delay: 0.2 },
                { icon: Zap, title: "Funis de WhatsApp", desc: "Transformamos conversas em contratos. Estruturamos seu atendimento para não perder nenhum lead.", delay: 0.3 },
                { icon: Target, title: "Gestão de Meta Ads", desc: "Facebook e Instagram com segmentação cirúrgica por cidade, bairro, interesses e comportamento de compra.", delay: 0.1 },
                { icon: BarChart3, title: "Analytics & Relatórios", desc: "Dados em tempo real. Você sabe exatamente onde cada real investido está gerando retorno.", delay: 0.2 },
                { icon: Users, title: "Estratégia de Conteúdo", desc: "Posicionamento orgânico que constrói autoridade e alimenta a máquina de anúncios com audiência quente.", delay: 0.3 },
              ].map(item => (
                <FadeIn key={item.title} delay={item.delay}>
                  <TiltCard className="h-full">
                    <div className="h-full card-shine">
                      <FeatureCard icon={item.icon} title={item.title} description={item.desc} delay={0} />
                    </div>
                  </TiltCard>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── ROI ── */}
        <section id="roi" className="py-20 md:py-28 bg-white overflow-hidden">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid lg:grid-cols-2 gap-14 items-center">
              <FadeIn>
                <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary mb-3">Resultados reais</span>
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight tracking-tight">
                  Matemática, <br /><span className="text-primary">Não Mágica.</span>
                </h2>
                <p className="text-lg text-muted-foreground mb-10 leading-relaxed">Nossa projeção baseada em dados reais para negócios que aplicam o método com consistência:</p>
                <div className="grid grid-cols-2 gap-6 mb-10">
                  <div className="border-l-4 border-primary pl-5">
                    <p className="text-muted-foreground uppercase tracking-wider text-xs mb-1 font-semibold">Investimento em Ads</p>
                    <p className="text-3xl font-black text-foreground">R$ 400–500</p>
                    <p className="text-xs text-muted-foreground mt-1">por mês nas plataformas</p>
                  </div>
                  <div className="border-l-4 border-green-500 pl-5 bg-green-50/50 rounded-r-xl py-2 -my-2">
                    <p className="text-green-700 uppercase tracking-wider text-xs mb-1 font-semibold">Retorno Esperado</p>
                    <p className="text-3xl font-black text-green-600">R$ 10.000+</p>
                    <p className="text-xs text-green-600/70 mt-1">por mês em faturamento</p>
                  </div>
                </div>
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  <Button
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-white h-14 px-10 text-lg font-bold shadow-[0_10px_30px_rgba(234,88,12,0.3)]"
                    onClick={() => window.open(WA_LINK, "_blank")}
                  >
                    QUERO ESSES RESULTADOS HOJE
                  </Button>
                </motion.div>
              </FadeIn>

              <FadeIn delay={0.2}>
                <TiltCard>
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-8 md:p-10 border border-gray-200 shadow-2xl card-shine">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center">
                        <LineChart className="text-primary w-6 h-6" />
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold">Projeção de Lucro Real</h3>
                    </div>
                    <div className="space-y-5">
                      <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex justify-between items-end mb-3">
                          <span className="text-muted-foreground font-semibold text-sm uppercase tracking-wider">Investimento</span>
                          <span className="font-black text-xl">R$ 500</span>
                        </div>
                        <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: "5%" }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.3 }}
                            className="bg-gradient-to-r from-orange-300 to-primary h-full rounded-full"
                          />
                        </div>
                      </div>
                      <div className="flex justify-center">
                        <motion.div
                          animate={{ y: [0, 6, 0] }}
                          transition={{ duration: 1.2, repeat: Infinity, type: "tween" }}
                          className="bg-white p-2 rounded-full shadow border border-gray-100"
                        >
                          <ArrowRight className="text-primary w-5 h-5 rotate-90" />
                        </motion.div>
                      </div>
                      <div className="bg-white p-5 rounded-2xl shadow-[0_8px_30px_rgba(234,88,12,0.12)] border border-primary/20">
                        <div className="flex justify-between items-end mb-3">
                          <span className="text-primary font-bold text-sm uppercase tracking-wider flex items-center gap-1">
                            <Award className="w-4 h-4" /> Retorno (20x)
                          </span>
                          <span className="text-primary font-black text-2xl">R$ 10.000</span>
                        </div>
                        <div className="w-full bg-orange-50 h-3 rounded-full overflow-hidden border border-orange-100">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: "100%" }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.6, delay: 0.6 }}
                            className="bg-gradient-to-r from-primary to-orange-400 h-full rounded-full"
                          />
                        </div>
                        <p className="text-xs text-muted-foreground mt-4 bg-gray-50 p-3 rounded-lg border border-gray-100">
                          *Estimativa baseada em métricas médias. Resultado real depende do nicho, oferta e taxa de conversão.
                        </p>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section className="py-20 md:py-28 bg-gray-50 border-y border-gray-100">
          <div className="container mx-auto px-4 md:px-6">
            <FadeIn>
              <div className="text-center mb-14">
                <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary mb-3">Depoimentos</span>
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Quem Já Escala com a Bruvi</h2>
              </div>
            </FadeIn>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {[
                { name: "Diego F.", role: "Barbearia Corte Nobre · Guarulhos", text: "Antes de contratar a Bruvi, minha barbearia dependia 100% do boca a boca. Em 45 dias os anúncios estavam gerando mais de 60 agendamentos novos por mês. Lotado todo final de semana.", stars: 5 },
                { name: "Camila R.", role: "Clínica de Estética Avançada · SP", text: "Minha clínica cresceu 320% no faturamento em 90 dias. Os anúncios de harmonização facial e lipo de papada trouxeram clientes que eu nunca alcançaria pelo Instagram orgânico.", stars: 5 },
                { name: "Thiago B.", role: "Concessionária AutoPrime · Santo André", text: "Trabalhamos com uma concessionária multimarcas e achei que tráfego pago local não funcionaria para carros. Erro meu. Geramos mais de 40 test drives qualificados no primeiro mês.", stars: 5 },
                { name: "Juliana M.", role: "Pizzaria Dom Forno · Osasco", text: "Investimos R$450/mês em anúncios com a Bruvi e o retorno foi absurdo. Triplicamos os pedidos via WhatsApp nos fins de semana. Precisei contratar mais dois entregadores.", stars: 5 },
                { name: "André S.", role: "Lanchonete do André · Mauá", text: "Nunca imaginei que uma lanchonete de bairro usaria tráfego pago. A Bruvi provou que estava errado. Hoje tenho fila no almoço e delivery lotado. O investimento se pagou na segunda semana.", stars: 5 },
                { name: "Fernanda K.", role: "Clínica Odontológica Sorriso · SP", text: "Minha agenda de implantes e clareamentos estava vazia. Hoje, em plena segunda-feira de manhã, já tenho o mês cheio. A Bruvi entende de verdade o marketing para saúde.", stars: 5 },
                { name: "Roberto N.", role: "Auto Center Top Speed · Diadema", text: "Revisão, alinhamento e balanceamento são serviços difíceis de anunciar. A Bruvi criou uma estratégia local que trouxe 90 novos clientes em 60 dias. Resultado acima do esperado.", stars: 5 },
                { name: "Larissa V.", role: "Studio Pilates & Bem-Estar · SP", text: "Tentei impulsionar posts sozinha por meses e joguei dinheiro fora. A Bruvi estruturou um funil real, do anúncio à matrícula. ROI de 450% já no segundo mês. Recomendo demais.", stars: 5 },
                { name: "Carlos E.", role: "Pet Shop & Banho e Tosa · SP", text: "Petshop em região com muita concorrência. A Bruvi focou nos bairros certos e nas dores dos donos de pets. Em 30 dias tínhamos fila de espera para banho e tosa. Incrível.", stars: 5 },
                { name: "Vanessa O.", role: "Restaurante Sabor Mineiro · ABC", text: "Almoço executivo e buffet de domingo com mesas vazias viraram passado. Hoje trabalho com reserva antecipada toda semana. A Bruvi transformou meu restaurante com estratégia e consistência.", stars: 5 },
              ].map((t, i) => (
                <FadeIn key={t.name} delay={i * 0.15}>
                  <motion.div
                    whileHover={{ y: -6, boxShadow: "0 20px 50px -10px rgba(0,0,0,0.1)" }}
                    className="bg-white p-7 rounded-2xl border border-gray-100 shadow-sm transition-all card-shine"
                  >
                    <Quote className="w-8 h-8 text-primary/30 mb-4" />
                    <p className="text-gray-700 leading-relaxed mb-6 italic">"{t.text}"</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-bold text-gray-900">{t.name}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{t.role}</p>
                      </div>
                      <div className="flex gap-0.5">
                        {Array.from({ length: t.stars }).map((_, j) => (
                          <Star key={j} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── OBJECTIONS / WHY US ── */}
        <section className="py-20 md:py-28 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <FadeIn>
              <div className="text-center mb-14">
                <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary mb-3">Por que a Bruvi?</span>
                <SectionHeading
                  title="Zero Desculpas, Só Resultado"
                  subtitle="O mercado está cheio de 'gurus' e 'sobrinhos'. Nós entregamos parceria real e resultados previsíveis."
                />
              </div>
            </FadeIn>
            <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
              {[
                { icon: Clock, title: "Não tenho tempo para gerenciar isso", desc: "Nós fazemos tudo de ponta a ponta. Você foca em atender os novos clientes que vamos mandar." },
                { icon: ThumbsUp, title: "Já tentei e não deu certo", desc: "Provavelmente você apertou 'impulsionar' ou contratou amadores. Criamos funis reais que transformam curiosos em compradores." },
                { icon: Target, title: "Serve para o meu nicho local?", desc: "Se existem pessoas no Google ou Instagram da sua cidade procurando pelo seu serviço agora, nosso método funciona." },
                { icon: ShieldCheck, title: "É um investimento muito alto?", desc: "Caro é não ter clientes. Nosso serviço se paga com o aumento do faturamento já nos primeiros meses. É matemática." },
              ].map((item, i) => (
                <FadeIn key={item.title} delay={i * 0.1}>
                  <motion.div
                    whileHover={{ y: -5, boxShadow: "0 16px 40px -10px rgba(0,0,0,0.10)" }}
                    className="flex flex-col sm:flex-row gap-5 p-6 md:p-8 rounded-2xl bg-white shadow-sm border border-gray-100 transition-all card-shine"
                  >
                    <div className="shrink-0 w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/15">
                      <item.icon className="text-primary w-7 h-7" />
                    </div>
                    <div>
                      <h4 className="text-lg md:text-xl font-bold mb-2">{item.title}</h4>
                      <p className="text-muted-foreground text-sm md:text-base leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section id="faq" className="py-20 md:py-28 bg-gray-50 border-t border-gray-100">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <FadeIn>
              <div className="text-center mb-12">
                <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary mb-3">Dúvidas</span>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Perguntas Frequentes</h2>
                <p className="text-muted-foreground">Tudo o que você precisa saber antes de darmos o próximo passo.</p>
              </div>
            </FadeIn>
            <Accordion type="single" collapsible className="w-full space-y-3">
              {[
                { q: "Quanto tempo demora para ver os primeiros resultados?", a: "As campanhas de performance costumam gerar os primeiros leads nas primeiras 48 horas após a ativação. O algoritmo leva cerca de 15–30 dias para otimizar o custo por lead ideal. O jogo é de constância." },
                { q: "Vocês exigem contrato de fidelidade longo?", a: "Acreditamos que o que prende o cliente é o resultado, não um papel. Trabalhamos com ciclos iniciais de 3 meses para implementar e otimizar a estratégia completa." },
                { q: "Qual o investimento mínimo recomendado em anúncios?", a: "Para negócios locais, recomendamos R$ 400 a R$ 500 por mês diretamente nas plataformas (Google/Meta). Isso garante que você apareça para clientes da sua região com um orçamento acessível." },
                { q: "Vocês atendem concorrentes na mesma cidade?", a: "Não. Temos política estrita de exclusividade regional por nicho. Se assumirmos seu negócio em um raio de atuação, não fechamos com o concorrente direto. Queremos que você domine a sua área." },
                { q: "Como funciona o acompanhamento dos resultados?", a: "Você recebe relatórios semanais com métricas de campanha: impressões, cliques, custo por lead e conversões. Além disso, temos reunião quinzenal para análise e ajuste de estratégia." },
              ].map((item, i) => (
                <FadeIn key={i} delay={i * 0.07}>
                  <AccordionItem value={`item-${i}`} className="border border-gray-200 rounded-xl px-2 bg-white shadow-sm">
                    <AccordionTrigger className="text-left font-bold text-base md:text-lg hover:text-primary px-4 py-4">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-sm md:text-base leading-relaxed px-4 pb-5">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                </FadeIn>
              ))}
            </Accordion>
          </div>
        </section>

        {/* ── FINAL CTA ── */}
        <section id="contact" className="py-24 md:py-36 hero-mesh grid-bg relative overflow-hidden">
          <Particles />
          <div className="absolute inset-0 bg-black/25 pointer-events-none" />
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary/30 rounded-full blur-3xl animate-pulse pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-orange-600/20 rounded-full blur-3xl pointer-events-none" />

          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <FadeIn>
              <div className="max-w-4xl mx-auto bg-white/8 backdrop-blur-xl border border-white/15 p-8 md:p-14 rounded-3xl text-center shadow-2xl">
                <motion.div
                  animate={{ y: [-5, 5, -5], rotate: [-5, 5, -5] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", type: "tween" }}
                  className="w-20 h-20 bg-primary/25 rounded-full flex items-center justify-center mx-auto mb-8 border border-primary/30"
                >
                  <PhoneCall className="text-primary w-10 h-10" />
                </motion.div>

                <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-5 text-white tracking-tight">
                  Sua Empresa Está Pronta<br className="hidden md:block" /> Para Escalar?
                </h2>

                <p className="text-base md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto leading-relaxed">
                  Não aceitamos qualquer cliente. Selecionamos negócios locais que têm capacidade de atendimento e querem multiplicar o faturamento nos próximos 90 dias.
                </p>

                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  <Button
                    size="lg"
                    className="bg-green-500 hover:bg-green-600 text-white h-16 px-10 text-base md:text-xl font-bold shadow-[0_0_40px_rgba(34,197,94,0.45)] relative overflow-hidden"
                    onClick={() => window.open(WA_LINK, "_blank")}
                    data-testid="button-cta-final"
                  >
                    <motion.span
                      className="absolute inset-0 bg-white/10"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.5 }}
                    />
                    <MessageSquare className="mr-3 w-6 h-6" />
                    FALAR COM ESPECIALISTA NO WHATSAPP
                  </Button>
                </motion.div>

                <p className="mt-6 text-sm text-gray-400 flex items-center justify-center gap-2">
                  <ShieldCheck className="w-4 h-4" />
                  Resposta em até 15 minutos em horário comercial
                </p>

                {/* Mini trust row */}
                <div className="flex flex-wrap justify-center gap-6 mt-10 pt-8 border-t border-white/10">
                  {[
                    { icon: CheckCircle2, label: "Sem fidelidade forçada" },
                    { icon: ShieldCheck, label: "Exclusividade regional" },
                    { icon: Award, label: "Resultados em 48h" },
                  ].map(item => (
                    <div key={item.label} className="flex items-center gap-2 text-white/60 text-sm">
                      <item.icon className="w-4 h-4 text-green-400" />
                      {item.label}
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="bg-[#070e20] border-t border-white/8 py-12 md:py-16 text-white/50 text-sm">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-3 gap-10 items-start">
              <div className="flex flex-col items-center md:items-start gap-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white rounded-xl px-5 py-3 shadow-lg"
                >
                  <img
                    src={logo}
                    alt="Bruvi Ads"
                    className="h-12 w-auto object-contain"
                    data-testid="img-logo-footer"
                  />
                </motion.div>
                <p className="text-center md:text-left max-w-xs text-white/40 leading-relaxed">
                  Estratégia · Tráfego · Resultados<br />para negócios locais.
                </p>
              </div>

              <div className="flex flex-col items-center gap-3">
                <h4 className="text-white/80 font-bold mb-2 uppercase tracking-wider text-xs">Contato & Portfólio</h4>
                <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-colors flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" /> (11) 92571-0645
                </a>
                <div className="flex gap-3 mt-2">
                  {[
                    { label: "LinkedIn", href: "https://www.linkedin.com/in/brunovinicius-bruvi" },
                    { label: "Behance", href: "https://www.behance.net/brunovinicius-bruvi" },
                  ].map(l => (
                    <motion.a
                      key={l.label}
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, color: "#EA580C" }}
                      className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs hover:border-primary/40 transition-colors"
                    >
                      {l.label}
                    </motion.a>
                  ))}
                </div>
              </div>

              <div className="flex flex-col items-center md:items-end gap-2">
                <p className="text-white/50">&copy; {new Date().getFullYear()} Bruvi Ads.</p>
                <p className="text-white/25 text-xs">Estratégia · Performance · Tecnologia</p>
                <div className="flex gap-4 mt-3">
                  {[
                    { label: "Serviços", href: "#services" },
                    { label: "Resultados", href: "#roi" },
                    { label: "FAQ", href: "#faq" },
                  ].map(l => (
                    <a key={l.label} href={l.href} className="text-white/30 hover:text-white/70 transition-colors text-xs">
                      {l.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}
