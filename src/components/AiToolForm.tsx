import { useState, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Copy, Check } from "lucide-react";
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
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Input</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            {fields.map((f) => (
              <div key={f.name} className="space-y-1.5">
                <label className="text-sm font-medium">
                  {f.label}
                  {f.required && <span className="text-destructive"> *</span>}
                </label>
                {f.type === "text" ? (
                  <input
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
                  />
                )}
              </div>
            ))}
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...
                </>
              ) : (
                submitLabel
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-base">{resultTitle}</CardTitle>
          {output && (
            <Button variant="ghost" size="sm" onClick={copy}>
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          )}
        </CardHeader>
        <CardContent>
          {output ? (
            <>
              <Textarea
                value={output}
                onChange={(e) => setOutput(e.target.value)}
                rows={14}
                className="font-mono text-xs"
              />
              <div className="mt-4 rounded-md border border-border bg-muted/40 p-3 text-sm prose prose-sm max-w-none dark:prose-invert">
                <ReactMarkdown>{output}</ReactMarkdown>
              </div>
            </>
          ) : (
            <p className="text-sm text-muted-foreground">
              Fill in the form and generate to see AI output here. Outputs are fully editable.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}