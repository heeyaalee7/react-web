import { useEffect, useMemo, useState } from 'react'

const newsData = [
  {
    source: 'Reuters · 4/13',
    title: 'TSMC, 강한 AI 수요에 힘입어 4분기 연속 사상 최대 실적 기대',
    summary:
      'AI 반도체 수요가 계속 늘면서 TSMC의 실적 전망이 다시 높아지고 있습니다.',
    link: 'https://www.reuters.com/world/asia-pacific/tsmc-likely-book-fourth-straight-quarter-record-profit-on-insatiable-ai-demand-2026-04-13/',
  },
  {
    source: 'Reuters · 4/13',
    title: 'Meta, 2026년 디지털 광고 매출에서 Google 추월 전망',
    summary:
      '자동화 광고 시스템과 신규 광고 지면 확대로 광고 시장 판도가 흔들리고 있습니다.',
    link: 'https://www.reuters.com/business/media-telecom/meta-poised-surpass-google-digital-ad-revenue-first-time-report-says-2026-04-13/',
  },
  {
    source: 'Reuters · 4/9',
    title: 'SiFive, 데이터센터용 칩 기술 확대 위해 4억 달러 투자 유치',
    summary:
      'RISC-V 기반 서버용 CPU 개발 경쟁이 더 본격화되는 흐름입니다.',
    link: 'https://www.reuters.com/business/sifive-raises-400-million-atreides-nvidia-data-center-chip-technology-2026-04-09/',
  },
  {
    source: 'Reuters · 4/9',
    title: 'Intel·Google, AI 추론용 CPU와 인프라 협력 확대',
    summary:
      '훈련 중심에서 추론 중심으로 이동하는 AI 인프라 전략이 강화되고 있습니다.',
    link: 'https://www.reuters.com/business/intel-google-double-down-ai-cpus-with-expanded-partnership-2026-04-09/',
  },
]

const initialTodoItems = [
  { id: 1, text: '이메일과 오늘 일정을 먼저 확인하기', done: true },
  { id: 2, text: '가장 중요한 업무 1가지를 우선 시작하기', done: false },
  { id: 3, text: '수업 또는 회의 자료를 마지막으로 점검하기', done: false },
  { id: 4, text: '하루 마무리 전에 완료 여부 체크하기', done: false },
]

function MemoCard({ colorClass, rotateClass, title, label, children }) {
  return (
    <article className={`memo-card ${colorClass} ${rotateClass}`}>
      <div className="memo-tape" />
      <div className="memo-header">
        <h2>{title}</h2>
        <span className="memo-label">{label}</span>
      </div>
      <div className="memo-body">{children}</div>
    </article>
  )
}

function TodoItem({ item, onToggle }) {
  return (
    <button
      type="button"
      className={`todo-item ${item.done ? 'done' : ''}`}
      onClick={() => onToggle(item.id)}
      aria-pressed={item.done}
    >
      <span className="todo-check">{item.done ? '✓' : ''}</span>
      <span className="todo-text">{item.text}</span>
    </button>
  )
}

function NewsItem({ item }) {
  return (
    <a className="news-item" href={item.link} target="_blank" rel="noopener noreferrer">
      <span className="news-source">{item.source}</span>
      <div className="news-title">{item.title}</div>
      <div className="news-summary">{item.summary}</div>
    </a>
  )
}

export default function App() {
  const [now, setNow] = useState(() => new Date())
  const [todoItems, setTodoItems] = useState(initialTodoItems)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setNow(new Date())
    }, 1000)

    return () => window.clearInterval(timer)
  }, [])

  const formattedDate = useMemo(
    () =>
      now.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
      }),
    [now],
  )

  const formattedTime = useMemo(
    () =>
      now.toLocaleTimeString('ko-KR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }),
    [now],
  )

  const ampmText = now.getHours() < 12 ? '오전' : '오후'

  function toggleTodo(id) {
    setTodoItems((current) =>
      current.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item,
      ),
    )
  }

  return (
    <div className="app-shell">
      <div className="container">
        <header className="topbar">
          <div className="title-wrap">
            <h1>나만의 시작 홈페이지</h1>
            <p>
              현재 시간, 오늘의 할 일, 오늘의 날씨, 최신 기술 뉴스를 메모지처럼 정리한 첫
              화면입니다.
            </p>
          </div>
          <div className="date-badge">📍 대구 기준 · 2026-04-14</div>
        </header>

        <section className="memo-grid">
          <MemoCard colorClass="memo-yellow" rotateClass="rotate-left" title="현재 시간" label="Asia/Seoul">
            <div className="date-text">{formattedDate}</div>
            <div className="time-text">{formattedTime}</div>
            <div className="ampm-text">{ampmText}</div>
            <div className="sub-note">브라우저 시간 기준으로 매초 자동 갱신됩니다.</div>
          </MemoCard>

          <MemoCard
            colorClass="memo-pink"
            rotateClass="rotate-right"
            title="오늘의 할 일"
            label={`${todoItems.length}개 항목`}
          >
            <div className="todo-list">
              {todoItems.map((item) => (
                <TodoItem key={item.id} item={item} onToggle={toggleTodo} />
              ))}
            </div>
            <div className="sub-note">작은 일부터 하나씩 완료 표시해 보세요.</div>
          </MemoCard>

          <MemoCard colorClass="memo-blue" rotateClass="rotate-left-soft" title="오늘의 날씨" label="대구">
            <div className="weather-main">
              <div>
                <div className="weather-temp">17°C</div>
                <div className="weather-desc">대체로 흐림 · 최고 18°C / 최저 10°C</div>
              </div>
              <div className="weather-icon">☁️</div>
            </div>

            <div className="weather-list">
              <div className="mini-box">
                <strong>현재 상태</strong>
                <p>흐림</p>
              </div>
              <div className="mini-box">
                <strong>내일</strong>
                <p>구름이 줄어듦 · 최고 25°C</p>
              </div>
              <div className="mini-box">
                <strong>주간 흐름</strong>
                <p>금요일 가벼운 비, 주말은 맑고 따뜻함</p>
              </div>
            </div>
          </MemoCard>

          <MemoCard
            colorClass="memo-green"
            rotateClass="rotate-right-soft"
            title="최신 기술 뉴스"
            label="최근 헤드라인"
          >
            <div className="news-list">
              {newsData.map((item, index) => (
                <NewsItem key={`${item.source}-${index}`} item={item} />
              ))}
            </div>
          </MemoCard>
        </section>

        <p className="footer-note">
          시간은 실시간으로 갱신되고, 날씨와 뉴스는 2026년 4월 14일 기준 내용으로 반영한
          예시입니다.
        </p>
      </div>
    </div>
  )
}
