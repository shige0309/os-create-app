import "App.css";
import { HomePage } from "pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { WorkPage } from "pages/Work";
import { BlogPage } from "pages/Blog";
import { ContactFormPage } from "pages/Contact/ContactForm";
import { ContactThanksPage } from "pages/Contact/ContactThanks";
import { Login } from "./pages/Login";
import { WorksRegister } from "pages/Work/WorksRegister";
import { BlogRegister } from "pages/Blog/BlogRegister";
import { AdminUpdate } from "pages/AdminUpdate";
import { useAppSelector } from "stores/hooks";
import { useEffect } from "react";
import axios from "axios";
import { useAdmin } from "hooks/useAdmin";
import { BlogUpdate } from "pages/Blog/BlogUpdate";
import { ContactConfirmationPage } from "pages/Contact/ContactConfirmation";

function App() {
  const { admin } = useAppSelector((state) => state);
  const { getAdmin } = useAdmin();

  useEffect(() => {
    if (!admin.id) {
      const token = localStorage.getItem("token");
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        getAdmin();
      }
    }
  }, [admin, getAdmin]);
  return (
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
        <Route
          path="/login"
          element={admin.id ? <WorksRegister /> : <Login />}
        />
        <Route
          path="/works/register"
          element={admin.id ? <WorksRegister /> : <Login />}
        />
        <Route
          path="/blog/register"
          element={admin.id ? <BlogRegister /> : <Login />}
        />
        <Route
          path="/blog/update/:id"
          element={admin.id ? <BlogUpdate /> : <Login />}
        />
        <Route
          path="/admin/update"
          element={admin.id ? <AdminUpdate /> : <Login />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
