import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface Props {
  name: string;
  src: string;
  width: number;
  height: number;
  index: number;
}

export function IndividualSkill({ name, src, width, height, index }: Props) {
  const { ref, inView } = useInView({
    triggerOnce: true,
  });

  const imageVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const animationDelay = 0.1;
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      variants={imageVariants}
      animate={inView ? "visible" : "hidden"}
      custom={index}
      transition={{ delay: index * animationDelay }}
      className="flex flex-col items-center"
    >
      <img src={src} width={width} height={height} alt="skill image" />
      <p className="text-base-content opacity-60 text-lg">{name}</p>
    </motion.div>
  );
}
