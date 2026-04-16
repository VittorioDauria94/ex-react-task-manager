import { NavLink } from "react-router-dom";
import navbarData from "../data/navbarData";

export default function Header() {
  function handleSubmit(e) {
    e.preventDefault();
  }
  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom shadow-sm sticky-top">
      <div className="container py-2">
        <NavLink
          className="navbar-brand fw-bold fs-4 text-dark d-flex align-items-center gap-2"
          to="/"
        >
          <span className="badge text-bg-primary rounded-pill px-3 py-2">
            BT
          </span>
          BoolTasks
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-controls="mainNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav mx-auto mb-3 mb-lg-0 gap-lg-2">
            {navbarData.map((link) => (
              <li className="nav-item" key={link.id}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `nav-link px-3 py-2 rounded-pill fw-medium ${
                      isActive ? "active bg-primary text-white" : "text-dark"
                    }`
                  }
                >
                  {link.title}
                </NavLink>
              </li>
            ))}
          </ul>

          <form className="d-flex gap-2" role="search" onSubmit={handleSubmit}>
            <input
              className="form-control rounded-pill"
              type="search"
              placeholder="Cerca la task..."
              aria-label="Search"
            />
            <button className="btn btn-primary rounded-pill px-4" type="submit">
              Cerca
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}
