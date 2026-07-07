from typing import Any

from fastapi import FastAPI, UploadFile, File, HTTPException
from pydantic import BaseModel

from backend.ai_service import generate_calendar_insight, ask_calendar_deep_dive
from backend.calendar_parser import parse_calendar_file
from backend.metrics_service import calculate_metrics

app = FastAPI()


class ChatRequest(BaseModel):
    message: str
    events: list[dict[str, Any]]
    metrics: dict[str, Any] | None = None


@app.get("/api/health")
def health_check():
    return {"status": "ok", "message": "Calendar Analyzer backend is running"}


@app.post("/api/upload-calendar")
async def upload_calendar(file: UploadFile = File(...)):
    if not file.filename or not file.filename.endswith(".ics"):
        raise HTTPException(status_code=400, detail="Please upload a .ics calendar file.")

    content = await file.read()

    if not content:
        raise HTTPException(status_code=400, detail="Uploaded calendar file is empty.")

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
            "message": "Calendar file analyzed successfully",
        }

    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to process calendar file: {str(error)}",
        )


@app.post("/api/chat")
def chat(request: ChatRequest):
    try:
        ai_reply = ask_calendar_deep_dive(
            message=request.message,
            events=request.events,
            metrics=request.metrics,
        )

        return {"reply": ai_reply}

    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to generate AI reply: {str(error)}",
        )