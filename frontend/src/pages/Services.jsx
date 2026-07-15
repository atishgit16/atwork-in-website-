import { useState } from 'react'
import { useReveal } from '../hooks/useReveal'

// ---------- SVG Icons ----------
const CodeIcon = () => (
  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
  </svg>
)
const CloudIcon = () => (
  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
  </svg>
)
const PsychologyIcon = () => (
  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
)
const SecurityIcon = () => (
  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
)
const SupportAgentIcon = () => (
  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636a9 9 0 010 12.728M5.636 5.636a9 9 0 000 12.728M8.93 8.93a4.5 4.5 0 010 6.364m6.14-6.14a4.5 4.5 0 010 6.364M12 18v.01" />
  </svg>
)
const DesignServicesIcon = () => (
  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
  </svg>
)
const WebIcon = () => (
  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
  </svg>
)
const StorageIcon = () => (
  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
  </svg>
)
const SmartToyIcon = () => (
  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0 4c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 4c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-4 2c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm8-2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zM8 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm8 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
  </svg>
)
const BugReportIcon = () => (
  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

// Icon mapping
const iconMap = {
  code: <CodeIcon />,
  cloud: <CloudIcon />,
  psychology: <PsychologyIcon />,
  security: <SecurityIcon />,
  support: <SupportAgentIcon />,
  design: <DesignServicesIcon />,
  web: <WebIcon />,
  storage: <StorageIcon />,
  smarttoy: <SmartToyIcon />,
  bugreport: <BugReportIcon />,
}

// Service data
const allServices = [
  {
    category: 'development',
    title: 'Custom Software Development',
    description: 'End‑to‑end web, mobile, and desktop application development using modern stacks like React, Node.js, and Flutter.',
    icon: 'code',
    tags: ['Web', 'Mobile', 'Desktop', 'APIs'],
  },
  {
    category: 'cloud',
    title: 'Cloud & DevOps Consulting',
    description: 'Cloud migration, CI/CD pipelines, infrastructure as code, and 24/7 monitoring with AWS, Azure, GCP.',
    icon: 'cloud',
    tags: ['AWS', 'Azure', 'GCP', 'Kubernetes'],
  },
  {
    category: 'ai',
    title: 'AI & Machine Learning',
    description: 'Natural language processing, computer vision, chatbots, and predictive analytics to automate and elevate your business.',
    icon: 'psychology',
    tags: ['NLP', 'Computer Vision', 'Chatbots', 'ML Models'],
  },
  {
    category: 'security',
    title: 'Cybersecurity Services',
    description: 'Penetration testing, vulnerability assessments, SOC setup, and compliance with ISO 27001, GDPR, HIPAA.',
    icon: 'security',
    tags: ['Pen Testing', 'SOC', 'Compliance'],
  },
  {
    category: 'support',
    title: 'IT Support & Managed Services',
    description: 'Helpdesk support, server management, network monitoring, and SLA‑driven support to keep your operations running.',
    icon: 'support',
    tags: ['24/7 Helpdesk', 'Monitoring', 'Backup'],
  },
  {
    category: 'design',
    title: 'UI/UX Design',
    description: 'User research, wireframing, prototyping, and pixel‑perfect interface design that delights users.',
    icon: 'design',
    tags: ['Figma', 'Prototyping', 'User Research'],
  },
  {
    category: 'development',
    title: 'Web Application Development',
    description: 'Progressive web apps, single‑page applications, and e‑commerce platforms built with React and Next.js.',
    icon: 'web',
    tags: ['React', 'Next.js', 'PWA'],
  },
  {
    category: 'cloud',
    title: 'Data & Storage Solutions',
    description: 'Scalable database design, data lakes, and cloud storage architectures for high availability.',
    icon: 'storage',
    tags: ['AWS S3', 'BigQuery', 'NoSQL'],
  },
  {
    category: 'ai',
    title: 'AI Chatbots & Conversational AI',
    description: 'Custom chatbot development using NLP and LLMs to automate customer support and lead generation.',
    icon: 'smarttoy',
    tags: ['Rasa', 'Dialogflow', 'LLM'],
  },
  {
    category: 'security',
    title: 'Vulnerability Assessment',
    description: 'Comprehensive security audits and penetration testing to identify and fix weaknesses.',
    icon: 'bugreport',
    tags: ['VAPT', 'Audit', 'Forensics'],
  },
]

const categories = [
  { key: 'all', label: 'All Services' },
  { key: 'development', label: 'Development' },
  { key: 'cloud', label: 'Cloud & DevOps' },
  { key: 'ai', label: 'AI & ML' },
  { key: 'security', label: 'Cybersecurity' },
  { key: 'support', label: 'Support' },
  { key: 'design', label: 'Design' },
]

// Reveal wrapper
function Reveal({ children, className = '' }) {
  const ref = useReveal()
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>
}

function ServiceCard({ icon, title, description, tags }) {
  return (
    <div className="glass-card card-3d p-8 rounded-2xl h-full flex flex-col">
      <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-cyan-400 to-fuchsia-500 flex items-center justify-center text-white mb-6 shadow-lg shadow-cyan-500/25">
        {iconMap[icon] || <CodeIcon />}
      </div>
      <h3 className="text-2xl font-semibold mb-3 text-white">{title}</h3>
      <p className="text-gray-400 flex-grow mb-4">{description}</p>
      <div className="flex flex-wrap gap-2 mt-auto">
        {tags.map(tag => (
          <span
            key={tag}
            className="px-3 py-1 text-xs rounded-full bg-white/5 border border-white/10 text-gray-300"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Services() {
  const [activeTab, setActiveTab] = useState('all')

  const filteredServices =
    activeTab === 'all'
      ? allServices
      : allServices.filter(s => s.category === activeTab)

  return (
    <div className="bg-[#0f0b29] text-white overflow-x-hidden bg-grid min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <Reveal>
          <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-4 bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent">
            Our Services
          </h1>
          <p className="text-gray-400 text-center max-w-2xl mx-auto mb-16">
            From strategy to execution, we offer end‑to‑end technology services to accelerate your business.
          </p>
        </Reveal>

        {/* Tabs */}
        <Reveal className="mb-12">
          <div className="flex justify-center overflow-x-auto pb-2 gap-2">
            {categories.map(cat => (
              <button
                key={cat.key}
                onClick={() => setActiveTab(cat.key)}
                className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                  activeTab === cat.key
                    ? 'bg-gradient-to-r from-cyan-500 to-fuchsia-600 text-white shadow-lg'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service, idx) => (
            <ServiceCard key={idx} {...service} />
          ))}
        </div>
      </div>
    </div>
  )
}