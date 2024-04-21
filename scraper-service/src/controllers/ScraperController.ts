import { Request, Response } from "express";
import { Browser } from "selenium-webdriver";

import { api } from "../services/grafana";
import { scrapersList } from "../scrapers";
import InstrumentedWebDriver from "../wrappers/selenium";
import Trace from "../models/Trace";
import { TraceDetailResponse } from "../services/traceDetail";
import { ScraperInstanceController } from "./ScraperInstanceController";

const instances = new ScraperInstanceController();

export class ScraperController {
  async run(req: Request, res: Response) {
    try {
      instances.list().forEach(({ name, id, props }) => {
        const instance = instances.find(name);

        if (instance) {
          instances.run(
            instance,
            props,
            new InstrumentedWebDriver({
              browser: Browser.CHROME,
              scraperName: instance.name,
              instanceID: id,
              ...props,
            })
          );
        }
      });

      return res.status(200).send({});
    } catch {
      return res.status(500).send({
        error: "something wrong happened in: run-scrapers",
      });
    }
  }

  async dashboard(req: Request, res: Response) {
    try {
      const datenow = Number(Date.now().toString().slice(0, 10));
      const yesteday = datenow - 60 * 60 * 24;

      const { data } = await api.get(
        "/datasources/proxy/uid/tempo/api/search",
        {
          params: {
            start: yesteday,
            end: datenow,
          },
        }
      );

      const traces: Trace[] = [];

      if (data?.traces && Array.isArray(data.traces)) {
        data.traces.forEach((t: any) => {
          const parsed = Trace.parse(t);
          if (parsed) traces.push(parsed);
        });
      }

      const scrapers = scrapersList.map((s) => ({
        name: s.name,
        description: s.description,
        props: s.necessaryProps(),
      }));

      res.status(200).send({
        traces,
        scrapers,
      });

      return;
    } catch (e) {
      console.log(e);
      return res.status(500).send({
        error: "something wrong happened in: dashboard",
        data: e,
      });
    }
  }

  async traceDetail(req: Request, res: Response) {
    try {
      const {
        params: { id },
      } = req;

      const details: {
        start_date?: string;
        end_date?: string;
        goWell?: boolean;
        map?: {
          name: string;
          start_date: string;
          end_date: string;
          goWell: boolean;
        }[];
      } = {};

      if (id) {
        const { data } = await api.get<TraceDetailResponse>(
          `/datasources/proxy/uid/tempo/api/traces/${id}`
        );

        if (data) {
          const spans = data.batches[0]?.scopeSpans[0]?.spans;

          if (spans) {
            const mainSpan = spans.find((s) => !s.parentSpanId);

            let totalLength = 1;

            if (mainSpan) {
              totalLength =
                Number(mainSpan.endTimeUnixNano) -
                Number(mainSpan.startTimeUnixNano);

              details.start_date = timeUnixNanoToDate(
                mainSpan?.startTimeUnixNano
              ).toJSON();
              details.end_date = timeUnixNanoToDate(
                mainSpan?.endTimeUnixNano
              ).toJSON();
            }

            details.goWell = true;

            details.map = spans.map((s) => {
              const spanLength =
                Number(s.endTimeUnixNano) - Number(s.startTimeUnixNano);
              const spanPercentualWidth = `${
                (spanLength / totalLength) * 100
              }%`;

              const startDistance =
                (Number(mainSpan?.startTimeUnixNano) ?? 1) -
                Number(s.startTimeUnixNano);

              const spanPercentualLeftDistance = `${
                (startDistance / totalLength) * 100 * -1
              }%`;

              return {
                name: s.name,
                start_date: timeUnixNanoToDate(s.startTimeUnixNano).toJSON(),
                end_date: timeUnixNanoToDate(s.endTimeUnixNano).toJSON(),
                goWell: s.status?.code !== "STATUS_CODE_ERROR",
                percentualWidth: spanPercentualWidth,
                percentualLeftDistance: spanPercentualLeftDistance,
              };
            });

            for (let s of details.map) {
              if (!s.goWell) {
                details.goWell = false;
                break;
              }
            }
          }
        }
      }

      return res.status(200).send(details);
    } catch (e) {
      console.log(e);
      return res.status(500).send({
        error: "something wrong happened in: trace-detail",
        data: e,
      });
    }
  }
}

const timeUnixNanoToDate = (time: string) => {
  return new Date(Number(time) / 1000 / 1000);
};
