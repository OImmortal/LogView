import React from "react";

/** Dados mockados — isolados da árvore de componentes */
const MOCK_METRICS = [
  {
    id: "total-errors",
    label: "Total de erros",
    borderClass: "border-primary",
    variant: "trend",
    value: "1,284",
    trend: "down",
    trendLabel: "-12%",
    trendColorClass: "text-secondary",
  },
  {
    id: "critical-errors",
    label: "Erros críticos",
    borderClass: "border-error",
    variant: "trend",
    value: "42",
    trend: "up",
    trendLabel: "+5%",
    trendColorClass: "text-error",
  },
  {
    id: "grouped-errors",
    label: "Erros agrupados",
    borderClass: "border-tertiary",
    variant: "compression",
    value: "14.2x",
    valueClassName: "text-tertiary",
    sublabel: "Taxa de compressão",
  },
  {
    id: "success-rate",
    label: "Success Rate",
    borderClass: "border-secondary",
    variant: "progress",
    value: "88%",
    progressPercent: 88,
  },
];

const MOCK_CHART_BARS = [
  { heightPercent: 40, isAnomaly: false },
  { heightPercent: 35, isAnomaly: false },
  { heightPercent: 55, isAnomaly: false },
  { heightPercent: 85, isAnomaly: true },
  { heightPercent: 65, isAnomaly: false },
  { heightPercent: 30, isAnomaly: false },
  { heightPercent: 25, isAnomaly: false },
  { heightPercent: 45, isAnomaly: false },
  { heightPercent: 70, isAnomaly: false },
  { heightPercent: 60, isAnomaly: false },
  { heightPercent: 40, isAnomaly: false },
  { heightPercent: 20, isAnomaly: false },
];

const MOCK_AI_INSIGHT = {
  title: "Sugestões para o Incidente",
  badgeLabel: "Ativo",
  detectedPatternLabel: "Detected Pattern",
  patternQuote: "'Recurrent Connection Timeout in System Alpha'",
  checklist: [
    "Database node 3 is showing high latency (450ms+).",
    "Triggered by high volume of async tasks in RN-08.",
  ],
  ctaLabel: "Analisar com IA",
};

const MOCK_INCIDENTS = [
  {
    id: "1",
    timestamp: "2024-05-20 14:45:02",
    system: "System Alpha",
    criticality: "Critical",
    message:
      "NullReferenceException: Object reference not set to an instance...",
    occurrences: "243",
  },
  {
    id: "2",
    timestamp: "2024-05-20 14:42:15",
    system: "Auth Service",
    criticality: "Alert",
    message: "500 Internal Server Error: IdentityProvider unreachable",
    occurrences: "56",
  },
  {
    id: "3",
    timestamp: "2024-05-20 14:40:55",
    system: "Gateway V2",
    criticality: "Info",
    message: "Gateway Timeout: Upstream response latency above 2000ms",
    occurrences: "892",
  },
  {
    id: "4",
    timestamp: "2024-05-20 14:38:11",
    system: "Payment Hub",
    criticality: "Solved",
    message: "SocketException: Connection refused (resolved by auto-restart)",
    occurrences: "12",
  },
];

const MOCK_NAV_LINKS = [
  { label: "Dashboard", href: "#", active: true },
  { label: "Log Stream", href: "#", active: false },
  { label: "Security", href: "#", active: false },
  { label: "AI Insights", href: "#", active: false },
];

const MOCK_TIME_RANGE_OPTIONS = ["Last hour", "Last 24h", "Last 7 days"];

const MOCK_TABS = [
  { id: "overview", label: "Overview", active: true },
  { id: "raw", label: "Raw Logs", active: false },
  { id: "incidents", label: "Incidents", active: false },
];

const CHART_AXIS_LABELS = ["00:00", "06:00", "12:00", "18:00", "23:59"];

const CRITICALITY_BADGE = {
  Critical:
    "px-3 py-1 rounded-full bg-error/20 text-error text-[10px] uppercase font-bold border border-error/30",
  Alert:
    "px-3 py-1 rounded-full bg-tertiary/20 text-tertiary text-[10px] uppercase font-bold border border-tertiary/30",
  Info: "px-3 py-1 rounded-full bg-primary/20 text-primary text-[10px] uppercase font-bold border border-primary/30",
  Solved:
    "px-3 py-1 rounded-full bg-secondary/20 text-secondary text-[10px] uppercase font-bold border border-secondary/30",
};

const DASHBOARD_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Montserrat:wght@400;500;600;700;800&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
  @keyframes pulse-emerald { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.2); } }
  .pulse-live { animation: pulse-emerald 2s infinite ease-in-out; }
  .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
`;

function Navbar() {
  return (
    <nav className="w-full bg-slate-900 border-b border-slate-800 px-8 py-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-8">
          <h2 className="text-lg font-bold text-indigo-100 font-headline">
            CNPJ: 12.345.678/0001-99
          </h2>
          <div className="hidden md:flex items-center gap-6">
            {MOCK_NAV_LINKS.map((link) => (
              <a
                key={link.label}
                className={
                  link.active
                    ? "text-sm font-bold text-primary hover:text-primary-dim transition-colors"
                    : "text-sm font-medium text-slate-400 hover:text-indigo-300 transition-colors"
                }
                href={link.href}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4 border-r border-slate-800 pr-6 mr-2">
            <select
              className="bg-surface-container-high border-none rounded-lg text-xs text-on-surface py-1.5 focus:ring-1 focus:ring-primary min-w-[120px]"
              defaultValue="Last 24h"
            >
              {MOCK_TIME_RANGE_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-slate-400 cursor-pointer hover:text-white transition-colors">
                <input
                  defaultChecked
                  className="w-3 h-3 rounded border-slate-700 bg-slate-800 text-primary focus:ring-primary"
                  type="checkbox"
                />
                Critical
              </label>
              <label className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-slate-400 cursor-pointer hover:text-white transition-colors">
                <input
                  defaultChecked
                  className="w-3 h-3 rounded border-slate-700 bg-slate-800 text-tertiary focus:ring-tertiary"
                  type="checkbox"
                />
                Alert
              </label>
              <label className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-slate-400 cursor-pointer hover:text-white transition-colors">
                <input
                  className="w-3 h-3 rounded border-slate-700 bg-slate-800 text-secondary focus:ring-secondary"
                  type="checkbox"
                />
                Info
              </label>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-slate-500 hover:text-white cursor-pointer text-xl">
              help
            </span>
            <span className="material-symbols-outlined text-slate-500 hover:text-error cursor-pointer text-xl">
              logout
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
}

function PageHeader() {
  return (
    <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-secondary bg-secondary/10 px-2 py-0.5 rounded">
            Authenticated
          </span>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-secondary pulse-live" />
            <span className="text-xs font-bold text-secondary">
              LIVE WebSocket Connected
            </span>
          </div>
        </div>
        <h1 className="text-4xl font-headline font-extrabold tracking-tight text-on-background">
          System Analytics
        </h1>
        <p className="text-slate-400 mt-2 max-w-xl">
          Monitoring real-time performance and log health for{" "}
          <span className="text-primary font-bold">RN-10: System Alpha</span>
        </p>
      </div>
      <div className="flex gap-4">
        <div className="bg-surface-container-low p-1 rounded-xl flex">
          {MOCK_TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={
                tab.active
                  ? "px-4 py-2 text-xs font-bold bg-surface-container-highest text-primary rounded-lg transition-all shadow-lg"
                  : "px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-300 transition-all"
              }
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}

function MetricCard({ metric }) {
  return (
    <div
      className={`bg-surface-container-low p-6 rounded-xl transition-all hover:bg-surface-container border-l-4 ${metric.borderClass}`}
    >
      <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">
        {metric.label}
      </p>
      {metric.variant === "trend" && (
        <div className="flex items-end gap-2">
          <span className="text-3xl font-black font-headline">{metric.value}</span>
          <span
            className={`${metric.trendColorClass} text-xs font-bold mb-1 flex items-center`}
          >
            <span className="material-symbols-outlined text-xs">
              {metric.trend === "down" ? "trending_down" : "trending_up"}
            </span>{" "}
            {metric.trendLabel}
          </span>
        </div>
      )}
      {metric.variant === "compression" && (
        <div className="flex items-end gap-2">
          <span
            className={`text-3xl font-black font-headline ${metric.valueClassName ?? ""}`}
          >
            {metric.value}
          </span>
          <span className="text-slate-500 text-[10px] mb-1 font-medium">
            {metric.sublabel}
          </span>
        </div>
      )}
      {metric.variant === "progress" && (
        <div className="flex items-end gap-2">
          <span className="text-3xl font-black font-headline">{metric.value}</span>
          <div className="w-full h-1.5 bg-slate-800 rounded-full mb-2 overflow-hidden flex-1 max-w-[60px]">
            <div
              className="bg-secondary h-full"
              style={{ width: `${metric.progressPercent}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function ErrorTrendsChart() {
  return (
    <div className="lg:col-span-2 bg-surface-container-low p-8 rounded-2xl relative overflow-hidden group">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h3 className="text-xl font-bold font-headline mb-1">
            Error Trends Over Time
          </h3>
          <p className="text-slate-500 text-sm">
            Visualizing the last 24 hours of system stability
          </p>
        </div>
        <div className="flex gap-2">
          <span className="w-3 h-3 rounded-full bg-primary" />
          <span className="w-3 h-3 rounded-full bg-error" />
        </div>
      </div>
      <div className="h-64 flex items-end justify-between gap-2 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent" />
        {MOCK_CHART_BARS.map((bar, i) => (
          <div
            key={i}
            className={
              bar.isAnomaly
                ? "bg-error/30 w-full rounded-t-sm hover:bg-error/50 transition-all cursor-pointer"
                : "bg-primary/20 w-full rounded-t-sm hover:bg-primary/40 transition-all cursor-pointer"
            }
            style={{ height: `${bar.heightPercent}%` }}
          />
        ))}
      </div>
      <div className="flex justify-between mt-4 text-[10px] text-slate-600 font-bold uppercase tracking-widest">
        {CHART_AXIS_LABELS.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>
    </div>
  );
}

function InsightCard() {
  const insight = MOCK_AI_INSIGHT;
  return (
    <div className="bg-gradient-to-br from-indigo-900/40 to-slate-900 p-8 rounded-2xl border border-primary/20 flex flex-col justify-between group">
      <div>
        <div className="flex items-center gap-2 mb-6">
          <span
            className="material-symbols-outlined text-primary"
            data-weight="fill"
          >
            psychology
          </span>
          <h3 className="text-xl font-bold font-headline">{insight.title}</h3>
          <span className="text-[10px] bg-primary/20 text-primary px-2 py-0.5 rounded-full font-bold ml-auto">
            {insight.badgeLabel}
          </span>
        </div>
        <div className="bg-primary/5 p-4 rounded-xl mb-6 border border-primary/20">
          <p className="text-primary text-[10px] uppercase font-bold tracking-[0.2em] mb-2">
            {insight.detectedPatternLabel}
          </p>
          <p className="text-on-background font-bold mb-4 leading-snug">
            {insight.patternQuote}
          </p>
          <div className="space-y-3">
            {insight.checklist.map((line, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <span className="material-symbols-outlined text-xs text-secondary mt-1">
                  check_circle
                </span>
                <p className="text-xs text-slate-400">{line}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <button
        type="button"
        className="w-full py-4 bg-primary text-on-primary font-black rounded-lg hover:bg-primary-dim transition-all shadow-[0_0_20px_rgba(163,166,255,0.3)] flex items-center justify-center gap-2"
      >
        <span className="material-symbols-outlined">auto_awesome</span>
        {insight.ctaLabel}
      </button>
    </div>
  );
}

function IncidentTable() {
  const totalRecurring = 12;
  const showing = MOCK_INCIDENTS.length;

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-headline font-bold">Recent Incident Stream</h3>
        <div className="flex gap-4">
          <div className="flex items-center gap-2 text-slate-400 text-sm">
            <span className="w-2 h-2 rounded-full bg-error" /> Critical
          </div>
          <div className="flex items-center gap-2 text-slate-400 text-sm">
            <span className="w-2 h-2 rounded-full bg-tertiary" /> Alert
          </div>
        </div>
      </div>
      <div className="bg-surface-container-low rounded-2xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-950/30 text-[10px] text-slate-500 uppercase tracking-[0.2em] font-bold">
              <th className="py-5 px-6">Timestamp</th>
              <th className="py-5 px-6">System</th>
              <th className="py-5 px-6">Criticality</th>
              <th className="py-5 px-6">Error Message (Agrupado)</th>
              <th className="py-5 px-6 text-right">Occurrences</th>
            </tr>
          </thead>
          <tbody className="text-sm font-medium">
            {MOCK_INCIDENTS.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-slate-800/30 transition-colors cursor-pointer group border-b border-white/5"
              >
                <td className="py-4 px-6 text-slate-400">{row.timestamp}</td>
                <td className="py-4 px-6 font-bold text-on-background">
                  {row.system}
                </td>
                <td className="py-4 px-6">
                  <span className={CRITICALITY_BADGE[row.criticality]}>
                    {row.criticality}
                  </span>
                </td>
                <td className="py-4 px-6 text-on-background group-hover:text-primary transition-colors">
                  {row.message}
                </td>
                <td className="py-4 px-6 text-right font-headline font-bold text-lg">
                  {row.occurrences}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="p-6 bg-slate-950/20 flex justify-between items-center text-slate-500 text-xs">
          <span>
            Showing {showing} of {totalRecurring} recurring errors
          </span>
          <button
            type="button"
            className="text-primary hover:underline font-bold"
          >
            View Full History
          </button>
        </div>
      </div>
    </section>
  );
}

function WebSocketBanner() {
  return (
    <div className="mt-12 bg-error-container/20 border border-error/20 p-4 rounded-xl flex items-center justify-between">
      <div className="flex items-center gap-4">
        <span className="material-symbols-outlined text-error">warning</span>
        <p className="text-sm text-on-error-container font-medium">
          WebSocket connection unstable. Real-time updates may be delayed.
        </p>
      </div>
      <button
        type="button"
        className="bg-error text-on-error px-6 py-2 rounded-lg font-bold text-xs hover:bg-error-dim transition-all"
      >
        Retry Connection
      </button>
    </div>
  );
}

function Footer() {
  return (
    <footer className="w-full py-12 px-8 bg-slate-900 mt-20 border-t border-slate-800">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 max-w-7xl mx-auto">
        <div className="flex flex-col items-center md:items-start gap-2">
          <span className="text-lg font-bold text-indigo-100 font-headline uppercase">
            Nocturnal Curator
          </span>
          <p className="text-slate-500 text-sm">
            © 2024 Nocturnal Curator. All rights reserved.
          </p>
        </div>
        <div className="flex gap-8 font-['Plus_Jakarta_Sans'] text-sm tracking-wide">
          <a
            className="text-slate-500 hover:text-indigo-300 transition-colors"
            href="#"
          >
            Privacy Policy
          </a>
          <a
            className="text-slate-500 hover:text-indigo-300 transition-colors"
            href="#"
          >
            Terms of Service
          </a>
          <a
            className="text-slate-500 hover:text-indigo-300 transition-colors"
            href="#"
          >
            Cookie Policy
          </a>
        </div>
        <div className="flex gap-4">
          <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-500 hover:bg-primary hover:text-on-primary transition-all cursor-pointer">
            <span className="material-symbols-outlined text-sm">terminal</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-500 hover:bg-primary hover:text-on-primary transition-all cursor-pointer">
            <span className="material-symbols-outlined text-sm">hub</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function Dashboard() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: DASHBOARD_STYLES }} />
      <div className="dark bg-surface text-on-surface antialiased overflow-x-hidden min-h-screen">
        <Navbar />
        <main className="px-8 pb-12 min-h-screen pt-8 max-w-7xl mx-auto">
          <PageHeader />
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {MOCK_METRICS.map((m) => (
              <MetricCard key={m.id} metric={m} />
            ))}
          </section>
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <ErrorTrendsChart />
            <InsightCard />
          </section>
          <IncidentTable />
          <WebSocketBanner />
        </main>
        <Footer />
      </div>
    </>
  );
}
