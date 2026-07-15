import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal'

// Typing effect
function useTypingEffect(text, speed = 50) {
  const [displayed, setDisplayed] = useState('')
  useEffect(() => {
    let i = 0
    const timer = setInterval(() => {
      setDisplayed(text.slice(0, i + 1))
      i++
      if (i >= text.length) clearInterval(timer)
    }, speed)
    return () => clearInterval(timer)
  }, [text, speed])
  return displayed
}

// Animated counter
function AnimatedCounter({ end, suffix, label }) {
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
    <div ref={ref} className="reveal text-center">
      <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent mb-2">
        {count}{suffix}
      </div>
      <div className="text-gray-400">{label}</div>
    </div>
  )
}

// Reveal wrapper
function Reveal({ children, className = '' }) {
  const ref = useReveal()
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>
}

export default function Home() {
  const typingText = useTypingEffect('We build digital experiences that move people.', 40)

  return (
    <div className="bg-[#0f0b29] text-white overflow-x-hidden bg-grid">
      {/* ===== Hero with animated orbs & 3D illustration ===== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Floating gradient orbs */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-cyan-500/30 to-fuchsia-500/30 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse-slow"></div>
        </div>

        {/* Hero text */}
        <div className="relative z-10 text-center max-w-5xl mx-auto px-6 py-20">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
            <span className="typing bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-orange-400 bg-clip-text text-transparent animate-gradient">
              {typingText}
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
            From AI‑powered platforms to immersive cloud solutions " we engineer technology that elevates your brand.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="px-8 py-3.5 font-semibold text-white bg-gradient-to-r from-cyan-500 to-fuchsia-600 rounded-xl transition-all duration-300 hover:scale-105 glow"
            >
              Start a project
            </Link>
            <Link
              to="/services"
              className="px-8 py-3.5 font-semibold text-gray-300 border border-gray-700 rounded-xl hover:border-cyan-400 hover:text-cyan-400 transition"
            >
              View services
            </Link>
          </div>
        </div>

        {/* 3D rotating abstract shape (CSS only) */}
        <div className="absolute bottom-10 right-10 w-32 h-32 opacity-30 animate-rotate-slow">
          <div className="w-full h-full bg-gradient-to-r from-cyan-500 to-fuchsia-500 rounded-lg transform rotate-45"></div>
        </div>
      </section>

      {/* ===== Client logos ===== */}
      <section className="py-16 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-sm uppercase tracking-widest text-gray-500 mb-8">Trusted by forward‑thinking companies</p>
          <div className="flex flex-wrap justify-center gap-10 opacity-30">
            {['Apple', 'Google', 'Microsoft', 'Amazon', 'Spotify'].map(name => (
              <span key={name} className="text-2xl font-semibold">{name}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 3D Services Cards ===== */}
      <Reveal className="py-24 px-4 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent">
          What we do
        </h2>
        <p className="text-gray-400 text-center max-w-xl mx-auto mb-16">
          End‑to‑end digital solutions that set you apart.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: 'Custom Software', desc: 'Web, mobile & desktop apps built with the latest stacks.', icon: '💻' },
            { title: 'Cloud & DevOps', desc: 'AWS, Azure, GCP — CI/CD, Kubernetes, Terraform.', icon: '☁️' },
            { title: 'AI & Analytics', desc: 'NLP, computer vision, chatbots, predictive models.', icon: '🤖' },
          ].map((service, idx) => (
            <div key={idx} className="card-3d glass-card p-8 rounded-2xl perspective-1000">
              <div className="text-4xl mb-5">{service.icon}</div>
              <h3 className="text-2xl font-semibold mb-3 text-white">{service.title}</h3>
              <p className="text-gray-400">{service.desc}</p>
            </div>
          ))}
        </div>
      </Reveal>

      {/* ===== Counters ===== */}
      <Reveal className="py-20 bg-gradient-to-r from-cyan-900/20 via-purple-900/20 to-fuchsia-900/20">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { end: 150, label: 'Projects', suffix: '+' },
            { end: 98, label: 'Satisfaction', suffix: '%' },
            { end: 12, label: 'Years Experience', suffix: '' },
            { end: 24, label: 'Support', suffix: '/7' },
          ].map((item, i) => (
            <AnimatedCounter key={i} {...item} />
          ))}
        </div>
      </Reveal>

      {/* ===== Tech Stack with 3D pill effects ===== */}
      <Reveal className="py-24 px-4 max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4">Tech Stack</h2>
        <p className="text-gray-400 mb-12 max-w-xl mx-auto">
          We use modern, battle‑tested technologies.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          {['React', 'Node.js', 'Python', 'AWS', 'Docker', 'Kubernetes', 'TensorFlow', 'Figma'].map(tech => (
            <span
              key={tech}
              className="px-5 py-2 border border-gray-800 rounded-full text-sm font-medium text-gray-300 hover:border-cyan-400 hover:text-cyan-400 hover:shadow-[0_0_15px_rgba(0,242,254,0.3)] transition cursor-default"
            >
              {tech}
            </span>
          ))}
        </div>
      </Reveal>

      {/* ===== 3D Project Cards ===== */}
      <Reveal className="py-24 px-4 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4">Recent Work</h2>
        <p className="text-gray-400 text-center mb-16">Projects we’re proud of.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80', title: 'Fintech Dashboard' },
            { img: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=600&q=80', title: 'Healthcare App' },
            { img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80', title: 'E‑commerce Platform' },
          ].map((project, idx) => (
            <div key={idx} className="card-3d group relative overflow-hidden rounded-2xl aspect-[4/3] bg-gray-900">
              <img src={project.img} alt={project.title} className="absolute inset-0 w-full h-full object-cover transition duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition flex items-end p-6">
                <h3 className="text-xl font-semibold text-white">{project.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </Reveal>

      {/* ===== Testimonials ===== */}
      <Reveal className="py-24 px-4 max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-12">What clients say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { quote: 'Atwork-in transformed our legacy system into a modern cloud app. Incredible team!', author: 'Priya S., CTO' },
            { quote: 'Their AI chatbot reduced our support tickets by 40%. Highly recommended.', author: 'Arjun M., VP Engineering' },
          ].map((t, i) => (
            <div key={i} className="glass-card p-8 rounded-2xl text-left relative">
              <svg className="w-10 h-10 text-cyan-500/30 mb-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10H0z" />
              </svg>
              <p className="text-gray-300 italic mb-4">“{t.quote}”</p>
              <p className="font-semibold text-cyan-400">— {t.author}</p>
            </div>
          ))}
        </div>
      </Reveal>

      {/* ===== Map ===== */}
      <Reveal className="py-24 px-4 max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4">Visit us</h2>
        <p className="text-gray-400 mb-12">Bengaluru, India</p>
        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.510950039415!2d77.5945627!3d12.9715987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sMG%20Road%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1620000000000"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            title="Office Location"
            className="w-full"
          />
          <div className="absolute bottom-0 left-0 right-0 glass-card p-6 text-left">
            <h3 className="text-lg font-semibold text-white">Atwork-in</h3>
            <p className="text-sm text-gray-400">#42, Tech Park, MG Road, Bengaluru 560001</p>
          </div>
        </div>
      </Reveal>

      {/* ===== CTA ===== */}
      <section className="py-24 text-center bg-gradient-to-r from-cyan-900/20 via-fuchsia-900/20 to-orange-900/20 border-t border-white/5">
        <h2 className="text-4xl font-bold mb-6">Ready to launch your next big idea?</h2>
        <Link
          to="/contact"
          className="inline-flex items-center justify-center px-8 py-3.5 font-semibold text-white bg-gradient-to-r from-cyan-500 to-fuchsia-600 rounded-xl transition-all hover:scale-105 glow"
        >
          Let’s talk
        </Link>
      </section>
    </div>
  )
}