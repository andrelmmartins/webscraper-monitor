import DashboarProvider from "@/contexts/DashboardContext";

import Footer from "@/components/Footer";
import Dashboard from "@/components/Dashboard";

export default function Home() {
  return (
    <DashboarProvider>
      <main className="bg-white text-black">
        <Dashboard />
        <Footer />
      </main>
    </DashboarProvider>
  );
}
