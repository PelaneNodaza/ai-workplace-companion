import { createFileRoute } from "@tanstack/react-router";
import { Mail } from "lucide-react";
import { PageHeader } from "@/components/AiToolShell";
import { AiToolForm } from "@/components/AiToolForm";

export const Route = createFileRoute("/_app/email")({
  head: () => ({ meta: [{ title: "Smart Email Generator" }] }),
  component: EmailPage,
});

function EmailPage() {
  return (
    <div>
      <PageHeader
        icon={<Mail className="h-6 w-6" />}
        title="Smart Email Generator"
        description="Draft professional emails by describing the purpose, audience, and tone."
      />
      <AiToolForm
        systemPrompt="You are an expert professional email writer. Produce clear, concise, well-structured emails. Always include a subject line and a polished body. Output in Markdown."
        fields={[
          { name: "recipient", label: "Recipient / Audience", type: "text", placeholder: "e.g. Hiring manager at Acme Corp", required: true },
          { name: "purpose", label: "Purpose of email", type: "textarea", rows: 3, placeholder: "What do you want to communicate?", required: true },
          { name: "tone", label: "Tone", type: "text", placeholder: "e.g. Professional, friendly, persuasive" },
          { name: "keyPoints", label: "Key points to include", type: "textarea", rows: 3, placeholder: "Bullet points or notes" },
        ]}
        buildUserPrompt={(v) => `Write an email with the following details:
- Recipient: ${v.recipient}
- Purpose: ${v.purpose}
- Tone: ${v.tone || "Professional"}
- Key points: ${v.keyPoints || "(none specified)"}

Format with a Subject line and email body.`}
        submitLabel="Generate Email"
        resultTitle="Drafted Email"
      />
    </div>
  );
}