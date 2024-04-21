import { ScraperInstance, Trace, TraceDetail } from "@/model/Dashboard";
import { api } from "./api";

export const runScrapers = async () => {
  return api.post("/run/");
};

export const runOnly = async (id: ScraperInstance["id"]) => {
  return api.post(`/run/:id/`);
};

export const getData = async <T>() => {
  return api.get<T>("/dashboard/");
};

export const getTraceDetails = async (id: Trace["id"]) => {
  return api.get<TraceDetail>(`/trace/${id}/`);
};

export const createInstance = async (props: Omit<ScraperInstance, "id">) => {
  return api.post("/", props);
};

export const deleteInstance = async (id: ScraperInstance["id"]) => {
  return api.delete(`/${id}/`);
};
