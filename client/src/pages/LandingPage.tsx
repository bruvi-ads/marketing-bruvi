import { motion } from "framer-motion";
import { 
  ArrowRight, 
  BarChart3, 
  CheckCircle2, 
  ChevronRight, 
  Globe2, 
  LineChart, 
  MapPin, 
  MessageSquare, 
  Target, 
  TrendingUp, 
  Users,
  ShieldCheck,
  Zap,
  Clock,
  ThumbsUp
} from "lucide-react";
import logo from "@assets/4_1771722650806.png";
import { Button } from "@/components/ui/button";
import { LeadForm } from "@/components/LeadForm";
import { FeatureCard } from "@/components/FeatureCard";
import { SectionHeading } from "@/components/SectionHeading";

export default function LandingPage() {
  const whatsappUrl = "https://wa.me/5511912548292";

  return (
    <div className="min-h-screen bg-background font-sans overflow-x-hidden">
      {/* Header/Nav */}
      <header className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={logo} alt="Bruvi Marketing" className="h-12 w-auto" />
          </div>
          <Button 
            className="hidden md:flex bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20"
            onClick={() => window.open(whatsappUrl, '_blank')}
          >
            Consultoria Gratuita
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden hero-gradient">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2574&auto=format&fit=crop')] opacity-10 bg-cover bg-center mix-blend-overlay" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/10 to-transparent" />
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white/90 text-sm font-medium mb-6 backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                Agência de Marketing de Elite
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-white leading-tight mb-6 tracking-tight">
                Pare de "Tentar" Vender e <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">
                  Comece a Dominar
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-xl leading-relaxed">
                Transformamos o seu negócio local na autoridade máxima da região. Estratégias de tráfego pago e posicionamento que colocam dinheiro no seu bolso, não apenas "likes".
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-white text-lg h-14 px-8 shadow-xl shadow-primary/25 font-bold"
                  onClick={() => window.open(whatsappUrl, '_blank')}
                >
                  QUERO DOMINAR MEU MERCADO
                  <ChevronRight className="ml-2 w-5 h-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="bg-white/5 border-white/20 text-white hover:bg-white/10 hover:text-white h-14 px-8 backdrop-blur-sm"
                  onClick={() => document.getElementById('problem')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  POR QUE MEU NEGÓCIO NÃO CRESCE?
                </Button>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                <img 
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop" 
                  alt="Marketing Analytics" 
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                  <div className="text-white">
                    <p className="font-bold text-2xl">Vendas Previsíveis</p>
                    <p className="text-white/80">O fim da dependência de indicações.</p>
                  </div>
                </div>
              </div>
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-primary/30 rounded-full blur-3xl" />
              <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-blue-500/30 rounded-full blur-3xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="problem" className="py-24 bg-white relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-6 text-foreground">
              A Dura Realidade do Negócio Local
            </h2>
            <p className="text-xl text-muted-foreground">
              Se você ainda depende apenas de "boca a boca", você não tem um negócio, você tem um hobby perigoso.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-red-50 border border-red-100">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-6">
                <Clock className="text-red-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Tempo Perdido</h3>
              <p className="text-muted-foreground">Esperar o cliente entrar na sua loja é a estratégia mais lenta e incerta que existe.</p>
            </div>
            <div className="p-8 rounded-2xl bg-red-50 border border-red-100">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-6">
                <Zap className="text-red-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Vulnerabilidade</h3>
              <p className="text-muted-foreground">Seu concorrente está a um clique de distância de "roubar" seu cliente com um anúncio melhor.</p>
            </div>
            <div className="p-8 rounded-2xl bg-red-50 border border-red-100">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-6">
                <TrendingUp className="text-red-600 rotate-180" />
              </div>
              <h3 className="text-xl font-bold mb-3">Estagnação</h3>
              <p className="text-muted-foreground">Sem tráfego qualificado, seu faturamento nunca ultrapassa o teto do seu bairro.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Proof Section */}
      <section className="py-20 bg-secondary text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-8">Os Números Não Mentem</h2>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="text-5xl font-bold text-primary">76%</div>
                  <p className="text-lg text-gray-300">dos consumidores visitam a loja física em até 24h após uma busca local.</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-5xl font-bold text-primary">85%</div>
                  <p className="text-lg text-gray-300">das pessoas pesquisam online antes de decidir onde gastar seu dinheiro.</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 p-8 rounded-3xl backdrop-blur-sm border border-white/10">
              <h3 className="text-2xl font-bold mb-4">A Pergunta é:</h3>
              <p className="text-xl text-gray-300 italic">"Quando eles pesquisarem pelo seu serviço, eles vão encontrar você ou o seu concorrente?"</p>
              <Button 
                className="mt-8 w-full bg-primary text-white h-12 text-lg font-bold"
                onClick={() => window.open(whatsappUrl, '_blank')}
              >
                QUERO SER O PRIMEIRO DA LISTA
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeading 
            title="Nossa Artilharia de Vendas" 
            subtitle="Não fazemos apenas posts bonitinhos. Criamos máquinas de aquisição de clientes."
          />
          
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={Target}
              title="Tráfego Pago (Google & Meta)"
              description="Anúncios que perseguem seu cliente ideal até ele clicar. Focamos em ROI, não em métricas de vaidade."
              delay={0.1}
            />
            <FeatureCard 
              icon={BarChart3}
              title="Google Meu Negócio"
              description="Dominamos o mapa do Google. Apareça para quem já está com o cartão na mão procurando por você."
              delay={0.2}
            />
            <FeatureCard 
              icon={Zap}
              title="Funis de WhatsApp"
              description="Transformamos conversas em contratos. Estruturamos o seu atendimento para não perder nenhum lead."
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* ROI Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-4xl md:text-6xl font-extrabold mb-8 leading-tight text-foreground">
                Matemática, <br />Não Mágica.
              </h2>
              <p className="text-xl text-muted-foreground mb-12">
                Nossa projeção baseada em dados reais para negócios que aplicam o nosso método:
              </p>
              
              <div className="grid sm:grid-cols-2 gap-8 mb-12">
                <div className="border-l-4 border-primary pl-6">
                  <p className="text-muted-foreground uppercase tracking-widest text-sm mb-1">Investimento em Ads</p>
                  <p className="text-3xl font-bold text-foreground">R$ 2.000,00</p>
                </div>
                <div className="border-l-4 border-green-500 pl-6">
                  <p className="text-muted-foreground uppercase tracking-widest text-sm mb-1">Faturamento Projetado</p>
                  <p className="text-3xl font-bold text-green-600">R$ 10.000,00+</p>
                </div>
              </div>
              
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-white h-14 px-10 text-lg font-bold"
                onClick={() => window.open(whatsappUrl, '_blank')}
              >
                QUERO ESSES RESULTADOS
              </Button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-gray-50 rounded-2xl p-8 border border-gray-100 relative"
            >
              <div className="absolute top-0 right-0 p-4 opacity-20">
                <img src={logo} alt="Logo BG" className="w-24" />
              </div>
              
              <h3 className="text-2xl font-bold mb-6 text-center text-foreground">Projeção de Lucro Real</h3>
              
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-muted-foreground font-medium">Investimento em Anúncios</span>
                    <span className="text-foreground font-bold text-lg">R$ 2.000,00</span>
                  </div>
                  <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-primary/40 h-full w-[20%]" />
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="bg-gray-100 p-2 rounded-full">
                    <ArrowRight className="text-gray-400 w-6 h-6 rotate-90" />
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-lg border-primary/20 border-2">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-primary font-bold">Retorno Estimado (5x)</span>
                    <span className="text-primary font-bold text-2xl">R$ 10.000,00</span>
                  </div>
                  <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-primary h-full w-full" />
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-3 leading-tight italic">
                    *A projeção de R$ 10 mil de faturamento com R$ 2 mil de investimento é uma estimativa baseada em médias de performance. O resultado real depende diretamente do nicho de atuação, maturidade da conta/pixel/fibra, qualidade da oferta e velocidade de atendimento comercial.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Objection Killers */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeading 
            title="Por que a Bruvi?" 
            subtitle="O mercado está cheio de 'sobrinhos' que cobram barato e somem. Nós entregamos previsibilidade."
          />
          
          <div className="grid md:grid-cols-2 gap-12">
            {[
              {
                title: "Não tenho tempo para gerenciar isso",
                desc: "Nós fazemos tudo. Você foca em atender os novos clientes que vamos mandar, nós cuidamos de toda a parte técnica.",
                icon: Clock
              },
              {
                title: "Já tentei e não deu certo",
                desc: "Provavelmente você apenas apertou o botão 'impulsionar'. Nós criamos estratégias de funil real que convertem curiosos em compradores.",
                icon: ThumbsUp
              },
              {
                title: "Será que serve para o meu nicho?",
                desc: "Se existem pessoas no Google ou Instagram procurando pelo seu serviço, então o nosso método funciona para você.",
                icon: Target
              },
              {
                title: "É muito caro?",
                desc: "Caro é não ter clientes. Nosso serviço se paga com o aumento do seu faturamento. É um investimento, não um gasto.",
                icon: ShieldCheck
              }
            ].map((item, i) => (
              <div key={i} className="flex gap-6 p-8 rounded-2xl bg-white shadow-sm border border-gray-100">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <item.icon className="text-primary w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-24 hero-gradient relative">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            <div className="text-white">
              <h2 className="text-4xl md:text-6xl font-extrabold mb-6">
                Pronto para <br />o Próximo Nível?
              </h2>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Não aceitamos qualquer cliente. Selecionamos apenas negócios que estão prontos para escalar e dominar o mercado local. Se você é um deles, preencha o formulário.
              </p>
              
              <ul className="space-y-4 mb-12">
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="text-primary w-6 h-6" />
                  <span className="text-lg">Diagnóstico gratuito de presença digital</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="text-primary w-6 h-6" />
                  <span className="text-lg">Plano de ação imediata</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="text-primary w-6 h-6" />
                  <span className="text-lg">Análise real da sua concorrência</span>
                </li>
              </ul>
            </div>
            
            <LeadForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0F1F44] border-t border-white/10 py-12 text-white/60 text-sm">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <img src={logo} alt="Bruvi Logo" className="h-8 grayscale opacity-50" />
              <span>&copy; {new Date().getFullYear()} Bruvi Marketing. Todos os direitos reservados.</span>
            </div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
              <a href="#" className="hover:text-white transition-colors">Privacidade</a>
              <a href="https://wa.me/5511912548292" className="hover:text-white transition-colors">Contato</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
