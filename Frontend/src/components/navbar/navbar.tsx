import './navbar.scss';
import Logo from '../../assets/logo.png'

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
            <input className='navbar-container__input-search' type="text" placeholder='Search for itens...'/>
        </div>
        <div>
            <button className='navbar-container__btn-login'>
                Enter
            </button>
        </div>

      
    </div>
  );
}

export default Navbar;
