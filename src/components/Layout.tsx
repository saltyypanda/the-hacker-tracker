import { Children, ReactNode } from "react";
import { Background } from "./Background";
import { NavBar } from "./Navbar";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="font-inter">
      <Background />
      <NavBar />
      <div className="flex flex-col w-full items-center">
        {Children.map(children, (child, index) => (
          <div
            key={index}
            className="min-w-screen min-h-screen flex items-center justify-center"
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Layout;
