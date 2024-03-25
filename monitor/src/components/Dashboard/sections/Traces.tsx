"use client";

import Button from "@/components/Button";
import Card from "@/components/Card";
import Icon from "@/components/Icon";
import { useDashboard } from "@/contexts/DashboardContext";
import { Trace as ITrace } from "@/model/Dashboard";
import { asTime, miliToSeconds } from "@/utils/transformers";
import { useState } from "react";

export default function Traces() {
  const { data, run } = useDashboard();

  const [loading, setLoading] = useState(false);

  const handleRun = async () => {
    setLoading(true);
    run(() => setLoading(false));
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="text-xl my-4 font-semibold">Execuções</h2>
        <Button
          icon="play"
          loading={loading}
          disabled={loading}
          className="bg-gray-light !text-gray-darker disabled:!bg-gray disabled:!text-gray-medium-dark"
          onClick={handleRun}
        >
          Executar
        </Button>
      </div>

      <Card icon="terminal">
        <ul className="flex flex-col gap-6">
          {data.traces.map((trace) => (
            <Trace key={trace.id} {...trace} />
          ))}
        </ul>
      </Card>
    </>
  );
}

function Trace(props: ITrace) {
  return (
    <li className="flex gap-3 rounded items-center">
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gray text-gray-medium">
        <Icon id="box" className="h-5 w-5" />
      </span>
      <div className="flex flex-col">
        <p className="text-sm">{props.name}</p>
        <span className="text-xs text-gray-medium">{props.id}</span>
      </div>
      <span className="bg-gray p-1 rounded-md text-gray-medium-dark flex gap-1 items-center">
        <Icon id="clock" className="h-4 w-4 text-gray-medium" />
        <p className="text-sm">{asTime(miliToSeconds(props.duration))}</p>
      </span>
    </li>
  );
}
