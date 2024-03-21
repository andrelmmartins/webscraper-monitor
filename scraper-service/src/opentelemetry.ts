import { NodeSDK } from "@opentelemetry/sdk-node";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-grpc";
import { Resource } from "@opentelemetry/resources";
import { SemanticResourceAttributes } from "@opentelemetry/semantic-conventions";
import {
  ConsoleSpanExporter,
  NodeTracerProvider,
  SimpleSpanProcessor,
} from "@opentelemetry/sdk-trace-node";

import { trace, metrics } from "@opentelemetry/api";
import GitHubPinnedReposScraper from "./scrapers/GitHubPinnedReposScraper";
import { PeriodicExportingMetricReader } from "@opentelemetry/sdk-metrics";
import { OTLPMetricExporter } from "@opentelemetry/exporter-metrics-otlp-grpc";

const sdk = new NodeSDK({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: "scraper-service-new",
  }),

  traceExporter: new OTLPTraceExporter({
    url: "http://localhost:4317/v1/traces",
  }),

  metricReader: new PeriodicExportingMetricReader({
    exportIntervalMillis: 1000 * 3, // 3 seconds
    exporter: new OTLPMetricExporter({
      url: `http://localhost:4317/v1/metrics`,
    }),
  }),
});

sdk.start();

new GitHubPinnedReposScraper().run();

const meter = metrics.getMeter("teste");
const counter = meter.createCounter("teste-counter");
const counter2 = meter.createCounter("counter-testador");
counter.add(1);
counter2.add(1);
