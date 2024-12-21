import './loading-screen.scss';
import logo from '../../assets/logo.png'
import bgLoadingScreen from '../../assets/wallpeaper.jpg'

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
        <img className="loading-screen__bg-img" src={bgLoadingScreen} alt="" />
        <div className="loading-content">
        <img src={logo} alt="Logo" className="loading-logo" />
        <div className="loading-spinner"></div>
      </div>
    </div>
  );
};

export default LoadingScreen
