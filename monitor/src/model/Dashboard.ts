export interface Trace {
  id: string;
  name: string;
  duration: number;
}

export interface Scraper {
  name: string;
  description: string;
  props: {
    [key: string]: string;
  };
}

export interface ScraperInstance extends Omit<Scraper, "description"> {
  id: string;
}

export interface DashboardData {
  scrapers: Scraper[];
  traces: Trace[];
  instances: ScraperInstance[];
}

export interface TraceDetail {
  start_data: string;
  end_date: string;
  goWell: boolean;
  map?: {
    name: string;
    start_date: string;
    end_date: string;
    goWell: boolean;
    percentualWidth: string;
    percentualLeftDistance: string;
  }[];
}
