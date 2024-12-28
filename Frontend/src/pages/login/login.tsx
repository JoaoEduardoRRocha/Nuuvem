import React, { useEffect, useState } from "react"
import axios from "axios"
import "./login.scss"
import BackgroundImg from "../../assets/wallpeaper.jpg"
import { Link, useNavigate } from "react-router-dom"
import { setToken, getUser } from "../../auth/auth-helper"
import LoadingScreen from "../../components/loading-screen/loading-screen"

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate() 

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer) 
  }, [])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true) 

    axios
      .post("http://localhost:5050/api/users/login", {
        email,
        password,
      })
      .then(async (response: any) => {
        setToken(response.data.accessToken)

        const user = await getUser()

        setTimeout(() => {
          if (user?.isAdmin) {
            navigate("/home-admin")
          } else if (user) {
            navigate("/home") 
          } else {
            navigate("/unauthorized")
          }
          setLoading(false)
        }, 1000)
      })
      .catch((error) => {
        setLoading(false) 
        console.error("Erro ao efetuar login: ", error) 
        alert("Credenciais inválidas. Tente novamente.") 
      })
  }

  if (loading) return <LoadingScreen /> 

  return (
    <div className="login-up">
      <img
        className="login-up__background"
        src={BackgroundImg}
        alt="Background"
      />
      <form className="login-up__form" onSubmit={handleSubmit}>
        <h1 className="login-up__title">Faça Login</h1>
        <div className="login-up__form-group">
          <label className="login-up__label" htmlFor="email">
            Email:
          </label>
          <input
            className="login-up__input"
            id="email"
            type="email"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label className="login-up__label" htmlFor="password">
            Senha:
          </label>
          <input
            className="login-up__input"
            id="password"
            type="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <p className="sign-up__redirect">
          Já possui uma conta?
          <Link className="link" to="/signup">
            <span className="login-up__link">Cadastre-se agora</span>
          </Link>
        </p>

        <button className="login-up__button" type="submit">
          Entrar
        </button>
      </form>
    </div>
  )
}

export default Login
