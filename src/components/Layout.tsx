import { ReactNode } from "react";
import { ReactNebula } from "@flodlc/nebula";
import NavBar from "./Navbar";
import starrySky from "../assets/starry-sky-bg.png";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <html data-theme="space" lang="en">
      <body className="font-inter">
        <div className="fixed top-0 left-0 w-full h-full z-[-10]">
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
          className="fixed bottom-0 left-0 w-full h-screen bg-cover bg-center bg-no-repeat opacity-35"
          style={{ backgroundImage: `url(${starrySky})` }}
        />
        <NavBar />
        <div className="flex flex-col w-full h-full items-center">
          {children}
        </div>
      </body>
    </html>
  );
};

export default Layout;
