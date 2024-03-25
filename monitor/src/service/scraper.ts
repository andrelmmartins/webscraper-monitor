import { api } from "./api";

export const runScrapers = async () => {
  return api.post("/run/");
};

export const getData = async <T>() => {
  return api.get<T>("/dashboard/");
};
