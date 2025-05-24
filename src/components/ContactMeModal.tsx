import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function ContactMeModal({
  open,
  closeModal,
}: {
  open: boolean;
  closeModal(): void;
}) {
  const modalRef = useRef<HTMLDialogElement>(null);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(false);
    const formData = new FormData();
    Object.entries(formState).forEach(([key, value]) =>
      formData.append(key, value)
    );
    try {
      const response = await fetch("https://formspree.io/f/xnndyrkb", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        setSubmitted(true);
        setFormState({ name: "", email: "", message: "" });
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    }
  };

  useEffect(() => {
    const dialog = modalRef.current;
    if (dialog) {
      open ? dialog.showModal() : dialog.close();
    }
  }, [open]);

  return (
    <dialog ref={modalRef} className="modal" onClose={closeModal}>
      <div className="modal-box w-screen sm:w-[90vw] md:w-[80vw] max-w-6xl h-screen sm:h-[90vh] md:h-[80vh] lg:h-auto bg-base-100 text-base-content px-4 sm:px-8 md:px-16 py-8 sm:py-12">
        <form method="dialog">
          <button
            className="btn btn-ghost btn-circle shadow-none border-none bg-transparent absolute right-4 top-4"
            onClick={closeModal}
          >
            <X className="w-6 h-6" />
          </button>
        </form>

        {/* Heading */}
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            Let's Connect
          </h2>
          <p className="opacity-70 mt-2 text-sm sm:text-base">
            I'd love to hear from you!
          </p>
        </div>

        {/* Tabs for mobile */}
        <div className="block lg:hidden">
          <div className="tabs tabs-bordered flex justify-center">
            {/* Radio Tabs */}
            <input
              type="radio"
              name="contact_tabs"
              role="tab"
              className="tab"
              aria-label="Contact Info"
              defaultChecked
            />
            <div className="tab-content border-base-300 bg-base-100 w-full p-4">
              <h2 className="text-xl text-accent font-semibold text-center mb-2">
                Contact Info
              </h2>
              <p className="text-base opacity-80 text-center mb-4">
                Feel free to reach out to me directly!
              </p>
              <div className="space-y-4 ps-2 text-sm">
                <div className="flex gap-2">
                  <h3 className="font-semibold text-success">Email:</h3>
                  <a
                    href="mailto:esh7943@rit.edu"
                    className="link opacity-80 hover:text-primary transition"
                  >
                    esh7943@rit.edu
                  </a>
                </div>
                <div className="flex gap-2">
                  <h3 className="font-semibold text-success">LinkedIn:</h3>
                  <a
                    href="https://www.linkedin.com/in/tess-hacker"
                    target="_blank"
                    className="link opacity-80 hover:text-primary transition"
                  >
                    tess-hacker
                  </a>
                </div>
                <div className="flex gap-2">
                  <h3 className="font-semibold text-success">Resume:</h3>
                  <a
                    href="/resume.pdf"
                    download="Esther_Hacker_Resume.pdf"
                    className="link opacity-80 hover:text-primary transition"
                  >
                    Download
                  </a>
                </div>
              </div>
            </div>

            <input
              type="radio"
              name="contact_tabs"
              role="tab"
              className="tab"
              aria-label="Email Me"
            />
            <div className="tab-content border-base-300 bg-base-100 w-full p-4">
              <h2 className="text-xl text-accent font-semibold text-center mb-2">
                Email Me
              </h2>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {error ? (
                  <p className="text-red-600 text-sm text-center">
                    ❌ Something went wrong. Please try again later.
                  </p>
                ) : submitted ? (
                  <p className="text-green-600 text-sm font-medium text-center">
                    ✅ Thanks! Your message has been sent.
                  </p>
                ) : (
                  <p className="text-base-content text-sm text-center opacity-80">
                    Send me an email through this form!
                  </p>
                )}

                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  required
                  value={formState.name}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  required
                  value={formState.email}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />
                <textarea
                  name="message"
                  placeholder="Your Message"
                  required
                  rows={5}
                  value={formState.message}
                  onChange={handleChange}
                  className="textarea textarea-bordered w-full"
                />
                <button type="submit" className="btn btn-primary">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Desktop View: Side-by-side */}
        <div className="hidden lg:grid grid-cols-2 gap-8 mt-4">
          {/* Contact Info */}
          <div className="flex flex-col gap-4 border border-base-300 rounded-xl p-6 shadow">
            <h2 className="text-2xl text-accent font-semibold text-center">
              Contact Info
            </h2>
            <p className="text-lg opacity-80 text-center mb-4">
              Feel free to reach out to me directly!
            </p>
            <div className="space-y-4 ps-4">
              <div className="flex gap-2">
                <h3 className="text-xl text-success">Email:</h3>
                <a
                  href="mailto:esh7943@rit.edu"
                  className="link opacity-80 hover:text-primary transition"
                >
                  esh7943@rit.edu
                </a>
              </div>
              <div className="flex gap-2">
                <h3 className="text-xl text-success">LinkedIn:</h3>
                <a
                  href="https://www.linkedin.com/in/tess-hacker"
                  className="link opacity-80 hover:text-primary transition"
                  target="_blank"
                >
                  tess-hacker
                </a>
              </div>
              <div className="flex gap-2">
                <h3 className="text-xl text-success">Resume:</h3>
                <a
                  href="/resume.pdf"
                  download="Esther_Hacker_Resume.pdf"
                  className="link opacity-80 hover:text-primary transition"
                >
                  Download
                </a>
              </div>
            </div>
          </div>

          {/* Email Form */}
          <div className="flex flex-col gap-4 border border-secondary rounded-xl p-6 shadow-[0_0_10px] shadow-secondary">
            <h2 className="text-2xl text-accent font-semibold text-center">
              Email Me
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {error ? (
                <p className="text-red-600 text-lg text-center">
                  ❌ Something went wrong. Please try again later.
                </p>
              ) : submitted ? (
                <p className="text-green-600 text-lg font-medium text-center">
                  ✅ Thanks! Your message has been sent.
                </p>
              ) : (
                <p className="text-base-content text-lg text-center opacity-80">
                  Send me an email through this form!
                </p>
              )}
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                value={formState.name}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                required
                value={formState.email}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
              <textarea
                name="message"
                placeholder="Your Message"
                required
                rows={5}
                value={formState.message}
                onChange={handleChange}
                className="textarea textarea-bordered w-full"
              />
              <button type="submit" className="btn btn-primary">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </dialog>
  );
}
