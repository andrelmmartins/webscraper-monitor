import { useEffect, useState } from "react";
import Icon from "./Icon";

interface Option<T> {
  label: string;
  value: T;
}

interface Props<T> {
  placeholder?: string;
  options: Option<T>[];
  onSelect: (value: T) => void;
  value: string;
}

export default function Select<T>({
  options,
  onSelect,
  placeholder,
  value,
}: Props<T>) {
  return (
    <div className="h-12 group relative flex bg-gray rounded  cursor-pointer">
      <input
        placeholder={placeholder}
        value={value}
        onChange={() => ({})}
        className="h-full w-full bg-gray cursor-pointer rounded placeholder:text-gray-medium px-4"
      />

      <div className="flex items-center justify-center h-12 w-12">
        <Icon
          id="arrow"
          className="group-has-[input:focus]:rotate-180 group-has-[#dropdown:hover]:rotate-180 transition-all duration-300 h-4 w-4"
        />
      </div>

      <div
        id="#dropdown"
        className="hidden hover:flex group-has-[input:focus]:flex flex-col absolute top-full translate-y-1 rounded max-h-36 overflow-y-scroll left-0 w-full shadow-lg shadow-black/30"
      >
        {options.map((o, i) => (
          <span
            key={`option-${i}`}
            onClick={() => onSelect(o.value)}
            className="flex px-4 items-center h-10 bg-gray hover:bg-gray-light transition-all duration-300"
          >
            {o.label}
          </span>
        ))}
      </div>
    </div>
  );
}
