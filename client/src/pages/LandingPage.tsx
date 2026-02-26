import { motion } from "framer-motion";
import { 
    ArrowRight, 
    BarChart3, 
    CheckCircle2, 
    ChevronRight, 
    LineChart, 
    MessageSquare, 
    Target, 
    TrendingUp, 
    Users,
    ShieldCheck,
    Zap,
    Clock,
    ThumbsUp,
    Award,
    PhoneCall,
    HelpCircle,
    Sparkles,
    Globe,
    Cpu,
    Layers,
    Rocket,
    MousePointer2,
    Infinity
  } from "lucide-react";
import logo from "@assets/4_1771722650806-ZjcIMUCs-removebg-preview_1771933315935.png";
import { Button } from "@/components/ui/button";
import { FeatureCard } from "@/components/FeatureCard";
import { SectionHeading } from "@/components/SectionHeading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function LandingPage() {
  const whatsappUrl = "https://wa.me/5511912548292";

  return (
    <>
      
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes slow-pan {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .animate-gradient {
            background-size: 200% 200%;
            animation: slow-pan 15s ease infinite;
          }
          .glass-card {
            background: rgba(255, 255, 255, 0.03);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
          }
          .text-glow {
            text-shadow: 0 0 20px rgba(234, 88, 12, 0.5);
          }
          .hero-mesh {
            background-color: #0A1225;
            background-image: 
              radial-gradient(at 0% 0%, hsla(20,100%,16%,1) 0, transparent 50%), 
              radial-gradient(at 50% 0%, hsla(220,100%,10%,1) 0, transparent 50%), 
              radial-gradient(at 100% 0%, hsla(15,100%,15%,1) 0, transparent 50%);
          }
        ` }} />
<div className="min-h-screen bg-background font-sans overflow-x-hidden">
      {/* Header/Nav */}
      <header className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={logo} alt="Bruno Vinícius Ads" className="h-10 md:h-14 w-auto object-contain" />
          </div>
          <Button 
            className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 transition-all hover:scale-105"
            onClick={() => window.open(whatsappUrl, '_blank')}
          >
            Falar com Especialista
            <ArrowRight className="ml-2 w-4 h-4 hidden sm:block" />
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-40 overflow-hidden hero-mesh perspective-1000 animate-gradient">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2574&auto=format&fit=crop')] opacity-10 bg-cover bg-center mix-blend-overlay" />
        <div className="absolute top-0 right-0 w-full md:w-1/2 h-full bg-gradient-to-l from-primary/10 to-transparent" />
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white/90 text-xs md:text-sm font-medium mb-6 backdrop-blur-sm shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                <Sparkles className="w-4 h-4 text-primary animate-pulse" /> Tecnologia Ads de Próxima Geração
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6 tracking-tight drop-shadow-lg">
                Pare de "Tentar" Vender e <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400 drop-shadow-md">
                  Domine o Digital <span className="absolute -bottom-2 left-0 w-full h-1 bg-primary/30 blur-sm"></span>
                </span>
              </h1>
              
              <p className="text-base md:text-xl text-gray-300 mb-8 max-w-xl leading-relaxed">
                Transformamos o seu negócio local na autoridade máxima da região. Estratégias de tráfego pago e posicionamento que colocam dinheiro no seu bolso, não apenas "likes".
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-white text-base md:text-lg h-14 px-8 shadow-[0_10px_30px_rgba(234,88,12,0.3)] font-bold transition-all hover:scale-105 hover:-translate-y-1"
                  onClick={() => window.open(whatsappUrl, '_blank')}
                >
                  QUERO DOMINAR MEU MERCADO
                  <ChevronRight className="ml-2 w-5 h-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="bg-white/5 border-white/20 text-white hover:bg-white/10 hover:text-white h-14 px-8 backdrop-blur-sm transition-all hover:scale-105"
                  onClick={() => document.getElementById('problem')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  SABER MAIS
                </Button>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
              className="relative hidden lg:block perspective-1000"
              whileHover={{ rotateY: -5, rotateX: 5, scale: 1.02 }}
            >
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 transform-gpu">
                <img 
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop" 
                  alt="Marketing Analytics" 
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-8">
                  <div className="text-white transform translate-z-10">
                    <p className="font-bold text-3xl drop-shadow-md">Vendas Previsíveis</p>
                    <p className="text-white/90 text-lg">O fim da dependência de indicações.</p>
                  </div>
                </div>
              </div>
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-primary/40 rounded-full blur-3xl animate-pulse" />
              <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-orange-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="problem" className="py-16 md:py-24 bg-white relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4 md:mb-6 text-foreground tracking-tight">
              A Dura Realidade do Negócio Local
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground">
              Se você ainda depende apenas de "boca a boca", você não tem um negócio, você tem um hobby perigoso.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            <motion.div 
              whileHover={{ y: -10, scale: 1.02, boxShadow: "0 20px 40px -10px rgba(220,38,38,0.15)" }}
              className="p-6 md:p-8 rounded-2xl bg-red-50/50 border border-red-100 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-6 shadow-inner">
                <Clock className="text-red-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-red-950">Tempo Perdido</h3>
              <p className="text-red-900/70">Esperar o cliente entrar na sua loja é a estratégia mais lenta e incerta que existe.</p>
            </motion.div>
            <motion.div 
              whileHover={{ y: -10, scale: 1.02, boxShadow: "0 20px 40px -10px rgba(220,38,38,0.15)" }}
              className="p-6 md:p-8 rounded-2xl bg-red-50/50 border border-red-100 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-6 shadow-inner">
                <Zap className="text-red-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-red-950">Vulnerabilidade</h3>
              <p className="text-red-900/70">Seu concorrente está a um clique de distância de "roubar" seu cliente com um anúncio melhor.</p>
            </motion.div>
            <motion.div 
              whileHover={{ y: -10, scale: 1.02, boxShadow: "0 20px 40px -10px rgba(220,38,38,0.15)" }}
              className="p-6 md:p-8 rounded-2xl bg-red-50/50 border border-red-100 transition-all duration-300 sm:col-span-2 md:col-span-1"
            >
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-6 shadow-inner">
                <TrendingUp className="text-red-600 rotate-180" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-red-950">Estagnação</h3>
              <p className="text-red-900/70">Sem tráfego qualificado, seu faturamento nunca ultrapassa o teto do seu bairro.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Proof Section */}
      <section className="py-16 md:py-20 bg-secondary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop')] opacity-5 bg-cover bg-center mix-blend-luminosity" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-10 md:gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 leading-tight">Os Números Não Mentem</h2>
              <div className="space-y-8">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4 bg-white/5 p-4 rounded-xl backdrop-blur-sm border border-white/10"
                >
                  <div className="text-4xl md:text-5xl font-black text-primary drop-shadow-[0_0_10px_rgba(234,88,12,0.5)]">76%</div>
                  <p className="text-base md:text-lg text-gray-200 mt-1">dos consumidores visitam a loja física em até 24h após uma busca local no Google.</p>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="flex items-start gap-4 bg-white/5 p-4 rounded-xl backdrop-blur-sm border border-white/10"
                >
                  <div className="text-4xl md:text-5xl font-black text-primary drop-shadow-[0_0_10px_rgba(234,88,12,0.5)]">85%</div>
                  <p className="text-base md:text-lg text-gray-200 mt-1">das pessoas pesquisam online antes de decidir onde gastar seu dinheiro.</p>
                </motion.div>
              </div>
            </div>
            <motion.div 
              whileHover={{ scale: 1.03, rotateY: -5, rotateX: 5 }}
              className="bg-gradient-to-br from-white/10 to-white/5 p-8 md:p-10 rounded-3xl backdrop-blur-md border border-white/20 shadow-[0_20px_40px_rgba(0,0,0,0.3)] transform-gpu"
            >
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">A Pergunta de Ouro:</h3>
              <p className="text-lg md:text-xl text-gray-300 italic mb-8">"Quando eles pesquisarem pelo seu serviço na sua cidade, eles vão encontrar você ou o seu concorrente?"</p>
              <Button 
                className="w-full bg-primary hover:bg-primary/90 text-white h-14 md:h-16 text-sm md:text-lg font-bold shadow-[0_0_20px_rgba(234,88,12,0.4)] transition-all hover:scale-105"
                onClick={() => window.open(whatsappUrl, '_blank')}
              >
                QUERO SER O PRIMEIRO DA LISTA
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      
        {/* Tech Performance Section */}
        <section className="py-12 bg-[#050A18] overflow-hidden border-y border-white/5">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
               <div className="flex items-center gap-2 text-white font-bold"><Layers className="w-6 h-6"/> BIG DATA</div>
               <div className="flex items-center gap-2 text-white font-bold"><Cpu className="w-6 h-6"/> AI OPTIMIZATION</div>
               <div className="flex items-center gap-2 text-white font-bold"><Globe className="w-6 h-6"/> GLOBAL REACH</div>
               <div className="flex items-center gap-2 text-white font-bold"><Infinity className="w-6 h-6"/> SCALE READY</div>
            </div>
          </div>
        </section>
    
      {/* Services Section */}
      <section className="py-16 md:py-24 bg-gray-50/50">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeading 
            title="Nossa Artilharia de Vendas" 
            subtitle="Não fazemos apenas posts bonitinhos. Criamos máquinas de aquisição de clientes programadas para lucrar."
          />
          
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 perspective-1000">
            <motion.div whileHover={{ y: -10, rotateX: 5, rotateY: -5, z: 50 }} className="h-full">
              <FeatureCard 
                icon={Cpu}
                title="Inteligência em Tráfego Pago"
                description="Anúncios que perseguem seu cliente ideal até ele clicar. Focamos em ROI, não em métricas de vaidade."
                delay={0.1}
              />
            </motion.div>
            <motion.div whileHover={{ y: -10, rotateX: 5, z: 50 }} className="h-full">
              <FeatureCard 
                icon={BarChart3}
                title="Google Meu Negócio"
                description="Dominamos o mapa do Google. Apareça para quem já está com o cartão na mão procurando por você."
                delay={0.2}
              />
            </motion.div>
            <motion.div whileHover={{ y: -10, rotateX: 5, rotateY: 5, z: 50 }} className="h-full sm:col-span-2 md:col-span-1">
              <FeatureCard 
                icon={Zap}
                title="Funis de WhatsApp"
                description="Transformamos conversas em contratos. Estruturamos o seu atendimento para não perder nenhum lead."
                delay={0.3}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ROI Section */}
      <section className="py-16 md:py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-6 md:mb-8 leading-tight text-foreground tracking-tight">
                Matemática, <br /><span className="text-primary">Não Mágica.</span>
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 md:mb-12">
                Nossa projeção baseada em dados reais para negócios que aplicam o nosso método com consistência:
              </p>
              
              <div className="grid grid-cols-2 gap-4 md:gap-8 mb-8 md:mb-12">
                <div className="border-l-4 border-primary pl-4 md:pl-6">
                  <p className="text-muted-foreground uppercase tracking-wider text-xs md:text-sm mb-1 font-semibold">Investimento</p>
                  <p className="text-2xl md:text-3xl font-black text-foreground">R$ 2.000</p>
                </div>
                <div className="border-l-4 border-green-500 pl-4 md:pl-6 bg-green-50/50 py-2 -my-2 rounded-r-lg">
                  <p className="text-green-700 uppercase tracking-wider text-xs md:text-sm mb-1 font-semibold">Faturamento</p>
                  <p className="text-2xl md:text-3xl font-black text-green-600">R$ 10.000+</p>
                </div>
              </div>
              
              <Button 
                size="lg" 
                className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white h-14 px-8 md:px-10 text-base md:text-lg font-bold shadow-[0_10px_25px_rgba(234,88,12,0.3)] transition-all hover:scale-105"
                onClick={() => window.open(whatsappUrl, '_blank')}
              >
                QUERO ESSES RESULTADOS HOJE
              </Button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, rotateY: -10 }}
              whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, type: "spring" }}
              className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-6 md:p-10 border border-gray-200 relative shadow-2xl transform-gpu"
              whileHover={{ scale: 1.02, rotateX: 2, rotateY: -2 }}
            >
              <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none mix-blend-multiply">
                <img src={logo} alt="Logo BG" className="w-24 md:w-32" />
              </div>
              
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center">
                  <LineChart className="text-primary w-6 h-6" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-foreground">Projeção de Lucro Real</h3>
              </div>
              
              <div className="space-y-6 md:space-y-8 relative z-10">
                <div className="bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-gray-100 transition-transform hover:-translate-y-1">
                  <div className="flex justify-between items-end mb-3">
                    <span className="text-muted-foreground font-semibold text-sm uppercase tracking-wider">Investimento em Ads</span>
                    <span className="text-foreground font-black text-xl md:text-2xl">R$ 2.000</span>
                  </div>
                  <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden shadow-inner">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: "20%" }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="bg-gradient-to-r from-orange-300 to-primary h-full" 
                    />
                  </div>
                </div>

                <div className="flex justify-center -my-2">
                  <div className="bg-white p-2 rounded-full shadow-md z-10 border border-gray-100">
                    <ArrowRight className="text-primary w-6 h-6 rotate-90" />
                  </div>
                </div>

                <div className="bg-white p-5 md:p-6 rounded-2xl shadow-[0_10px_30px_rgba(234,88,12,0.15)] border border-primary/20 transition-transform hover:-translate-y-1">
                  <div className="flex justify-between items-end mb-3">
                    <span className="text-primary font-bold text-sm uppercase tracking-wider flex items-center gap-1">
                      <Award className="w-4 h-4" /> Retorno (5x)
                    </span>
                    <span className="text-primary font-black text-2xl md:text-3xl">R$ 10.000</span>
                  </div>
                  <div className="w-full bg-orange-50 h-3 rounded-full overflow-hidden shadow-inner border border-orange-100">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      transition={{ duration: 1.5, delay: 0.8 }}
                      className="bg-gradient-to-r from-primary to-orange-500 h-full relative"
                    >
                      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMykiIHN0cm9rZS13aWR0aD0iNCIgZmlsbD0ibm9uZSI+PHBhdGggZD0iTTAgNDBMNDAgMCIvPjwvZz48L3N2Zz4=')] opacity-30" />
                    </motion.div>
                  </div>
                  <p className="text-[10px] md:text-xs text-muted-foreground mt-4 leading-relaxed bg-gray-50 p-3 rounded-lg border border-gray-100">
                    *A projeção de R$ 10 mil com R$ 2 mil de investimento é uma estimativa baseada em métricas médias. O resultado real depende do nicho, maturidade da conta, oferta e taxa de conversão do seu time comercial.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Objection Killers */}
      <section className="py-16 md:py-24 bg-gray-50 border-y border-gray-200">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeading 
            title="Por que a Bruvi Marketing?" 
            subtitle="O mercado está cheio de 'gurus' e 'sobrinhos' que cobram barato e somem com seu dinheiro. Nós entregamos parceria e previsibilidade."
          />
          
          <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
            {[
              {
                title: "Não tenho tempo para gerenciar isso",
                desc: "Nós fazemos tudo, de ponta a ponta. Você foca em atender os novos clientes que vamos mandar, nós cuidamos da parte técnica e estratégica das campanhas.",
                icon: Clock
              },
              {
                title: "Já tentei e não deu certo",
                desc: "Provavelmente você apenas apertou o botão 'impulsionar' ou contratou amadores. Nós criamos estratégias de funil real que convertem curiosos em compradores.",
                icon: ThumbsUp
              },
              {
                title: "Serve para o meu nicho local?",
                desc: "Se existem pessoas no Google ou Instagram da sua cidade procurando pelo seu serviço agora, então o nosso método funciona (e muito bem) para você.",
                icon: Target
              },
              {
                title: "É um investimento muito alto?",
                desc: "Caro é não ter clientes e ver a concorrência crescer. Nosso serviço se paga com o aumento do seu faturamento logo nos primeiros meses. É matemática.",
                icon: ShieldCheck
              }
            ].map((item, i) => (
              <motion.div 
                key={i} 
                whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)" }}
                className="flex flex-col sm:flex-row gap-5 p-6 md:p-8 rounded-2xl bg-white shadow-sm border border-gray-100 transition-all"
              >
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
                  <item.icon className="text-primary w-7 h-7" />
                </div>
                <div>
                  <h4 className="text-lg md:text-xl font-bold mb-2 text-foreground">{item.title}</h4>
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Dúvidas Frequentes</h2>
            <p className="text-muted-foreground">Tudo o que você precisa saber antes de darmos o próximo passo.</p>
          </div>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1" className="border-b border-gray-200 py-2">
              <AccordionTrigger className="text-left font-bold text-lg hover:text-primary">Quanto tempo demora para ver os primeiros resultados?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                As campanhas de performance (Google e Meta Ads) costumam gerar os primeiros leads nas primeiras 48 horas após a ativação. No entanto, o algoritmo leva cerca de 15 a 30 dias para otimizar e entregar o custo por lead ideal. O jogo é de constância.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="border-b border-gray-200 py-2">
              <AccordionTrigger className="text-left font-bold text-lg hover:text-primary">Vocês exigem contrato de fidelidade longo?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                Acreditamos que o que prende o cliente é o resultado, não um papel. Trabalhamos com ciclos iniciais de 3 meses para podermos implementar e otimizar a estratégia completa, mas não engessamos nossos parceiros com multas abusivas.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="border-b border-gray-200 py-2">
              <AccordionTrigger className="text-left font-bold text-lg hover:text-primary">Qual o investimento mínimo recomendado em anúncios?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                Para negócios locais, recomendamos um investimento mínimo inicial de R$ 400 a R$ 500 por mês diretamente nas plataformas (Google/Facebook). Isso garante que você comece a aparecer para clientes da sua região com um investimento acessível.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4" className="border-b border-gray-200 py-2">
              <AccordionTrigger className="text-left font-bold text-lg hover:text-primary">Vocês atendem concorrentes na mesma cidade?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                Não. Temos uma política estrita de exclusividade regional por nicho. Se assumirmos a sua clínica odontológica ou imobiliária em um raio de atuação, não fechamos com o seu concorrente direto. Queremos que você domine a sua área.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Direct CTA Section (Replaced Contact Form) */}
      <section id="contact" className="py-20 md:py-32 hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 bg-black/40 mix-blend-multiply" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/40 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-500/30 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-xl border border-white/20 p-8 md:p-16 rounded-3xl text-center shadow-2xl transform-gpu transition-transform hover:scale-[1.01]">
            <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-8 border border-primary/30">
              <PhoneCall className="text-primary w-10 h-10 animate-bounce" />
            </div>
            
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-6 text-white tracking-tight">
              Sua Empresa Está Pronta <br className="hidden md:block" />Para Escalar?
            </h2>
            
            <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto leading-relaxed">
              Não aceitamos qualquer cliente. Selecionamos negócios locais que têm capacidade de atendimento e querem multiplicar o faturamento nos próximos 90 dias.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                size="lg"
                className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white h-16 px-10 text-lg md:text-xl font-bold shadow-[0_0_30px_rgba(34,197,94,0.4)] transition-all hover:scale-105"
                onClick={() => window.open(whatsappUrl, '_blank')}
              >
                <MessageSquare className="mr-3 w-6 h-6" />
                FALAR COM ESPECIALISTA NO WHATSAPP
              </Button>
            </div>
            
            <p className="mt-8 text-sm text-gray-400 flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4" /> 
              Respostas em até 15 minutos em horário comercial
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      
        <footer className="bg-[#0A1225] border-t border-white/10 py-12 md:py-16 text-white/60 text-sm">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-3 gap-10 items-center">
              <div className="flex flex-col items-center md:items-start gap-4">
                <img src={logo} alt="Bruno Vinícius Ads" className="h-10 brightness-0 invert opacity-70" />
                <p className="text-center md:text-left max-w-xs">
                  Transformando negócios locais em máquinas previsíveis de vendas através do marketing de performance.
                </p>
              </div>
              
              <div className="flex flex-col items-center gap-3">
                <h4 className="text-white/90 font-bold mb-2 uppercase tracking-wider">Contato Direto</h4>
                <a href={whatsappUrl} className="hover:text-primary transition-colors flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" /> (11) 91254-8292
                </a>
                <a href="mailto:contato@bruvimarketing.com.br" className="hover:text-primary transition-colors flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> contato@bruvimarketing.com.br
                </a>
              </div>
              
              <div className="flex flex-col items-center md:items-end gap-4">
                <p>&copy; {new Date().getFullYear()} Bruno Vinícius Ads. CNPJ: 47.851.981/0001-44. | Desenvolvido com Tecnologia de Ponta.</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
    );
  }