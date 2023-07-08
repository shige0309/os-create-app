import { ReactNode } from "react";
import "./Content.css";

export const Content = ({ children }: { children: ReactNode }) => {
  return (
    <div className="c-content">
      <div className="c-content-wrap">{children}</div>
    </div>
  );
};
