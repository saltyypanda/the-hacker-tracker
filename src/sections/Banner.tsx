import headerImage from '../assets/header-img.svg';
import TypingIntros from '../components/TypingIntros';
import { motion } from 'framer-motion';

export default function Banner() {
  return (
    <div>
      <div className="hero min-h-[92vh]">
        <div className="hero-content flex-col lg:flex-row-reverse gap-12 mx-auto items-center self-center w-11/12">
          <motion.img
            className="w-1/2 object-contain"
            src={headerImage}
            alt="Cute astronaut"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="flex flex-col w-2/3 gap-4">
            <TypingIntros />
            <h1 className="text-7xl font-bold">Tess Hacker</h1>
            <p className="py-6 text-lg">
              Lorem ipsum odor amet, consectetuer adipiscing elit. Gravida
              consectetur libero ad ligula cras. Aliquet nibh dignissim
              scelerisque sapien bibendum lectus himenaeos. Lacinia accumsan
              dolor auctor erat dictumst curabitur.
            </p>
            <button className="btn btn-primary w-60 font-body">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}