import { useState, useEffect, useRef } from "react";

const HERO_BG =
  "https://images.unsplash.com/photo-1619441207978-3d326c46e2c9?w=1920&h=1080&fit=crop&auto=format";

interface Presentation {
  id: number;
  group: string;
  title: string;
  subtitle: string;
  members: string[];
  faculty: string;
  date: string;
  tags: string[];
  pdfUrl: string;
  accent: string;
}

const PRESENTATIONS: Presentation[] = [
  {
    id: 1,
    group: "企業広報プロデュース",
    title: "成果物 01",
    subtitle: "Google Driveに保存された成果物",
    members: [],
    faculty: "武蔵野大学",
    date: "Ｒ8年度",
    tags: ["成果物"],
    pdfUrl: "https://drive.google.com/file/d/11unbz9zA6lPVVUTZcJxgxxlHMRctCLRy/view?usp=sharing",
    accent: "#c0622b",
  },
  {
    id: 2,
    group: "企業広報プロデュース",
    title: "成果物 02",
    subtitle: "Google Driveに保存された成果物",
    members: [],
    faculty: "武蔵野大学",
    date: "Ｒ8年度",
    tags: ["成果物"],
    pdfUrl: "https://drive.google.com/file/d/10UX_He4KrJqLwwOhoVC06-9eTzJaf20h/view?usp=sharing",
    accent: "#d4a843",
  },
  {
    id: 3,
    group: "企業広報プロデュース",
    title: "成果物 03",
    subtitle: "Google Driveに保存された成果物",
    members: [],
    faculty: "武蔵野大学",
    date: "Ｒ8年度",
    tags: ["成果物"],
    pdfUrl: "https://drive.google.com/file/d/1f54QOm9GvH7TWoox7jvjWm67vGoEEwxu/view?usp=sharing",
    accent: "#3a7d44",
  },
];

const LEAF_COLORS = ["#c0622b", "#d4a843", "#8b6b42"];

function UniversityMark() {
  return (
    <div
      aria-hidden="true"
      className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-white/10"
    >
      <span className="font-serif-jp text-xs font-semibold tracking-[0.12em] text-[#e1b653]">
        MU
      </span>
    </div>
  );
}

function LeafMark({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 32 32" className="h-full w-full" fill="none" aria-hidden="true">
      <path
        d="M8 24C8 14 14 7 26 5c-1 12-8 19-18 19Z"
        fill={color}
        fillOpacity=".88"
      />
      <path d="M8 24 23 9" stroke="#f5f0e8" strokeOpacity=".65" strokeWidth="1.2" />
    </svg>
  );
}

function FallingLeaves() {
  const leaves = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    color: LEAF_COLORS[i % LEAF_COLORS.length],
    left: `${Math.random() * 95}%`,
    size: `${0.8 + Math.random() * 1.2}rem`,
    duration: `${6 + Math.random() * 10}s`,
    delay: `${Math.random() * 8}s`,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {leaves.map((leaf) => (
        <div
          key={leaf.id}
          className="leaf"
          style={{
            left: leaf.left,
            width: leaf.size,
            height: leaf.size,
            animationDuration: leaf.duration,
            animationDelay: leaf.delay,
            top: "-30px",
          }}
        >
          <LeafMark color={leaf.color} />
        </div>
      ))}
    </div>
  );
}

type FieldIconKind = "rice" | "mountain" | "shrine";

function FieldIcon({ kind }: { kind: FieldIconKind }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className="mx-auto mb-3 h-8 w-8 text-[#d4a843]"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      {kind === "rice" && (
        <>
          <path d="M11 27C10 18 11 11 9 5M11 16c-3-1-5-3-6-5M11 13c2-2 4-4 5-7M11 20c-3-1-5-3-7-5" />
          <path d="M16 27c0-7 3-12 8-17M16 17c-2-1-3-3-3-5M16 13c2-1 4-3 5-5" />
        </>
      )}
      {kind === "mountain" && (
        <>
          <path d="m4 26 8-12 5 7 3-4 8 9H4Z" />
          <path d="m9 26 5-7 3 4" />
        </>
      )}
      {kind === "shrine" && (
        <>
          <path d="M5 10h22M8 10l8-5 8 5M9 13v13M23 13v13M6 26h20M13 13v13M19 13v13" />
        </>
      )}
    </svg>
  );
}

function PresentationCard({
  presentation,
  index,
}: {
  presentation: Presentation;
  index: number;
}) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), index * 100);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [index]);

  return (
    <a
      href={presentation.pdfUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block"
    >
      <div
        ref={ref}
        className={`card-hover rounded-2xl overflow-hidden cursor-pointer group ${visible ? "animate-float-up" : "opacity-0"}`}
        style={{ animationDelay: `${index * 80}ms` }}
      >
        {/* Thumbnail */}
        <div className="relative h-44 overflow-hidden bg-[#1a2535]">
          {/* Number badge */}
          <div className="absolute top-4 left-4">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm"
              style={{ background: presentation.accent }}
            >
              {presentation.id}
            </div>
          </div>
          {/* Title overlay */}
          <div className="absolute inset-0 flex flex-col justify-end p-5">
            <div className="text-white">
              <h3 className="font-serif-jp font-bold text-lg leading-tight mb-1 drop-shadow-lg">
                {presentation.title}
              </h3>
              <p className="text-xs text-white/70 leading-relaxed">{presentation.subtitle}</p>
            </div>
          </div>
          {/* Bottom accent line */}
          <div
            className="absolute bottom-0 left-0 right-0 h-0.5"
            style={{ background: presentation.accent }}
          />
        </div>

        {/* Card body */}
        <div className="bg-white p-5">
          <div className="flex items-start justify-between gap-2 mb-3">
            <div>
              <p className="font-medium text-gray-900 text-sm mb-0.5">{presentation.group}</p>
              <p className="text-xs text-gray-400">{presentation.faculty}</p>
            </div>
            <div className="text-xs text-gray-400 flex items-center gap-1 shrink-0 mt-0.5">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {presentation.date}
            </div>
          </div>

          {/* Members */}
          <div className="mb-4">
            <p className="text-xs text-gray-400 mb-1.5">メンバー</p>
            <div className="flex flex-wrap gap-1">
              {presentation.members.map((m) => (
                <span key={m} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                  {m}
                </span>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {presentation.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2.5 py-1 rounded-full font-medium"
                style={{
                  background: `${presentation.accent}15`,
                  border: `1px solid ${presentation.accent}40`,
                  color: presentation.accent,
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* CTA */}
          <span
            className="w-full py-2.5 rounded-xl text-sm font-medium text-white transition-all hover:opacity-90 active:scale-95 flex items-center justify-center gap-2"
            style={{ background: presentation.accent }}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.24M16.24 12l2.88-2.88M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            資料を開く
          </span>
        </div>
      </div>
    </a>
  );
}

function StatsBar() {
  const participantCount = new Set(PRESENTATIONS.flatMap((presentation) => presentation.members)).size;

  return (
    <div className="card-glass rounded-2xl p-6 grid grid-cols-3 gap-4 text-center">
      {[
        { value: String(PRESENTATIONS.length), label: "発表グループ" },
        { value: String(participantCount), label: "参加学生" },
        { value: "鹿角市", label: "地域" },
      ].map(({ value, label }) => (
        <div key={label}>
          <div className="font-serif-jp text-2xl font-bold text-white mb-1 gold-shimmer">
            {value}
          </div>
          <div className="text-xs text-white/60">{label}</div>
        </div>
      ))}
    </div>
  );
}

export default function App() {
  const [filter, setFilter] = useState<string>("全て");
  const allTags = ["全て", ...Array.from(new Set(PRESENTATIONS.flatMap((p) => p.tags)))];

  const filtered =
    filter === "全て"
      ? PRESENTATIONS
      : PRESENTATIONS.filter((p) => p.tags.includes(filter));

  return (
    <div className="min-h-full bg-[#0f1a25] relative overflow-x-hidden scrollbar-hide">
      <FallingLeaves />

      {/* ── Hero ── */}
      <header className="relative min-h-screen flex flex-col justify-between overflow-hidden">
        <div
          className="absolute inset-0 bg-[#162432] bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_BG})` }}
        />
        <div className="hero-bg absolute inset-0" />

        {/* Decorative circles */}
        <div className="absolute top-20 right-10 w-96 h-96 rounded-full opacity-10 blur-3xl"
          style={{ background: "radial-gradient(circle, #d4a843, transparent 70%)" }} />
        <div className="absolute bottom-40 left-5 w-64 h-64 rounded-full opacity-10 blur-2xl"
          style={{ background: "radial-gradient(circle, #3a7d44, transparent 70%)" }} />

        {/* Navbar */}
        <nav className="relative z-10 flex items-center justify-between px-6 md:px-12 py-6">
          <div className="flex items-center gap-3">
            <UniversityMark />
            <div>
              <p className="text-white/90 font-medium text-sm leading-none">武蔵野大学</p>
              <p className="text-white/50 text-xs leading-none mt-0.5">Musashino University</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <span className="text-white/60 text-sm">Ｒ8年度</span>
            <span className="text-white/60 text-sm">|</span>
            <span className="text-white/60 text-sm">秋田県 鹿角市</span>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 flex-1 flex flex-col justify-center px-6 md:px-16 lg:px-24 pb-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-8">
              <span className="w-2 h-2 rounded-full bg-[#d4a843] animate-pulse" />
              <span className="text-white/80 text-xs tracking-wider">Ｒ8年度 企業広報プロデュース</span>
            </div>

            <h1 className="font-serif-jp text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-4">
              秋田県 鹿角市
              <br />
              <span className="gold-shimmer">企業広報プロデュース</span>
              <br />
              Ｒ8年度
            </h1>

            <p className="mt-10 max-w-2xl border-l border-[#d4a843]/80 pl-5 font-serif-jp text-base md:text-xl leading-loose tracking-[0.08em] text-[#eee7d7]">
              <span className="text-[#e1b653]">秋田県鹿角市</span>の企業とともに、
              <br className="hidden md:block" />
              地域の魅力と事業の価値を伝える
              <br className="hidden md:block" />
              <span className="text-white">企業広報</span>をプロデュースします。
            </p>

            <div className="mt-8 flex items-center gap-3">
              <p className="text-white/60 text-sm">{PRESENTATIONS.length}グループが登録されています</p>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="relative z-10 flex justify-center pb-8">
          <div className="flex flex-col items-center gap-2 text-white/40">
            <span className="text-xs tracking-widest">SCROLL</span>
            <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent" />
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-16 md:h-20">
            <path
              d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z"
              fill="#0f1a25"
            />
          </svg>
        </div>
      </header>

      {/* ── Stats ── */}
      <section className="px-6 md:px-12 lg:px-24 -mt-2 mb-12 relative z-10">
        <div className="max-w-3xl mx-auto">
          <StatsBar />
        </div>
      </section>

      {/* ── Presentations ── */}
      <section className="px-6 md:px-12 lg:px-24 pb-24 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <p className="text-[#d4a843] text-xs tracking-widest uppercase mb-2">Presentations</p>
              <h2 className="font-serif-jp text-3xl md:text-4xl font-bold text-white">
                発表一覧
              </h2>
              <div className="section-divider mt-3 w-24" />
            </div>

            {/* Filter */}
            <div className="flex flex-wrap gap-2">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setFilter(tag)}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                    filter === tag
                      ? "bg-[#d4a843] text-[#1a2535]"
                      : "bg-white/10 text-white/60 hover:bg-white/20 border border-white/10"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p, i) => (
              <PresentationCard key={p.id} presentation={p} index={i} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-white/40">
              <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full border border-[#d4a843]/50 text-[#d4a843]">
                <span className="font-serif-jp text-xl">—</span>
              </div>
              <p>発表資料はまだ登録されていません</p>
            </div>
          )}
        </div>
      </section>

      {/* ── About Akita Section ── */}
      <section className="relative overflow-hidden mb-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f1a25] via-[#1a2535] to-[#0f1a25]" />

        <div className="relative z-10 px-6 md:px-12 lg:px-24 py-24 text-center max-w-3xl mx-auto">
          <p className="text-[#d4a843] text-[0.68rem] md:text-xs tracking-[0.35em] uppercase mb-5">
            About the Project
          </p>
          <h2 className="font-serif-jp text-4xl md:text-6xl font-bold tracking-[0.08em] text-[#f5f0e8] mb-7">
            秋田県 鹿角市
          </h2>
          <div className="section-divider w-20 mx-auto mb-10" />
          <p className="mx-auto max-w-3xl font-serif-jp text-base md:text-xl leading-[2.15] tracking-[0.08em] text-[#d7d1c4]">
            <span className="text-[#e1b653]">鹿角市</span>は秋田県北東部に位置する、
            <br className="hidden md:block" />
            豊かな自然と
            <span className="text-[#f5f0e8]">農業・伝統文化・観光資源</span>に恵まれたまち。
            <br className="hidden md:block" />
            地域の企業が持つ魅力と想いを見つめ、
            <br className="hidden md:block" />
            <span className="md:whitespace-nowrap">
              <span className="text-[#e1b653]">企業広報プロデュース</span>を通じて未来へつなぎます。
            </span>
          </p>

          <div className="mt-10 grid grid-cols-3 gap-6">
            {[
              { icon: "rice" as const, label: "農業・食文化" },
              { icon: "mountain" as const, label: "豊かな自然" },
              { icon: "shrine" as const, label: "歴史・伝統" },
            ].map(({ icon, label }) => (
              <div key={label} className="card-glass rounded-xl p-4 text-center">
                <FieldIcon kind={icon} />
                <p className="text-white/70 text-xs">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-[#0a1018] px-6 md:px-12 py-10 text-center relative z-10">
        <div className="section-divider w-full max-w-3xl mx-auto mb-8" />
        <div className="flex items-center justify-center gap-3 mb-4">
          <UniversityMark />
          <div className="text-left">
            <p className="text-white/80 font-medium text-sm">武蔵野大学</p>
            <p className="text-white/40 text-xs">Ｒ8年度 企業広報プロデュース</p>
          </div>
        </div>
        <p className="text-white/30 text-xs">
          © 2026 Musashino University. Corporate Communications — Kazuno, Akita.
        </p>
      </footer>
    </div>
  );
}
