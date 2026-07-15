import os
from fastapi.staticfiles import StaticFiles
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from company_data import COMPANY_INFO

import pathlib

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Groq client setup with error capture
try:
    from groq import Groq
    api_key = os.getenv("GROQ_API_KEY")
    if api_key:
        client = Groq(api_key=api_key)
    else:
        client = None
        print(" GROQ_API_KEY not set in .env")
except Exception as e:
    print(f" Failed to import/init Groq: {e}")
    client = None

class ChatRequest(BaseModel):
    message: str

@app.post("/api/chat")
async def chat_endpoint(req: ChatRequest):
    # 1. Check if Groq is available
    if client is None:
        return {"reply": "Groq client is not configured. Check GROQ_API_KEY in .env file."}

    # 2. Build system prompt
    system_prompt = f"""You are a helpful, friendly assistant for Atwork-in, an IT services company.
You must ONLY answer questions related to Atwork-in, its services, team, contact details, or general IT services the company offers.
If a question is completely unrelated, politely say: 'I can only provide information about Atwork-in. How can I help you with our IT services?'
Never invent information not in the company data. Use the following information:

{COMPANY_INFO}
"""

    # 3. Call Groq and return the exact error if it fails
    try:
        chat_completion = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": req.message},
            ],
            temperature=0.3,
            max_tokens=500,
        )
        reply = chat_completion.choices[0].message.content
        return {"reply": reply}
    except Exception as e:
        # Return the real error so you can see it in the browser
        error_msg = f"Groq API error: {repr(e)}"
        print(error_msg)
        return {"reply": error_msg}


@app.get("/test")
def test():
    return {"status": "ok"}



# Find the 'frontend/dist' folder relative to the backend directory
static_dir = pathlib.Path(__file__).resolve().parent.parent / "frontend" / "dist"
if static_dir.exists():
    app.mount("/", StaticFiles(directory=str(static_dir), html=True), name="static")