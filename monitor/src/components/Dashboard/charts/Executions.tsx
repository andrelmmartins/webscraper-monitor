"use client";

import Card from "@/components/Card";
import Icon from "@/components/Icon";
import { useDashboard } from "@/contexts/DashboardContext";
import { Execution as IExecution } from "@/model/Execution";

export default function Executions() {
  const { executions } = useDashboard();

  return (
    <Card
      title="Executions"
      subtitle="Last 5 executions, click to see detais"
      icon="code"
    >
      <ul className="flex flex-col gap-6">
        {executions.slice(0, 5).map((exec, i) => (
          <Execution key={exec.id} {...exec} />
        ))}
      </ul>
    </Card>
  );
}

function Execution(props: IExecution) {
  return (
    <li className="flex gap-3 rounded items-center">
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gray text-gray-dark">
        <Icon id="code" className="h-5 w-5" />
      </span>
      <div className="flex flex-col">
        <p className="text-sm">{props.name}</p>
        <span className="text-xs text-gray-medium">{props.id}</span>
      </div>
    </li>
  );
}
