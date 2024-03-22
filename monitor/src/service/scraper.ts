import { api } from "./api";

export const runScrapers = async () => {
  return api.post("/run/");
};

export const getExecutions = async <T>() => {
  return api.get<T>("/dashboard/executions/");
};
