"use client";

import Button from "@/components/Button";
import { useDashboard } from "@/contexts/DashboardContext";
import { useEffect } from "react";

export default function Title() {
  const { loading, loadData } = useDashboard();

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="flex items-center justify-between mb-4">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      <div className="flex gap-1">
        <Button
          icon="reload"
          loading={loading}
          disabled={loading}
          onClick={loadData}
        >
          Atualizar
        </Button>
      </div>
    </div>
  );
}
