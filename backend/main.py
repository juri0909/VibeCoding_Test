from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from routers import convert
import os

app = FastAPI(title="업무 말투 변환기 API")

# CORS 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 라우터 등록
app.include_router(convert.router, prefix="/api")

# 정적 파일 서빙 (프론트엔드)
# frontend 디렉토리 경로 설정
frontend_path = os.path.join(os.path.dirname(__file__), "..", "frontend")
app.mount("/static", StaticFiles(directory=frontend_path), name="static")

@app.get("/")
async def read_index():
    return FileResponse(os.path.join(frontend_path, "index.html"))

@app.get("/css/{file_path:path}")
async def read_css(file_path: str):
    return FileResponse(os.path.join(frontend_path, "css", file_path))

@app.get("/js/{file_path:path}")
async def read_js(file_path: str):
    return FileResponse(os.path.join(frontend_path, "js", file_path))

@app.get("/health")
async def health_check():
    return {"status": "ok"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
