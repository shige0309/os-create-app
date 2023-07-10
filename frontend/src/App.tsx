import "App.css";
import { HomePage } from "pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { WorkPage } from "pages/Work";
import { BlogPage } from "pages/Blog";
import { ContactFormPage } from "pages/Contact/ContactForm";
import { ContactThanksPage } from "pages/Contact/ContactThanks";
import { ContactConfirmationPage } from "pages/Contact/ContactConfirmation";
import { Admin } from "components/Admin";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/work/:id" element={<WorkPage />} />
          <Route path="/blog/:id" element={<BlogPage />} />
          <Route path="/contact" element={<ContactFormPage />} />
          <Route
            path="/contact/confirmation"
            element={<ContactConfirmationPage />}
          />
          <Route path="/contact/thanks" element={<ContactThanksPage />} />
        </Routes>
      </BrowserRouter>
      <Admin />
    </>
  );
}

export default App;
