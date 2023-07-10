import "./FormContainer.css";

import { ReactNode } from "react";

export const FormContainer = ({ children }: { children: ReactNode }) => {
  return <div className="c-form-container">{children}</div>;
};
