import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { Project } from "../types";

interface Props {
  project: Project;
  className?: string;
  /** Show native controls (used in the mission-log dialog). */
  controls?: boolean;
}

/**
 * A project's demo: a muted looping video that only plays while on screen,
 * or the still image. People who prefer reduced motion see the poster frame;
 * the dialog version has controls so anyone can play it on purpose.
 */
export function ProjectMedia({ project, className = "", controls = false }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduceMotion = useReducedMotion();
  const [failed, setFailed] = useState(false);
  const autoplay = !controls && !reduceMotion;

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !autoplay) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.25 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [autoplay]);

  if (!project.video || failed) {
    return (
      <img
        src={project.image}
        alt={`${project.project_name} screenshot`}
        loading="lazy"
        className={className}
      />
    );
  }

  return (
    <video
      ref={videoRef}
      poster={project.image}
      muted
      loop
      playsInline
      preload="metadata"
      controls={controls}
      aria-label={`Demo of ${project.project_name}`}
      className={className}
    >
      <source src={`${project.video}.webm`} type="video/webm" />
      {/* An error on the last source means no format could play: show the still. */}
      <source src={`${project.video}.mp4`} type="video/mp4" onError={() => setFailed(true)} />
    </video>
  );
}
