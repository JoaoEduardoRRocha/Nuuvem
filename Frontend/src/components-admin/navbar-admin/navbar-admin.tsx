import './navbar-admin.scss';
import Logo from '../../assets/logo.png'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div className='navbar-container'>
        <div className='navbar-container__logo-name-content'>
            <img className='navbar-container__logo' src={Logo} alt="Logo da Nuuvem Clone" />
            <p className='navbar-container__logo-name'>NUUVEM CLONE</p>
        </div>
        <div className='navbar-container__nav-options'>
            <p className='navbar-container__options'>GAMES</p>
            <p className='navbar-container__options'>SALE</p>
            <p className='navbar-container__options'>ABOUT</p>
        </div>
        <div>
            <Link className='link' to='/add-card'>
            <button className='navbar-container__btn-add-itens'>
                Adicionar Itens
            </button>
            </Link>
        </div>

      
    </div>
  );
}

export default Navbar;
