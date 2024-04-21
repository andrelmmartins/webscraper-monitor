"use client";
import { useState } from "react";

import { useDashboard } from "@/contexts/DashboardContext";
import { asTime, miliToSeconds } from "@/utils/transformers";
import { ScraperInstance } from "@/model/Dashboard";
import Modal from "@/components/Modal";
import Icon from "@/components/Icon";

import { Count } from "../Counts";
import Button from "@/components/Button";

export default function ScraperList() {
  const { data } = useDashboard();
  const [scraperInstance, setScraperInstance] = useState<ScraperInstance>();

  return (
    <>
      <div className="flex flex-col gap-2 bg-gray p-4 pb-0">
        {data.instances.map((instance, i) => {
          const tracesOfThisScraper = data.traces.filter(({ name }) =>
            name.includes(instance.name)
          );

          const description = data.scrapers.find(
            (s) => s.name === instance.name
          )?.description;

          const totalDurationOfTraces = tracesOfThisScraper.reduce(
            (acc, t) => acc + t.duration,
            0
          );

          const averageDuration = tracesOfThisScraper.length
            ? totalDurationOfTraces / tracesOfThisScraper.length
            : 0;

          const averageDurationInSeconds = asTime(
            miliToSeconds(averageDuration)
          );

          return (
            <div
              key={`scraper-${i}`}
              onClick={() => setScraperInstance(instance)}
              className="cursor-pointer flex gap-1 items-center text-xs bg-white p-4 rounded-lg border border-gray-light hover:bg-white/50 transition-all duration-300 text-gray-darker"
            >
              <p className="w-[20%] font-medium text-black truncate">
                {instance.name}
              </p>
              <p className="w-[35%] truncate">{description}</p>
              <p className="w-[10%]">{averageDurationInSeconds}</p>
              <div className="w-full flex-1 flex flex-wrap gap-1 overflow-hidden">
                {Object.entries(instance.props).map(([name, value], i) => (
                  <span
                    key={`props-${i}`}
                    className="bg-gray rounded p-1 text-xs"
                  >
                    {value}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <ScraperInstanceModal
        instance={scraperInstance}
        onClose={() => setScraperInstance(undefined)}
      />
    </>
  );
}

function ScraperInstanceModal(props: {
  instance: ScraperInstance | undefined;
  onClose: () => void;
}) {
  const { data, deleteInstance } = useDashboard();
  const [loading, setLoading] = useState(false);

  const tracesOfThisScraper = data.traces.filter(
    ({ name }) => props.instance && name.includes(props.instance.name)
  );

  const totalDurationOfTraces = tracesOfThisScraper.reduce(
    (acc, t) => acc + t.duration,
    0
  );

  const averageDuration = tracesOfThisScraper.length
    ? totalDurationOfTraces / tracesOfThisScraper.length
    : 0;

  const averageDurationInSeconds = asTime(miliToSeconds(averageDuration));

  const description = data.scrapers.find(
    (s) => s.name === props.instance?.name
  )?.description;

  const onSubmit = async () => {
    if (props.instance) {
      setLoading(true);
      deleteInstance(props.instance.id).then(() => {
        setLoading(false);
        props.onClose();
      });
    }
  };

  return (
    <Modal
      title="Detalhes do Scraper"
      subtitle={`ID: ${props.instance?.id}`}
      open={!!props.instance}
      onClose={props.onClose}
    >
      <>
        <div className="flex flex-col gap-1 border-b border-gray pb-6 mb-6">
          <span className="flex items-center justify-center bg-gray w-8 h-8 rounded-full">
            <Icon id="code" className="h-4 w-5" />
          </span>

          <h4 className="text-md font-bold mt-2">{props.instance?.name}</h4>
          <p className="text-sm font-semibold text-gray-medium-dark">
            {description}
          </p>
          {props.instance && (
            <div className="w-full flex-1 flex flex-wrap gap-1 mt-2 text-gray-medium-dark">
              {Object.entries(props.instance.props).map(([name, value], i) => (
                <span
                  key={`props-${i}`}
                  className="bg-gray rounded p-1 text-xs"
                >
                  {name}: {value}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="flex gap-2">
          <Count
            title="Total de execuções"
            count={tracesOfThisScraper.length}
          />
          <Count title="Duração média" count={averageDurationInSeconds} />
        </div>
        <div className="flex flex-col gap-2">
          <Button
            onClick={onSubmit}
            loading={loading}
            type="submit"
            className="w-full h-12 justify-center !bg-red"
          >
            Remover
          </Button>
          <Button
            disabled={loading}
            type="button"
            onClick={props.onClose}
            className="!bg-white !text-gray-darker w-full h-12 justify-center hover:!bg-gray"
          >
            Fechar
          </Button>
        </div>
      </>
    </Modal>
  );
}
