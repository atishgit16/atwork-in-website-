import { useReveal } from '../hooks/useReveal'

// Simple SVG icons
const LocationIcon = () => (
  <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
)

const ClockIcon = () => (
  <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const CodeIcon = () => (
  <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
  </svg>
)

// ---------- Open positions data ----------
const positions = [
  {
    title: 'Senior React Developer',
    location: 'Bengaluru, India',
    type: 'Full-time',
    description: 'Build complex front‑end applications with React, Next.js, and Tailwind CSS.',
  },
  {
    title: 'Cloud DevOps Engineer',
    location: 'Remote',
    type: 'Full-time',
    description: 'Design and manage CI/CD pipelines, Kubernetes clusters, and cloud infrastructure on AWS/Azure/GCP.',
  },
  {
    title: 'AI/ML Engineer',
    location: 'Bengaluru, India',
    type: 'Full-time',
    description: 'Develop NLP and computer vision models, and deploy them into production.',
  },
  {
    title: 'UI/UX Designer',
    location: 'Remote',
    type: 'Contract',
    description: 'Create user‑centered designs, wireframes, and prototypes for web and mobile apps.',
  },
  {
    title: 'Cybersecurity Analyst',
    location: 'Bengaluru, India',
    type: 'Full-time',
    description: 'Perform vulnerability assessments, penetration testing, and SOC monitoring.',
  },
]

// ---------- Benefits data ----------
const benefits = [
  { title: 'Flexible Hours', desc: 'Work when you’re most productive.' },
  { title: 'Remote Friendly', desc: 'Work from anywhere in India.' },
  { title: 'Health Insurance', desc: 'Comprehensive medical coverage.' },
  { title: 'Learning Budget', desc: 'Annual budget for courses & conferences.' },
  { title: 'Gym & Wellness', desc: 'Free gym membership and wellness programs.'},
  { title: 'Team Retreats', desc: 'Annual off‑sites and team outings.' },
]

// ---------- Reveal wrapper ----------
function Reveal({ children, className = '' }) {
  const ref = useReveal()
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>
}

export default function Careers() {
  return (
    <div className="bg-[#0f0b29] text-white overflow-x-hidden bg-grid min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <Reveal>
          <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-4 bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent">
            Join Our Team
          </h1>
          <p className="text-gray-400 text-center max-w-2xl mx-auto mb-16">
            We’re looking for passionate technologists who want to build the future. Come work with us and make an impact.
          </p>
        </Reveal>

        {/* Open Positions */}
        <Reveal className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">Open Positions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {positions.map((pos, idx) => (
              <div key={idx} className="glass-card p-6 rounded-2xl flex flex-col hover:border-cyan-400 transition-colors group">
                <h3 className="text-xl font-semibold text-white mb-2">{pos.title}</h3>
                <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                  <span className="flex items-center gap-1">
                    <LocationIcon /> {pos.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <ClockIcon /> {pos.type}
                  </span>
                </div>
                <p className="text-gray-400 flex-grow mb-6">{pos.description}</p>
                <a
                  href="mailto:careers@atwork-in.com?subject=Application for {pos.title}"
                  className="w-full py-2.5 bg-gradient-to-r from-cyan-500 to-fuchsia-600 rounded-xl font-semibold text-white text-center hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
                >
                  Apply Now
                </a>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Benefits */}
        <Reveal>
          <h2 className="text-3xl font-bold text-center mb-12 text-white">Why Work With Us</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="glass-card p-6 rounded-2xl text-center hover:border-cyan-400 transition-colors">
                <div className="text-3xl mb-3">{benefit.icon}</div>
                <h3 className="font-semibold text-white mb-1">{benefit.title}</h3>
                <p className="text-gray-400 text-sm">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* CTA */}
        <Reveal className="mt-20 text-center">
          <h2 className="text-3xl font-bold mb-6">Don’t see the right role?</h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            We’re always looking for talented people. Send your resume and tell us how you can make a difference.
          </p>
          <a
            href="mailto:careers@atwork-in.com"
            className="inline-block px-8 py-3.5 font-semibold text-white bg-gradient-to-r from-cyan-500 to-fuchsia-600 rounded-xl transition-all hover:scale-105 glow"
          >
            Send an Open Application
          </a>
        </Reveal>
      </div>
    </div>
  )
}