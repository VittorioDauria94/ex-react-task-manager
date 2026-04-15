import { NavLink } from "react-router-dom";
import navbarData from "../data/navbarData";

export default function Header() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid px-4">
        <NavLink className="navbar-brand" to="/">
          BoolTask
        </NavLink>
        <button className="navbar-toggler" type="button">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 gap-3">
            {navbarData.map((link) => (
              <li className="nav-item" key={link.id}>
                <NavLink className="boolTask-link" to={link.path}>{link.title}</NavLink>
              </li>
            ))}
          </ul>
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}
