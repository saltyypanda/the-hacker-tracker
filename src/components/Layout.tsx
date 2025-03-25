import { Children, ReactNode } from "react";
import NavBar from "./Navbar";
import { Background } from "./Background";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <html data-theme="space" lang="en">
      <body className="font-inter">
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
      </body>
    </html>
  );
};

export default Layout;
