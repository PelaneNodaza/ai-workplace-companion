import { createFileRoute, Outlet } from "@tanstack/react-router";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/_app")({
  component: AppLayout,
});

function AppLayout() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        <div className="flex flex-1 flex-col">
          <header className="sticky top-0 z-10 flex h-16 items-center gap-3 border-b border-border/70 bg-background/75 px-4 backdrop-blur-xl sm:px-6">
            <SidebarTrigger />
            <div className="hidden h-6 w-px bg-border sm:block" />
            <div className="hidden text-sm font-medium text-foreground/80 sm:block">Workspace</div>
            <div className="flex-1" />
            <div className="flex items-center gap-2 rounded-full border border-border/70 bg-card px-3 py-1.5 text-xs text-muted-foreground shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Powered by Lovable AI
            </div>
          </header>
          <main className="flex-1 px-4 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-10">
            <div className="mx-auto w-full max-w-6xl">
              <Outlet />
            </div>
          </main>
          <footer className="border-t border-border/70 bg-muted/40 px-6 py-4 text-xs text-muted-foreground">
            <div className="mx-auto flex max-w-6xl flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <p>
                <strong className="text-foreground/80">Responsible AI:</strong> Outputs are AI-generated
                and may be inaccurate. Always review before sharing. Do not submit confidential data.
              </p>
              <p className="opacity-70">© {new Date().getFullYear()} WorkAI</p>
            </div>
          </footer>
        </div>
      </div>
      <Toaster />
    </SidebarProvider>
  );
}