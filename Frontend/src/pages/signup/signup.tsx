import './signup.scss';
import BackgroundImg from '../../assets/wallpeaper.jpg';
import { Link } from 'react-router-dom';

function SignUp() {
  return (
    <div className="sign-up">
      <img className="sign-up__background" src={BackgroundImg} alt="Background" />

      <form className="sign-up__form">
        <h1 className="sign-up__title">Crie sua Conta</h1>
        <div className="sign-up__form-group">
          <label className="sign-up__label" htmlFor="name">Nome:</label>
          <input className="sign-up__input" id="name" type="text" placeholder="Digite seu nome" />
          <label className="sign-up__label" htmlFor="email">Email:</label>
          <input className="sign-up__input" id="email" type="email" placeholder="Digite seu email" />
          <label className="sign-up__label" htmlFor="password">Senha:</label>
          <input className="sign-up__input" id="password" type="password" placeholder="Digite sua senha" />
          <label className="sign-up__label" htmlFor="password-confirmation">Confirme sua Senha:</label>
          <input className="sign-up__input" id="password-confirmation" type="password" placeholder="Confirme sua senha" />
        </div>
        <p className="sign-up__redirect">
          Já possui uma conta? 
          <Link className='link' to="/login">
            <span className="sign-up__link">Faça Login</span>
          </Link>
        </p>
        <button className="sign-up__button">Criar Conta</button>
      </form>
    </div>
  );
}

export default SignUp;
