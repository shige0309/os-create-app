import { ReactNode } from "react"
import "./FormContainer.css";

export const FormContainer = ({children}:{children: ReactNode}) => {
  return (
    <div className="c-form-container">
        {children}
    </div>
  )
}
