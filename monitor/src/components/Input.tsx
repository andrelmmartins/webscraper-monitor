import { DetailedHTMLProps, InputHTMLAttributes } from "react";

export default function Input({
  label,
  error,
  ...props
}: DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  label?: string;
  error?: string;
}) {
  return (
    <div>
      {label && <label className="text-sm mb-2 block">{label}</label>}
      <input
        {...props}
        className="h-12 w-full bg-gray cursor-pointer rounded placeholder:text-gray-medium px-4"
      />
      {error && (
        <p
          className="text-xs text-red mt-1"
          dangerouslySetInnerHTML={{ __html: error }}
        />
      )}
    </div>
  );
}
