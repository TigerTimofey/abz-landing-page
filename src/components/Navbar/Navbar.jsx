import './Navbar.scss'
import logo from '../../assets/Logo.svg'

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <img src={logo} alt="Logo" />
      </div>
      <div className="navbar__actions">
        <button className="button-yellow">Users</button>
        <button className="button-yellow">Sign up</button>
      </div>
    </nav>
  )
}

export default Navbar
