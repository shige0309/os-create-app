import "./SubContent.css";

import { ReactNode } from "react";

export const SubContent = ({ children }: { children: ReactNode }) => {
  return <div className="c-sub-content">{children}</div>;
};
