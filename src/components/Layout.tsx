import { ReactNode } from "react";
import { ReactNebula } from "@flodlc/nebula";
import NavBar from "./Navbar";

const Layout = ({ children }: { children: ReactNode }) => {
    return (
      <html data-theme="space" lang="en">
        <body className="font-inter">
          <div className="fixed top-0 left-0 w-full h-full">
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
          <NavBar />
          {children}
        </body>
      </html>
    );
  };
  
  export default Layout;