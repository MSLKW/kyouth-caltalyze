from fastapi import FastAPI, UploadFile, File
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
from typing import Any

from backend.ai_service import ask_ai, generate_calendar_insight, ask_calendar_deep_dive
from backend.calendar_parser import parse_calendar_file
from backend.metrics_service import calculate_metrics

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")


class ChatRequest(BaseModel):
    message: str

class DeepDiveRequest(BaseModel):
    question: str
    events: list[dict[str, Any]]
    metrics: dict[str, Any]

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
    if not file.filename.endswith(".ics"):
        return {"error": "Only .ics calendar files are allowed"}

    content = await file.read()

    if not content:
        return {"error": "Uploaded file is empty"}
    
    try:
        text_content = content.decode("utf-8", errors="ignore")
        events = parse_calendar_file(text_content)
        metrics = calculate_metrics(events)
        ai_insight = generate_calendar_insight(events, metrics)

        return {
            "filename": file.filename,
            "event_count": len(events),
            "events": events,
            "metrics": metrics,
            "ai_insight": ai_insight,
            "message": "Calendar file analyzed successfully"
        }
    except Exception as error:
        return {
            "error": "Failed to process calendar file",
            "details": str(error)
        }


@app.post("/api/ai-summary")
def ai_summary(request: ChatRequest):
    ai_response = ask_ai(request.message)

    return {
        "user_message": request.message,
        "ai_response": ai_response
    }

@app.post("/api/ai-deep-dive")
def ai_deep_dive(request: DeepDiveRequest):
    ai_response = ask_calendar_deep_dive(
        question=request.question,
        events=request.events,
        metrics=request.metrics
    )

    return {
        "question": request.question,
        "ai_response": ai_response
    }