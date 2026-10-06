# 미래 동사 · 진로 탐색 챗봇

GitHub Pages에서 바로 배포되는 HTML/CSS/JavaScript 기반의 진로 탐색 앱입니다. 커리어넷 API 키는 브라우저에 노출하지 않고, GitHub Actions가 배포 전에 직업 데이터를 정적 JSON으로 만들어 함께 올립니다.

## 동작 방식

```text
CareerNet Open API → GitHub Actions Secret → data/careernet-jobs.json
                                             ↓
                                      dist/ 정적 웹사이트 → GitHub Pages
```

사용자는 API 키를 받지 않으며, 페이지는 생성된 `data/careernet-jobs.json`만 읽습니다.

## 처음 한 번만 할 설정

1. [커리어넷 Open API 직업백과](https://www.career.go.kr/cnet/front/openapi/jobCenter.do)에서 로그인 후 Open API를 신청하고 승인된 인증키를 받습니다.
2. 이 폴더의 내용을 새 GitHub 저장소의 `main` 브랜치에 올립니다.
3. GitHub 저장소에서 **Settings → Secrets and variables → Actions → New repository secret**을 엽니다.
4. 이름은 `CAREER_NET_API_KEY`, 값에는 커리어넷 인증키를 넣고 저장합니다.
5. **Settings → Pages → Build and deployment → Source**를 **GitHub Actions**로 선택합니다.
6. `main`에 다시 push하거나 **Actions → Deploy Future Verb to GitHub Pages → Run workflow**를 실행합니다.

배포가 끝나면 Actions 실행 화면의 URL 또는 **Settings → Pages**에 표시된 주소로 접속할 수 있습니다.

## 로컬 확인

Node.js 20 이상에서 프로젝트 최상위에 `.env` 파일을 만들고 아래처럼 작성합니다. 이 파일은 Git에 올라가지 않습니다.

```env
CAREER_NET_API_KEY=실제_API_키
```

그다음 다음을 실행합니다.

```bash
npm run build
```

`dist` 폴더에 GitHub Pages에 올라갈 파일만 생성됩니다. API 키가 없으면 기존의 빈 데이터 파일을 사용해 화면 자체는 배포되지만, 관련 직업 목록은 표시되지 않습니다.

## 보안 주의사항

- `.env` 파일이나 인증키를 커밋하지 마세요.
- `public/app.js` 또는 HTML에 인증키를 넣지 마세요.
- API 키는 GitHub의 `CAREER_NET_API_KEY` Secret에만 보관하세요.
