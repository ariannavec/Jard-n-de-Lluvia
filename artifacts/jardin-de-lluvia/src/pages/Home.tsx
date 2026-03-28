import { MapPanel } from "@/components/MapPanel";
import { Sidebar } from "@/components/Sidebar";
import { AnalysisProvider } from "@/context/AnalysisContext";

export default function Home() {
  return (
    <AnalysisProvider>
      <main className="flex h-screen w-full overflow-hidden bg-background">
        <Sidebar />
        <section className="flex-1 relative">
          <MapPanel />
        </section>
      </main>
    </AnalysisProvider>
  );
}
