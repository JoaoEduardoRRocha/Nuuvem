import "./navbar.scss"
import Logo from "../../assets/logo.png"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { removeToken, getUser } from "../../auth/auth-helper"
import { GoSignOut } from "react-icons/go"

function Navbar() {
  const navigate = useNavigate()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const checkAuth = async () => {
      const user = await getUser()
      setIsAuthenticated(!!user)
    }
    checkAuth()
  }, [])

  const handleLogout = () => {
    removeToken()
    navigate("/login")
  }

  const handleLogin = () => {
    navigate("/login")
  }

  return (
    <div className="navbar-container">
      <div className="navbar-container__logo-name-content">
        <img
          className="navbar-container__logo"
          src={Logo}
          alt="Logo da Nuuvem Clone"
        />
        <p className="navbar-container__logo-name">NUUVEM CLONE</p>
      </div>
      <div className="navbar-container__nav-options">
        <p className="navbar-container__options">GAMES</p>
        <p className="navbar-container__options">ABOUT</p>
        <input
          className="navbar-container__input-search"
          type="text"
          placeholder="Search for items..."
        />
      </div>
      <div>
        {isAuthenticated ? (
          <button
            className="navbar-container__btn-add-itens"
            onClick={handleLogout}
          >
            <GoSignOut size={20} />
          </button>
        ) : (
          <button
            className="navbar-container__btn-add-itens"
            onClick={handleLogin}
          >
            Entrar
          </button>
        )}
      </div>
    </div>
  )
}

export default Navbar
