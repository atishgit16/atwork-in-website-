import { useState, useRef, useEffect } from 'react'

// Simple SVG icons to avoid extra imports
const SendIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
  </svg>
)

const BotAvatar = () => (
  <div className="relative flex-shrink-0">
    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-fuchsia-500 flex items-center justify-center text-white text-xs font-bold">
      TN
    </div>
    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-white"></span>
  </div>
)

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      from: 'bot',
      text: "Hi! I'm the TechNova assistant. Ask me anything about our services, team, or contact info. Here are a few things I can help with:",
      suggestions: ['What services do you offer?', 'Tell me about your team', 'How can I contact you?']
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const chatEndRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus()
    }
  }, [open])

  const addMessage = (msg) => setMessages(prev => [...prev, msg])

  const sendMessage = async (text = input) => {
    const trimmed = text.trim()
    if (!trimmed) return

    addMessage({ from: 'user', text: trimmed })
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('http://localhost:8000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed })
      })
      const data = await res.json()
      addMessage({ from: 'bot', text: data.reply })
    } catch {
      addMessage({ from: 'bot', text: 'Oops! Something went wrong. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Floating toggle button with pulse glow */}
      <button
        onClick={() => setOpen(!open)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 ${
          open
            ? 'bg-gray-200 rotate-90'
            : 'bg-gradient-to-r from-cyan-500 to-fuchsia-600 animate-pulse'
        }`}
      >
        {open ? (
          <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </button>

      {/* Chat window with slide-up animation */}
      <div
        className={`fixed bottom-24 right-6 z-50 w-[350px] sm:w-[400px] max-h-[600px] bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col transition-all duration-300 origin-bottom-right ${
          open
            ? 'scale-100 opacity-100 translate-y-0'
            : 'scale-95 opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        {/* Header */}
        <div className="relative bg-gradient-to-r from-cyan-500 to-fuchsia-600 text-white p-4 rounded-t-2xl flex items-center gap-3">
          <BotAvatar />
          <div>
            <h3 className="font-semibold text-sm">TechNova Assistant</h3>
            <p className="text-xs text-white/80 flex items-center gap-1">
              <span className="w-2 h-2 bg-green-300 rounded-full"></span> Online now
            </p>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="ml-auto p-1 hover:bg-white/20 rounded-full transition"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Messages area */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50 min-h-[300px] max-h-[400px]">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-2 ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.from === 'bot' && <BotAvatar />}
              <div className="max-w-[80%]">
                {msg.from === 'bot' ? (
                  <div className="bg-white rounded-2xl rounded-tl-none p-3 shadow-sm border border-gray-100">
                    <p className="text-sm text-gray-800 whitespace-pre-wrap">{msg.text}</p>
                    {msg.suggestions && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {msg.suggestions.map((suggestion, idx) => (
                          <button
                            key={idx}
                            onClick={() => sendMessage(suggestion)}
                            className="px-3 py-1.5 text-xs bg-gradient-to-r from-cyan-50 to-fuchsia-50 text-cyan-700 rounded-full border border-cyan-200 hover:bg-gradient-to-r hover:from-cyan-100 hover:to-fuchsia-100 transition"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="bg-gradient-to-r from-cyan-500 to-fuchsia-600 text-white rounded-2xl rounded-tr-none p-3 shadow-md">
                    <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                  </div>
                )}
              </div>
              {msg.from === 'user' && (
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-white text-xs font-bold">
                  Y
                </div>
              )}
            </div>
          ))}

          {/* Typing indicator */}
          {loading && (
            <div className="flex gap-2 items-start">
              <BotAvatar />
              <div className="bg-white rounded-2xl rounded-tl-none p-3 shadow-sm border border-gray-100">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '200ms' }}></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '400ms' }}></span>
                </div>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input area */}
        <div className="p-3 border-t border-gray-100 bg-white rounded-b-2xl">
          <div className="flex items-center gap-2">
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
              placeholder="Type your message..."
              className="flex-1 bg-gray-100 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:bg-white transition"
            />
            <button
              onClick={() => sendMessage()}
              disabled={loading}
              className="p-2.5 bg-gradient-to-r from-cyan-500 to-fuchsia-600 text-white rounded-full hover:shadow-lg hover:scale-105 transition disabled:opacity-50 disabled:hover:scale-100"
            >
              <SendIcon />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}