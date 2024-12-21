import HeroSection from '../../components/hero-section/hero-section'
import Navbar from '../../components/navbar/navbar'
import Section from '../../components/section/section'
import '../../app.css';

function App() {
  return (
    <div className="app">
      <Navbar />
      <img className='hero-img' src='https://wallpapers.com/images/hd/purple-gaming-sfiq72g5kksu8khe.jpg' />
      <HeroSection />
      <Section />
    </div>
  );
}

export default App;
