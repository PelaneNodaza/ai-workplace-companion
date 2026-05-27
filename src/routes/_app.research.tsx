import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { PageHeader } from "@/components/AiToolShell";
import { AiToolForm } from "@/components/AiToolForm";

export const Route = createFileRoute("/_app/research")({
  head: () => ({ meta: [{ title: "AI Research Assistant" }] }),
  component: ResearchPage,
});

function ResearchPage() {
  return (
    <div>
      <PageHeader
        icon={<Search className="h-6 w-6" />}
        title="AI Research Assistant"
        description="Get a structured brief on any topic — overview, key facts, pros & cons, and next steps."
      />
      <AiToolForm
        systemPrompt="You are a research analyst. Produce well-structured briefs in Markdown with: ## Overview, ## Key Facts, ## Pros, ## Cons, ## Notable Examples, ## Recommended Next Steps. Be concise and factual. Note clearly when something may need verification."
        fields={[
          { name: "topic", label: "Topic or question", type: "textarea", rows: 3, placeholder: "What do you want to research?", required: true },
          { name: "audience", label: "Audience", type: "text", placeholder: "e.g. Executive summary for CEO" },
          { name: "depth", label: "Depth", type: "text", placeholder: "e.g. Brief overview, deep dive" },
        ]}
        buildUserPrompt={(v) => `Research the following:\nTopic: ${v.topic}\nAudience: ${v.audience || "General professional"}\nDepth: ${v.depth || "Standard brief"}`}
        submitLabel="Research Topic"
        resultTitle="Research Brief"
      />
    </div>
  );
}