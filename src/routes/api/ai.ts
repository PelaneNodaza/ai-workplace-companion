import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/ai")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const { messages, system } = (await request.json()) as {
            messages: { role: "user" | "assistant" | "system"; content: string }[];
            system?: string;
          };
          const apiKey = process.env.LOVABLE_API_KEY;
          if (!apiKey) {
            return new Response(JSON.stringify({ error: "AI not configured" }), { status: 500 });
          }
          const finalMessages = system
            ? [{ role: "system", content: system }, ...messages]
            : messages;

          const resp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${apiKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              model: "google/gemini-3-flash-preview",
              messages: finalMessages,
            }),
          });

          if (!resp.ok) {
            if (resp.status === 429) {
              return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again shortly." }), { status: 429 });
            }
            if (resp.status === 402) {
              return new Response(JSON.stringify({ error: "AI credits exhausted. Add credits in workspace settings." }), { status: 402 });
            }
            const t = await resp.text();
            console.error("AI gateway error:", resp.status, t);
            return new Response(JSON.stringify({ error: "AI gateway error" }), { status: 500 });
          }

          const data = (await resp.json()) as { choices: { message: { content: string } }[] };
          const content = data.choices?.[0]?.message?.content ?? "";
          return new Response(JSON.stringify({ content }), {
            headers: { "Content-Type": "application/json" },
          });
        } catch (e) {
          console.error(e);
          return new Response(JSON.stringify({ error: "Unknown error" }), { status: 500 });
        }
      },
    },
  },
});