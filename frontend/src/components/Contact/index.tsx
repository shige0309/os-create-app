import { Link } from "react-router-dom";
import "./Contact.css";
import { FadeInComponent } from "components/FadeInComponent";

export const Contact = () => {
  return (
    <FadeInComponent>
        <div className="c-contact">
            <Link to="/contact">
                <div className="c-contact-wrap">
                    <p className="c-contact-mail"><img src="/icon/mail.svg" alt="" /></p>
                    <p className="c-contact-text area-400">CONTACT US</p>
                </div>
            </Link>
        </div>
    </FadeInComponent>
  )
}
