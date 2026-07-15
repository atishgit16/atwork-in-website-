# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.







# Atwork-in – Professional IT Services Website with AI Chatbot

A modern, responsive website for **Atwork-in**, an IT services company, featuring a fully functional AI-powered chatbot that answers questions based on the company's services, team, and contact details. Built with React, FastAPI, Groq (free LLM API), and Material UI/Tailwind CSS.

##  Features

- **5 professionally designed pages:** Home, About, Services, Contact, Careers
- **AI Chatbot:** Answers only company‑related questions using Groq's Llama 3.1 8B model (free tier)
- **Dark glassmorphism UI:** Smooth reveal animations, 3D card tilts, gradient accents
- **Fully responsive:** Works on all devices
- **WhatsApp & Email CTAs:** Quick contact options
- **Embedded Google Map:** Shows office location
- **Live real‑time clock** in the navbar

##  Tech Stack

| Layer       | Technology                          |
|-------------|-------------------------------------|
| Frontend    | React (Vite), Tailwind CSS, MUI     |
| Backend     | Python (FastAPI)                    |
| AI Chatbot  | Groq (Llama 3.1 8B Instant) – free API |
| Form backend| Formspree (free plan)               |
| Deployment  | Render (free tier)                  |

##  Project Structure
atwork-in-website/
├── frontend/ # React app
│ ├── public/
│ │ └── logo.png
│ ├── src/
│ │ ├── components/ # Navbar, Footer, Chatbot, ServiceCard
│ │ ├── pages/ # Home, About, Services, Contact, Careers
│ │ ├── hooks/ # useReveal custom hook
│ │ ├── App.jsx
│ │ └── main.jsx
│ ├── index.html
│ └── package.json
├── backend/ # FastAPI server
│ ├── main.py # API endpoints + static file serving
│ ├── company_data.py # Company information for the chatbot
│ ├── requirements.txt
│ └── .env # GROQ_API_KEY (not pushed to GitHub)
└── README.md

text

##  Local Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/atwork-in-website.git
   cd atwork-in-website
Backend

bash
cd backend
python -m venv .venv
.venv\Scripts\activate   # Windows
source .venv/bin/activate # Mac/Linux
pip install -r requirements.txt
Create a .env file:

text
GROQ_API_KEY=gsk_your_api_key_here
Start the server:

bash
uvicorn main:app --reload --port 8000
Frontend

bash
cd ../frontend
npm install
npm run dev
Open http://localhost:5173 in your browser.

 Deployment
The project is configured for a single‑service deployment on Render (free). The backend serves the built React frontend as static files.
See the deployment section above for step‑by‑step instructions.

 License
MIT – feel free to use and modify.

Built with ❤️ by Atwork-in.



Copy this into your `README.md` file. It gives a clear overview of the project and instructions for anyone who wants to run it locally or deploy it.