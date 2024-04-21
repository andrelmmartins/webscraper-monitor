"use client";
import { useEffect, useState } from "react";

import Button from "@/components/Button";
import Card from "@/components/Card";
import Icon from "@/components/Icon";
import Modal, { Props as ModalProps } from "@/components/Modal";
import { useDashboard } from "@/contexts/DashboardContext";
import { Trace as ITrace, TraceDetail } from "@/model/Dashboard";
import { asTime, miliToSeconds } from "@/utils/transformers";

export default function Traces() {
  const { data, run } = useDashboard();

  const [loading, setLoading] = useState(false);

  const handleRun = async () => {
    setLoading(true);
    run(() => setLoading(false));
  };

  const [detailedTrace, setDetailedTrace] = useState<ITrace>();

  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="text-xl my-4 font-semibold">Execuções</h2>
        <Button
          icon="play"
          loading={loading}
          disabled={loading}
          className="bg-gray-light !text-gray-darker disabled:!bg-gray disabled:!text-gray-medium-dark hover:!text-black"
          onClick={handleRun}
        >
          Executar
        </Button>
      </div>

      <Card icon="terminal" small>
        <ul className="flex flex-col gap-2">
          {data.traces.map((trace) => (
            <Trace
              key={trace.id}
              {...trace}
              onClick={() => setDetailedTrace(trace)}
            />
          ))}
        </ul>
      </Card>

      <TraceDetailsModal
        open={!!detailedTrace}
        onClose={() => setDetailedTrace(undefined)}
        trace={detailedTrace}
      />
    </>
  );
}

function Trace(props: ITrace & { onClick: () => void }) {
  return (
    <li
      className="flex gap-3 p-2 rounded-md items-center hover:bg-gray/25 cursor-pointer transition-all duration-300"
      onClick={props.onClick}
    >
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

function TraceDetailsModal({
  trace,
  ...modalProps
}: Omit<ModalProps, "children" | "title"> & { trace?: ITrace }) {
  const { detailTrace } = useDashboard();

  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState<TraceDetail>();

  useEffect(() => {
    if (trace) {
      setLoading(true);
      detailTrace(trace)
        .then((data) => {
          if (data) setDetails(data);
        })
        .finally(() => setLoading(false));
    }
  }, [trace]);

  const subtitle = trace ? `ID: ${trace?.id}` : undefined;

  return (
    <Modal title="Execução" subtitle={subtitle} {...modalProps}>
      <ul className="relative">
        {details &&
          details.map?.map((cicle, i) => (
            <li key={`cicle-${i}`}>
              {cicle.name}
              <div
                className="absolute bg-black h-3 min-w-3"
                style={{
                  width: cicle.percentualWidth,
                  left: cicle.percentualLeftDistance,
                }}
              ></div>
            </li>
          ))}
      </ul>
    </Modal>
  );
}