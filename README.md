# 미래 동사 · 진로 탐색 챗봇 (GitHub Pages 정적 버전)

HTML/CSS/JS로 만든 챗봇형 진로 탐색 웹앱입니다. 실제 동작은 FNA(Function → Navigation → Action) 상태 흐름으로 구성되어 있고, CareerNet Open API 데이터는 **배포 시 정적 JSON으로 미리 생성**합니다.

## 왜 서버가 없는가?
GitHub Pages는 정적 파일 호스팅이며 PHP/Ruby/Python 같은 서버 측 언어를 실행하지 않습니다. 따라서 브라우저가 CareerNet API를 직접 호출하면서 API 키를 비밀로 유지하는 구조는 사용할 수 없습니다.

이 프로젝트는 다음 구조를 사용합니다.

```text
CareerNet Open API
       ↓ (GitHub Actions / Secret)
scripts/fetch-careernet.mjs
       ↓
data/careernet-jobs.json
       ↓
HTML + CSS + JS
       ↓
GitHub Pages
```

즉, 사용자의 브라우저에는 API 키가 전달되지 않고, 실제 페이지는 `data/careernet-jobs.json`이라는 정적 데이터만 읽습니다.

## GitHub Pages 배포

1. GitHub 저장소를 생성합니다.
2. 이 프로젝트 전체를 `main` 브랜치에 올립니다.
3. Repository → Settings → Secrets and variables → Actions에서 `CAREER_NET_API_KEY`라는 **Repository secret**을 만들고 커리어넷 API 키를 입력합니다.
4. Repository → Settings → Pages에서 GitHub Actions 배포를 사용하도록 설정합니다.
5. `main`에 push하거나 Actions에서 `Deploy Future Verb to GitHub Pages`를 수동 실행합니다.

워크플로가 Secret을 이용해 CareerNet 데이터를 만들고, 만들어진 정적 파일을 GitHub Pages에 배포합니다.

## 로컬 데이터 생성

Node.js 20+ 환경에서 `.env` 파일에 다음을 작성합니다.

```env
CAREER_NET_API_KEY=실제_API_키
```

그리고 실행합니다.

```bash
npm run build:data
```

생성 결과는 `data/careernet-jobs.json`입니다.

## 주의

`.env`나 실제 API 키를 GitHub 저장소에 커밋하지 마세요. 정적 웹앱의 JavaScript에 API 키를 직접 넣는 방식도 권장하지 않습니다. 이 버전은 GitHub Actions Secret으로 API를 호출하고, 브라우저에는 결과 데이터만 제공합니다.

CareerNet Open API: https://www.career.go.kr/cnet/front/openapi/jobCenter.do
