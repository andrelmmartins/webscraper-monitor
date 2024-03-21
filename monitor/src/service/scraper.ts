import { api } from "./api";

export const runScrapers = async () => {
  return api.post("/run");
};
