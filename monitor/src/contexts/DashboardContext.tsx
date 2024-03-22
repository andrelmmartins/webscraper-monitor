"use client";
import { createContext, useContext, useEffect, useState } from "react";

import * as service from "@/service/scraper";
import { Execution } from "@/model/Execution";

interface Props {
  executions: Execution[];

  loading: boolean;
  loadData: () => Promise<void>;

  run: () => Promise<void>;
}

const DashboardContext = createContext({} as Props);

export default function DashboarProvider(props: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(false);
  const [executions, setExecutions] = useState<Execution[]>([]);

  async function getExecutions() {
    try {
      const { data } = await service.getExecutions<Execution[]>();

      if (data && Array.isArray(data)) {
        setExecutions(data);
      }
    } catch {
      console.log("houve algum erro");
    }
  }

  async function loadData() {
    setLoading(true);
    await getExecutions();
    setLoading(false);
  }

  async function run() {
    try {
      await service.runScrapers();
    } catch {
      console.log("houve algum erro");
    }
  }

  return (
    <DashboardContext.Provider
      value={{
        executions,

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
