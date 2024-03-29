"use client";

import { useState } from "react";

import { useDashboard } from "@/contexts/DashboardContext";
import { Scraper } from "@/model/Dashboard";
import { asTime, miliToSeconds } from "@/utils/transformers";
import Modal from "@/components/Modal";
import Icon from "@/components/Icon";
import { Count } from "./Counts";

export default function Scrapers() {
  const { data } = useDashboard();

  const [scraper, setScraper] = useState<Scraper>();

  return (
    <section className="flex flex-col gap-2">
      <ScraperModal scraper={scraper} onClose={() => setScraper(undefined)} />
      <h2 className="text-xl my-4 font-semibold">Scrapers</h2>
      <div className="text-sm font-medium bg-gray pt-5 pb-6 px-10 text-gray-medium-dark flex -mb-7 rounded-t-lg">
        <p style={{ width: "25%" }}>Nome</p>
        <p style={{ width: "45%" }}>Descrição</p>
        <p style={{ width: "15%" }}>Descrição Média</p>
      </div>
      <div className="flex flex-col gap-2 bg-gray p-4 rounded-b-lg">
        {data.scrapers.map((s, i) => {
          const tracesOfThisScraper = data.traces.filter(({ name }) =>
            name.includes(s.name)
          );

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
              onClick={() => setScraper(s)}
              className="cursor-pointer flex gap-1 text-sm bg-white p-6 rounded-lg border border-gray-light hover:bg-white/50 transition-all duration-300 text-gray-darker"
            >
              <p
                className="font-medium text-black truncate"
                style={{ width: "25%" }}
              >
                {s.name}
              </p>
              <p style={{ width: "45%" }} className="truncate">
                {s.description}
              </p>
              <p style={{ width: "15%" }}>{averageDurationInSeconds}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function ScraperModal(props: {
  scraper: Scraper | undefined;
  onClose: () => void;
}) {
  const { data } = useDashboard();

  const tracesOfThisScraper = data.traces.filter(
    ({ name }) => props.scraper && name.includes(props.scraper.name)
  );

  const totalDurationOfTraces = tracesOfThisScraper.reduce(
    (acc, t) => acc + t.duration,
    0
  );

  const averageDuration = tracesOfThisScraper.length
    ? totalDurationOfTraces / tracesOfThisScraper.length
    : 0;

  const averageDurationInSeconds = asTime(miliToSeconds(averageDuration));

  return (
    <Modal
      title="Detalhes do Scraper"
      open={!!props.scraper}
      onClose={props.onClose}
    >
      <>
        <div className="flex flex-col gap-1 border-b border-gray pb-6 mb-6">
          <span className="flex items-center justify-center bg-gray w-8 h-8 rounded-full">
            <Icon id="code" className="h-4 w-5" />
          </span>

          <h4 className="text-md font-bold mt-2">{props.scraper?.name}</h4>
          <p className="text-sm font-semibold text-gray-medium-dark">
            {props.scraper?.description}
          </p>
        </div>
        <div>
          <Count
            title="Total de execuções"
            count={tracesOfThisScraper.length}
          />
          <Count title="Duração média" count={averageDurationInSeconds} />
        </div>
      </>
    </Modal>
  );
}
