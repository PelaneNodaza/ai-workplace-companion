import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, FileText, ListChecks, Search, MessageSquare, ArrowRight, Sparkles, Zap, ShieldCheck, Clock } from "lucide-react";

export const Route = createFileRoute("/_app/")({
  head: () => ({
    meta: [
      { title: "Dashboard — AI Workplace Productivity" },
      { name: "description", content: "AI tools to automate workplace tasks: emails, meetings, planning, research and chat." },
    ],
  }),
  component: Dashboard,
});

const tools = [
  { to: "/email", title: "Smart Email Generator", desc: "Draft polished, on-brand emails in seconds with tone and audience controls.", icon: Mail, gradient: "var(--gradient-email)", tag: "Writing" },
  { to: "/meetings", title: "Meeting Summarizer", desc: "Turn raw transcripts into structured summaries, decisions and action items.", icon: FileText, gradient: "var(--gradient-meeting)", tag: "Productivity" },
  { to: "/tasks", title: "AI Task Planner", desc: "Break ambitious goals into prioritized, time-boxed action plans.", icon: ListChecks, gradient: "var(--gradient-tasks)", tag: "Planning" },
  { to: "/research", title: "Research Assistant", desc: "Get executive-ready briefs with key facts, pros, cons and next steps.", icon: Search, gradient: "var(--gradient-research)", tag: "Research" },
  { to: "/chat", title: "AI Chatbot", desc: "A conversational assistant for brainstorming, drafting and quick answers.", icon: MessageSquare, gradient: "var(--gradient-chat)", tag: "Assistant" },
] as const;

const stats = [
  { icon: Zap, label: "Avg. response", value: "< 3s" },
  { icon: Clock, label: "Time saved / week", value: "5–8 hrs" },
  { icon: ShieldCheck, label: "Editable outputs", value: "100%" },
];

function Dashboard() {
  return (
    <div>
      <section
        className="relative mb-10 overflow-hidden rounded-3xl border border-border p-8 sm:p-12 text-primary-foreground"
        style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-elegant)" }}
      >
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-white/5 blur-3xl" />
        <div className="relative">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" /> Your AI workplace assistant
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
            Automate the busywork.<br />
            <span className="opacity-80">Focus on what matters.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-sm opacity-90 sm:text-base">
            Five AI-powered tools designed for professionals — write emails, summarize meetings,
            plan tasks, research topics, and chat with an assistant.
          </p>
          <div className="mt-8 grid max-w-2xl grid-cols-3 gap-4 sm:gap-8">
            {stats.map((s) => (
              <div key={s.label} className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/15 backdrop-blur">
                  <s.icon className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-base font-semibold sm:text-lg">{s.value}</div>
                  <div className="text-[11px] uppercase tracking-wider opacity-75">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mb-4 flex items-baseline justify-between">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">AI Tools</h2>
          <p className="text-sm text-muted-foreground">Pick a workflow to get started.</p>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((t) => (
          <Link key={t.to} to={t.to} className="group block">
            <Card
              className="relative h-full overflow-hidden border-border/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <div
                className="absolute inset-x-0 top-0 h-1 opacity-80"
                style={{ background: t.gradient }}
              />
              <CardHeader className="pb-3">
                <div className="mb-3 flex items-center justify-between">
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-xl text-white shadow-sm transition-transform duration-300 group-hover:scale-105"
                    style={{ background: t.gradient }}
                  >
                    <t.icon className="h-5 w-5" />
                  </div>
                  <span className="rounded-full bg-muted px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    {t.tag}
                  </span>
                </div>
                <CardTitle className="text-base font-semibold">{t.title}</CardTitle>
                <CardDescription className="text-sm leading-relaxed">{t.desc}</CardDescription>
              </CardHeader>
              <CardContent>
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  Open tool <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}