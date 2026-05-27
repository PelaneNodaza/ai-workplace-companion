export async function callAI(opts: {
  system?: string;
  messages: { role: "user" | "assistant" | "system"; content: string }[];
}): Promise<string> {
  const res = await fetch("/api/ai", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(opts),
  });
  const data = (await res.json()) as { content?: string; error?: string };
  if (!res.ok) throw new Error(data.error || "AI request failed");
  return data.content || "";
}