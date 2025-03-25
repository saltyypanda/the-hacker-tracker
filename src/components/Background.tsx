import { ReactNebula } from "@flodlc/nebula";
import starrySky from "../assets/starry-sky-bg.png";
import { useEffect, useState } from "react";

export function Background() {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = window.innerHeight - 200;

      setOpacity(scrollY > maxScroll ? 0 : 1);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full z-[-10] bg-base-100">
      <div
        className="fixed top-0 left-0 w-full h-full z-[-9] transition-all duration-300"
        style={{ opacity: opacity }}
      >
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
      </div>
      <div
        className="fixed bottom-0 left-0 w-full h-screen bg-cover bg-center bg-no-repeat z-[-8] transition-all duration-300"
        style={{
          backgroundImage: `url(${starrySky})`,
          opacity: opacity == 1 ? 35 : 0,
        }}
      />
    </div>
  );
}
