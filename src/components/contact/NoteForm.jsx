import { useRef, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { profile } from "../../data/profile";
import { cn } from "../../lib/cn";
import { HandNote, MonoLabel, Tape } from "../ui";

const STEPS = [
  {
    name: "name",
    label: "First things first",
    prompt: "What should I call you?",
    placeholder: "Your name",
    type: "text",
    autoComplete: "name",
  },
  {
    name: "email",
    label: "Where do I reply?",
    prompt: "Your email, so I can write back.",
    placeholder: "you@example.com",
    type: "email",
    autoComplete: "email",
  },
  {
    name: "message",
    label: "The good part",
    prompt: "A role, a project, a bug, or just hi.",
    placeholder: "Tell me a story, or a project idea…",
    multiline: true,
  },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(name, value) {
  const v = value.trim();
  if (!v) return "This one can't be empty.";
  if (name === "email" && !EMAIL_RE.test(v)) return "That email doesn't look quite right.";
  if (name === "message" && v.length < 10) return "A few more words, please.";
  return null;
}

export default function NoteForm() {
  const [step, setStep] = useState(0);
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | failed
  const inputRef = useRef(null);
  // after the first step change, each new field grabs focus when it mounts
  // (it mounts only once the old field has animated out)
  const [moved, setMoved] = useState(false);

  const current = STEPS[step];
  const isLast = step === STEPS.length - 1;

  const goTo = (next) => {
    inputRef.current?.blur(); // so keystrokes can't land in the field that is leaving
    setMoved(true);
    setStep(next);
  };

  const onChange = (e) => {
    setValues((v) => ({ ...v, [current.name]: e.target.value }));
    if (error) setError(null);
  };

  const send = async () => {
    setStatus("sending");
    try {
      const fd = new FormData();
      fd.append("name", values.name.trim());
      fd.append("email", values.email.trim());
      fd.append("message", values.message.trim());
      fd.append("_subject", `Portfolio note from ${values.name.trim()}`);
      fd.append("_gotcha", "");
      const res = await fetch(profile.formspreeEndpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: fd,
      });
      setStatus(res.ok ? "sent" : "failed");
    } catch {
      setStatus("failed");
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // Ctrl/Cmd+Enter still submits while the button is disabled, so guard here too
    if (status === "sending") return;
    if (e.target.elements._gotcha?.value) return; // bot
    const err = validate(current.name, values[current.name]);
    if (err) {
      setError(err);
      inputRef.current?.focus();
      return;
    }
    if (isLast) send();
    else goTo(step + 1);
  };

  const onKeyDown = (e) => {
    // Ctrl/Cmd + Enter submits the message box; plain Enter adds a new line
    if (current.multiline && e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      e.currentTarget.form.requestSubmit();
    }
  };

  const reset = () => {
    setValues({ name: "", email: "", message: "" });
    goTo(0);
    setStatus("idle");
  };

  const fieldId = `note-${current.name}`;
  const errorId = `${fieldId}-error`;

  return (
    <div className="relative mx-auto w-full max-w-[400px] rotate-[-1deg] bg-marker-sand p-6 pt-7 shadow-sticky sm:p-7">
      <Tape className="-top-2.5 left-1/2 -ml-8" rotate={-2} color="lilac" />

      {status === "sent" ? (
        <div role="status" className="py-6 text-center">
          <p className="text-5xl" aria-hidden>
            📬
          </p>
          <HandNote className="mt-4 text-2xl leading-snug">
            Thanks, {values.name.trim().split(" ")[0]}! Your note is in my inbox.
          </HandNote>
          <HandNote className="mt-2 text-lg text-ink-soft">I'll write back to {values.email.trim()}.</HandNote>
          <button type="button" onClick={reset} className="mono-label mt-6 border-b border-ink pb-0.5 hover:text-marker-blue">
            Send another
          </button>
        </div>
      ) : (
        <form onSubmit={onSubmit} noValidate aria-describedby="note-intro">
          <p id="note-intro" className="text-[15px] leading-relaxed text-ink-soft">
            Hiring for a dev role, building something, or stuck on a bug? Leave a note in three quick steps.
          </p>

          {/* honeypot: hidden from people, tempting for bots */}
          <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

          <div className="relative mt-5 min-h-[150px]">
            <AnimatePresence mode="wait" initial={false}>
              <m.div
                key={current.name}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <label htmlFor={fieldId} className="block">
                  <MonoLabel className="text-ink-soft">{current.label}</MonoLabel>
                  <HandNote as="span" className="mt-1 block text-xl">
                    {current.prompt}
                  </HandNote>
                </label>

                {current.multiline ? (
                  <textarea
                    ref={inputRef}
                    id={fieldId}
                    name={current.name}
                    rows={4}
                    autoFocus={moved}
                    value={values[current.name]}
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                    placeholder={current.placeholder}
                    aria-invalid={!!error}
                    aria-describedby={error ? errorId : undefined}
                    className={fieldClass(error)}
                  />
                ) : (
                  <input
                    ref={inputRef}
                    id={fieldId}
                    name={current.name}
                    type={current.type}
                    autoFocus={moved}
                    value={values[current.name]}
                    onChange={onChange}
                    placeholder={current.placeholder}
                    autoComplete={current.autoComplete}
                    aria-invalid={!!error}
                    aria-describedby={error ? errorId : undefined}
                    className={fieldClass(error)}
                  />
                )}

                <p id={errorId} role="alert" className="mt-1.5 min-h-[1.25rem] font-hand text-base text-marker-redink">
                  {error}
                </p>
              </m.div>
            </AnimatePresence>
          </div>

          {status === "failed" && (
            <p role="alert" className="mb-3 font-hand text-base text-marker-redink">
              Hmm, that didn't send. Try again, or email{" "}
              <a href={`mailto:${profile.email}`} className="underline">
                {profile.email}
              </a>
              .
            </p>
          )}

          <div className="flex items-center justify-between gap-3">
            <button
              type="submit"
              disabled={status === "sending"}
              className="mono-label inline-flex items-center gap-2 bg-ink px-4 py-2.5 text-white shadow-[3px_3px_0_0_#2F55D4] transition-[transform,box-shadow] hover:-translate-x-px hover:-translate-y-px hover:shadow-[4px_4px_0_0_#2F55D4] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none disabled:cursor-wait disabled:opacity-70"
            >
              {status === "sending" ? "Sending…" : isLast ? "Send it" : "Next"}
              <span className="text-white/60">
                ({step + 1}/{STEPS.length})
              </span>
            </button>

            {step > 0 && status !== "sending" && (
              <button
                type="button"
                onClick={() => {
                  setError(null);
                  goTo(step - 1);
                }}
                className="mono-label border-b border-ink pb-0.5 hover:text-marker-blue"
              >
                ← Back
              </button>
            )}
          </div>

          {/* three dots showing progress */}
          <ol className="mt-5 flex gap-1.5" aria-label={`Step ${step + 1} of ${STEPS.length}`}>
            {STEPS.map((s, i) => (
              <li
                key={s.name}
                className={cn("h-1.5 flex-1 transition-colors", i <= step ? "bg-ink" : "bg-ink/15")}
              />
            ))}
          </ol>
        </form>
      )}
    </div>
  );
}

function fieldClass(error) {
  return cn(
    "mt-3 block w-full resize-none border-0 border-b-2 bg-transparent px-0 py-2 font-hand text-xl text-ink placeholder:text-ink/70 focus:outline-none focus:ring-0",
    error ? "border-marker-redink" : "border-ink/40 focus:border-ink",
  );
}
