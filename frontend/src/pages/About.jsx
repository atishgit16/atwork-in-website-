import { useState, useEffect } from 'react'
import { useReveal } from '../hooks/useReveal'

// ---------- SVG Icons ----------
const CodeIcon = () => (
  <svg className="w-12 h-12 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
  </svg>
)
const CloudIcon = () => (
  <svg className="w-12 h-12 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
  </svg>
)
const PsychologyIcon = () => (
  <svg className="w-12 h-12 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
)
const SecurityIcon = () => (
  <svg className="w-12 h-12 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
)
const GroupsIcon = () => (
  <svg className="w-12 h-12 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
)
const FormatQuoteIcon = () => (
  <svg className="w-10 h-10 text-cyan-500/30" fill="currentColor" viewBox="0 0 24 24">
    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10H0z" />
  </svg>
)

// ---------- Animated Counter (reused) ----------
function AnimatedCounter({ end, suffix, label, icon }) {
  const [count, setCount] = useState(0)
  const ref = useReveal()

  useEffect(() => {
    let start = 0
    if (!ref.current) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const duration = 2000
          const increment = end / (duration / 16)
          const timer = setInterval(() => {
            start += increment
            if (start >= end) {
              setCount(end)
              clearInterval(timer)
            } else {
              setCount(Math.ceil(start))
            }
          }, 16)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [end])

  return (
    <div ref={ref} className="reveal text-center py-8">
      <div className="mb-3 flex justify-center">{icon}</div>
      <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent mb-2">
        {count}{suffix}
      </div>
      <div className="text-gray-400">{label}</div>
    </div>
  )
}

// ---------- Team Card ----------
function TeamCard({ name, role, initials }) {
  return (
    <div className="glass-card p-6 rounded-2xl text-center hover:border-cyan-400 transition-colors duration-300 group">
      <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-cyan-500/25">
        {initials}
      </div>
      <h3 className="text-xl font-semibold text-white">{name}</h3>
      <p className="text-gray-400">{role}</p>
    </div>
  )
}

// ---------- Testimonials Slider ----------
const testimonials = [
  {
    quote: 'Atwork-in transformed our legacy system into a modern cloud‑native app. The team was incredibly professional and delivered ahead of schedule.',
    author: 'Priya Sharma, CTO of FinLeap',
  },
  {
    quote: 'Their AI chatbot reduced our support tickets by 40% within weeks. Highly recommended for any AI project.',
    author: 'Arjun Mehta, VP Engineering',
  },
  {
    quote: 'We’ve been working with Atwork-in for three years. Their managed IT services let us focus on our core business without worrying about tech.',
    author: 'Sneha Iyer, Head of IT, MedLife',
  },
]

function TestimonialSlider() {
  const [active, setActive] = useState(0)
  const ref = useReveal()

  const prev = () => setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  const next = () => setActive((prev) => (prev + 1) % testimonials.length)

  return (
    <div ref={ref} className="reveal max-w-3xl mx-auto mt-16">
      <h2 className="text-3xl font-bold text-center mb-8 text-white">What Clients Say</h2>
      <div className="flex items-center gap-4">
        <button onClick={prev} className="text-gray-400 hover:text-white transition">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="flex-1">
          <div className="glass-card p-8 rounded-2xl text-center relative">
            <FormatQuoteIcon />
            <p className="text-gray-300 italic mt-2 leading-relaxed">“{testimonials[active].quote}”</p>
            <p className="text-cyan-400 font-semibold mt-4">— {testimonials[active].author}</p>
          </div>
        </div>
        <button onClick={next} className="text-gray-400 hover:text-white transition">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  )
}

// ---------- Timeline ----------
const milestones = [
  { year: '2018', text: 'Atwork-in founded in Bengaluru with a team of 3.' },
  { year: '2019', text: 'First enterprise client – a leading fintech unicorn.' },
  { year: '2020', text: 'Expanded to AI/ML services and grew to 30 employees.' },
  { year: '2021', text: 'Opened US office, achieved ISO 27001 certification.' },
  { year: '2023', text: 'Reached 120+ employees and 150 clients globally.' },
  { year: '2025', text: 'Launched proprietary AI chatbot platform and entered cloud consulting.' },
]

function SimpleTimeline() {
  const ref = useReveal()
  return (
    <div ref={ref} className="reveal mt-20">
      <h2 className="text-3xl font-bold text-center mb-12 text-white">Our Journey</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {milestones.map((item, idx) => (
          <div key={idx} className="glass-card p-6 rounded-2xl hover:border-cyan-400 transition-colors">
            <div className="text-cyan-400 font-bold text-xl mb-2">{item.year}</div>
            <p className="text-gray-400">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// ---------- Reveal wrapper ----------
function Reveal({ children, className = '' }) {
  const ref = useReveal()
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>
}

// ---------- Main About Component ----------
export default function About() {
  const team = [
    { name: 'Rajesh Kumar', role: 'CEO & Co‑founder', initials: 'RK' },
    { name: 'Ananya Sharma', role: 'CTO', initials: 'AS' },
    { name: 'Vikram Patel', role: 'Head of Design', initials: 'VP' },
    { name: 'Priya Menon', role: 'Delivery Manager', initials: 'PM' },
    { name: 'Arjun Mehta', role: 'Lead AI Engineer', initials: 'AM' },
    { name: 'Sneha Iyer', role: 'Head of Cybersecurity', initials: 'SI' },
  ]

  const stats = [
    { icon: <GroupsIcon />, end: 150, suffix: '+', label: 'Happy Clients' },
    { icon: <CodeIcon />, end: 350, suffix: '+', label: 'Projects Delivered' },
    { icon: <CloudIcon />, end: 12, suffix: '', label: 'Years Experience' },
    { icon: <SecurityIcon />, end: 99, suffix: '%', label: 'Client Retention' },
  ]

  return (
    <div className="bg-[#0f0b29] text-white overflow-x-hidden bg-grid min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Hero */}
        <Reveal>
          <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-4 bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent">
            About Atwork‑in
          </h1>
          <p className="text-gray-400 text-center max-w-2xl mx-auto mb-16">
            We are a passionate team of technologists dedicated to delivering future‑ready IT solutions. From startups to Fortune 500 companies, we help organizations innovate, scale, and secure their digital landscape.
          </p>
        </Reveal>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, idx) => (
            <AnimatedCounter key={idx} {...stat} />
          ))}
        </div>

        <hr className="border-white/5 my-16" />

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Reveal>
            <div className="glass-card p-8 rounded-2xl h-full">
              <PsychologyIcon />
              <h3 className="text-2xl font-bold mt-4 mb-2 text-white">Our Mission</h3>
              <p className="text-gray-400">
                To accelerate business growth through intelligent, scalable, and secure technology solutions that bridge the gap between vision and execution.
              </p>
            </div>
          </Reveal>
          <Reveal>
            <div className="glass-card p-8 rounded-2xl h-full">
              <CloudIcon />
              <h3 className="text-2xl font-bold mt-4 mb-2 text-white">Our Vision</h3>
              <p className="text-gray-400">
                To become the most trusted global technology partner, known for innovation, reliability, and measurable results.
              </p>
            </div>
          </Reveal>
        </div>

        <hr className="border-white/5 my-16" />

        {/* Team */}
        <Reveal>
          <h2 className="text-3xl font-bold text-center mb-12 text-white">Leadership Team</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {team.map((member, idx) => (
              <TeamCard key={idx} {...member} />
            ))}
          </div>
        </Reveal>

        {/* Timeline */}
        <SimpleTimeline />

        {/* Testimonials */}
        <TestimonialSlider />

        {/* CTA */}
        <Reveal className="text-center mt-20">
          <a
            href="/careers"
            className="inline-block px-8 py-3.5 font-semibold text-white bg-gradient-to-r from-cyan-500 to-fuchsia-600 rounded-xl transition-all hover:scale-105 glow"
          >
            Want to join our team?
          </a>
        </Reveal>
      </div>
    </div>
  )
}