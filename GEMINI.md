# 업무 말투 변환기 (Business Tone Converter)

이 프로젝트는 사용자가 입력한 일상적인 문구를 수신 대상(상사, 동료, 고객 등)에 적합한 업무용 말투로 변환해주는 서비스입니다.

## 🚀 프로젝트 개요

- **목적**: 비즈니스 커뮤니케이션 효율화 및 말투 고민 해결
- **핵심 기술**: Python FastAPI, LangChain, Upstage Solar-Pro2
- **구조**: 
    - `backend/`: FastAPI 기반 LLM 연동 API 서버
    - `frontend/`: 순수 HTML/JS 기반 사용자 인터페이스

## 🛠 기술 스택

- **Backend**: Python 3.14+, FastAPI 0.136+, Uvicorn 0.47+
- **AI/LLM**: LangChain 1.3+, Upstage Solar-Pro2 API (via langchain-openai 1.2+)
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla JS)
- **Deployment**: Vercel

## 📖 주요 문서

- [개요서_업무말투변환기.md](./개요서_업무말투변환기.md): 프로젝트 기획 배경 및 주요 기능 설명
- [PRD_업무말투변환기.md](./PRD_업무말투변환기.md): 상세 제품 요구사항 및 구현 가이드
- [myrules.md](./myrules.md): 시스템 지침 및 보안 수칙 (Gemini CLI 전용)

## 💻 실행 및 관리

### 환경 설정
1. `.env` 파일에 API 키 설정:
   ```env
   UPSTAGE_API_KEY=your_api_key_here
   ```
2. 패키지 설치:
   ```bash
   pip install fastapi uvicorn langchain langchain-openai python-dotenv pydantic
   ```

### 백엔드 실행 (TODO: backend 폴더 생성 후)
```bash
cd backend
uvicorn main:app --reload
```

### 프론트엔드 실행
`frontend/index.html` 파일을 브라우저에서 직접 열거나 로컬 서버를 사용합니다.

## 🛡 개발 원칙 및 보안 (Vibe Coding 3원칙)

1. **완료 기준 정의**: 구현 전 체크리스트를 먼저 작성합니다.
2. **조사 먼저, 구현 나중**: API 연동 방식 등을 먼저 파악한 후 코드를 작성합니다.
3. **버그 분석 우선**: 에러 발생 시 원인을 먼저 분석하고 수정을 진행합니다.

**⚠️ 보안 주의사항**:
- `.env` 및 민감한 설정 파일은 절대로 Git에 커밋하지 않습니다.
- `git push --force`, `git reset --hard` 등 파괴적인 Git 명령 사용을 금지합니다.
- 시스템 디렉토리 수정 및 과도한 권한 변경(`chmod 777`)을 지양합니다.

## 📂 디렉토리 구조 (예정)

```
.
├── backend/            # API 서버 소스
├── frontend/           # 웹 프론트엔드 소스
├── .env                # 환경 변수 (로컬 전용)
├── .gitignore          # Git 제외 목록
├── PRD_업무말투변환기.md  # 제품 상세 명세
└── 개요서_업무말투변환기.md # 기획 개요
```

### Source Code가 변경되거나 라이브러리 버전이 변경되면 반드시 @PRD_업무말투변환기.md 문서도 반드시 같이 업데이트 합니다. 
* 구현이 완료된 사항들은 `2. 완료 체크리스트`에 모두 체크표시를 해서 완료되었음을 표시하세요.
* `8. 단계별 구현 순서`에 STEP1 ~ STEP4에도 완료되면 체크 표시를 해서 완료되었음을 표시하세요.
* 라이브러리 버전이 변경되면 `@PRD_업무말투변환기.md`와 `GEMINI.md`를 업데이트 하세요.