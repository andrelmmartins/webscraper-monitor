import { NodeSDK } from "@opentelemetry/sdk-node";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-grpc";
import { Resource } from "@opentelemetry/resources";
import { SEMRESATTRS_resou } from "@opentelemetry/semantic-conventions";

const sdk = new NodeSDK({
  resource: new Resource({
    [SemanticResourceAttributes.]
  }),
  traceExporter: new OTLPTraceExporter({
    url: "http://localhost:4317/v1/traces/",
  }),
});

console.log("sdk start");

sdk.start();
