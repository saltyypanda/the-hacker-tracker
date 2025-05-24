import { useState, useEffect } from "react";
import linkedinIcon from "../assets/icons/linkedin-icon.svg";
import githubIcon from "../assets/icons/github-icon.svg";
import devpostIcon from "../assets/icons/devpost-icon.svg";
import panda from "../assets/panda-final-logo.png";
import { ContactMeModal } from "./ContactMeModal";
import { X } from "lucide-react";

export function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="drawer drawer-end">
      <input id="nav-drawer" type="checkbox" className="drawer-toggle" />

      <nav
        className={`drawer-content fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled ? "bg-base-100 shadow-lg py-2" : "bg-transparent py-4"
        }`}
      >
        <div className="flex justify-between items-center px-4 sm:px-6 md:px-12 lg:px-20">
          <a href="#home" className="flex flex-col-reverse">
            <img src={panda} alt="Logo" width={100} height={100} className="ml-2" />
          </a>

          <ul className="hidden md:flex space-x-6 lg:space-x-8 text-white text-lg">
            {["home", "skills", "projects", "experience"].map((section) => (
              <li key={section}>
                <a
                  href={`#${section}`}
                  className="hover:text-accent transition-all capitalize"
                >
                  {section}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden lg:flex items-center space-x-4">
            <a href="https://www.linkedin.com/in/tess-hacker-741045257/" target="_blank">
              <div className="w-10 h-10 bg-[#353535]/50 backdrop-blur-md rounded-full flex items-center justify-center border-2 border-white hover:bg-gray-300 transition-all">
                <img src={linkedinIcon} alt="LinkedIn" width={18} height={18} />
              </div>
            </a>
            <a href="https://github.com/saltyypanda" target="_blank">
              <div className="w-10 h-10 bg-[#353535]/50 backdrop-blur-md rounded-full flex items-center justify-center border-2 border-white hover:bg-gray-300 transition-all">
                <img src={githubIcon} alt="GitHub" width={28} height={28} />
              </div>
            </a>
            <a href="https://devpost.com/saltyypanda" target="_blank">
              <div className="w-10 h-10 bg-[#353535]/50 backdrop-blur-md rounded-full flex items-center justify-center border-2 border-white hover:bg-gray-300 transition-all">
                <img src={devpostIcon} alt="Devpost" width={24} height={24} />
              </div>
            </a>
            <button
              className="bg-white text-black font-bold px-4 py-2 rounded-lg hover:bg-gray-300 hover:cursor-pointer transition-all"
              onClick={() => setModalOpen(true)}
            >
              Let's Connect
            </button>
          </div>

          <label htmlFor="nav-drawer" className="btn btn-ghost bg-transparent shadow-none lg:hidden text-white border-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="currentColor"
              viewBox="0 0 512 512"
            >
              <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
            </svg>
          </label>
        </div>
      </nav>

      <div className="drawer-side z-50">
        <label htmlFor="nav-drawer" className="drawer-overlay"></label>

        <div className="absolute top-0 right-0 z-50 px-6 pt-4">
          <label
            htmlFor="nav-drawer"
            className="btn btn-ghost btn-circle shadow-none border-none bg-transparent"
          >
            <X className="w-6 h-6" />
          </label>
        </div>

        <ul className="menu p-8 w-full min-h-full bg-base-100 text-base-content flex flex-col justify-center items-center space-y-6">
          {["home", "skills", "projects", "experience"].map((section) => (
            <li key={section}>
              <a
                href={`#${section}`}
                className="text-2xl font-semibold hover:text-accent transition"
                onClick={() => document.getElementById("nav-drawer")?.click()}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </a>
            </li>
          ))}

          <div className="flex space-x-6 pt-4">
            <a href="https://www.linkedin.com/in/tess-hacker-741045257/" target="_blank">
              <img src={linkedinIcon} alt="LinkedIn" width={24} height={24} />
            </a>
            <a href="https://github.com/saltyypanda" target="_blank">
              <img src={githubIcon} alt="GitHub" width={24} height={24} />
            </a>
            <a href="https://devpost.com/saltyypanda" target="_blank">
              <img src={devpostIcon} alt="Devpost" width={24} height={24} />
            </a>
          </div>

          <button
            className="text-lg btn btn-primary mt-4"
            onClick={() => {
              document.getElementById("nav-drawer")?.click();
              setModalOpen(true);
            }}
          >
            Let's Connect
          </button>
        </ul>
      </div>

      <ContactMeModal open={modalOpen} closeModal={() => setModalOpen(false)} />
    </div>
  );
}