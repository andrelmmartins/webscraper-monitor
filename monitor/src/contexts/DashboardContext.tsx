"use client";
import { createContext, useContext, useState } from "react";

import * as service from "@/service/scraper";
import { DashboardData } from "@/model/Dashboard";

interface Props {
  data: DashboardData;

  loading: boolean;
  loadData: () => Promise<void>;

  run: (onConclude: () => void) => Promise<void>;
}

const DashboardContext = createContext({} as Props);

export default function DashboarProvider(props: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<DashboardData>({ scrapers: [], traces: [] });

  async function getData() {
    try {
      const { data } = await service.getData<DashboardData>();
      return data;
    } catch {
      console.log("houve algum erro");
    }
  }

  async function loadData() {
    setLoading(true);
    const data = await getData();
    setTimeout(() => {
      setLoading(false);
      if (data) {
        setData(data);
      }
    }, 3000);
  }

  async function run(onConclude: () => void) {
    try {
      await service.runScrapers();
    } catch {
      console.log("houve algum erro");
    } finally {
      setTimeout(async () => {
        const data = await getData();
        if (data) setData(data);
        onConclude();
      }, 10000);
    }
  }

  return (
    <DashboardContext.Provider
      value={{
        data,

        loading,
        loadData,

        run,
      }}
    >
      {props.children}
    </DashboardContext.Provider>
  );
}

export const useDashboard = () => useContext(DashboardContext);
