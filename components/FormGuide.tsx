interface FormGuideProps {
  form: ('W' | 'D' | 'L')[];
  size?: "sm" | "md";
  showLabel?: boolean;
}

const COLOR: Record<string, string> = {
  W: "bg-emerald-500 text-white",
  D: "bg-amber-400 text-slate-900",
  L: "bg-rose-500 text-white",
};

const LABEL: Record<string, string> = { W: "W", D: "D", L: "L" };

export default function FormGuide({ form, size = "md", showLabel = false }: FormGuideProps) {
  const dim = size === "sm" ? "w-5 h-5 text-[10px]" : "w-6 h-6 text-xs";

  return (
    <div className="flex items-center gap-1">
      {showLabel && <span className="text-slate-500 text-xs mr-1">Form</span>}
      {form.map((result, i) => (
        <span
          key={i}
          className={`${dim} ${COLOR[result]} rounded-full flex items-center justify-center font-bold`}
        >
          {LABEL[result]}
        </span>
      ))}
    </div>
  );
}
