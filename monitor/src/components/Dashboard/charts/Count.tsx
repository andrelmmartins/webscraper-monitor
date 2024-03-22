"use client";

import Card from "@/components/Card";
import { useDashboard } from "@/contexts/DashboardContext";

export default function Count() {
  const { executions } = useDashboard();

  return (
    <Card title="Total of executions" small>
      <h2 className="text-2xl w-full font-extrabold">{executions.length}</h2>
    </Card>
  );
}
