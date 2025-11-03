import { useState } from "react";
import Section from "./Section.jsx";
import { FiMail, FiMapPin } from "react-icons/fi";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiFreelancer } from "react-icons/si";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xanlzqow"; // <-- paste your endpoint

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState(null); // "success" | "error" | null

  const update = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;

    setSending(true);
    setStatus(null);

    try {
      // Build the payload correctly
      const fd = new FormData();
      fd.append("name", form.name);
      fd.append("email", form.email);
      fd.append("message", form.message);
      // optional helpers Formspree understands
      fd.append("_subject", "Portfolio contact");
      // if you keep the hidden input in the JSX, you can also add fd.append("_gotcha","")

      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" }, // don't set Content-Type with FormData
        body: fd,
      });

      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      } else {
        // helpful for debugging from the console:
        const data = await res.json().catch(() => ({}));
        console.error("Formspree error:", data);
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    } finally {
      setSending(false);
    }
  };

  return (
    <Section id="contact" title="Contact Me">
      <div className="grid gap-8 md:grid-cols-2">
        {/* LEFT INFO */}
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-7">
          <div className="mb-5">
            <h3 className="text-xl font-semibold text-white">
              Let’s build something
            </h3>
            <p className="mt-2 text-gray-300">
              I'm always interested in hearing about new opportunities and
              exciting projects. Whether you have a question or just want to say
              hi, feel free to reach out!
            </p>
          </div>

          <ul className="space-y-3 text-gray-300">
            <li className="flex items-center gap-3">
              <span className="inline-flex size-9 items-center justify-center rounded-lg bg-black/40 ring-1 ring-white/10">
                <FiMail />
              </span>
              <button
                type="button"
                onClick={() =>
                  window.open(
                    `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
                      "anand2005rathod@gmail.com"
                    )}&su=${encodeURIComponent("Portfolio inquiry")}`,
                    "_blank",
                    "noopener,noreferrer"
                  )
                }
                className="hover:text-cyan-300 transition underline underline-offset-4"
              >
                anand2005rathod@gmail.com
              </button>
            </li>

            <li className="flex items-center gap-3">
              <span className="inline-flex size-9 items-center justify-center rounded-lg bg-black/40 ring-1 ring-white/10">
                <FiMapPin />
              </span>
              <span>Amravati, Maharashtra, India (IST)</span>
            </li>
          </ul>

          <div className="mt-6">
            <p className="text-sm font-mono text-gray-500 mb-3">#socials</p>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://github.com/baymax-14"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm hover:border-cyan-400/50 hover:text-cyan-300 transition"
              >
                <FaGithub /> GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/anand-rathod-b95b14290/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm hover:border-cyan-400/50 hover:text-cyan-300 transition"
              >
                <FaLinkedin /> LinkedIn
              </a>
              <a
                href="https://www.freelancer.in"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm hover:border-cyan-400/50 hover:text-cyan-300 transition"
              >
                <SiFreelancer /> Freelancer
              </a>
            </div>
          </div>

          <div className="pointer-events-none absolute -top-20 -right-24 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />
        </div>

        {/* RIGHT FORM */}
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-7">
          <form onSubmit={onSubmit} className="space-y-4">
            <span className="text-xs font-mono text-gray-500 block -mt-1 mb-1">
              &lt;form&gt;
            </span>

            {/* Honeypot (helps reduce spam) */}
            <input
              type="text"
              name="_gotcha"
              className="hidden"
              tabIndex="-1"
              autoComplete="off"
            />

            {/* Optional subject override */}
            <input type="hidden" name="_subject" value="Portfolio contact" />

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm text-gray-400 mb-1"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  value={form.name}
                  onChange={update}
                  className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-gray-100 placeholder-gray-500 outline-none focus:border-cyan-400/60"
                  placeholder="Your name"
                  autoComplete="name"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm text-gray-400 mb-1"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={update}
                  className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-gray-100 placeholder-gray-500 outline-none focus:border-cyan-400/60"
                  placeholder="you@example.com"
                  autoComplete="email"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm text-gray-400 mb-1"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                required
                value={form.message}
                onChange={update}
                className="w-full resize-y rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-gray-100 placeholder-gray-500 outline-none focus:border-cyan-400/60"
                placeholder="Tell me a little about your project…"
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                disabled={sending}
                className="inline-flex items-center justify-center rounded-full bg-cyan-600 px-5 py-2.5 font-semibold text-white shadow hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {sending ? "Sending…" : "Send Message"}
              </button>

              <button
                type="button"
                onClick={() =>
                  window.open(
                    `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
                      "anand2005rathod@gmail.com"
                    )}`,
                    "_blank",
                    "noopener,noreferrer"
                  )
                }
                className="text-sm text-gray-400 hover:text-cyan-300 transition underline-offset-4 hover:underline"
              >
                or email me directly
              </button>
            </div>

            {status === "success" && (
              <p className="text-sm text-emerald-400 pt-1">
                Thanks! Your message was sent ✅
              </p>
            )}
            {status === "error" && (
              <p className="text-sm text-rose-400 pt-1">
                Something went wrong. Please try again.
              </p>
            )}

            <span className="text-xs font-mono text-gray-500 block mt-2">
              &lt;/form&gt;
            </span>

            <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-teal-500/10 blur-3xl" />
          </form>
        </div>
      </div>
    </Section>
  );
}
