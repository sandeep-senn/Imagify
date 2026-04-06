import React from "react";

const Loader = ({
  label = "Loading",
  sublabel = "",
  size = "md",
  tone = "dark",
  inline = false,
}) => {
  const sizeClass =
    size === "sm"
      ? "h-8 w-8 border-[3px]"
      : size === "lg"
      ? "h-16 w-16 border-4"
      : "h-12 w-12 border-4";

  const ringClass =
    tone === "light"
      ? "border-white/20 border-t-white"
      : "border-slate-300 border-t-blue-600";

  const textClass = tone === "light" ? "text-white" : "text-slate-800";
  const subTextClass = tone === "light" ? "text-white/70" : "text-slate-500";

  return (
    <div
      className={`${
        inline ? "inline-flex" : "flex"
      } flex-col items-center justify-center gap-3`}
      aria-live="polite"
      aria-busy="true"
    >
      <div className="relative flex items-center justify-center">
        <div className={`${sizeClass} rounded-full ${ringClass} animate-spin`} />
        <div className="absolute h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_18px_rgba(59,130,246,0.75)]" />
      </div>
      <div className="text-center">
        <p className={`text-sm font-semibold ${textClass}`}>{label}</p>
        {sublabel ? <p className={`text-xs ${subTextClass}`}>{sublabel}</p> : null}
      </div>
    </div>
  );
};

export default Loader;
