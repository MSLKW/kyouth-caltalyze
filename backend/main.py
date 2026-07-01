from fastapi import FastAPI, UploadFile, File
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel

from backend.ai_service import ask_ai
from backend.calendar_parser import parse_calendar_file
from backend.metrics_service import calculate_metrics

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
    text_content = content.decode("utf-8", errors="ignore")

    events = parse_calendar_file(text_content)
    metrics = calculate_metrics(events)

    return {
        "filename": file.filename,
        "event_count": len(events),
        "events": events,
        "metrics": metrics,
        "message": "Calendar file analyzed successfully"
        }
   


@app.post("/api/ai-summary")
def ai_summary(request: ChatRequest):
    ai_response = ask_ai(request.message)

    return {
        "user_message": request.message,
        "ai_response": ai_response
    }