import { motion, useScroll, useSpring, useInView, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";
import {
  ArrowRight, BarChart3, CheckCircle2, ChevronRight, LineChart,
  MessageSquare, Target, TrendingUp, ShieldCheck, Zap, Clock,
  ThumbsUp, Award, PhoneCall, Sparkles, Globe, Cpu, Layers,
  RefreshCw,
  ChevronDown, Star
} from "lucide-react";
import logo from "@assets/file_00000000c8cc720e9f37c888c24f18d0_1780687139614.png";
import { Button } from "@/components/ui/button";
import { FeatureCard } from "@/components/FeatureCard";
import { SectionHeading } from "@/components/SectionHeading";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const WHATSAPP_URL = "https://wa.me/5511925710645";
const WHATSAPP_MSG = encodeURIComponent("Olá! Vim pelo site da Bruvi Ads e quero saber mais sobre os serviços.");

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
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
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
  const particles = Array.from({ length: 18 }, (_, i) => ({
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
  const rotateX = useTransform(y, [-50, 50], [8, -8]);
  const rotateY = useTransform(x, [-50, 50], [-8, 8]);
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
      const t = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 70);
      return () => clearTimeout(t);
    }
    if (!deleting && displayed.length === current.length) {
      const t = setTimeout(() => setDeleting(true), 2200);
      return () => clearTimeout(t);
    }
    if (deleting && displayed.length > 0) {
      const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
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
          href={`${WHATSAPP_URL}?text=${WHATSAPP_MSG}`}
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
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
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
  const [headerSolid, setHeaderSolid] = useState(false);

  useEffect(() => {
    const handler = () => setHeaderSolid(window.scrollY > 60);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const waMagnet = useMagnet(0.4);

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
            radial-gradient(at 0% 0%, hsla(20,100%,20%,0.8) 0, transparent 55%),
            radial-gradient(at 100% 0%, hsla(215,100%,14%,0.9) 0, transparent 55%),
            radial-gradient(at 50% 100%, hsla(15,100%,18%,0.6) 0, transparent 55%);
          background-size: 200% 200%;
          animation: slow-pan 18s ease infinite;
        }
        .grid-bg::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 50px 50px;
          animation: grid-move 8s linear infinite;
          pointer-events: none;
        }
        .glow-text {
          text-shadow: 0 0 40px rgba(234,88,12,0.35);
        }
        .card-shine {
          position: relative;
          overflow: hidden;
        }
        .card-shine::after {
          content: '';
          position: absolute;
          top: -50%;
          left: -60%;
          width: 30%;
          height: 200%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent);
          transform: skewX(-20deg);
          transition: left 0.6s ease;
          pointer-events: none;
        }
        .card-shine:hover::after {
          left: 130%;
        }
      ` }} />

      <ScrollProgress />
      <FloatingWhatsApp />

      <div className="min-h-screen bg-background font-sans overflow-x-hidden">

        {/* ── HEADER ── */}
        <motion.header
          className={`fixed top-0 w-full z-50 transition-all duration-500 ${headerSolid ? "bg-white/95 backdrop-blur-xl shadow-md border-b border-gray-100" : "bg-transparent"}`}
          initial={{ y: -80 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
        >
          <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
            <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2">
              <img src={logo} alt="Bruvi Ads" className="h-12 md:h-14 w-auto object-contain" />
            </motion.div>
            <motion.div ref={waMagnet.ref} style={{ x: waMagnet.x, y: waMagnet.y }}>
              <Button
                className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/25 transition-all hover:scale-105 hover:shadow-primary/40"
                onClick={() => window.open(`${WHATSAPP_URL}?text=${WHATSAPP_MSG}`, "_blank")}
              >
                Falar com Especialista
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </motion.div>
          </div>
        </motion.header>

        {/* ── HERO ── */}
        <section className="relative pt-32 pb-24 md:pt-52 md:pb-40 overflow-hidden hero-mesh grid-bg min-h-screen flex items-center">
          <Particles />
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />

          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-14 items-center">
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/8 border border-white/15 text-white/90 text-xs md:text-sm font-medium mb-7 backdrop-blur-sm"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                  </span>
                  <Sparkles className="w-4 h-4 text-primary" /> Tecnologia Ads de Próxima Geração
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.7 }}
                  className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.08] mb-6 tracking-tight"
                >
                  Pare de Tentar.<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-orange-400 to-orange-300 glow-text">
                    <Typewriter words={["Comece a Vender.", "Domine o Digital.", "Escale Agora.", "Conquiste Clientes."]} />
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-base md:text-xl text-gray-300 mb-10 max-w-xl leading-relaxed"
                >
                  Transformamos o seu negócio local na autoridade máxima da região. Tráfego pago e posicionamento que colocam dinheiro no seu bolso — não apenas "likes".
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.65 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <motion.div whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.97 }}>
                    <Button
                      size="lg"
                      className="bg-primary hover:bg-primary/90 text-white text-base md:text-lg h-14 px-8 shadow-[0_12px_35px_rgba(234,88,12,0.4)] font-bold w-full sm:w-auto"
                      onClick={() => window.open(`${WHATSAPP_URL}?text=${WHATSAPP_MSG}`, "_blank")}
                    >
                      QUERO DOMINAR MEU MERCADO
                      <ChevronRight className="ml-2 w-5 h-5" />
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                    <Button
                      size="lg"
                      variant="outline"
                      className="bg-white/6 border-white/20 text-white hover:bg-white/12 hover:text-white h-14 px-8 backdrop-blur-sm w-full sm:w-auto"
                      onClick={() => document.getElementById("problem")?.scrollIntoView({ behavior: "smooth" })}
                    >
                      SABER MAIS <ChevronDown className="ml-2 w-4 h-4" />
                    </Button>
                  </motion.div>
                </motion.div>

                {/* Social proof badges */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                  className="flex flex-wrap gap-3 mt-8"
                >
                  {["Google Partner", "Meta Ads Certificado", "+50 Clientes Ativos"].map((badge, i) => (
                    <motion.div
                      key={badge}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.9 + i * 0.15 }}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/8 border border-white/10 text-xs text-white/70"
                    >
                      <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                      {badge}
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* Hero card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85, rotateY: 20 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ duration: 0.9, delay: 0.4, type: "spring" }}
                className="relative hidden lg:block"
              >
                <TiltCard>
                  <div className="relative z-10 rounded-2xl overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.6)] border border-white/10 card-shine">
                    <img
                      src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop"
                      alt="Marketing Analytics"
                      className="w-full h-auto object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex items-end p-8">
                      <div className="text-white">
                        <p className="font-black text-3xl drop-shadow-lg">Vendas Previsíveis</p>
                        <p className="text-white/80 text-lg">O fim da dependência de indicações.</p>
                      </div>
                    </div>
                    {/* Floating metric cards */}
                    <motion.div
                      animate={{ y: [-4, 4, -4] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", type: "tween" }}
                      className="absolute top-6 right-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-2 text-white text-sm font-bold shadow-lg"
                    >
                      📈 ROI +500%
                    </motion.div>
                    <motion.div
                      animate={{ y: [4, -4, 4] }}
                      transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", type: "tween" }}
                      className="absolute bottom-20 right-6 bg-green-500/20 backdrop-blur-md border border-green-400/30 rounded-xl px-4 py-2 text-green-300 text-sm font-bold"
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

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 cursor-pointer"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, type: "tween" }}
            onClick={() => document.getElementById("problem")?.scrollIntoView({ behavior: "smooth" })}
          >
            <span className="text-white/40 text-xs uppercase tracking-widest">scroll</span>
            <ChevronDown className="w-5 h-5 text-white/40" />
          </motion.div>
        </section>

        {/* ── STATS BAR ── */}
        <section className="py-10 bg-white border-b border-gray-100">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { val: 50, suffix: "+", label: "Clientes Ativos" },
                { val: 500, suffix: "%", label: "ROI Médio" },
                { val: 48, suffix: "h", label: "Primeiros Leads" },
                { val: 3, suffix: "x", label: "Retorno Garantido" },
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
                <h2 className="text-3xl md:text-5xl font-extrabold mb-5 text-foreground tracking-tight">A Dura Realidade do Negócio Local</h2>
                <p className="text-lg md:text-xl text-muted-foreground">Se você ainda depende apenas de "boca a boca", você não tem um negócio — você tem um hobby perigoso.</p>
              </div>
            </FadeIn>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
              {[
                { icon: Clock, color: "red", title: "Tempo Perdido", desc: "Esperar o cliente entrar na sua loja é a estratégia mais lenta e incerta que existe." },
                { icon: Zap, color: "red", title: "Vulnerabilidade", desc: "Seu concorrente está a um clique de distância de 'roubar' seu cliente com um anúncio melhor." },
                { icon: TrendingUp, color: "red", title: "Estagnação", desc: "Sem tráfego qualificado, seu faturamento nunca ultrapassa o teto do seu bairro.", rotate: true },
              ].map((item, i) => (
                <FadeIn key={item.title} delay={i * 0.15}>
                  <TiltCard className={`${i === 2 ? "sm:col-span-2 md:col-span-1" : ""}`}>
                    <div className="p-6 md:p-8 rounded-2xl bg-red-50/60 border border-red-100 h-full card-shine">
                      <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-6">
                        <item.icon className={`text-red-600 ${item.rotate ? "rotate-180" : ""}`} />
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-red-950">{item.title}</h3>
                      <p className="text-red-900/70">{item.desc}</p>
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
                  <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">Os Números Não Mentem</h2>
                </FadeIn>
                <div className="space-y-6">
                  {[
                    { pct: 76, text: "dos consumidores visitam a loja física em até 24h após uma busca local no Google." },
                    { pct: 85, text: "das pessoas pesquisam online antes de decidir onde gastar seu dinheiro." },
                  ].map((item, i) => (
                    <FadeIn key={item.pct} delay={i * 0.2}>
                      <div className="bg-white/5 p-5 rounded-2xl border border-white/10 backdrop-blur-sm flex items-start gap-4">
                        <div className="text-4xl md:text-5xl font-black text-primary shrink-0">
                          <Counter to={item.pct} suffix="%" />
                        </div>
                        <p className="text-base md:text-lg text-gray-200 mt-1">{item.text}</p>
                      </div>
                    </FadeIn>
                  ))}
                </div>
              </div>
              <FadeIn delay={0.3}>
                <TiltCard>
                  <div className="bg-gradient-to-br from-white/12 to-white/5 p-8 md:p-10 rounded-3xl border border-white/20 shadow-2xl card-shine">
                    <h3 className="text-2xl md:text-3xl font-bold mb-4">A Pergunta de Ouro:</h3>
                    <p className="text-lg md:text-xl text-gray-300 italic mb-8">"Quando eles pesquisarem pelo seu serviço na sua cidade, vão encontrar <span className="text-primary font-bold not-italic">você</span> ou o concorrente?"</p>
                    <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                      <Button
                        className="w-full bg-primary hover:bg-primary/90 text-white h-14 text-base md:text-lg font-bold shadow-[0_0_25px_rgba(234,88,12,0.5)]"
                        onClick={() => window.open(`${WHATSAPP_URL}?text=${WHATSAPP_MSG}`, "_blank")}
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
                { icon: Globe, label: "GLOBAL REACH" },
                { icon: RefreshCw, label: "SCALE READY" },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.1, color: "#EA580C" }}
                  className="flex items-center gap-2 text-white/40 font-bold text-sm transition-colors cursor-default"
                >
                  <item.icon className="w-5 h-5" /> {item.label}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SERVICES ── */}
        <section className="py-20 md:py-28 bg-gray-50/60">
          <div className="container mx-auto px-4 md:px-6">
            <FadeIn>
              <SectionHeading
                title="Nossa Artilharia de Vendas"
                subtitle="Não fazemos apenas posts bonitinhos. Criamos máquinas de aquisição de clientes programadas para lucrar."
              />
            </FadeIn>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
              {[
                { icon: Cpu, title: "Inteligência em Tráfego Pago", desc: "Anúncios que perseguem seu cliente ideal até ele clicar. Focamos em ROI, não em métricas de vaidade.", delay: 0.1 },
                { icon: BarChart3, title: "Google Meu Negócio", desc: "Dominamos o mapa do Google. Apareça para quem já está com o cartão na mão procurando por você.", delay: 0.2 },
                { icon: Zap, title: "Funis de WhatsApp", desc: "Transformamos conversas em contratos. Estruturamos o seu atendimento para não perder nenhum lead.", delay: 0.3 },
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
        <section className="py-20 md:py-28 bg-white overflow-hidden">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid lg:grid-cols-2 gap-14 items-center">
              <FadeIn>
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight tracking-tight">
                  Matemática, <br /><span className="text-primary">Não Mágica.</span>
                </h2>
                <p className="text-lg text-muted-foreground mb-10">Nossa projeção baseada em dados reais para negócios que aplicam o método com consistência:</p>
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
                    onClick={() => window.open(`${WHATSAPP_URL}?text=${WHATSAPP_MSG}`, "_blank")}
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

                    <div className="space-y-6">
                      {/* Investment bar */}
                      <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex justify-between items-end mb-3">
                          <span className="text-muted-foreground font-semibold text-sm uppercase tracking-wider">Investimento em Ads</span>
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

                      {/* Return bar */}
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
                          *Estimativa baseada em métricas médias. Resultado real depende do nicho, oferta e taxa de conversão do time comercial.
                        </p>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* ── OBJECTIONS ── */}
        <section className="py-20 md:py-28 bg-gray-50 border-y border-gray-200">
          <div className="container mx-auto px-4 md:px-6">
            <FadeIn>
              <SectionHeading
                title="Por que a Bruvi Ads?"
                subtitle="O mercado está cheio de 'gurus' e 'sobrinhos'. Nós entregamos parceria real e resultados previsíveis."
              />
            </FadeIn>
            <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
              {[
                { icon: Clock, title: "Não tenho tempo para gerenciar isso", desc: "Nós fazemos tudo de ponta a ponta. Você foca em atender os novos clientes que vamos mandar." },
                { icon: ThumbsUp, title: "Já tentei e não deu certo", desc: "Provavelmente você apertou 'impulsionar' ou contratou amadores. Nós criamos funis reais que convertem curiosos em compradores." },
                { icon: Target, title: "Serve para o meu nicho local?", desc: "Se existem pessoas no Google ou Instagram da sua cidade procurando pelo seu serviço agora, nosso método funciona." },
                { icon: ShieldCheck, title: "É um investimento muito alto?", desc: "Caro é não ter clientes. Nosso serviço se paga com o aumento do faturamento logo nos primeiros meses. É matemática." },
              ].map((item, i) => (
                <FadeIn key={item.title} delay={i * 0.1}>
                  <motion.div
                    whileHover={{ y: -6, boxShadow: "0 16px 40px -10px rgba(0,0,0,0.12)" }}
                    className="flex flex-col sm:flex-row gap-5 p-6 md:p-8 rounded-2xl bg-white shadow-sm border border-gray-100 transition-all card-shine"
                  >
                    <div className="shrink-0 w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
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
        <section className="py-20 md:py-28 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <FadeIn>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Dúvidas Frequentes</h2>
                <p className="text-muted-foreground">Tudo o que você precisa saber antes de darmos o próximo passo.</p>
              </div>
            </FadeIn>
            <Accordion type="single" collapsible className="w-full space-y-3">
              {[
                { q: "Quanto tempo demora para ver os primeiros resultados?", a: "As campanhas de performance costumam gerar os primeiros leads nas primeiras 48 horas após a ativação. O algoritmo leva cerca de 15–30 dias para otimizar o custo por lead ideal. O jogo é de constância." },
                { q: "Vocês exigem contrato de fidelidade longo?", a: "Acreditamos que o que prende o cliente é o resultado, não um papel. Trabalhamos com ciclos iniciais de 3 meses para implementar e otimizar a estratégia completa." },
                { q: "Qual o investimento mínimo recomendado em anúncios?", a: "Para negócios locais, recomendamos um investimento mínimo de R$ 400 a R$ 500 por mês diretamente nas plataformas (Google/Facebook). Isso garante que você comece a aparecer para clientes da sua região com um investimento acessível." },
                { q: "Vocês atendem concorrentes na mesma cidade?", a: "Não. Temos uma política estrita de exclusividade regional por nicho. Se assumirmos seu negócio em um raio de atuação, não fechamos com o concorrente direto. Queremos que você domine a sua área." },
              ].map((item, i) => (
                <FadeIn key={i} delay={i * 0.08}>
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
          <div className="absolute inset-0 bg-black/30 pointer-events-none" />
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary/30 rounded-full blur-3xl animate-pulse pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-orange-600/20 rounded-full blur-3xl pointer-events-none" />

          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <FadeIn>
              <div className="max-w-4xl mx-auto bg-white/8 backdrop-blur-xl border border-white/15 p-8 md:p-16 rounded-3xl text-center shadow-2xl">
                <motion.div
                  animate={{ y: [-5, 5, -5], rotate: [-5, 5, -5] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", type: "tween" }}
                  className="w-20 h-20 bg-primary/25 rounded-full flex items-center justify-center mx-auto mb-8 border border-primary/30"
                >
                  <PhoneCall className="text-primary w-10 h-10" />
                </motion.div>

                <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-6 text-white tracking-tight">
                  Sua Empresa Está Pronta <br className="hidden md:block" />Para Escalar?
                </h2>

                <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto leading-relaxed">
                  Não aceitamos qualquer cliente. Selecionamos negócios locais que têm capacidade de atendimento e querem multiplicar o faturamento nos próximos 90 dias.
                </p>

                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  <Button
                    size="lg"
                    className="bg-green-500 hover:bg-green-600 text-white h-16 px-10 text-lg md:text-xl font-bold shadow-[0_0_40px_rgba(34,197,94,0.4)] relative overflow-hidden"
                    onClick={() => window.open(`${WHATSAPP_URL}?text=${WHATSAPP_MSG}`, "_blank")}
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

                <p className="mt-7 text-sm text-gray-400 flex items-center justify-center gap-2">
                  <ShieldCheck className="w-4 h-4" />
                  Respostas em até 15 minutos em horário comercial
                </p>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="bg-[#070e20] border-t border-white/8 py-12 md:py-16 text-white/50 text-sm">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-3 gap-10 items-center">
              <div className="flex flex-col items-center md:items-start gap-4">
                <motion.img
                  src={logo}
                  alt="Bruvi Ads"
                  className="h-14 w-auto object-contain opacity-90"
                  whileHover={{ scale: 1.05, opacity: 1 }}
                />
                <p className="text-center md:text-left max-w-xs text-white/40">
                  Estratégia · Tráfego · Resultados para negócios locais.
                </p>
              </div>

              <div className="flex flex-col items-center gap-3">
                <h4 className="text-white/80 font-bold mb-2 uppercase tracking-wider text-xs">Contato & Portfólio</h4>
                <a href={`${WHATSAPP_URL}?text=${WHATSAPP_MSG}`} target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-colors flex items-center gap-2">
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
                <p>&copy; {new Date().getFullYear()} Bruvi Ads.</p>
                <p className="text-white/30 text-xs">Desenvolvido com Tecnologia de Ponta.</p>
              </div>
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}
