import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import Icon, { Props as IconProps } from "./Icon";

interface Props
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  loading?: boolean;
  icon?: IconProps["id"];
}

export default function Button({
  className,
  loading,
  disabled,
  icon,
  children,
  ...props
}: Props) {
  return (
    <button
      className={`${className} flex gap-2 items-center transition-all duration-300 bg-black hover:text-gray text-white font-semibold text-sm rounded px-4 py-2 disabled:cursor-default disabled:bg-gray-darker disabled:text-gray`}
      disabled={loading || disabled}
      {...props}
    >
      {children}
      {icon && !loading && <Icon id={icon} className="h-4 w-4" />}
      {loading && <Icon id="progress" className="h-4 w-4" />}
    </button>
  );
}
