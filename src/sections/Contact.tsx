import { useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, Download, Mail } from "lucide-react";
import { SectionHeader } from "../components/SectionHeader";
import { contact, socialLinks } from "../site-config";

type Status = "idle" | "sending" | "sent" | "error";

const emptyForm = { name: "", email: "", message: "" };

const statusMessages: Record<Status, { text: string; className: string }> = {
  idle: { text: "", className: "" },
  sending: { text: "Transmitting…", className: "text-base-content/60" },
  sent: { text: "Signal received. I'll get back to you soon!", className: "text-primary" },
  error: { text: "Transmission failed. Please try again, or email me directly.", className: "text-error" },
};

const fieldClass =
  "w-full border-0 border-b border-base-content/20 bg-transparent px-0 py-2.5 text-lg text-base-content outline-none transition-colors placeholder:text-base-content/30 focus:border-primary";

function EmailForm() {
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState<Status>("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    const data = new FormData();
    Object.entries(form).forEach(([k, v]) => data.append(k, v));
    try {
      const res = await fetch(contact.formspreeUrl, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error(`Formspree returned ${res.status}`);
      setStatus("sent");
      setForm(emptyForm);
    } catch {
      setStatus("error");
    }
  };

  const message = statusMessages[status];

  return (
    <form onSubmit={handleSubmit} className="hud flex flex-col gap-7 p-7 sm:p-9">
      <p className="label-mono text-base-content/45">New transmission</p>
      <div className="grid gap-7 sm:grid-cols-2">
        <label className="flex flex-col gap-1">
          <span className="label-mono text-base-content/50">Name</span>
          <input name="name" required autoComplete="name" value={form.name} onChange={handleChange} className={fieldClass} />
        </label>
        <label className="flex flex-col gap-1">
          <span className="label-mono text-base-content/50">Email</span>
          <input type="email" name="email" required autoComplete="email" value={form.email} onChange={handleChange} className={fieldClass} />
        </label>
      </div>
      <label className="flex flex-col gap-1">
        <span className="label-mono text-base-content/50">Message</span>
        <textarea
          name="message"
          required
          rows={4}
          value={form.message}
          onChange={handleChange}
          className={`${fieldClass} resize-none`}
        />
      </label>
      <div className="flex flex-wrap items-center gap-5">
        <button type="submit" className="btn btn-primary h-12 px-8 text-base" disabled={status === "sending"}>
          Send transmission
        </button>
        <p role="status" className={`text-sm ${message.className}`}>
          {message.text}
        </p>
      </div>
    </form>
  );
}

export function Contact() {
  const channels = [
    { label: "Email", value: contact.email, href: `mailto:${contact.email}`, Icon: Mail },
    {
      label: "Résumé",
      value: "Download PDF",
      href: contact.resumeUrl,
      Icon: Download,
      download: contact.resumeFileName,
    },
  ];

  return (
    <section id="contact" className="mx-auto max-w-6xl px-5 pb-32 pt-28 sm:px-8">
      <SectionHeader
        index="04"
        eyebrow="Open channel"
        title="Let's connect"
        subtitle="Have a question, an opportunity, or just want to say hi? Send a signal."
      />

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14"
      >
        <ul className="flex flex-col">
          {channels.map(({ label, value, href, Icon, download }) => (
            <li key={label} className="border-b border-base-content/10">
              <a
                href={href}
                download={download}
                className="group flex items-center justify-between gap-4 py-5 transition-colors hover:text-primary"
              >
                <span className="flex flex-col gap-1">
                  <span className="label-mono text-base-content/45">{label}</span>
                  <span className="text-lg">{value}</span>
                </span>
                <Icon className="h-5 w-5 text-base-content/40 transition-colors group-hover:text-primary" aria-hidden="true" />
              </a>
            </li>
          ))}
          {socialLinks.map(({ name, url, icon }) => (
            <li key={name} className="border-b border-base-content/10">
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-4 py-5 transition-colors hover:text-primary"
              >
                <span className="flex items-center gap-3 text-lg">
                  <img src={icon} alt="" width={18} height={18} className="h-[18px] w-[18px] opacity-70" />
                  {name}
                </span>
                <ArrowUpRight
                  className="h-5 w-5 text-base-content/40 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                  aria-hidden="true"
                />
              </a>
            </li>
          ))}
        </ul>

        <EmailForm />
      </motion.div>
    </section>
  );
}
