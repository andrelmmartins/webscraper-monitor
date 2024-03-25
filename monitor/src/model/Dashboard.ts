export interface Trace {
  id: string;
  name: string;
  duration: number;
}

export interface Scraper {
  name: string;
  description: string;
}

export interface DashboardData {
  scrapers: Scraper[];
  traces: Trace[];
}
