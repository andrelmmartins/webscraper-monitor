interface SpanAttribute {
  key: string;
  value: {
    stringValue?: string;
  };
}

interface Span {
  traceId: string;
  spanId: string;
  parentSpanId?: string;
  name: string;
  kind: string;
  startTimeUnixNano: string;
  endTimeUnixNano: string;
  attributes?: SpanAttribute[];
  status?: {
    code?: string;
  };
}

interface ScopeSpan {
  scope: {
    name: string;
  };
  spans: Span[];
}

interface Batch {
  scopeSpans: ScopeSpan[];
}

export interface TraceDetailResponse {
  batches: Batch[];
}
