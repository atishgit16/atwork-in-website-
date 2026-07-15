import { useState } from 'react'
import { useReveal } from '../hooks/useReveal'

// Simple SVG icons
const PhoneIcon = () => (
  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
)

const EmailIcon = () => (
  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
)

const LocationIcon = () => (
  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
)

const ClockIcon = () => (
  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const CheckCircleIcon = () => (
  <svg className="w-20 h-20 text-cyan-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const WhatsAppIcon = () => (
  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

// Reveal wrapper
function Reveal({ children, className = '' }) {
  const ref = useReveal()
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>
}

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [snackbar, setSnackbar] = useState({ open: false, message: '', type: 'success' })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format'
    if (!formData.message.trim()) newErrors.message = 'Message is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setSubmitting(true)
    try {
      const response = await fetch('https://formspree.io/f/your-form-id', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (response.ok) {
        setSuccess(true)
        setSnackbar({ open: true, message: 'Message sent successfully!', type: 'success' })
        setFormData({ name: '', email: '', message: '' })
      } else {
        throw new Error('Submission failed')
      }
    } catch (error) {
      setSnackbar({ open: true, message: 'Failed to send. Please email us directly.', type: 'error' })
    } finally {
      setSubmitting(false)
    }
  }

  const whatsappNumber = '918045678910'
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hello Atwork-in!')}`

  return (
    <div className="bg-[#0f0b29] text-white overflow-x-hidden bg-grid">
      <div className="max-w-7xl mx-auto py-20 px-4">
        {/* Header */}
        <Reveal>
          <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-4 bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent">
            Let’s Build Something Great
          </h1>
          <p className="text-gray-400 text-center max-w-2xl mx-auto mb-16">
            Tell us about your project. We’ll get back to you within one business day.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Form – 7 columns */}
          <Reveal className="lg:col-span-7">
            <div className="glass-card p-8 rounded-2xl">
              {success ? (
                <div className="text-center py-10">
                  <CheckCircleIcon />
                  <h3 className="text-2xl font-bold mt-4">Thank you!</h3>
                  <p className="text-gray-400 mt-2 mb-6">Your message has been sent. We’ll reply within 24 hours.</p>
                  <button
                    onClick={() => setSuccess(false)}
                    className="border border-cyan-400 text-cyan-400 px-6 py-2 rounded-full hover:bg-cyan-400/10 transition"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition"
                        placeholder="John Doe"
                      />
                      {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Work Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition"
                        placeholder="john@company.com"
                      />
                      {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Message *</label>
                    <textarea
                      name="message"
                      rows="5"
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition"
                      placeholder="Tell us about your project..."
                    />
                    {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-fuchsia-600 rounded-xl font-semibold text-white hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    {submitting ? 'Sending...' : 'Send Message'}
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                  </button>
                </form>
              )}
            </div>
          </Reveal>

          {/* Contact info – 5 columns */}
          <Reveal className="lg:col-span-5 space-y-4">
            {/* Call Us */}
            <div className="glass-card p-4 rounded-2xl flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-cyan-400 to-fuchsia-500 flex items-center justify-center flex-shrink-0">
                <PhoneIcon />
              </div>
              <div>
                <h4 className="font-semibold text-white">Call Us</h4>
                <p className="text-gray-400 text-sm">+91-80-45678910</p>
                <a href="tel:+918045678910" className="text-cyan-400 text-sm hover:underline inline-flex items-center gap-1 mt-1">
                  Call now <span>→</span>
                </a>
              </div>
            </div>

            {/* Email Us */}
            <div className="glass-card p-4 rounded-2xl flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-cyan-400 to-fuchsia-500 flex items-center justify-center flex-shrink-0">
                <EmailIcon />
              </div>
              <div>
                <h4 className="font-semibold text-white">Email Us</h4>
                <p className="text-gray-400 text-sm">info@atwork-in.com</p>
                <a href="mailto:info@atwork-in.com" className="text-cyan-400 text-sm hover:underline inline-flex items-center gap-1 mt-1">
                  Send email <span>→</span>
                </a>
              </div>
            </div>

            {/* Visit Us */}
            <div className="glass-card p-4 rounded-2xl flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-cyan-400 to-fuchsia-500 flex items-center justify-center flex-shrink-0">
                <LocationIcon />
              </div>
              <div>
                <h4 className="font-semibold text-white">Visit Us</h4>
                <p className="text-gray-400 text-sm">#42, Tech Park, MG Road,<br /> Bengaluru – 560001, India</p>
                <a href="https://maps.google.com/?q=MG+Road+Bengaluru" target="_blank" rel="noopener noreferrer" className="text-cyan-400 text-sm hover:underline inline-flex items-center gap-1 mt-1">
                  View on map <span>→</span>
                </a>
              </div>
            </div>

            {/* Working Hours */}
            <div className="glass-card p-4 rounded-2xl flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-cyan-400 to-fuchsia-500 flex items-center justify-center flex-shrink-0">
                <ClockIcon />
              </div>
              <div>
                <h4 className="font-semibold text-white">Working Hours</h4>
                <p className="text-gray-400 text-sm">Mon–Fri: 9 AM – 6 PM IST</p>
                <p className="text-gray-400 text-sm">24/7 for critical support</p>
              </div>
            </div>

            {/* WhatsApp button */}
            <div className="text-center pt-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:scale-105 transition"
              >
                <WhatsAppIcon />
                Chat on WhatsApp
              </a>
            </div>
          </Reveal>
        </div>

        {/* Map */}
        <Reveal className="mt-20">
          <h2 className="text-3xl font-bold text-center mb-6">Visit Our Office</h2>
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
            <div className="absolute bottom-0 left-0 right-0 glass-card p-4 text-white">
              <p className="text-sm">🏢 Atwork‑in HQ — #42, Tech Park, MG Road, Bengaluru</p>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Snackbar */}
      {snackbar.open && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
          <div className={`px-6 py-3 rounded-full text-sm font-medium shadow-xl ${
            snackbar.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
          }`}>
            {snackbar.message}
            <button onClick={() => setSnackbar(prev => ({ ...prev, open: false }))} className="ml-3 font-bold">&times;</button>
          </div>
        </div>
      )}
    </div>
  )
}