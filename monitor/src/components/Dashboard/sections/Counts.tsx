"use client";

import { useDashboard } from "@/contexts/DashboardContext";
import Card from "@/components/Card";
import { Props as IconProps } from "@/components/Icon";
import { miliToSeconds, asTime } from "@/utils/transformers";

export default function Counts() {
  const { data } = useDashboard();

  const totalDuration = data.traces.reduce((acc, t) => acc + t.duration, 0);
  const durationAverage = data.traces.length
    ? totalDuration / data.traces.length
    : 0;

  const durationAverageinSeconds = asTime(miliToSeconds(durationAverage));

  return (
    <div className="flex gap-4 flex-wrap">
      <Count
        title="Número de execuções"
        count={data.traces.length}
        icon="box"
      />
      <Count
        title="Número de Scrapers"
        count={data.scrapers.length}
        icon="code"
      />
      <Count
        title="Duração média da execução"
        count={durationAverageinSeconds}
        icon="clock"
      />
    </div>
  );
}

export function Count(props: {
  title: string;
  count: number | string;
  icon?: IconProps["id"];
}) {
  return (
    <Card title={props.title} icon={props.icon} small>
      <h2 className="text-2xl w-full font-extrabold">{props.count}</h2>
    </Card>
  );
}
