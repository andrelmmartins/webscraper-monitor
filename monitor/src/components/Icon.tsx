export interface Props {
  id:
    | "reload"
    | "progress"
    | "play"
    | "code"
    | "clock"
    | "box"
    | "terminal"
    | "close"
    | "arrow";
  className?: HTMLElement["className"];
}

export default function Icon({ id, ...props }: Props) {
  return (
    <svg {...props}>
      <use href={`/icons.svg#${id}`} />
    </svg>
  );
}
