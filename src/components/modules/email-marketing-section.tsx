'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronUp, Mail, Zap, Search, Server, Rocket, Brain, Palette, Globe, Code, Database, ExternalLink } from 'lucide-react';
import { useState } from 'react';

interface ToolCardProps {
  name: string;
  description: string;
  url: string;
  category: 'email' | 'design' | 'scraping' | 'smtp' | 'automation';
  features?: string[];
}

function ToolCard({ name, description, url, category, features = [] }: ToolCardProps) {
  const getCategoryConfig = () => {
    switch (category) {
      case 'email': return { bg: 'bg-blue-100', text: 'text-blue-600', border: 'border-blue-200', bgColor: 'bg-blue-50', label: 'Plataforma Email' };
      case 'design': return { bg: 'bg-pink-100', text: 'text-pink-600', border: 'border-pink-200', bgColor: 'bg-pink-50', label: 'Diseño Newsletter' };
      case 'scraping': return { bg: 'bg-green-100', text: 'text-green-600', border: 'border-green-200', bgColor: 'bg-green-50', label: 'Scraping' };
      case 'smtp': return { bg: 'bg-purple-100', text: 'text-purple-600', border: 'border-purple-200', bgColor: 'bg-purple-50', label: 'SMTP' };
      case 'automation': return { bg: 'bg-amber-100', text: 'text-amber-600', border: 'border-amber-200', bgColor: 'bg-amber-50', label: 'Automatización' };
      default: return { bg: 'bg-slate-100', text: 'text-slate-600', border: 'border-slate-200', bgColor: 'bg-slate-50', label: 'Herramienta' };
    }
  };

  const config = getCategoryConfig();

  return (
    <Card className={`border-slate-200 hover:border-${config.text.split('-')[1]}-300 hover:shadow-md transition-all`}>
      <CardHeader className="flex flex-row items-center justify-between space-x-4 pb-3">
        <div className="flex items-center space-x-3">
          <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${config.bg} ${config.text}`}>
            {category === 'email' && <Mail className="h-5 w-5" />}
            {category === 'design' && <Palette className="h-5 w-5" />}
            {category === 'scraping' && <Search className="h-5 w-5" />}
            {category === 'smtp' && <Server className="h-5 w-5" />}
            {category === 'automation' && <Zap className="h-5 w-5" />}
          </div>
          <CardTitle className="text-lg text-slate-900">{name}</CardTitle>
        </div>
        <Button variant="outline" size="sm" className={`text-${config.text.split('-')[1]}-600 border-${config.text.split('-')[1]}-200 hover:bg-${config.text.split('-')[1]}-50`}>
          <a href={url} target="_blank" rel="noopener noreferrer" className="flex items-center">
            Visitar <ExternalLink className="ml-1 h-4 w-4" />
          </a>
        </Button>
      </CardHeader>
      <CardContent>
        <p className="text-slate-600 mb-3">{description}</p>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className={`border-${config.border.split('-')[1]}-200 ${config.text} ${config.bgColor}`}>
            {config.label}
          </Badge>
          {features.slice(0, 2).map((feature, idx) => (
            <Badge key={idx} variant="secondary" className="text-xs">
              {feature}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default function EmailMarketingSection() {
  const [openSections, setOpenSections] = useState({
    emailPlatforms: true,
    designTools: false,
    automationTools: false,
    scrapingLocal: false,
    scrapingCloud: false,
    scrapingExtensions: false,
    smtpServices: false,
    analyticsTools: false,
    deliverability: false,
    bestPractices: false
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="text-center space-y-4 py-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 via-pink-100 to-red-100 border border-purple-200">
          <Mail className="h-4 w-4 text-purple-600" />
          <span className="text-sm font-semibold text-purple-700">Email Marketing</span>
        </div>

        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent">
          Herramientas Profesionales para Campañas de Email Marketing
        </h2>

        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Descubre las herramientas esenciales para crear, gestionar, automatizar y optimizar campañas de email marketing de alto rendimiento. Desde plataformas todo-en-uno hasta herramientas especializadas de scraping y entrega.
        </p>
      </div>

      {/* PLATAFORMAS DE EMAIL MARKETING */}
      <Collapsible open={openSections.emailPlatforms} onOpenChange={() => toggleSection('emailPlatforms')}>
        <Card className="border-purple-200 bg-gradient-to-br from-purple-50 via-white to-pink-50">
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-purple-50/50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-purple-900">📧 Plataformas de Email Marketing</CardTitle>
                    <p className="text-sm text-purple-700">Gestión completa de campañas, automatización y análisis</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="text-purple-600">
                  {openSections.emailPlatforms ? (
                    <>
                      <ChevronUp className="h-4 w-4 mr-1" />
                      Ocultar
                    </>
                  ) : (
                    <>
                      <ChevronDown className="h-4 w-4 mr-1" />
                      Ver
                    </>
                  )}
                </Button>
              </div>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-0">
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <ToolCard
                  name="Mailchimp"
                  description="La plataforma más popular de email marketing. Ofrece automatización avanzada, plantillas profesionales, segmentación inteligente, análisis detallados y A/B testing."
                  url="https://mailchimp.com"
                  category="email"
                  features={['Auto', 'A/B Test', 'Analytics']}
                />
                <ToolCard
                  name="SendBlaster"
                  description="Software profesional para envío de emails masivos. Ideal para listas grandes con gestión de contactos, plantillas personalizables y seguimiento detallado."
                  url="https://www.sendblaster.com"
                  category="email"
                  features={['Bulk', 'Templates', 'Tracking']}
                />
                <ToolCard
                  name="HubSpot Marketing Hub"
                  description="Suite completa de inbound marketing con CRM integrado. Automatización multicanal, lead nurturing, formularios inteligentes y reporting avanzado."
                  url="https://www.hubspot.com/marketing-hub"
                  category="email"
                  features={['CRM', 'Inbound', 'Automation']}
                />
                <ToolCard
                  name="ActiveCampaign"
                  description="Líder en automatización de marketing con IA. Machine learning para optimizar envíos, customer journey builder y scoring de leads automático."
                  url="https://www.activecampaign.com"
                  category="email"
                  features={['AI', 'Journey', 'Scoring']}
                />
                <ToolCard
                  name="ConvertKit"
                  description="Especializado en creadores de contenido y bloggers. Segmentación por comportamiento, landing pages integradas y automatizaciones visuales."
                  url="https://convertkit.com"
                  category="email"
                  features={['Creators', 'Landing Pages', 'Segmentation']}
                />
                <ToolCard
                  name="Brevo (ex-Sendinblue)"
                  description="Plataforma todo-en-uno con email, SMS y chat. Plan gratuito generoso, automatización visual y transaccional incluido."
                  url="https://www.brevo.com"
                  category="email"
                  features={['SMS', 'Free Plan', 'Transactional']}
                />
                <ToolCard
                  name="GetResponse"
                  description="Plataforma completa con webinars integrados, autopresponder, ecommerce tools y funnels de conversión."
                  url="https://www.getresponse.com"
                  category="email"
                  features={['Webinars', 'Funnels', 'Ecommerce']}
                />
                <ToolCard
                  name="MailerLite"
                  description="Simple pero poderosa. Editor drag & drop, automatizaciones fáciles, pop-ups integrados y precio muy competitivo."
                  url="https://www.mailerlite.com"
                  category="email"
                  features={['Simple', 'Drag & Drop', 'Affordable']}
                />
              </div>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* HERRAMIENTAS DE DISEÑO DE NEWSLETTERS */}
      <Collapsible open={openSections.designTools} onOpenChange={() => toggleSection('designTools')}>
        <Card className="border-purple-200 bg-gradient-to-br from-pink-50 via-white to-purple-50">
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-purple-50/50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center shadow-lg">
                    <Palette className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-purple-900">🎨 Diseño de Newsletters</CardTitle>
                    <p className="text-sm text-purple-700">Plantillas profesionales y editores visuales</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="text-purple-600">
                  {openSections.designTools ? (
                    <>
                      <ChevronUp className="h-4 w-4 mr-1" />
                      Ocultar
                    </>
                  ) : (
                    <>
                      <ChevronDown className="h-4 w-4 mr-1" />
                      Ver
                    </>
                  )}
                </Button>
              </div>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-0">
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <ToolCard
                  name="Canva (Plantillas AI)"
                  description="Diseña newsletters impactantes con miles de plantillas profesionales. IA integrada para generar contenido visual automáticamente."
                  url="https://www.canva.com"
                  category="design"
                  features={['AI Design', 'Templates', 'Easy']}
                />
                <ToolCard
                  name="Stripo"
                  description="Editor profesional de emails con +1000 plantillas. Exporta a cualquier ESP, soporte AMP4Email y colaboración en tiempo real."
                  url="https://www.stripo.email"
                  category="design"
                  features={['AMP', 'Export', 'Collaborate']}
                />
                <ToolCard
                  name="BeeFree"
                  description="Editor visual intuitivo sin código. Plantillas responsivas, exportación HTML limpia y preview en dispositivos reales."
                  url="https://beefree.io"
                  category="design"
                  features={['Visual', 'Responsive', 'Preview']}
                />
                <ToolCard
                  name="Designmodo Postage"
                  description="Generador de emails con bloqueo de elementos. Compatible con todos los clientes de correo y incluye librería de componentes."
                  url="https://postageapp.com"
                  category="design"
                  features={['Components', 'All Clients', 'Library']}
                />
                <ToolCard
                  name="Chamaileon"
                  description="Plataforma colaborativa para equipos. Workflow de aprobación, integración con CMS y gestión centralizada de branding."
                  url="https://chamaileon.io"
                  category="design"
                  features={['Team', 'Workflow', 'CMS']}
                />
                <ToolCard
                  name="MJML Framework"
                  description="Framework open-source para emails responsivos. Sintaxis simple que se compila a HTML compatible con todos los clientes."
                  url="https://mjml.io"
                  category="design"
                  features={['Open Source', 'Responsive', 'Framework']}
                />
                <ToolCard
                  name="Litmus Builder"
                  description="Editor basado en bloques con testing integrado. Previsualiza en 90+ clientes de correo antes de enviar."
                  url="https://litmus.com/builder"
                  category="design"
                  features={['Testing', 'Blocks', '90+ Clients']}
                />
                <ToolCard
                  name="HTML Email Builder"
                  description="Constructor visual con componentes predefinidos. Arrastrar y soltar, responsive automático y validación en tiempo real."
                  url="https://htmlemailbuilder.com"
                  category="design"
                  features={['Builder', 'Validate', 'Auto']}
                />
              </div>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* HERRAMIENTAS DE AUTOMATIZACIÓN */}
      <Collapsible open={openSections.automationTools} onOpenChange={() => toggleSection('automationTools')}>
        <Card className="border-purple-200 bg-gradient-to-br from-amber-50 via-white to-orange-50">
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-purple-50/50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-purple-900">⚡ Automatización Inteligente</CardTitle>
                    <p className="text-sm text-purple-700">Flujos automáticos y personalización con IA</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="text-purple-600">
                  {openSections.automationTools ? (
                    <>
                      <ChevronUp className="h-4 w-4 mr-1" />
                      Ocultar
                    </>
                  ) : (
                    <>
                      <ChevronDown className="h-4 w-4 mr-1" />
                      Ver
                    </>
                  )}
                </Button>
              </div>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-0">
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <ToolCard
                  name="Zapier + Email"
                  description="Conecta tu email con 5000+ aplicaciones. Automatiza flujos sin código: cuando ocurre X, envía email Y automáticamente."
                  url="https://zapier.com"
                  category="automation"
                  features={['5000+ Apps', 'No Code', 'Triggers']}
                />
                <ToolCard
                  name="Make (ex-Integromat)"
                  description="Automatización visual avanzada. Crea escenarios complejos con lógica condicional, transformaciones de datos y rutas múltiples."
                  url="https://www.make.com"
                  category="automation"
                  features={['Visual', 'Logic', 'Transform']}
                />
                <ToolCard
                  name="n8n"
                  description="Automatización workflow open-source. Auto-hospedable, nodos personalizados y flujo de trabajo visual poderoso."
                  url="https://n8n.io"
                  category="automation"
                  features={['Open Source', 'Self-host', 'Custom']}
                />
                <ToolCard
                  name="Drip"
                  description="Automatización especializada en ecommerce. Customer journey basado en comportamiento, product recommendations y recovery de carritos."
                  url="https://www.drip.com"
                  category="automation"
                  features={['Ecommerce', 'Behavior', 'Cart']}
                />
                <ToolCard
                  name="Klaviyo"
                  description="Plataforma de automatización para ecommerce. Flujos prediseñados, segmentación avanzada y sincronización con Shopify/WooCommerce."
                  url="https://www.klaviyo.com"
                  category="automation"
                  features={['Shopify', 'Flows', 'Segment']}
                />
                <ToolCard
                  name="Customer.io"
                  description="Automatización basada en datos reales. Segmentación en tiempo real, triggers comportamentales y cross-channel messaging."
                  url="https://customer.io"
                  category="automation"
                  features={['Real-time', 'Triggers', 'Cross-channel']}
                />
              </div>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* SCRAPING - LOCAL */}
      <Collapsible open={openSections.scrapingLocal} onOpenChange={() => toggleSection('scrapingLocal')}>
        <Card className="border-purple-200 bg-gradient-to-br from-green-50 via-white to-emerald-50">
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-purple-50/50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center shadow-lg">
                    <Code className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-purple-900">💻 Scraping Local (En tu PC)</CardTitle>
                    <p className="text-sm text-purple-700">Herramientas de código abierto y frameworks para desarrollo local</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="text-purple-600">
                  {openSections.scrapingLocal ? (
                    <>
                      <ChevronUp className="h-4 w-4 mr-1" />
                      Ocultar
                    </>
                  ) : (
                    <>
                      <ChevronDown className="h-4 w-4 mr-1" />
                      Ver
                    </>
                  )}
                </Button>
              </div>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-0">
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <ToolCard
                  name="Scrapy (Python)"
                  description="Framework de scraping más popular de Python. Rastreo rápido, seletores XPath/CSS, middlewares personalizables y exportación a múltiples formatos."
                  url="https://scrapy.org"
                  category="scraping"
                  features={['Python', 'Fast', 'XPath']}
                />
                <ToolCard
                  name="Beautiful Soup"
                  description="Librería Python para parsear HTML/XML. Perfecta para proyectos pequeños, errores amigables y extracción sencilla de datos."
                  url="https://www.crummy.com/software/BeautifulSoup"
                  category="scraping"
                  features={['Python', 'Easy', 'Parser']}
                />
                <ToolCard
                  name="Selenium WebDriver"
                  description="Automatización de navegadores para sitios dinámicos. JavaScript rendered, interacciones reales y waiting inteligente."
                  url="https://www.selenium.dev"
                  category="scraping"
                  features={['Dynamic', 'JS Render', 'Browser']}
                />
                <ToolCard
                  name="Playwright"
                  description="Moderno framework de Microsoft. Multi-browser, auto-waiting, network interception y generación de código visual."
                  url="https://playwright.dev"
                  category="scraping"
                  features={['Multi-Browser', 'Modern', 'Generate']}
                />
                <ToolCard
                  name="Puppeteer"
                  description="Control de Chrome/Chromium vía DevTools Protocol. Ideal para Screenshots, PDF generation y scraping SPA."
                  url="https://pptr.dev"
                  category="scraping"
                  features={['Chrome', 'Screenshots', 'PDF']}
                />
                <ToolCard
                  name="Node.js + Cheerio"
                  description="jQuery para el servidor. Parseo ultra-rápido de HTML en Node.js. Ligero y compatible con estilos jQuery."
                  url="https://cheerio.js.org"
                  category="scraping"
                  features={['Node.js', 'Fast', 'jQuery']}
                />
                <ToolCard
                  name="Requests + BeautifulSoup"
                  description="Combinación clásica Python. HTTP requests simples con parseo robusto. Perfecto para sitios estáticos."
                  url="https://requests.readthedocs.io"
                  category="scraping"
                  features={['Classic', 'HTTP', 'Static']}
                />
                <ToolCard
                  name="Apify SDK"
                  description="Framework para crawlers y scrapers. Proxy rotación automática, queue management y escalabilidad cloud-ready."
                  url="https://crawlee.dev"
                  category="scraping"
                  features={['Proxy', 'Queue', 'Scale']}
                />
              </div>
              
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="font-semibold text-green-900 mb-2">💡 Consejos para Scraping Local:</h4>
                <ul className="space-y-1 text-sm text-green-800">
                  <li>• Usa delays entre requests para no sobrecargar servidores</li>
                  <li>• Implementa user-agent rotation para evitar bloqueos</li>
                  <li>• Respetar robots.txt es ético y legalmente importante</li>
                  <li>• Para JS-heavy sites, usa Playwright/Selenium en lugar de Requests</li>
                  <li>• Considera usar proxies residenciales para evitar IP bans</li>
                </ul>
              </div>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* SCRAPING - NUBE */}
      <Collapsible open={openSections.scrapingCloud} onOpenChange={() => toggleSection('scrapingCloud')}>
        <Card className="border-purple-200 bg-gradient-to-br from-teal-50 via-white to-cyan-50">
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-purple-50/50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center shadow-lg">
                    <Globe className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-purple-900">☁️ Scraping en la Nube</CardTitle>
                    <p className="text-sm text-purple-700">Plataformas SaaS para scraping escalable sin infraestructura propia</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="text-purple-600">
                  {openSections.scrapingCloud ? (
                    <>
                      <ChevronUp className="h-4 w-4 mr-1" />
                      Ocultar
                    </>
                  ) : (
                    <>
                      <ChevronDown className="h-4 w-4 mr-1" />
                      Ver
                    </>
                  )}
                </Button>
              </div>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-0">
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <ToolCard
                  name="Bright Data Scraping Browser"
                  description="Solución empresarial premium. Proxy network de 72M+ IPs, residential proxies, captchas resueltos automáticamente y API REST."
                  url="https://brightdata.com"
                  category="scraping"
                  features={['Enterprise', '72M IPs', 'API']}
                />
                <ToolCard
                  name="ScraperAPI"
                  description="API de scraping que maneja proxy rotation, captcha solving y JS rendering. Solo necesitas enviar URL y recibir JSON limpio."
                  url="https://www.scraperapi.com"
                  category="scraping"
                  features={['API', 'Proxy', 'Captcha']}
                />
                <ToolCard
                  name="Octoparse Cloud"
                  description="Scraping visual sin código en la nube. Programación de tareas, extracción programada y exportación a CSV/Excel/API."
                  url="https://www.octoparse.com"
                  category="scraping"
                  features={['No Code', 'Schedule', 'Export']}
                />
                <ToolCard
                  name="ParseHub Cloud"
                  description="Plataforma cloud para sitios complejos. Renderizado JS, manejo de cookies/login, pagination automática y API."
                  url="https://www.parsehub.com"
                  category="scraping"
                  features={['JS Render', 'Login', 'Pagination']}
                />
                <ToolCard
                  name="Apify Platform"
                  description="Marketplace de scrapers preconstruidos. 2000+ actors, infrastructure managed, scaling automático y storage integrado."
                  url="https://apify.com"
                  category="scraping"
                  features={['Marketplace', '2000+', 'Managed']}
                />
                <ToolCard
                  name="Zyte (ex-Scrapinghub)"
                  description="Servicio de scraping empresarial. Smart rotating proxies, automatic extraction y custom crawlers desarrollados por expertos."
                  url="https://www.zyte.com"
                  category="scraping"
                  features={['Enterprise', 'Smart', 'Custom']}
                />
                <ToolCard
                  name="Colab + BeautifulSoup"
                  description="Notebooks de Google Colab gratuitos. GPU/TPU disponible, sin configuración y sharing fácil con colaboradores."
                  url="https://colab.research.google.com"
                  category="scraping"
                  features={['Free', 'GPU', 'Share']}
                />
                <ToolCard
                  name="DataforSEO API"
                  description="API especializada en SEO data. SERP scraping, Amazon reviews, Google Maps data y more. Pagas solo por resultados."
                  url="https://dataforseo.com"
                  category="scraping"
                  features={['SEO', 'Pay-per-result', 'Maps']}
                />
              </div>
              
              <div className="mt-4 p-4 bg-teal-50 border border-teal-200 rounded-lg">
                <h4 className="font-semibold text-teal-900 mb-2">💡 Ventajas del Scraping Cloud:</h4>
                <ul className="space-y-1 text-sm text-teal-800">
                  <li>• Sin mantenimiento de infraestructura propia</li>
                  <li>• Proxy rotation y anti-blocking incluido</li>
                  <li>• Scaling automático según demanda</li>
                  <li>• Captcha solving resuelto automáticamente</li>
                  <li>• Acceso desde cualquier ubicación geográfica</li>
                </ul>
              </div>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* SCRAPING - EXTENSIONES */}
      <Collapsible open={openSections.scrapingExtensions} onOpenChange={() => toggleSection('scrapingExtensions')}>
        <Card className="border-purple-200 bg-gradient-to-br from-indigo-50 via-white to-violet-50">
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-purple-50/50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center shadow-lg">
                    <Database className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-purple-900">🔌 Extensiones de Navegador</CardTitle>
                    <p className="text-sm text-purple-700">Scraping directo desde Chrome/Firefox sin instalar nada más</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="text-purple-600">
                  {openSections.scrapingExtensions ? (
                    <>
                      <ChevronUp className="h-4 w-4 mr-1" />
                      Ocultar
                    </>
                  ) : (
                    <>
                      <ChevronDown className="h-4 w-4 mr-1" />
                      Ver
                    </>
                  )}
                </Button>
              </div>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-0">
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <ToolCard
                  name="Web Scraper (Chrome)"
                  description="Extensión gratuita más popular. Point & click selection, sitemap visual, scraping de paginación y exportación a CSV/JSON."
                  url="https://webscraper.io"
                  category="scraping"
                  features={['Free', 'Point&Click', 'CSV']}
                />
                <ToolCard
                  name="Data Miner (Chrome)"
                  description="Scraping con presets predefinidos. Extrae datos de LinkedIn, Instagram, Amazon fácilmente. También crea tus propios workflows."
                  url="https://www.dataminer.io"
                  category="scraping"
                  features={['Presets', 'Social', 'Custom']}
                />
                <ToolCard
                  name="Scraper Pro (Chrome)"
                  description="Extractor avanzado con selector XPath. Auto-pagination, pattern detection y scheduling de extracciones recurrentes."
                  url="https://www.scraperpro.com"
                  category="scraping"
                  features={['XPath', 'Pattern', 'Schedule']}
                />
                <ToolCard
                  name="Instant Data Scraper"
                  description="IA-powered extraction. Detecta tablas automáticamente con un clic. Sin configuración y exporta a Google Sheets directamente."
                  url="https://instantdscraper.com"
                  category="scraping"
                  features={['AI', 'Auto Table', 'Sheets']}
                />
                <ToolCard
                  name="Outwit Hub (Firefox/Chrome)"
                  description="Suite completa de extracción. Extractor de enlaces, imágenes, textos y metadatos. Exportación avanzada y debugging tools."
                  url="https://www.outwit.com"
                  category="scraping"
                  features={['Suite', 'Media', 'Debug']}
                />
                <ToolCard
                  name="Spider Scraper (Chrome)"
                  description="Crawler visual multi-página. Configura depth de crawling, filters por patrones y descarga toda una sección web."
                  url="https://spiderscraper.com"
                  category="scraping"
                  features={['Multi-page', 'Depth', 'Filter']}
                />
                <ToolCard
                  name="Browse AI (Chrome)"
                  description="Monitor web y scraper. Alertas cuando cambian datos específicos, historical tracking y extraction schedules automáticos."
                  url="https://www.browse.ai"
                  category="scraping"
                  features={['Monitor', 'Alerts', 'History']}
                />
                <ToolCard
                  name="Helium Scraper"
                  description="Extensión potente con chain builders. Encadena operaciones de extracción, transformation y export en workflows visuales."
                  url="https://www.heliumsystem.com"
                  category="scraping"
                  features={['Chains', 'Transform', 'Visual']}
                />
              </div>
              
              <div className="mt-4 p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
                <h4 className="font-semibold text-indigo-900 mb-2">💡 Tips para Extensiones:</h4>
                <ul className="space-y-1 text-sm text-indigo-800">
                  <li>• Ideales para extracciones puntuales sin programación</li>
                  <li>• Limitadas para tareas masivas o frecuente</li>
                  <li>• Algunos sitios pueden detectar extensiones de scraping</li>
                  <li>• No funcionan bien con contenido protegido por login complejo</li>
                  <li>• Para producción, migra a soluciones cloud o custom</li>
                </ul>
              </div>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* SERVICIOS SMTP */}
      <Collapsible open={openSections.smtpServices} onOpenChange={() => toggleSection('smtpServices')}>
        <Card className="border-purple-200 bg-gradient-to-br from-violet-50 via-white to-fuchsia-50">
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-purple-50/50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center shadow-lg">
                    <Server className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-purple-900">📡 Servicios SMTP Especializados</CardTitle>
                    <p className="text-sm text-purple-700">Maximiza la tasa de entrega y evita carpetas de spam</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="text-purple-600">
                  {openSections.smtpServices ? (
                    <>
                      <ChevronUp className="h-4 w-4 mr-1" />
                      Ocultar
                    </>
                  ) : (
                    <>
                      <ChevronDown className="h-4 w-4 mr-1" />
                      Ver
                    </>
                  )}
                </Button>
              </div>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-0">
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <ToolCard
                  name="SendGrid (Twilio)"
                  description="Líder en email delivery. API RESTful, webhooks en tiempo real, IP dedicated options y entregabilidad garantizada 99.99%."
                  url="https://sendgrid.com"
                  category="smtp"
                  features={['API', 'Webhooks', 'Dedicated IP']}
                />
                <ToolCard
                  name="Mailgun"
                  description="SMTP para desarrolladores. Routing rules avanzadas, email validation API, sandbox environments y logs detallados."
                  url="https://www.mailgun.com"
                  category="smtp"
                  features={['Dev-focused', 'Validation', 'Logs']}
                />
                <ToolCard
                  name="Amazon SES"
                  description="Servicio AWS escalable y económico. Intégración nativa con AWS ecosystem, pay-per-use y throughput ilimitado."
                  url="https://aws.amazon.com/ses"
                  category="smtp"
                  features={['AWS', 'Economy', 'Unlimited']}
                />
                <ToolCard
                  name="Postmark"
                  description="Especializado en transactional email. Entrega ultra-rápida (<1s), inbox guarantee y soporte excepcional 24/7."
                  url="https://postmarkapp.com"
                  category="smtp"
                  features={['Fast', 'Inbox Guarantee', 'Support']}
                />
                <ToolCard
                  name="SMTP2GO"
                  description="SMTP simple con dashboard powerful. Built-in signup forms, email testing y team collaboration tools."
                  url="https://www.smtp2go.com"
                  category="smtp"
                  features={['Simple', 'Forms', 'Team']}
                />
                <ToolCard
                  name="Elastic Email"
                  description="Plataforma budget-friendly. Unlimited emails plan, warm-up IP incluido y plugins para WordPress/Shopify."
                  url="https://elasticemail.com"
                  category="smtp"
                  features={['Budget', 'Warm-up', 'Plugins']}
                />
                <ToolCard
                  name="SocketLabs"
                  description="Servicio enterprise con reputation management. Advanced analytics, list hygiene automation y dedicated support."
                  url="https://www.socketlabs.com"
                  category="smtp"
                  features={['Enterprise', 'Reputation', 'Hygiene']}
                />
                <ToolCard
                  name="SparkPost"
                  description="Infraestructura de email a escala masiva. Real-time insights, predictive analytics y compliance features."
                  url="https://www.sparkpost.com"
                  category="smtp"
                  features={['Scale', 'Predictive', 'Compliance']}
                />
              </div>
              
              <div className="mt-4 p-4 bg-violet-50 border border-violet-200 rounded-lg">
                <h4 className="font-semibold text-violet-900 mb-2">💡 Configuración SMTP Esencial:</h4>
                <ul className="space-y-1 text-sm text-violet-800">
                  <li>• Configura SPF (Sender Policy Framework) para autenticación</li>
                  <li>• Implementa DKIM (DomainKeys Identified Mail) para firma digital</li>
                  <li>• Habilita DMARC para protección contra spoofing</li>
                  <li>• Warm-up gradual de nuevas IPs (100 → 1000 → 10000 emails/día)</li>
                  <li>• Monitorea bounce rates y elimina addresses inválidas regularmente</li>
                </ul>
              </div>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* ANALYTICS Y TRACKING */}
      <Collapsible open={openSections.analyticsTools} onOpenChange={() => toggleSection('analyticsTools')}>
        <Card className="border-purple-200 bg-gradient-to-br from-red-50 via-white to-rose-50">
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-purple-50/50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-red-500 to-rose-500 flex items-center justify-center shadow-lg">
                    <Brain className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-purple-900">📊 Analytics y Tracking</CardTitle>
                    <p className="text-sm text-purple-700">Medición avanzada y optimización basada en datos</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="text-purple-600">
                  {openSections.analyticsTools ? (
                    <>
                      <ChevronUp className="h-4 w-4 mr-1" />
                      Ocultar
                    </>
                  ) : (
                    <>
                      <ChevronDown className="h-4 w-4 mr-1" />
                      Ver
                    </>
                  )}
                </Button>
              </div>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-0">
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <ToolCard
                  name="Google Analytics 4"
                  description="Tracking completo de conversiones desde email. UTM parameters integration, funnel analysis y atribución multi-touch."
                  url="https://analytics.google.com"
                  category="analytics"
                  features={['UTM', 'Funnel', 'Attribution']}
                />
                <ToolCard
                  name="Mixpanel"
                  description="Product analytics con email correlation. User retention, cohort analysis y behavioral tracking avanzado."
                  url="https://mixpanel.com"
                  category="analytics"
                  features={['Retention', 'Cohorts', 'Behavior']}
                />
                <ToolCard
                  name="Hotjar Email Heatmaps"
                  description="Heatmaps de clicks en emails. Visualiza dónde hace click cada usuario y optimiza layouts basados en datos reales."
                  url="https://www.hotjar.com"
                  category="analytics"
                  features={['Heatmap', 'Clicks', 'Layout']}
                />
                <ToolCard
                  name="Ruler Analytics"
                  description="Revenue attribution desde primer touch. Connects email campaigns con actual revenue y ROI calculation preciso."
                  url="https://www.ruleranalytics.com"
                  category="analytics"
                  features={['Revenue', 'ROI', 'First-touch']}
                />
                <ToolCard
                  name="Optimizely A/B Testing"
                  description="Testing platform para subject lines y contenido. Multivariate testing, statistical significance y personalización dinámica."
                  url="https://www.optimizely.com"
                  category="analytics"
                  features={['A/B Test', 'Multivariate', 'Personalize']}
                />
                <ToolCard
                  name="Chart Mogul"
                  description="Analytics para SaaS email marketing. MRR tracking desde email campaigns, churn analysis y LTV prediction."
                  url="https://chartmogul.com"
                  category="analytics"
                  features={['SaaS', 'MRR', 'LTV']}
                />
              </div>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* DELIVERABILITY TOOLS */}
      <Collapsible open={openSections.deliverability} onOpenChange={() => toggleSection('deliverability')}>
        <Card className="border-purple-200 bg-gradient-to-br from-sky-50 via-white to-blue-50">
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-purple-50/50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-sky-500 to-blue-500 flex items-center justify-center shadow-lg">
                    <Rocket className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-purple-900">🚀 Deliverability Tools</CardTitle>
                    <p className="text-sm text-purple-700">Testea y mejora tu entregabilidad antes de enviar</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="text-purple-600">
                  {openSections.deliverability ? (
                    <>
                      <ChevronUp className="h-4 w-4 mr-1" />
                      Ocultar
                    </>
                  ) : (
                    <>
                      <ChevronDown className="h-4 w-4 mr-1" />
                      Ver
                    </>
                  )}
                </Button>
              </div>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-0">
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <ToolCard
                  name="Mail-Tester"
                  description="Test gratuito de deliverability. Score 1-10, detección de problemas de spam y recomendaciones específicas de corrección."
                  url="https://www.mail-tester.com"
                  category="deliverability"
                  features={['Free', 'Score', 'Fixes']}
                />
                <ToolCard
                  name="GlockApps"
                  description="Deliverability testing platform. Inbox placement testing, blacklist monitoring y spam folder analysis detallado."
                  url="https://glockapps.com"
                  category="deliverability"
                  features={['Placement', 'Blacklist', 'Spam Analysis']}
                />
                <ToolCard
                  name="Google Postmaster Tools"
                  description="Datos oficiales de Google sobre tu dominio. Spam rate, domain reputation y authentication status directamente de Gmail."
                  url="https://postmaster.google.com"
                  category="deliverability"
                  features={['Official', 'Gmail', 'Reputation']}
                />
                <ToolCard
                  name="Microsoft SNDS"
                  description="Smart Network Data Service de Microsoft. Reputation data para Outlook/Hotmail y feedback loop information."
                  url="https://sendersupport.olc.protection.outlook.com/snds/"
                  category="deliverability"
                  features={['Microsoft', 'Outlook', 'Feedback']}
                />
                <ToolCard
                  name="MXToolbox"
                  description="Suite completa de email diagnostics. DNS checks, blacklist monitoring, SMTP testing y health reports automáticos."
                  url="https://mxtoolbox.com"
                  category="deliverability"
                  features={['DNS', 'Check', 'Health']}
                />
                <ToolCard
                  name="250ok"
                  description="Enterprise deliverability monitoring. Inbox tracking, authentication monitoring y competitor benchmarking."
                  url="https://www.250ok.com"
                  category="deliverability"
                  features={['Enterprise', 'Track', 'Benchmark']}
                />
              </div>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* MEJORAS DE PRÁCTICAS */}
      <Collapsible open={openSections.bestPractices} onOpenChange={() => toggleSection('bestPractices')}>
        <Card className="border-purple-200 bg-gradient-to-br from-emerald-50 via-white to-teal-50">
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-purple-50/50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-purple-900">✨ Mejores Prácticas Essenciales</CardTitle>
                    <p className="text-sm text-purple-700">Guía definitiva para campañas de email marketing exitosas</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="text-purple-600">
                  {openSections.bestPractices ? (
                    <>
                      <ChevronUp className="h-4 w-4 mr-1" />
                      Ocultar
                    </>
                  ) : (
                    <>
                      <ChevronDown className="h-4 w-4 mr-1" />
                      Ver
                    </>
                  )}
                </Button>
              </div>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-0">
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-green-200 bg-white">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center text-green-800">
                      <CheckCircle2 className="h-5 w-5 mr-2" />
                      Personalización Avanzada
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">✓</span>
                        <span>Usa campos dinámicos: Nombre, ubicación, comportamiento previo</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">✓</span>
                        <span>Segmenta por interés, actividad y stage del customer journey</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">✓</span>
                        <span>Implementa sistemas de recompra para usuarios inactivos (win-back campaigns)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">✓</span>
                        <span>Dynamic content blocks basados en preferencias del usuario</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-blue-200 bg-white">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center text-blue-800">
                      <CheckCircle2 className="h-5 w-5 mr-2" />
                      Optimización de Entrega
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">✓</span>
                        <span>Configura SPF, DKIM y DMARC correctamente (imprescindible)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">✓</span>
                        <span>Realiza test de entrega antes de cada campaña masiva</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">✓</span>
                        <span>Monitorea bounce rates y limpia lista cada 3 meses</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">✓</span>
                        <span>Warm-up gradual de nuevas IPs (10 días mínimo)</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-purple-200 bg-white">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center text-purple-800">
                      <CheckCircle2 className="h-5 w-5 mr-2" />
                      Contenido y Timing
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2">✓</span>
                        <span>Subject lines óptimos: 6-10 palabras, máximo 50 caracteres</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2">✓</span>
                        <span>Hora óptima: Martes-Jueves 10am-2pm (testea según audiencia)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2">✓</span>
                        <span>Móvil-first design: 60%+ opens son en dispositivos móviles</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2">✓</span>
                        <span>Clear CTA único: Un solo objetivo principal por email</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-orange-200 bg-white">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center text-orange-800">
                      <CheckCircle2 className="h-5 w-5 mr-2" />
                      Medición y Análisis
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <span className="text-orange-600 mr-2">✓</span>
                        <span>Configura UTM parameters en todos los links (source=email)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-orange-600 mr-2">✓</span>
                        <span>A/B testing constante: subject line, sender name, CTA text</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-orange-600 mr-2">✓</span>
                        <span>KPIs principales: Open rate (&gt;20%), CTR (&gt;2.5%), Conversion (&gt;1%)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-orange-600 mr-2">✓</span>
                        <span>Analiza patterns de click-through para optimizar futuros emails</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-pink-200 bg-white">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center text-pink-800">
                      <CheckCircle2 className="h-5 w-5 mr-2" />
                      Automatización Recomendada
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <span className="text-pink-600 mr-2">✓</span>
                        <span>Welcome sequence: 3-5 emails en los primeros 14 días</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-pink-600 mr-2">✓</span>
                        <span>Degradado de engagement: Recompón usuarios inactive a los 30/60/90 días</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-pink-600 mr-2">✓</span>
                        <span>Abandoned cart recovery: 3-email flow en 24-48 horas</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-pink-600 mr-2">✓</span>
                        <span>Birthday/anniversary emails: Personalización máxima + oferta especial</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-cyan-200 bg-white">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center text-cyan-800">
                      <CheckCircle2 className="h-5 w-5 mr-2" />
                      Compliance y Legal
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <span className="text-cyan-600 mr-2">✓</span>
                        <span>GDPR: Consentimiento explícito requerido en EU</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-cyan-600 mr-2">✓</span>
                        <span>CAN-SPAM: Physical address required en footer</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-cyan-600 mr-2">✓</span>
                        <span>Unsubscribe link visible y funcional en todos los emails</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-cyan-600 mr-2">✓</span>
                        <span>Double opt-in recommended para mejor calidad de lista</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Stats destacadas */}
              <div className="mt-6 p-6 bg-gradient-to-r from-purple-50 via-pink-50 to-red-50 rounded-xl border-2 border-purple-200">
                <h4 className="font-bold text-purple-900 mb-4 text-center">📈 Benchmarks de la Industria (2024)</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-3xl font-bold text-purple-600">21.5%</div>
                    <div className="text-sm text-purple-700">Open Rate Avg</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-pink-600">2.6%</div>
                    <div className="text-sm text-pink-700">CTR Avg</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-red-600">0.15%</div>
                    <div className="text-sm text-red-700">Conversion</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-orange-600">&lt;0.1%</div>
                    <div className="text-sm text-orange-700">Bounce Rate</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* CTA Final */}
      <div className="text-center py-8">
        <div className="inline-block p-6 rounded-2xl bg-gradient-to-br from-purple-50 via-pink-50 to-red-50 border-2 border-purple-200">
          <p className="text-lg font-semibold text-purple-900 mb-2">
            🚀 ¿Listo para implementar tu estrategia de Email Marketing?
          </p>
          <p className="text-sm text-purple-700">
            Comienza con una herramienta de cada categoría y construye tu stack personalizado de email marketing profesional.
          </p>
        </div>
      </div>
    </div>
  );
}

// Import necessary component
import { CheckCircle2 } from 'lucide-react';
