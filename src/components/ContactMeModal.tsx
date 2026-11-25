import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { contact } from "../site-config";

type Status = "idle" | "sending" | "sent" | "error";

const emptyForm = { name: "", email: "", message: "" };

function ContactInfo() {
  const rows = [
    { label: "Email", href: `mailto:${contact.email}`, text: contact.email },
    {
      label: "LinkedIn",
      href: contact.linkedinUrl,
      text: contact.linkedinHandle,
      external: true,
    },
    {
      label: "Resume",
      href: contact.resumeUrl,
      text: "Download",
      download: contact.resumeFileName,
    },
  ];

  return (
    <div className="flex flex-col gap-4 border border-base-300 rounded-xl p-6 shadow">
      <h3 className="text-xl lg:text-2xl text-accent font-semibold text-center">
        Contact Info
      </h3>
      <p className="lg:text-lg opacity-80 text-center mb-4">
        Feel free to reach out to me directly!
      </p>
      <dl className="space-y-4 ps-2 lg:ps-4">
        {rows.map(({ label, href, text, external, download }) => (
          <div key={label} className="flex gap-2 items-baseline">
            <dt className="font-semibold lg:text-xl text-success">{label}:</dt>
            <dd>
              <a
                href={href}
                download={download}
                {...(external && { target: "_blank", rel: "noopener noreferrer" })}
                className="link opacity-80 hover:text-primary transition"
              >
                {text}
              </a>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function EmailForm() {
  const [formState, setFormState] = useState(emptyForm);
  const [status, setStatus] = useState<Status>("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    const formData = new FormData();
    Object.entries(formState).forEach(([key, value]) =>
      formData.append(key, value)
    );
    try {
      const response = await fetch(contact.formspreeUrl, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });
      if (!response.ok) throw new Error(`Formspree returned ${response.status}`);
      setStatus("sent");
      setFormState(emptyForm);
    } catch {
      setStatus("error");
    }
  };

  const statusMessage = {
    idle: { text: "Send me an email through this form!", className: "opacity-80" },
    sending: { text: "Sending…", className: "opacity-80" },
    sent: { text: "✅ Thanks! Your message has been sent.", className: "text-green-600 font-medium" },
    error: { text: "❌ Something went wrong. Please try again later.", className: "text-red-600" },
  }[status];

  return (
    <div className="flex flex-col gap-4 border border-secondary rounded-xl p-6 shadow-[0_0_10px] shadow-secondary">
      <h3 className="text-xl lg:text-2xl text-accent font-semibold text-center">
        Email Me
      </h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <p
          role="status"
          className={`text-sm lg:text-lg text-center ${statusMessage.className}`}
        >
          {statusMessage.text}
        </p>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          aria-label="Your name"
          required
          value={formState.name}
          onChange={handleChange}
          className="input input-bordered w-full"
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          aria-label="Your email"
          required
          value={formState.email}
          onChange={handleChange}
          className="input input-bordered w-full"
        />
        <textarea
          name="message"
          placeholder="Your Message"
          aria-label="Your message"
          required
          rows={5}
          value={formState.message}
          onChange={handleChange}
          className="textarea textarea-bordered w-full"
        />
        <button
          type="submit"
          className="btn btn-primary"
          disabled={status === "sending"}
        >
          Send Message
        </button>
      </form>
    </div>
  );
}

export function ContactMeModal({
  open,
  closeModal,
}: {
  open: boolean;
  closeModal(): void;
}) {
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = modalRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={modalRef}
      className="modal"
      onClose={closeModal}
      aria-labelledby="contact-heading"
    >
      <div className="modal-box w-screen sm:w-[90vw] md:w-[80vw] max-w-6xl max-h-screen sm:max-h-[90vh] bg-base-100 text-base-content px-4 sm:px-8 md:px-16 py-8 sm:py-12">
        <button
          type="button"
          aria-label="Close"
          className="btn btn-ghost btn-circle shadow-none border-none bg-transparent absolute right-4 top-4"
          onClick={closeModal}
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center mb-8">
          <h2
            id="contact-heading"
            className="text-2xl sm:text-3xl md:text-4xl font-bold"
          >
            Let's Connect
          </h2>
          <p className="opacity-70 mt-2 text-sm sm:text-base">
            I'd love to hear from you!
          </p>
        </div>

        {/* Stacked on small screens, side-by-side on large ones. */}
        <div className="grid gap-8 lg:grid-cols-2 mt-4">
          <ContactInfo />
          <EmailForm />
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button aria-label="Close">close</button>
      </form>
    </dialog>
  );
}
