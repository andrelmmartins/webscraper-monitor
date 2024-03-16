import { Span, Tracer, trace, SpanOptions, context } from "@opentelemetry/api";

export interface BaseWrapperProps {
  tracerName: string;
  mainSpan: { name: string; attributes: { [key: string]: string } };
}

export default abstract class BaseWrapper {
  protected tracer: Tracer;
  protected mainSpan: Span;

  constructor(props: BaseWrapperProps) {
    this.tracer = trace.getTracer(props.tracerName);

    this.mainSpan = this.tracer.startSpan(props.mainSpan.name, {
      attributes: props.mainSpan.attributes,
    });
  }

  createSpan(name: string, options?: SpanOptions, father?: Span) {
    return this.tracer.startSpan(
      name,
      options,
      trace.setSpan(context.active(), father ?? this.mainSpan)
    );
  }
}
