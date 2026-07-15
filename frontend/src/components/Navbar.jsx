import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/contact', label: 'Contact' },
   { to: '/careers', label: 'Careers' }
]

// Logo SVG (same as before)
const LogoIcon = () => (
  <Link to="/" className="flex items-center gap-3 group">
 
  <span className="text-xl font-bold tracking-tight text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-fuchsia-500 transition-all duration-300">
  
  </span>
</Link>
)

export default function Navbar() {
  const location = useLocation()
  const [currentTime, setCurrentTime] = useState(new Date())
  const [mobileOpen, setMobileOpen] = useState(false)

  // Real‑time clock
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const timeString = currentTime.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
    timeZone: 'Asia/Kolkata',
  })

  const dateString = currentTime.toLocaleDateString('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'Asia/Kolkata',
  })

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-[#0b081a] via-[#14102e] to-[#0b081a] backdrop-blur-xl border-b border-white/5 shadow-2xl shadow-black/20">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo + Brand */}
        <Link to="/" className="flex items-center gap-3 group">
          <LogoIcon />
          <span className="text-xl font-bold tracking-tight text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-fuchsia-500 transition-all duration-300">
            Atwork-in
          </span>
        </Link>

        {/* Desktop Center Links */}
        <div className="hidden md:flex items-center space-x-1">
          {links.map(link => {
            const isActive = location.pathname === link.to
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`relative px-5 py-2 text-sm font-semibold rounded-full transition-all duration-300 ease-out ${
                  isActive
                    ? 'text-white bg-gradient-to-r from-cyan-500 to-fuchsia-600 shadow-lg shadow-cyan-500/20'
                    : 'text-gray-300 hover:text-white hover:bg-white/10 hover:shadow-md hover:scale-105'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white shadow-glow" />
                )}
              </Link>
            )
          })}
        </div>

        {/* Right: Live Clock (desktop) */}
        <div className="hidden md:flex items-center gap-2 text-xs bg-white/5 rounded-full px-4 py-2 border border-white/10 backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="tabular-nums tracking-wider text-gray-300">{timeString}</span>
          <span className="text-gray-600">|</span>
          <span className="text-gray-400">{dateString}</span>
        </div>

        {/* Hamburger (mobile) */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-gray-400 hover:text-white transition"
        >
          {mobileOpen ? (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu (slide down) */}
      {mobileOpen && (
        <div className="md:hidden bg-[#0b081a]/95 backdrop-blur-xl border-b border-white/5 py-4 px-4 space-y-3">
          {links.map(link => {
            const isActive = location.pathname === link.to
            return (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`block px-5 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500 to-fuchsia-600 text-white'
                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
          {/* Clock on mobile */}
          <div className="flex items-center gap-2 text-xs text-gray-400 pt-2 border-t border-white/5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span>{timeString}</span>
            <span className="text-gray-600">|</span>
            <span>{dateString}</span>
          </div>
        </div>
      )}
    </nav>
  )
}