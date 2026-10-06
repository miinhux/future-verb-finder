import fs from 'node:fs/promises';
import path from 'node:path';

const API_KEY = process.env.CAREER_NET_API_KEY || '';
const BASE = 'https://www.career.go.kr/cnet/front/openapi';
const OUT = path.resolve('data/careernet-jobs.json');
const SEARCH_TERMS = [
  '소프트웨어', '데이터', '연구원', '과학', '디자이너', '제품디자이너',
  '사회복지', '상담', '간호', '작가', '콘텐츠', '기획', '마케팅', '건축', '엔지니어'
];
const RESULT_LIMIT_PER_TERM = 6;
const DETAIL_LIMIT = 60;

if (!API_KEY) {
  console.error('CAREER_NET_API_KEY is not set.');
  process.exit(1);
}

function normalizeJobs(data) {
  // The API has returned both a direct jobs array and nested job nodes over time.
  const node = data?.jobs?.job ?? data?.jobs?.jobs ?? data?.jobs ?? data?.job ?? [];
  if (Array.isArray(node)) return node;
  if (node && typeof node === 'object') return [node];
  return [];
}

function normalizeTextList(value, keys = []) {
  const getText = (item) => {
    if (typeof item === 'string') return item;
    if (!item || typeof item !== 'object') return '';
    for (const key of keys) if (item[key]) return String(item[key]);
    return Object.values(item).find(v => typeof v === 'string') || '';
  };
  if (Array.isArray(value)) return value.map(getText).filter(Boolean).join(' ');
  if (value && typeof value === 'object') return Object.values(value).map(getText).filter(Boolean).join(' ');
  return String(value || '');
}

async function fetchJson(endpoint, params = {}) {
  const url = new URL(`${BASE}/${endpoint}`);
  url.searchParams.set('apiKey', API_KEY);
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && String(value).trim() !== '') {
      url.searchParams.set(key, String(value));
    }
  }
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${endpoint} HTTP ${response.status}`);
  return response.json();
}

const bySeq = new Map();

for (const term of SEARCH_TERMS) {
  try {
    const data = await fetchJson('jobs.json', { pageIndex: 1, searchJobNm: term });
    for (const job of normalizeJobs(data).slice(0, RESULT_LIMIT_PER_TERM)) {
      const seq = String(job.job_cd ?? job.seq ?? job.jobSeq ?? '').trim();
      const name = String(job.job_nm ?? job.jobNm ?? job.name ?? '').trim();
      if (!seq || !name || bySeq.has(seq)) continue;
      bySeq.set(seq, {
        seq,
        name,
        summary: String(job.work ?? job.social ?? '').trim(),
        category: String(job.tob_nm ?? '').trim(),
        aptitude: String(job.aptit_name ?? '').trim(),
        wage: String(job.wage ?? '').trim(),
        relatedJobs: String(job.rel_job_nm ?? '').trim(),
        detail: null,
        matchedTerm: term,
        source: 'CareerNet Open API'
      });
    }
  } catch (error) {
    console.warn(`Search skipped: ${term}: ${error.message}`);
  }
}

const selected = [...bySeq.values()].slice(0, DETAIL_LIMIT);

for (let i = 0; i < selected.length; i += 1) {
  const job = selected[i];
  try {
    const data = await fetchJson('job.json', { seq: job.seq });
    const baseInfo = data?.baseInfo ?? data?.job ?? {};
    job.name = String(baseInfo.job_nm ?? baseInfo.jobNm ?? job.name).trim();
    job.detail = {
      work: normalizeTextList(data?.workList?.work ?? data?.workList, ['work']),
      interest: normalizeTextList(data?.interestList?.interest ?? data?.interestList, ['interest']),
      research: normalizeTextList(data?.researchList?.research ?? data?.researchList, ['research']),
      aptitude: String(baseInfo.aptit_name ?? job.aptitude).trim(),
      category: String(baseInfo.job_group_nm ?? baseInfo.tob_nm ?? job.category).trim()
    };
  } catch (error) {
    console.warn(`Detail skipped: ${job.name}: ${error.message}`);
  }
}

await fs.mkdir(path.dirname(OUT), { recursive: true });
await fs.writeFile(OUT, JSON.stringify({
  generatedAt: new Date().toISOString(),
  source: 'CareerNet Open API',
  count: selected.length,
  jobs: selected
}, null, 2), 'utf8');

console.log(`Saved ${selected.length} CareerNet jobs to ${OUT}`);
