import { Link } from 'react-router-dom'

// Social media SVG icons (can be replaced with your own)
const SocialIcon = ({ children, href, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="w-9 h-9 flex items-center justify-center rounded-full bg-white/5 text-gray-400 hover:text-white hover:bg-gradient-to-r hover:from-cyan-500 hover:to-fuchsia-600 transition-all duration-200 hover:scale-110"
  >
    {children}
  </a>
)

export default function Footer() {
  return (
    <footer className="bg-[#0f0b29] border-t border-white/5 pt-16 pb-8 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
        
        {/* Column 1: Company info */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-cyan-400 to-fuchsia-500 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            <span className="text-xl font-bold text-white">Atwork-in</span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            Smart IT Solutions for the Modern Enterprise. We build software, cloud, AI, and cybersecurity products that drive growth.
          </p>
          <div className="flex gap-3">
            <SocialIcon href="https://linkedin.com/company/atwork-in" label="LinkedIn">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </SocialIcon>
            <SocialIcon href="https://twitter.com/atwork-in" label="Twitter">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </SocialIcon>
            <SocialIcon href="https://github.com/atwork-in" label="GitHub">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </SocialIcon>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Quick Links</h3>
          <ul className="space-y-3">
            {[
              { to: '/', label: 'Home' },
              { to: '/about', label: 'About Us' },
              { to: '/services', label: 'Services' },
              { to: '/contact', label: 'Contact' },
            ].map(link => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="text-gray-400 hover:text-cyan-400 transition text-sm flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 rounded-full bg-gray-600 group-hover:bg-cyan-400 transition"></span>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Services (subset) */}
        <div>
          <h3 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Services</h3>
          <ul className="space-y-3">
            {[
              'Custom Software',
              'Cloud & DevOps',
              'AI & Analytics',
              'Cybersecurity',
              'IT Support',
            ].map(service => (
              <li key={service}>
                <span className="text-gray-400 hover:text-fuchsia-400 transition text-sm cursor-default">
                  {service}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Contact & Hours */}
        <div>
          <h3 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Get in Touch</h3>
          <div className="space-y-3 text-sm">
            <p className="text-gray-400 flex items-start gap-2">
              <svg className="w-4 h-4 mt-0.5 text-cyan-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              #42, Tech Park, MG Road,<br />Bengaluru – 560001, India
            </p>
            <p className="text-gray-400 flex items-center gap-2">
              <svg className="w-4 h-4 text-cyan-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              info@atwork-in.com
            </p>
            <p className="text-gray-400 flex items-center gap-2">
              <svg className="w-4 h-4 text-cyan-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              +91-80-45678910
            </p>
            <div className="text-gray-400 flex items-start gap-2">
              <svg className="w-4 h-4 mt-0.5 text-cyan-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p>Mon–Fri, 9 AM – 6 PM IST</p>
                <p className="text-xs text-gray-500">24/7 for critical support</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto border-t border-white/5 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 gap-2">
        <p>&copy; {new Date().getFullYear()} Atwork-in. All rights reserved.</p>
        <div className="flex gap-4">
          <span className="hover:text-gray-400 cursor-pointer transition">Privacy Policy</span>
          <span className="hover:text-gray-400 cursor-pointer transition">Terms of Service</span>
          <span className="hover:text-gray-400 cursor-pointer transition">Cookie Policy</span>
        </div>
      </div>
    </footer>
  )
}