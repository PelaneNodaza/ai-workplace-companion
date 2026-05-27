import { useState, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Copy, Check, Sparkles, FileText } from "lucide-react";
import { toast } from "sonner";
import { callAI } from "@/lib/ai";
import ReactMarkdown from "react-markdown";

export type FieldDef = {
  name: string;
  label: string;
  placeholder?: string;
  type?: "text" | "textarea";
  rows?: number;
  required?: boolean;
};

type Props = {
  fields: FieldDef[];
  systemPrompt: string;
  buildUserPrompt: (values: Record<string, string>) => string;
  submitLabel?: string;
  resultTitle?: string;
  children?: ReactNode;
};

export function AiToolForm({
  fields,
  systemPrompt,
  buildUserPrompt,
  submitLabel = "Generate",
  resultTitle = "AI Output",
}: Props) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const setVal = (k: string, v: string) => setValues((p) => ({ ...p, [k]: v }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    for (const f of fields) {
      if (f.required && !values[f.name]?.trim()) {
        toast.error(`${f.label} is required`);
        return;
      }
    }
    setLoading(true);
    try {
      const content = await callAI({
        system: systemPrompt,
        messages: [{ role: "user", content: buildUserPrompt(values) }],
      });
      setOutput(content);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "AI request failed");
    } finally {
      setLoading(false);
    }
  };

  const copy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      <Card className="lg:col-span-2 border-border/70" style={{ boxShadow: "var(--shadow-card)" }}>
        <CardHeader className="border-b border-border/60 pb-4">
          <CardTitle className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            <Sparkles className="h-4 w-4 text-primary" /> Input
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-5">
          <form onSubmit={onSubmit} className="space-y-5">
            {fields.map((f) => (
              <div key={f.name} className="space-y-2">
                <label className="text-sm font-medium text-foreground/90">
                  {f.label}
                  {f.required && <span className="text-destructive"> *</span>}
                </label>
                {f.type === "text" ? (
                  <input
                    className="flex h-10 w-full rounded-lg border border-input bg-background px-3.5 py-2 text-sm shadow-sm transition placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:border-ring/60"
                    placeholder={f.placeholder}
                    value={values[f.name] || ""}
                    onChange={(e) => setVal(f.name, e.target.value)}
                  />
                ) : (
                  <Textarea
                    rows={f.rows || 4}
                    placeholder={f.placeholder}
                    value={values[f.name] || ""}
                    onChange={(e) => setVal(f.name, e.target.value)}
                    className="rounded-lg"
                  />
                )}
              </div>
            ))}
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-11 text-sm font-semibold text-primary-foreground border-0 shadow-md hover:opacity-95 transition"
              style={{ background: "var(--gradient-primary)" }}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...
                </>
              ) : (
                <><Sparkles className="mr-2 h-4 w-4" /> {submitLabel}</>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="lg:col-span-3 border-border/70" style={{ boxShadow: "var(--shadow-card)" }}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 border-b border-border/60 pb-4">
          <CardTitle className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            <FileText className="h-4 w-4 text-primary" /> {resultTitle}
          </CardTitle>
          {output && (
            <Button variant="outline" size="sm" onClick={copy} className="h-8 gap-1.5 text-xs">
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? "Copied" : "Copy"}
            </Button>
          )}
        </CardHeader>
        <CardContent className="pt-5">
          {output ? (
            <div className="space-y-4">
              <div className="rounded-xl border border-border/70 bg-gradient-to-b from-muted/40 to-background p-5 text-sm prose prose-sm max-w-none dark:prose-invert prose-headings:font-semibold prose-headings:tracking-tight prose-p:leading-relaxed">
                <ReactMarkdown>{output}</ReactMarkdown>
              </div>
              <details className="group rounded-lg border border-dashed border-border/70 bg-muted/20">
                <summary className="cursor-pointer list-none px-4 py-2.5 text-xs font-medium text-muted-foreground hover:text-foreground transition flex items-center justify-between">
                  <span>Edit raw output (Markdown)</span>
                  <span className="text-[10px] opacity-60 group-open:hidden">Click to expand</span>
                </summary>
                <div className="border-t border-border/60 p-3">
                  <Textarea
                    value={output}
                    onChange={(e) => setOutput(e.target.value)}
                    rows={14}
                    className="font-mono text-xs rounded-lg"
                  />
                </div>
              </details>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center py-16 px-6 rounded-xl border border-dashed border-border/70 bg-muted/20">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-2xl text-primary-foreground mb-4"
                style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-soft)" }}
              >
                <Sparkles className="h-5 w-5" />
              </div>
              <p className="text-sm font-medium text-foreground/80">Your AI output will appear here</p>
              <p className="mt-1 text-xs text-muted-foreground max-w-sm">
                Fill in the form on the left and click generate. Outputs are fully editable and ready to copy.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}