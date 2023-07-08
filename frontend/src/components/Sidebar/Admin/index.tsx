import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";
import { useAdmin } from "hooks/useAdmin";

export const Sidebar = () => {
  const [url, setUrl] = useState<string>("");
  const location: string = useLocation().pathname;
  const [sidebarActive, setSidebarActive] = useState<string>("");
  const { logout } = useAdmin();

  useEffect(() => {
    setUrl(location);
  }, [location]);

  const hamburgerTrigger = () => {
    if (sidebarActive === "active") {
      setSidebarActive("");
    } else {
      setSidebarActive("active");
    }
  };

  return (
    <div>
      <div className={`c-sidebar ${sidebarActive ?? "active"}`}>
        <div className="c-sidebar-wrap">
          <header>
            {url === "/" ? (
              <h1>
                <img src="/logo.svg" alt="ロゴ" />
              </h1>
            ) : (
              <p>
                <img src="/logo.svg" alt="ロゴ" />
              </p>
            )}
            <nav>
              <ul className="c-sidebar-list">
                <li className="c-sidebar-list-item">
                  <Link to="/">HOME</Link>
                </li>
                <li className="c-sidebar-list-item">
                  <Link to="/works/register">WORKS登録</Link>
                </li>
                <li className="c-sidebar-list-item">
                  <Link to="/blog/register">BLOG登録</Link>
                </li>
                <li className="c-sidebar-list-item">
                  <Link to="/admin/update">管理者更新</Link>
                </li>
              </ul>
            </nav>
          </header>
        </div>
        <p className="c-sidebar-login">
          <button onClick={logout}>LOGOUT</button>
        </p>
      </div>
      <div className={`c-sidebar-hamburger ${sidebarActive ?? "active"}`}>
        <div className="c-sidebar-hamburger-wrap">
          <div className="c-sidebar-hamburger-block">
            <button
              className={`c-sidebar-hamburger-trigger ${
                sidebarActive ?? "active"
              }`}
              onClick={hamburgerTrigger}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
