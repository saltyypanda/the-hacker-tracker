import { ArrowUp } from "lucide-react";
import { PandaHelmet } from "../components/PandaHelmet";

export function Footer() {
  return (
    <footer className="border-t border-base-content/10 bg-base-100/60 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 sm:flex-row sm:px-8">
        <div className="flex items-center gap-3">
          <PandaHelmet className="h-6 w-6" />
          <p className="label-mono text-base-content/45">
            © {new Date().getFullYear()} Tess Hacker · End of transmission
          </p>
        </div>
        <a
          href="#home"
          className="label-mono inline-flex items-center gap-1.5 text-base-content/45 transition-colors hover:text-primary"
        >
          Return to orbit <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
}
