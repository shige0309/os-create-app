import axios from "axios";
import { useAdmin } from "hooks/useAdmin";
import { AdminUpdate } from "pages/AdminUpdate";
import { BlogRegister } from "pages/Blog/BlogRegister";
import { BlogUpdate } from "pages/Blog/BlogUpdate";
import { Login } from "pages/Login";
import { WorksRegister } from "pages/Work/WorksRegister";
import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useAppSelector } from "stores/hooks";

export const Admin = () => {
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
  }, [admin.id, getAdmin]);

  return (
    <BrowserRouter>
      <Routes>
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
};
