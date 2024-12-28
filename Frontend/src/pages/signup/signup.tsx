import React, { useEffect, useState } from "react"
import axios from "axios"
import "./signup.scss"
import BackgroundImg from "../../assets/wallpeaper.jpg"
import { Link, useNavigate } from "react-router-dom"
import LoadingScreen from "../../components/loading-screen/loading-screen"

function SignUp() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirmation, setPasswordConfirmation] = useState("")
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
      .post("http://localhost:5050/api/users/signup", {
        name,
        email,
        password,
        passwordConfirmation,
      })
      .then(() => {
        setTimeout(() => {
          setLoading(false) 
          navigate("/login") 
        }, 1000) 
      })
      .catch((error) => {
        setLoading(false) 
        console.error("Erro ao criar conta: ", error)
        alert(
          error.response?.data?.message ||
            "Erro ao criar conta. Tente novamente."
        )
      })
  }

  if (loading) return <LoadingScreen /> 

  return (
    <div className="sign-up">
      <img
        className="sign-up__background"
        src={BackgroundImg}
        alt="Background"
      />

      <form className="sign-up__form" onSubmit={handleSubmit}>
        <h1 className="sign-up__title">Crie sua Conta</h1>
        <div className="sign-up__form-group">
          <label className="sign-up__label" htmlFor="name">
            Nome:
          </label>
          <input
            className="sign-up__input"
            id="name"
            type="text"
            placeholder="Digite seu nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label className="sign-up__label" htmlFor="email">
            Email:
          </label>
          <input
            className="sign-up__input"
            id="email"
            type="email"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label className="sign-up__label" htmlFor="password">
            Senha:
          </label>
          <input
            className="sign-up__input"
            id="password"
            type="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label className="sign-up__label" htmlFor="password-confirmation">
            Confirme sua Senha:
          </label>
          <input
            className="sign-up__input"
            id="password-confirmation"
            type="password"
            placeholder="Confirme sua senha"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            required
          />
        </div>
        <p className="sign-up__redirect">
          Já possui uma conta?
          <Link className="link" to="/login">
            <span className="sign-up__link">Faça Login</span>
          </Link>
        </p>
        <button className="sign-up__button" type="submit">
          Criar Conta
        </button>
      </form>
    </div>
  )
}

export default SignUp
