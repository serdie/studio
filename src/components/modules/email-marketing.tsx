'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Separator } from '@/components/ui/separator';
import { Mail, Zap, Search, Server, Rocket, Brain, Palette, Globe, Code, Database } from 'lucide-react';
import { useState } from 'react';

// Componente para herramientas individuales
interface ToolCardProps {
  name: string;
  description: string;
  url: string;
  category: 'email' | 'design' | 'scraping' | 'smtp';
}

function ToolCard({ name, description, url, category }: ToolCardProps) {
  const getCategoryIcon = () => {
    switch (category) {
      case 'email': return <Mail className="h-5 w-5" />;
      case 'design': return <Palette className="h-5 w-5" />;
      case 'scraping': return <Search className="h-5 w-5" />;
      case 'smtp': return <Server className="h-5 w-5" />;
      default: return null;
    }
  };

  return (
    <Card className="border-slate-200 hover:border-purple-300 hover:shadow-md transition-all">
      <CardHeader className="flex flex-row items-center justify-between space-x-4">
        <div className="flex items-center space-x-3">
          <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
            category === 'email' ? 'bg-blue-100 text-blue-600' :
            category === 'design' ? 'bg-pink-100 text-pink-600' :
            category === 'scraping' ? 'bg-green-100 text-green-600' :
            'bg-purple-100 text-purple-600'
          }`}>{getCategoryIcon()}</div>
          <CardTitle className="text-lg text-slate-900">{name}</CardTitle>
        </div>
        <Button variant="outline" size="sm" className="text-purple-600 border-purple-200">
          <a href={url} target="_blank" rel="noopener noreferrer" className="flex items-center">
            Visitar <ExternalLink className="ml-1 h-4 w-4" />
          </a>
        </Button>
      </CardHeader>
      <CardContent>
        <p className="text-slate-600 mb-4">{description}</p>
        <div className="flex flex-wrap gap-2">
          {category === 'email' && (
            <Badge variant="outline" className="border-blue-200 text-blue-700 bg-blue-50">Plataforma Email</Badge>
          )}
          {category === 'design' && (
            <Badge variant="outline" className="border-pink-200 text-pink-700 bg-pink-50">Diseño Newsletter</Badge>
          )}
          {category === 'scraping' && (
            <Badge variant="outline" className="border-green-200 text-green-700 bg-green-50">Scraping</Badge>
          )}
          {category === 'smtp' && (
            <Badge variant="outline" className="border-purple-200 text-purple-700 bg-purple-50">SMTP</Badge>
          )}
          {name.includes('AI') && (
            <Badge variant="outline" className="border-amber-200 text-amber-700 bg-amber-50">AI</Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// Componente principal de Email Marketing
export default function EmailMarketingSection() {
  const [openSections, setOpenSections] = useState({
    emailPlatforms: true,
    designTools: true,
    scrapingTools: true,
    smtpServices: true,
    bestPractices: true
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({...prev, [section]: !prev[section]}));
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
          Descubre las herramientas esenciales para crear, gestionar y optimizar campañas de email marketing de alto rendimiento.
        </p>
      </div>

      {/* Email Marketing Platforms */}
      <Collapsible open={openSections.emailPlatforms} onOpenChange={() => toggleSection('emailPlatforms')}>
        <Card className="border-purple-200 bg-gradient-to-br from-purple-50 via-pink-50 to-white">
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-purple-50/50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center">
                    <Mail className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg text-purple-900">Plataformas de Email Marketing</CardTitle>
                    <p className="text-sm text-purple-700">Herramientas para gestión y envío de campañas</p>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ToolCard
                  name="Mailchimp"
                  description="Plataforma líder para email marketing con automatización avanzada, análisis detallados y diseño de newsletters."
                  url="https://mailchimp.com"
                  category="email"
                />
                <ToolCard
                  name="SendBlaster"
                  description="Herramienta profesional para email marketing con soporte para grandes volúmenes de correos y segmentación avanzada."
                  url="https://www.sendblaster.com"
                  category="email"
                />
                <ToolCard
                  name="HubSpot Marketing Hub"
                  description="Plataforma todo en uno que incluye CRM, automatización de marketing y análisis avanzados para campañas de email."
                  url="https://www.hubspot.com/marketing-hub"
                  category="email"
                />
                <ToolCard
                  name="ActiveCampaign"
                  description="Solución de marketing automatizado con IA para personalizar campañas y mejorar la tasa de conversión."
                  url="https://www.activecampaign.com"
                  category="email"
                />
                <ToolCard
                  name="ConvertKit"
                  description="Plataforma especializada en creadores de contenido con automatización y segmentación avanzada."
                  url="https://convertkit.com"
                  category="email"
                />
                <ToolCard
                  name="Brevo (ex-Sendinblue)"
                  description="Herramienta versátil para email marketing con automatización y gestión de SMS."
                  url="https://www.brevo.com"
                  category="email"
                />
              </div>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* Newsletter Design Tools */}
      <Collapsible open={openSections.designTools} onOpenChange={() => toggleSection('designTools')}>
        <Card className="border-purple-200 bg-gradient-to-br from-purple-50 via-pink-50 to-white">
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-purple-50/50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-pink-100 flex items-center justify-center">
                    <Palette className="h-5 w-5 text-pink-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg text-purple-900">Diseño de Newsletters</CardTitle>
                    <p className="text-sm text-purple-700">Herramientas para crear diseños profesionales</p>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ToolCard
                  name="Canva (Plantillas AI)"
                  description="Diseña newsletters con plantillas profesionales y asistente de IA para generar contenido visual."
                  url="https://www.canva.com"
                  category="design"
                />
                <ToolCard
                  name="Stripo"
                  description="Editor de email marketing con más de 100 plantillas profesionales y compatibilidad con todas las plataformas."
                  url="https://www.stripo.email"
                  category="design"
                />
                <ToolCard
                  name="BeeFree"
                  description="Editor visual para crear newsletters responsivas sin código."
                  url="https://beefree.io"
                  category="design"
                />
                <ToolCard
                  name="Designmodo"
                  description="Herramienta avanzada para diseñar newsletters con soporte para AMP4Email."
                  url="https://www.designmodo.com"
                  category="design"
                />
                <ToolCard
                  name="Mailchimp AI Designer"
                  description="Asistente de IA que genera diseños de newsletters basados en tus preferencias."
                  url="https://mailchimp.com/features/ai-designer"
                  category="design"
                />
                <ToolCard
                  name="Chamaileon"
                  description="Plataforma de diseño colaborativo para newsletters con integración de CMS."
                  url="https://chamaileon.io"
                  category="design"
                />
              </div>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* Web Scraping Tools */}
      <Collapsible open={openSections.scrapingTools} onOpenChange={() => toggleSection('scrapingTools')}>
        <Card className="border-purple-200 bg-gradient-to-br from-purple-50 via-pink-50 to-white">
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-purple-50/50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center">
                    <Search className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg text-purple-900">Herramientas de Scraping</CardTitle>
                    <p className="text-sm text-purple-700">Recopila datos para segmentación y personalización</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="text-purple-600">
                  {openSections.scrapingTools ? (
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ToolCard
                  name="Octoparse (Nube)"
                  description="Herramienta en la nube para scraping sin código con programación de tareas."
                  url="https://www.octoparse.com"
                  category="scraping"
                />
                <ToolCard
                  name="Scrapy (Local)"
                  description="Framework de código abierto para scraping avanzado en Python."
                  url="https://scrapy.org"
                  category="scraping"
                />
                <ToolCard
                  name="ParseHub (Nube)"
                  description="Plataforma en la nube para scraping de sitios complejos y dinámicos."
                  url="https://www.parsehub.com"
                  category="scraping"
                />
                <ToolCard
                  name="Web Scraper (Extensión)"
                  description="Extensión para Chrome que permite crear rastreadores sin código."
                  url="https://webscraper.io"
                  category="scraping"
                />
                <ToolCard
                  name="Bright Data (Nube)"
                  description="Plataforma profesional para scraping a gran escala con proxy y API."
                  url="https://brightdata.com"
                  category="scraping"
                />
                <ToolCard
                  name="Apify (Nube)"
                  description="Plataforma de scraping y automatización con biblioteca de actores preconstruidos."
                  url="https://apify.com"
                  category="scraping"
                />
              </div>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* SMTP Services */}
      <Collapsible open={openSections.smtpServices} onOpenChange={() => toggleSection('smtpServices')}>
        <Card className="border-purple-200 bg-gradient-to-br from-purple-50 via-pink-50 to-white">
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-purple-50/50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center">
                    <Server className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg text-purple-900">Servicios SMTP</CardTitle>
                    <p className="text-sm text-purple-700">Maximiza la entrega y evita el spam</p>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ToolCard
                  name="SendGrid"
                  description="Servicio SMTP de Twilio con API para envío transaccional y marketing."
                  url="https://sendgrid.com"
                  category="smtp"
                />
                <ToolCard
                  name="Mailgun"
                  description="Plataforma SMTP para envío de correos con análisis detallados y gestión de rebotes."
                  url="https://www.mailgun.com"
                  category="smtp"
                />
                <ToolCard
                  name="Amazon SES"
                  description="Servicio de correo electrónico escalable y rentable de AWS."
                  url="https://aws.amazon.com/ses"
                  category="smtp"
                />
                <ToolCard
                  name="Postmark"
                  description="Servicio SMTP especializado en correos transaccionales con alta tasa de entrega."
                  url="https://postmarkapp.com"
                  category="smtp"
                />
                <ToolCard
                  name="SMTP2GO"
                  description="Servicio SMTP con integración para múltiples plataformas y gestión de colas."
                  url="https://www.smtp2go.com"
                  category="smtp"
                />
                <ToolCard
                  name="Elastic Email"
                  description="Plataforma de envío de correos con opciones para marketing y transaccionales."
                  url="https://elasticemail.com"
                  category="smtp"
                />
              </div>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* Best Practices */}
      <Collapsible open={openSections.bestPractices} onOpenChange={() => toggleSection('bestPractices')}>
        <Card className="border-purple-200 bg-gradient-to-br from-purple-50 via-pink-50 to-white">
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-purple-50/50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-amber-100 flex items-center justify-center">
                    <Rocket className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg text-purple-900">Buenas Prácticas</CardTitle>
                    <p className="text-sm text-purple-700">Consejos esenciales para campañas exitosas</p>
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
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <CheckCircle2 className="h-5 w-5 mr-2 text-green-600" />
                      Personalización Avanzada
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-500 mt-1 flex-shrink-0" />
                        <span>Usa campos dinámicos para personalizar el contenido según el comportamiento del usuario</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-500 mt-1 flex-shrink-0" />
                        <span>Segmenta tu lista por interés, ubicación y comportamiento de apertura</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-500 mt-1 flex-shrink-0" />
                        <span>Implementa sistemas de recompra para usuarios inactivos</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <CheckCircle2 className="h-5 w-5 mr-2 text-green-600" />
                      Optimización de Entrega
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-500 mt-1 flex-shrink-0" />
                        <span>Verifica dominios y usa SPF, DKIM y DMARC para autenticación</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-500 mt-1 flex-shrink-0" />
                        <span>Realiza pruebas de entrega en diferentes proveedores de correo</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-500 mt-1 flex-shrink-0" />
                        <span>Monitorea tasas de rebote y limpia tu lista regularmente</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <CheckCircle2 className="h-5 w-5 mr-2 text-green-600" />
                      Contenido y Timing
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-500 mt-1 flex-shrink-0" />
                        <span>Prueba diferentes horarios de envío para maximizar aperturas</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-500 mt-1 flex-shrink-0" />
                        <span>Crea contenidos con valor para mejorar la tasa de conversión</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-500 mt-1 flex-shrink-0" />
                        <span>Usa subject lines cortos y atractivos (5-7 palabras)</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <CheckCircle2 className="h-5 w-5 mr-2 text-green-600" />
                      Medición y Análisis
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-500 mt-1 flex-shrink-0" />
                        <span>Configura UTM parameters para seguimiento en Google Analytics</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-500 mt-1 flex-shrink-0" />
                        <span>Analiza patrones de click-through para optimizar futuras campañas</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-500 mt-1 flex-shrink-0" />
                        <span>Realiza A/B testing en elementos clave (subject lines, CTA, contenido)</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* CTA Final */}
      <div className="text-center py-8">
        <div className="inline-block p-6 rounded-2xl bg-gradient-to-br from-purple-50 via-pink-50 to-red-50 border-2 border-purple-200">
          <p className="text-lg font-semibold text-purple-900 mb-2">
            🚀 ¿Listo para implementar?
          </p>
          <p className="text-sm text-purple-700">
            Comienza con una herramienta de cada categoría y construye tu stack de email marketing personalizado.
          </p>
        </div>
      </div>
    </div>
  );
}