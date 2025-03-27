import { useState, useEffect } from "react";
import linkedinIcon from "../assets/icons/linkedin-icon.svg";
import githubIcon from "../assets/icons/github-icon.svg";
import devpostIcon from "../assets/icons/devpost-icon.svg";
import panda from "../assets/panda-final-logo.png";
import { ContactMeModal } from "./ContactMeModal";

export function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-base-100 shadow-lg py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center px-6 md:px-12 lg:px-20">
        <a href="#home" className="flex flex-col-reverse">
          <img src={panda} alt="Logo" width={120} height={120} className="ml-3" />
        </a>
        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 text-white text-lg">
          <li>
            <a href="#home" className="hover:text-accent transition-all">
              Home
            </a>
          </li>
          <li>
            <a href="#skills" className="hover:text-accent transition-all">
              Skills
            </a>
          </li>
          <li>
            <a href="#projects" className="hover:text-accent transition-all">
              Projects
            </a>
          </li>
          <li>
            <a
              href="/resume.pdf"
              download="Esther_Hacker_Resume.pdf"
              className="hover:text-accent transition-all"
            >
              Resume
            </a>
          </li>
        </ul>

        {/* Social Icons & Button */}
        <div className="hidden md:flex items-center space-x-4">
          <a
            href="https://www.linkedin.com/in/tess-hacker-741045257/"
            target="_blank"
          >
            <div className="w-12 h-12 bg-[#353535]/50 backdrop-blur-md rounded-full flex items-center justify-center border-2 border-white hover:bg-gray-300 transition-all duration-300">
              <img
                src={linkedinIcon}
                alt="LinkedIn Icon"
                width={18}
                height={18}
              />
            </div>
          </a>
          <a href="https://github.com/saltyypanda" target="_blank">
            <div className="w-12 h-12 bg-[#353535]/50 backdrop-blur-md rounded-full flex items-center justify-center border-2 border-white hover:bg-gray-300 transition-all duration-300">
              <img src={githubIcon} alt="GitHub Icon" width={32} height={32} />
            </div>
          </a>
          <a
            href="https://devpost.com/saltyypanda?ref_content=user-portfolio&ref_feature=portfolio&ref_medium=global-nav"
            target="_blank"
          >
            <div className="w-12 h-12 bg-[#353535]/50 backdrop-blur-md rounded-full flex items-center justify-center border-2 border-white hover:bg-gray-300 transition-all duration-300">
              <img
                src={devpostIcon}
                alt="Devpost Icon"
                width={26}
                height={26}
              />
            </div>
          </a>
          <button
            className="bg-white text-black font-bold px-6 py-2 rounded-lg hover:bg-gray-300 hover:cursor-pointer transition-all inline-block"
            onClick={() => {
              setModalOpen(true);
            }}
          >
            Let’s Connect
          </button>
          <ContactMeModal
            open={modalOpen}
            closeModal={() => setModalOpen(false)}
          />
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-base-100 text-white p-4 space-y-4 text-center">
          <a
            href="#home"
            className="block hover:text-gray-300"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </a>
          <a
            href="#skills"
            className="block hover:text-gray-300"
            onClick={() => setMenuOpen(false)}
          >
            Skills
          </a>
          <a
            href="#projects"
            className="block hover:text-gray-300"
            onClick={() => setMenuOpen(false)}
          >
            Projects
          </a>
          <div className="flex justify-center space-x-4 mt-4">
            <a href="#">
              <img
                src="/icons/linkedin-icon.svg"
                alt="Icon1"
                width={24}
                height={24}
              />
            </a>
            <a href="#">
              <img
                src="/icons/facebook-icon.svg"
                alt="Icon2"
                width={24}
                height={24}
              />
            </a>
            <a href="#">
              <img
                src="/icons/instagram-icon.svg"
                alt="Icon3"
                width={24}
                height={24}
              />
            </a>
          </div>
          <a
            href="#connect"
            className="bg-white text-black font-bold px-6 py-2 rounded-lg hover:bg-gray-300 transition-all inline-block mt-4"
          >
            Let’s Connect
          </a>
        </div>
      )}
    </nav>
  );
}
