import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, FileText, ListChecks, Search, MessageSquare, ArrowRight, Sparkles } from "lucide-react";

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
  { to: "/email", title: "Smart Email Generator", desc: "Draft professional emails in seconds.", icon: Mail },
  { to: "/meetings", title: "Meeting Notes Summarizer", desc: "Turn transcripts into clear summaries.", icon: FileText },
  { to: "/tasks", title: "AI Task Planner", desc: "Break goals into actionable plans.", icon: ListChecks },
  { to: "/research", title: "AI Research Assistant", desc: "Get structured briefs on any topic.", icon: Search },
  { to: "/chat", title: "AI Chatbot", desc: "Conversational assistant for any task.", icon: MessageSquare },
] as const;

function Dashboard() {
  return (
    <div>
      <section
        className="mb-8 overflow-hidden rounded-2xl border border-border p-8 text-primary-foreground"
        style={{ background: "var(--gradient-primary)" }}
      >
        <div className="flex items-center gap-2 text-sm opacity-90">
          <Sparkles className="h-4 w-4" /> Your AI workplace assistant
        </div>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
          Automate the busywork. Focus on the work that matters.
        </h1>
        <p className="mt-3 max-w-2xl text-sm opacity-90 sm:text-base">
          Five AI-powered tools designed for professionals — write emails, summarize meetings,
          plan tasks, research topics, and chat with an assistant.
        </p>
      </section>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((t) => (
          <Link key={t.to} to={t.to} className="group">
            <Card className="h-full transition-all hover:border-primary/40 hover:shadow-md">
              <CardHeader>
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                  <t.icon className="h-5 w-5" />
                </div>
                <CardTitle className="flex items-center justify-between text-base">
                  {t.title}
                  <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                </CardTitle>
                <CardDescription>{t.desc}</CardDescription>
              </CardHeader>
              <CardContent />
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}