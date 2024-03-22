export default class Trace {
  readonly id: string;
  readonly name: string;

  constructor(props: { id: string; name: string }) {
    this.id = props.id;
    this.name = props.name;
  }

  static parse(obj: any) {
    if (obj?.traceID && obj?.rootTraceName) {
      return new Trace({ id: obj.traceID, name: obj.rootTraceName });
    }

    return;
  }
}
