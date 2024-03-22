"use client";

import Button from "@/components/Button";
import { useDashboard } from "@/contexts/DashboardContext";
import { useEffect } from "react";

export default function Title() {
  const { loading, loadData, run } = useDashboard();

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="flex items-center justify-between">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      <div className="flex gap-1">
        <Button
          icon="play"
          loading={loading}
          className="bg-gray-light !text-gray-darker"
          onClick={run}
        >
          Executar
        </Button>
        <Button icon="reload" loading={loading} onClick={loadData}>
          Atualizar
        </Button>
      </div>
    </div>
  );
}
