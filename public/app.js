const VERBS = {
  만들다: { score: 0, desc: '아이디어를 실제 결과물로 바꾸는 것을 좋아하는 성향' },
  해결하다: { score: 0, desc: '문제의 원인을 찾고 해결책을 만드는 것을 좋아하는 성향' },
  탐구하다: { score: 0, desc: '새로운 것을 알아보고 원리를 이해하는 것을 좋아하는 성향' },
  돕다: { score: 0, desc: '사람의 필요를 살피고 도움을 주는 것을 좋아하는 성향' },
  표현하다: { score: 0, desc: '생각과 감정을 자신만의 방식으로 전달하는 것을 좋아하는 성향' },
  연결하다: { score: 0, desc: '사람·정보·아이디어를 이어 새로운 가능성을 만드는 것을 좋아하는 성향' },
  설계하다: { score: 0, desc: '전체 구조를 구상하고 체계적으로 만드는 것을 좋아하는 성향' }
};

const VERB_JOB_KEYWORDS = {
  만들다: ['소프트웨어', '디자이너', '제품디자이너'],
  해결하다: ['소프트웨어', '데이터', '연구원'],
  탐구하다: ['연구원', '데이터', '과학'],
  돕다: ['사회복지', '상담', '간호'],
  표현하다: ['디자이너', '작가', '콘텐츠'],
  연결하다: ['기획', '마케팅', '소프트웨어'],
  설계하다: ['건축', '소프트웨어', '엔지니어']
};

const QUESTIONS = [
  {
    id: 'q1', stage: '1 · 시작', text: '미래를 생각했을 때 어떤 행동이 가장 끌려?', options: [
      { label: '무언가 만들기', sub: '아이디어를 결과물로 바꾸기', scores: { 만들다: 3, 설계하다: 1 } },
      { label: '문제 해결하기', sub: '원인을 찾고 답을 만들기', scores: { 해결하다: 3, 탐구하다: 1 } },
      { label: '사람 돕기', sub: '누군가에게 도움이 되기', scores: { 돕다: 3, 연결하다: 1 } },
      { label: '새로운 것 탐구하기', sub: '궁금증을 파고들기', scores: { 탐구하다: 3, 해결하다: 1 } },
      { label: '생각 표현하기', sub: '나만의 방식으로 전달하기', scores: { 표현하다: 3, 연결하다: 1 } },
      { label: '사람과 정보 연결하기', sub: '서로를 이어주기', scores: { 연결하다: 3, 돕다: 1 } }
    ]
  },
  {
    id: 'q2', stage: '2 · 경험', text: '학교나 일상에서 가장 재미있었던 경험은 무엇과 가까워?', options: [
      { label: '직접 만들어 봤어', sub: '코드, 작품, 발표자료 등', scores: { 만들다: 2, 설계하다: 1 } },
      { label: '막힌 문제를 해결했어', sub: '오류나 과제를 해결하기', scores: { 해결하다: 2, 탐구하다: 1 } },
      { label: '누군가를 도와줬어', sub: '설명, 협력, 배려하기', scores: { 돕다: 2, 연결하다: 1 } },
      { label: '새로운 사실을 알아냈어', sub: '찾아보고 실험해보기', scores: { 탐구하다: 2, 해결하다: 1 } },
      { label: '내 생각을 보여줬어', sub: '글·그림·영상·말하기', scores: { 표현하다: 2, 만들다: 1 } },
      { label: '친구들을 이어줬어', sub: '정보를 전달하고 협업하기', scores: { 연결하다: 2, 돕다: 1 } }
    ]
  },
  {
    id: 'q3', stage: '3 · 방식', text: '문제가 생겼을 때 나는 보통 어떻게 해?', options: [
      { label: '일단 직접 만들어 본다', sub: '프로토타입부터 시작', scores: { 만들다: 2, 해결하다: 1 } },
      { label: '원인을 분석한다', sub: '왜 그런지부터 확인', scores: { 해결하다: 2, 탐구하다: 1 } },
      { label: '사람에게 먼저 묻는다', sub: '함께 답을 찾기', scores: { 돕다: 1, 연결하다: 2 } },
      { label: '자료를 찾아본다', sub: '검색하고 비교하고 정리', scores: { 탐구하다: 2, 설계하다: 1 } },
      { label: '다른 방식으로 표현해 본다', sub: '관점을 바꿔보기', scores: { 표현하다: 2, 만들다: 1 } },
      { label: '전체 구조를 정리한다', sub: '순서와 역할을 나누기', scores: { 설계하다: 2, 연결하다: 1 } }
    ]
  },
  {
    id: 'q4', stage: '4 · 가치', text: '앞으로 내가 만든 결과가 어떤 의미를 가지면 좋겠어?', options: [
      { label: '사람들이 실제로 사용했으면 좋겠어', sub: '쓸모 있는 결과', scores: { 만들다: 2, 돕다: 1 } },
      { label: '복잡한 문제를 더 쉽게 만들고 싶어', sub: '효율과 해결', scores: { 해결하다: 2, 설계하다: 1 } },
      { label: '새로운 사실을 발견하고 싶어', sub: '지식과 발견', scores: { 탐구하다: 2 } },
      { label: '누군가의 삶에 도움이 되고 싶어', sub: '변화와 지원', scores: { 돕다: 2, 연결하다: 1 } },
      { label: '사람들에게 내 생각을 전하고 싶어', sub: '표현과 소통', scores: { 표현하다: 2, 연결하다: 1 } },
      { label: '서로 다른 것들을 이어보고 싶어', sub: '협업과 연결', scores: { 연결하다: 2, 설계하다: 1 } }
    ]
  }
];

const state = {
  node: 'START', questionIndex: 0, scores: structuredClone(VERBS), answers: [], topVerbs: [], jobs: [], data: null
};

const chatLog = document.getElementById('chatLog');
const choices = document.getElementById('choices');
const resultArea = document.getElementById('resultArea');
const stageLabel = document.getElementById('stageLabel');
const progressText = document.getElementById('progressText');
const progressBar = document.getElementById('progressBar');
const apiBadge = document.getElementById('apiBadge');
const resetTopBtn = document.getElementById('resetTopBtn');
const inputArea = document.getElementById('inputArea');
const freeText = document.getElementById('freeText');
const sendTextBtn = document.getElementById('sendTextBtn');

function addMessage(role, text) {
  const wrap = document.createElement('div');
  wrap.className = `msg ${role}`;
  const bubble = document.createElement('div');
  bubble.className = 'bubble';
  bubble.textContent = text;
  wrap.appendChild(bubble);
  chatLog.appendChild(wrap);
  chatLog.scrollTop = chatLog.scrollHeight;
}

function setProgress(index) {
  const total = QUESTIONS.length;
  const shown = Math.min(index, total);
  progressText.textContent = `${shown} / ${total}`;
  progressBar.style.width = `${(shown / total) * 100}%`;
}

function applyScores(scores) {
  Object.entries(scores).forEach(([verb, amount]) => {
    if (state.scores[verb]) state.scores[verb].score += amount;
  });
}

function topVerbResults() {
  return Object.entries(state.scores)
    .sort((a, b) => b[1].score - a[1].score)
    .slice(0, 3)
    .map(([verb, info]) => ({ verb, ...info }));
}

function renderQuestion() {
  const q = QUESTIONS[state.questionIndex];
  if (!q) return finishAssessment();
  state.node = `F${state.questionIndex + 1}`;
  stageLabel.textContent = q.stage;
  setProgress(state.questionIndex);
  addMessage('bot', q.text);
  choices.innerHTML = '';
  inputArea.classList.add('hidden');
  q.options.forEach(option => {
    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.type = 'button';
    btn.innerHTML = `<strong>${option.label}</strong><span>${option.sub}</span>`;
    btn.addEventListener('click', () => selectOption(q, option));
    choices.appendChild(btn);
  });
}

function selectOption(question, option) {
  state.node = `A${state.questionIndex + 1}`;
  state.answers.push({ questionId: question.id, answer: option.label });
  addMessage('user', option.label);
  applyScores(option.scores);
  choices.innerHTML = '';
  state.questionIndex += 1;
  setTimeout(renderQuestion, 160);
}

function loadStaticCareerData() {
  return fetch('data/careernet-jobs.json', { cache: 'no-store' })
    .then(response => {
      if (!response.ok) throw new Error('정적 CareerNet 데이터 파일을 찾을 수 없습니다.');
      return response.json();
    })
    .then(data => {
      state.data = data;
      const count = Number(data.count || data.jobs?.length || 0);
      if (count > 0) {
        apiBadge.className = 'api-badge ok';
        const date = data.generatedAt ? new Date(data.generatedAt) : null;
        const stamp = date && !Number.isNaN(date.valueOf()) ? ` · ${date.toLocaleDateString('ko-KR')}` : '';
        apiBadge.textContent = `CareerNet 데이터 ${count}개${stamp}`;
      } else {
        apiBadge.className = 'api-badge warn';
        apiBadge.textContent = 'CareerNet 데이터 생성 필요';
      }
    })
    .catch(error => {
      state.data = { jobs: [] };
      apiBadge.className = 'api-badge warn';
      apiBadge.textContent = 'CareerNet 데이터 없음';
      console.warn(error);
    });
}

function jobMatches(job, keyword) {
  const fields = [job.name, job.summary, job.category, job.relatedJobs, job.detail?.work, job.detail?.interest];
  return fields.some(value => String(value || '').toLowerCase().includes(keyword.toLowerCase()));
}

function collectJobsForVerbs(verbs) {
  const source = Array.isArray(state.data?.jobs) ? state.data.jobs : [];
  const seen = new Map();
  for (const item of verbs) {
    const keywords = VERB_JOB_KEYWORDS[item.verb] || [];
    for (const keyword of keywords) {
      for (const job of source.filter(j => jobMatches(j, keyword)).slice(0, 5)) {
        if (!job?.seq || seen.has(String(job.seq))) continue;
        seen.set(String(job.seq), job);
      }
    }
  }
  return [...seen.values()].slice(0, 8);
}

function finishAssessment() {
  state.node = 'F5';
  state.topVerbs = topVerbResults();
  stageLabel.textContent = '결과 · 미래 동사';
  setProgress(QUESTIONS.length);
  choices.innerHTML = '';
  addMessage('bot', '지금까지의 답변을 바탕으로 미래 동사를 정리했어.\n가장 끌리는 동사를 골라서 실제 직업 정보까지 탐색해보자.');
  renderResult();
}

function renderResult() {
  const [best] = state.topVerbs;
  resultArea.classList.remove('hidden');
  resultArea.innerHTML = `
    <div class="result-card">
      <div class="result-kicker">YOUR FUTURE VERB</div>
      <div class="result-verb">${escapeHtml(best.verb)}</div>
      <p>${escapeHtml(best.desc)}. 하나의 직업이 아니라 여러 방향으로 연결될 수 있어.</p>
      <div class="score-row">${state.topVerbs.map(v => `<span class="score-chip">${escapeHtml(v.verb)} · ${v.score}점</span>`).join('')}</div>
      <div class="section-label">관련 직업 탐색</div>
      <div id="jobList" class="job-list"></div>
      <div id="detailBox"></div>
      <div class="result-actions">
        <button id="makeSentence" class="primary-action" type="button">미래 문장 만들기</button>
        <button id="restartBtn" class="secondary-action" type="button">다시 탐색</button>
      </div>
    </div>`;

  document.getElementById('makeSentence').addEventListener('click', () => makeFutureSentence(best.verb));
  document.getElementById('restartBtn').addEventListener('click', resetApp);
  loadJobs();
}

function loadJobs() {
  const jobList = document.getElementById('jobList');
  state.jobs = collectJobsForVerbs(state.topVerbs);
  if (!state.jobs.length) {
    jobList.innerHTML = `<div class="empty-note">현재 배포본에 연결된 CareerNet 데이터에서 관련 직업을 찾지 못했어. GitHub Actions로 데이터를 다시 생성해봐.</div>`;
    return;
  }
  jobList.innerHTML = state.jobs.map(job => `
    <div class="job-item">
      <div>
        <strong>${escapeHtml(job.name)}</strong>
        <small>${escapeHtml(job.summary || job.category || 'CareerNet 직업백과 데이터')}</small>
      </div>
      <button type="button" data-seq="${escapeHtml(job.seq)}">상세</button>
    </div>`).join('');
  jobList.querySelectorAll('button').forEach(btn => btn.addEventListener('click', () => showJobDetail(btn.dataset.seq)));
}

function showJobDetail(seq) {
  const box = document.getElementById('detailBox');
  const job = state.data?.jobs?.find(item => String(item.seq) === String(seq));
  if (!job) return;
  const detail = job.detail || {};
  const careerNetUrl = `https://www.career.go.kr/cnet/front/base/job/jobView.do?SEQ=${encodeURIComponent(seq)}`;
  box.innerHTML = `
    <div class="detail">
      <h3>${escapeHtml(job.name)}</h3>
      <p><strong>하는 일</strong><br>${escapeHtml(detail.work || job.summary || '정보가 없습니다.')}</p>
      <p><strong>흥미·적성</strong><br>${escapeHtml(detail.interest || job.aptitude || '정보가 없습니다.')}</p>
      <p><strong>진로탐색활동</strong><br>${escapeHtml(detail.research || '정보가 없습니다.')}</p>
      ${job.wage ? `<p><strong>연봉 수준</strong><br>${escapeHtml(job.wage)}</p>` : ''}
      <a class="career-link" href="${careerNetUrl}" target="_blank" rel="noopener noreferrer">커리어넷에서 상세 보기 ↗</a>
    </div>`;
  box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function makeFutureSentence(bestVerb) {
  const next = document.getElementById('resultArea');
  const sentence = `나는 미래에 ${bestVerb}는 사람으로 살아가고 싶다.`;
  if (next.querySelector('.future-sentence')) return;
  next.querySelector('.result-card').insertAdjacentHTML('beforeend', `
    <div class="detail future-sentence">
      <h3>나의 미래 문장</h3>
      <p>${escapeHtml(sentence)}</p>
      <p>지금 정한 직업이 정답일 필요는 없어. 이 동사를 실천할 수 있는 다른 직업도 계속 탐색해볼 수 있어.</p>
    </div>`);
  addMessage('bot', `좋아.\n\n“${sentence}”\n\n이 문장을 출발점으로 삼아도 충분해.`);
}

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;').replaceAll("'", '&#039;');
}

function resetApp() {
  state.node = 'START'; state.questionIndex = 0; state.scores = structuredClone(VERBS);
  state.answers = []; state.topVerbs = []; state.jobs = [];
  chatLog.innerHTML = ''; resultArea.innerHTML = ''; resultArea.classList.add('hidden');
  stageLabel.textContent = '탐색 시작'; setProgress(0);
  addMessage('bot', '안녕! 나는 미래 동사를 찾는 진로 탐색 친구야.\n직업 이름부터 정하지 않고, 네가 미래에 무엇을 하고 싶은지부터 같이 찾아볼게.');
  renderQuestion();
}

resetTopBtn.addEventListener('click', resetApp);
sendTextBtn.addEventListener('click', () => {
  const text = freeText.value.trim();
  if (!text) return;
  addMessage('user', text);
  freeText.value = '';
  addMessage('bot', '좋은 생각이야! 현재 버전에서는 선택형 답변을 중심으로 미래 동사를 계산하고 있어. 지금 화면의 선택지 중 가까운 답을 골라 탐색을 이어가 봐.');
});
freeText.addEventListener('keydown', e => { if (e.key === 'Enter') sendTextBtn.click(); });

loadStaticCareerData().finally(resetApp);
