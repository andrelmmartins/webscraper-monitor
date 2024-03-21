import { NodeSDK } from "@opentelemetry/sdk-node";
import { Resource } from "@opentelemetry/resources";
import { PeriodicExportingMetricReader } from "@opentelemetry/sdk-metrics";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-grpc";
import { OTLPMetricExporter } from "@opentelemetry/exporter-metrics-otlp-grpc";
import { SemanticResourceAttributes } from "@opentelemetry/semantic-conventions";

const sdk = new NodeSDK({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: "scraper-service",
    [SemanticResourceAttributes.SERVICE_NAMESPACE]: "scraper",
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
