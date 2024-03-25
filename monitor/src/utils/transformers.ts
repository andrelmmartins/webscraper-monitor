export function asTime(time: number, sufix = "s") {
  return `${time.toFixed(2)}${sufix}`;
}

export function miliToSeconds(time: number) {
  return time / 1000;
}
