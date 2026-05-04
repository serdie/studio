'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, ExternalLink } from 'lucide-react';

interface ExtLink { title: string; url: string; description: string; tags: string[]; }

const links: ExtLink[] = [
  { title: 'Kaggle Learn - Cursos gratuitos de ML', url: 'https://www.kaggle.com/learn', description: 'Microcursos prácticos de ML, Python, pandas, feature engineering y más. Ideal para proyectos integradores.', tags: ['Cursos', 'Gratuito', 'Práctico'] },
  { title: 'Google Colab', url: 'https://colab.research.google.com', description: 'Entorno gratuito de Jupyter notebooks con GPU. Perfecto para prototipar modelos de IA sin configuración.', tags: ['Herramienta', 'GPU Gratis', 'Notebooks'] },
  { title: 'Hugging Face', url: 'https://huggingface.co', description: 'Repositorio de modelos de IA pre-entrenados, datasets y spaces para desplegar demos.', tags: ['Modelos', 'Datasets', 'Deploy'] },
  { title: 'MLflow - Experiment Tracking', url: 'https://mlflow.org', description: 'Plataforma open source para tracking de experimentos, reproducibilidad y despliegue de modelos ML.', tags: ['MLOps', 'Tracking', 'Open Source'] },
  { title: 'Weights & Biases', url: 'https://wandb.ai', description: 'Plataforma de MLOps para visualizar experimentos, comparar modelos y colaborar en equipo.', tags: ['MLOps', 'Visualización', 'Colaboración'] },
  { title: 'Streamlit - Apps de datos', url: 'https://streamlit.io', description: 'Framework Python para crear aplicaciones web interactivas de ML en minutos. Ideal para demos de proyecto.', tags: ['Herramienta', 'Python', 'Demos'] },
  { title: 'GitHub - Awesome Machine Learning', url: 'https://github.com/josephmisiti/awesome-machine-learning', description: 'Lista curada de frameworks, librerías y software de ML organizados por lenguaje.', tags: ['Recursos', 'GitHub', 'Curación'] },
  { title: 'Papers with Code', url: 'https://paperswithcode.com', description: 'Papers de investigación con implementaciones de código. Benchmarks y state-of-the-art por tarea.', tags: ['Investigación', 'Código', 'SOTA'] },
  { title: 'Google AI Studio', url: 'https://aistudio.google.com', description: 'Plataforma de Google para experimentar con modelos Gemini, crear prompts y prototipar aplicaciones de IA generativa.', tags: ['Gemini', 'Prototipar', 'Gratuito'] },
  { title: 'Vercel - Deploy de aplicaciones', url: 'https://vercel.com', description: 'Plataforma para desplegar aplicaciones web y APIs. Ideal para presentar proyectos con interfaz web.', tags: ['Deploy', 'Web', 'Gratuito'] },
  { title: 'Notion - Documentación de proyectos', url: 'https://www.notion.so', description: 'Herramienta de documentación colaborativa ideal para organizar la documentación del proyecto integrador.', tags: ['Documentación', 'Colaboración', 'Gratis'] },
  { title: 'Miro - Diagramas y planificación visual', url: 'https://miro.com', description: 'Pizarra digital colaborativa para diagramas de arquitectura, flujos CRISP-DM y planning de sprints.', tags: ['Planificación', 'Diagramas', 'Visual'] },
];

export default function Module9ExternalLinks() {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-4">
      <Card className="border-orange-200 bg-gradient-to-br from-orange-50 via-amber-50 to-white cursor-pointer" onClick={() => setOpen(!open)}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center shadow-lg">
                <ExternalLink className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-orange-900">Enlaces Externos - Módulo 9</h3>
                <p className="text-sm text-orange-700">{open ? '12 herramientas y recursos para proyectos de IA' : 'Plataformas, herramientas de MLOps y recursos para tu proyecto — Haz clic para ver'}</p>
              </div>
            </div>
            <ChevronDown className={`h-6 w-6 text-orange-700 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
          </div>
        </CardContent>
      </Card>
      {open && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 animate-in slide-in-from-top-2 duration-300">
          {links.map(link => (
            <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer" className="group block p-4 rounded-xl bg-white border-2 border-orange-200 hover:border-orange-400 hover:shadow-lg transition-all">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-bold text-orange-900 group-hover:text-orange-600 text-sm">{link.title}</h4>
                <ExternalLink className="h-4 w-4 text-orange-400 group-hover:text-orange-600 flex-shrink-0 ml-2" />
              </div>
              <p className="text-xs text-orange-700 mb-2">{link.description}</p>
              <div className="flex flex-wrap gap-1">
                {link.tags.map(tag => (<Badge key={tag} variant="outline" className="text-xs bg-orange-50 text-orange-700 border-orange-200">{tag}</Badge>))}
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
