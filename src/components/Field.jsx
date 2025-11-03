export default function Field({ label, name, as, type = "text", ...props }) {
  const Tag = as === "textarea" ? "textarea" : "input";
  return (
    <div className="mb-4">
      <label htmlFor={name} className="mb-1 block font-medium">
        {label}
      </label>
      <Tag
        id={name}
        name={name}
        type={type}
        className="w-full rounded-lg border-2 border-slate-700 bg-slate-900/60 px-3 py-2 text-slate-100 placeholder:text-slate-500 focus:border-teal-500 outline-none"
        {...props}
      />
    </div>
  );
}
