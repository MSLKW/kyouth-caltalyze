import requests

OLLAMA_URL = "http://localhost:11434/api/generate"

def ask_ai(prompt: str):
    payload = {
        "model": "llama3",
        "prompt": prompt,
        "stream": False
    }

    response = requests.post(OLLAMA_URL, json=payload)
    response.raise_for_status()

    data = response.json()
    return data.get("response", "")