import { createFileRoute } from "@tanstack/react-router";
import { FileText } from "lucide-react";
import { PageHeader } from "@/components/AiToolShell";
import { AiToolForm } from "@/components/AiToolForm";

export const Route = createFileRoute("/_app/meetings")({
  head: () => ({ meta: [{ title: "Meeting Notes Summarizer" }] }),
  component: MeetingsPage,
});

function MeetingsPage() {
  return (
    <div>
      <PageHeader
        icon={<FileText className="h-6 w-6" />}
        title="Meeting Notes Summarizer"
        description="Paste raw notes or a transcript and get a structured summary with action items."
      />
      <AiToolForm
        systemPrompt="You are an expert meeting analyst. Produce structured summaries in Markdown with these sections: ## Summary, ## Key Decisions, ## Action Items (with owner if mentioned), ## Open Questions."
        fields={[
          { name: "context", label: "Meeting context (optional)", type: "text", placeholder: "e.g. Weekly product sync, Sep 12" },
          { name: "notes", label: "Raw notes or transcript", type: "textarea", rows: 12, placeholder: "Paste meeting notes here...", required: true },
        ]}
        buildUserPrompt={(v) => `Summarize the following meeting${v.context ? ` (${v.context})` : ""}:\n\n${v.notes}`}
        submitLabel="Summarize Meeting"
        resultTitle="Meeting Summary"
      />
    </div>
  );
}