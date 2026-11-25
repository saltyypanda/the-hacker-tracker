import { ReactNebula } from "@flodlc/nebula";
import starrySky from "../assets/starry-sky-bg.png";
import { useEffect, useState } from "react";

const FADE_MS = 300;

export function Background() {
  const [visible, setVisible] = useState(true);
  // The nebula canvas animates constantly, so it's unmounted once faded out.
  const [canvasMounted, setCanvasMounted] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // React skips the re-render unless the value actually flips.
      const nowVisible = window.scrollY <= window.innerHeight / 2;
      setVisible(nowVisible);
      if (nowVisible) setCanvasMounted(true);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Once hidden, wait for the 300ms fade-out to finish, then drop the canvas.
  useEffect(() => {
    if (visible) return;
    const timeout = setTimeout(() => setCanvasMounted(false), FADE_MS);
    return () => clearTimeout(timeout);
  }, [visible]);

  return (
    <div className="fixed inset-0 z-[-10] bg-base-100">
      <div
        className="fixed inset-0 z-[-9] transition-opacity duration-300"
        style={{ opacity: visible ? 1 : 0 }}
      >
        {canvasMounted && (
          <ReactNebula
            config={{
              starsRotationSpeed: 2,
              nebulasIntensity: 15,
              sunScale: 1,
              planetsScale: 1,
              solarSystemOrbite: 80,
              solarSystemSpeedOrbit: 30,
            }}
          />
        )}
      </div>
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat z-[-8] transition-opacity duration-300"
        style={{
          backgroundImage: `url(${starrySky})`,
          opacity: visible ? 0.35 : 0,
        }}
      />
    </div>
  );
}
