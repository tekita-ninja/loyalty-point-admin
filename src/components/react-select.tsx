// components/ui/react-select.tsx
import * as React from "react";
import Select, {
  Props as SelectProps,
  GroupBase,
  StylesConfig,
} from "react-select";
import { cn } from "@/lib/utils";

export interface OptionType {
  label: string;
  value: string | number;
}

interface CustomSelectProps<
  IsMulti extends boolean = false
> extends SelectProps<OptionType, IsMulti, GroupBase<OptionType>> {
  className?: string;
}

export const ReactSelect = <
  IsMulti extends boolean = false
>({
  className,
  isSearchable = true,
  placeholder = "Select...",
  loadingMessage = () => "Loading...",
  noOptionsMessage = () => "No options",
  ...props
}: CustomSelectProps<IsMulti>) => {
  const customStyles: StylesConfig<OptionType, IsMulti> = {
    control: (base, state) => ({
      ...base,
      backgroundColor: "white",
      borderColor: state.isFocused ? "#0f9fff" : "#bfdbfe", // indigo-600 / gray-200
      boxShadow: state.isFocused ? "0 0 0 1px #0f9fff" : "none",
      borderRadius: "0.8rem", // rounded-2xl
      padding: "2px",
      minHeight: "2.5rem", // h-10
      fontSize: "0.875rem", // text-sm
      "&:hover": {
        borderColor: "#0f9fff",
      },
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? "#0f9fff"
        : state.isFocused
          ? "#eff6ff"
          : "white", // selected = indigo-600, focused = indigo-50
      color: state.isSelected ? "white" : "black",
      padding: "0.5rem 1rem",
      fontSize: "0.875rem",
    }),
    menu: (base) => ({
      ...base,
      borderRadius: "0.5rem",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      zIndex: 50,
    }),
    multiValue: (base) => ({
      ...base,
      backgroundColor: "#eff6ff", // indigo-50
      borderRadius: "0.375rem",
      padding: "0 0.25rem",
      fontSize: "1rem",
      fontWeight:600
    }),
    multiValueLabel: (base) => ({
      ...base,
      color: "#0f9fff", // indigo-600
    }),
    multiValueRemove: (base) => ({
      ...base,
      color: "#0f9fff",
      cursor: "pointer",
      ":hover": {
        backgroundColor: "#fee2e2", // red-100
        color: "#F00", // indigo-900
      },
    }),
    input: (base) => ({
      ...base,
      margin: 0,
      padding: 0,
    }),
  };

  return (
    <Select
      className={cn("w-full text-md", className)}
      classNamePrefix="react-select"
      styles={customStyles}
      isSearchable={isSearchable}
      placeholder={placeholder}
      loadingMessage={loadingMessage}
      noOptionsMessage={noOptionsMessage}
      {...props}
    />
  );
};
