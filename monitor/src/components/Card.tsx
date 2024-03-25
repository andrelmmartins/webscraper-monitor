import Icon, { Props as IconProps } from "./Icon";

export interface Props {
  title?: string;
  subtitle?: string;
  icon?: IconProps["id"];
  children: React.ReactNode;

  small?: boolean;
}

export default function Card(props: Props) {
  return (
    <div className="rounded-lg bg-white border border-gray-light p-6 relative w-full min-w-[200px] flex-1">
      {props.title && (
        <h3 className={`${props.small ? "text-md" : "text-lg"} font-medium`}>
          {props.title}
        </h3>
      )}

      {props.subtitle && (
        <h5 className="text-gray-medium-dark text-sm pt-1">{props.subtitle}</h5>
      )}

      {props.icon && (
        <Icon
          id={props.icon}
          className="absolute top-6 right-6 h-5 w-5 text-gray-medium"
        />
      )}

      {props.title ? (
        <div className={`${props.small ? "pt-2" : "pt-6"}`}>
          {props.children}
        </div>
      ) : (
        props.children
      )}
    </div>
  );
}
