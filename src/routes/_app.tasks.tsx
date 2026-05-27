import { createFileRoute } from "@tanstack/react-router";
import { ListChecks } from "lucide-react";
import { PageHeader } from "@/components/AiToolShell";
import { AiToolForm } from "@/components/AiToolForm";

export const Route = createFileRoute("/_app/tasks")({
  head: () => ({ meta: [{ title: "AI Task Planner" }] }),
  component: TasksPage,
});

function TasksPage() {
  return (
    <div>
      <PageHeader
        icon={<ListChecks className="h-6 w-6" />}
        title="AI Task Planner"
        description="Turn a goal into a structured, prioritized action plan."
      />
      <AiToolForm
        systemPrompt="You are a productivity coach. Break goals into clear, actionable plans in Markdown. Include: ## Goal, ## Milestones, ## Tasks (with priority H/M/L and rough time estimate), ## Suggested Timeline."
        fields={[
          { name: "goal", label: "Your goal", type: "textarea", rows: 3, placeholder: "What do you want to accomplish?", required: true },
          { name: "deadline", label: "Deadline / timeframe", type: "text", placeholder: "e.g. 2 weeks, by end of Q4" },
          { name: "constraints", label: "Context & constraints", type: "textarea", rows: 3, placeholder: "Resources, team size, blockers, etc." },
        ]}
        buildUserPrompt={(v) => `Create a detailed task plan.\nGoal: ${v.goal}\nTimeframe: ${v.deadline || "Flexible"}\nConstraints: ${v.constraints || "None specified"}`}
        submitLabel="Generate Plan"
        resultTitle="Action Plan"
      />
    </div>
  );
}