import { Link } from "wouter";
import { MapPanel } from "@/components/MapPanel";
import { Sidebar } from "@/components/Sidebar";
import { AnalysisProvider } from "@/context/AnalysisContext";

export default function Home() {
  return (
    <AnalysisProvider>
      <div className="relative">
        <Link
          href="/"
          style={{
            position: "fixed",
            top: "16px",
            right: "16px",
            zIndex: 1000,
            backgroundColor: "#1e3a20",
            color: "#fff",
            padding: "8px 18px",
            borderRadius: "50px",
            textDecoration: "none",
            fontSize: "0.85rem",
            fontWeight: 600,
            boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          ← Inicio
        </Link>
      </div>
      <main className="flex h-screen w-full overflow-hidden bg-background">
        <Sidebar />
        <section className="flex-1 relative">
          <MapPanel />
        </section>
      </main>
    </AnalysisProvider>
  );
}
