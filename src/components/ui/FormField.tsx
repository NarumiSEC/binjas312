import type { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export function FormField({ label, error, id, className = "", ...props }: Props) {
  const fieldId = id ?? props.name;
  return (
    <div className="space-y-1">
      <label
        htmlFor={fieldId}
        className="block text-xs font-semibold tracking-wide text-army-200 uppercase"
      >
        {label}
      </label>
      <input
        id={fieldId}
        className={`w-full rounded border border-army-600 bg-army-950 px-3 py-2.5 text-sm text-white placeholder:text-army-500 focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500/50 ${className}`}
        {...props}
      />
      {error ? (
        <p className="text-xs text-red-400" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
