from fastapi import FastAPI, UploadFile, File
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel

from backend.ai_service import ask_ai

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")


class ChatRequest(BaseModel):
    message: str


@app.get("/")
def home():
    return FileResponse("static/index.html")


@app.get("/api/health")
def health_check():
    return {
        "status": "ok",
        "message": "Calendar Analyzer backend is running"
    }


@app.post("/api/upload-calendar")
async def upload_calendar(file: UploadFile = File(...)):
    content = await file.read()

    return {
        "filename": file.filename,
        "file_size": len(content),
        "message": "Calendar file received successfully"
    }


@app.post("/api/ai-summary")
def ai_summary(request: ChatRequest):
    ai_response = ask_ai(request.message)

    return {
        "user_message": request.message,
        "ai_response": ai_response
    }