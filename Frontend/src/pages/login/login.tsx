import "./login.scss";
import BackgroundImg from "../../assets/wallpeaper.jpg";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="login-up">
      <img
        className="login-up__background"
        src={BackgroundImg}
        alt="Background"
      />
      <form className="login-up__form">
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

        <Link className="link" to="/signup">
          <span className="login-up__link">Cadastre-se agora</span>
        </Link>
        <button className="login-up__button" type="submit">
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Login;
