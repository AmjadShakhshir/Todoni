import { useDispatch } from "react-redux"
import { logout } from "../redux/Reducers/usersReducer";

const Navbar = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  }
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">Home</a>
        
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className="navbar-nav me-auto mb-2 mb-md-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/login">Login</a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/register">Register</a>
            </li>
            <li className="nav-item">
              <button className="btn btn-primary w-100 py-2" type="submit" onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar