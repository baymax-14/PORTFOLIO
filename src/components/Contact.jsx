import { useState } from "react";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import { FaGithub, FaLinkedin } from "react-icons/fa";

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
    <section id="contact" className="folio-section contact-section">
      <div className="section-heading"><span>Get in touch</span><h2>Let’s build<br />something useful.</h2><p>I’m looking for an entry-level software development role and am happy to talk about full-stack or machine-learning projects.</p></div>
      <div className="contact-layout">
        {/* LEFT INFO */}
        <div className="contact-info">
          <div className="mb-5">
            <h3 className="contact-person-name">Anand Rathod</h3>
            <p className="contact-person-sub">B.Tech Information Technology · Amravati, Maharashtra</p>
          </div>

          <ul className="contact-details-list">
            <li>
              <span className="contact-icon" aria-hidden="true"><FiMail /></span>
              <a href="mailto:anand2005rathod@gmail.com">anand2005rathod@gmail.com</a>
            </li>
            <li>
              <span className="contact-icon" aria-hidden="true"><FiPhone /></span>
              <a href="tel:+919356030432">+91 93560 30432</a>
            </li>
            <li>
              <span className="contact-icon" aria-hidden="true"><FiMapPin /></span>
              <span>Amravati, Maharashtra, India (IST)</span>
            </li>
          </ul>

          <div className="contact-socials-wrap">
            <p className="contact-socials-label">#socials</p>
            <div className="contact-socials-links">
              <a
                href="https://github.com/baymax-14"
                target="_blank"
                rel="noreferrer noopener"
                className="contact-social-badge"
              >
                <FaGithub aria-hidden="true" /> GitHub
              </a>
              <a
                href="https://in.linkedin.com/in/anand-rathod"
                target="_blank"
                rel="noreferrer noopener"
                className="contact-social-badge"
              >
                <FaLinkedin aria-hidden="true" /> LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="contact-form-wrap">
          <form onSubmit={onSubmit} className="contact-form" noValidate>
            <span className="text-xs font-mono text-gray-500 block -mt-1 mb-1" aria-hidden="true">
              &lt;form&gt;
            </span>

            {/* Honeypot (helps reduce spam) */}
            <input
              type="text"
              name="_gotcha"
              className="honeypot"
              tabIndex="-1"
              autoComplete="off"
              aria-hidden="true"
            />

            {/* Optional subject override */}
            <input type="hidden" name="_subject" value="Portfolio contact" />

            <div className="form-fields">
              <div>
                <label
                  htmlFor="name"
                  className="contact-label"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  value={form.name}
                  onChange={update}
                  className="contact-input"
                  placeholder="Your name"
                  autoComplete="name"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="contact-label"
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
                  className="contact-input"
                  placeholder="you@example.com"
                  autoComplete="email"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="message"
                className="contact-label"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                value={form.message}
                onChange={update}
                className="contact-input contact-textarea"
                placeholder="Tell me a little about your project or role…"
              />
            </div>

            <div className="form-actions">
              <button
                type="submit"
                disabled={sending}
                className="contact-submit-btn"
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
                className="contact-direct-btn"
              >
                or email directly
              </button>
            </div>

            <div aria-live="polite">
              {status === "success" && (
                <p className="contact-status contact-status-success">
                  Thanks! Your message was sent successfully ✅
                </p>
              )}
              {status === "error" && (
                <p className="contact-status contact-status-error">
                  Something went wrong. Please try again or email directly.
                </p>
              )}
            </div>

            <span className="text-xs font-mono text-gray-500 block mt-2" aria-hidden="true">
              &lt;/form&gt;
            </span>
          </form>
        </div>
      </div>
    </section>
  );
}
