export default class Trace {
  readonly id: string;
  readonly name: string;
  readonly duration: number;

  constructor(props: { id: string; name: string; duration: number }) {
    this.id = props.id;
    this.name = props.name;
    this.duration = props.duration;
  }

  static parse(obj: any) {
    if (obj?.traceID && obj?.rootTraceName && obj?.durationMs) {
      return new Trace({
        id: obj.traceID,
        name: obj.rootTraceName,
        duration: obj.durationMs,
      });
    }

    return;
  }
}
