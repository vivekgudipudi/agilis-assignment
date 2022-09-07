import './App.css';
import Carousel from './components/carousel';
import image1 from './assets/image-1.jpg';
import image2 from './assets/image-2.jpg'
import image3 from './assets/image-3.jpg'
import image4 from './assets/image-4.jpg'
import image5 from './assets/image-5.jpg'


function App() {
  return (
    <div className="App">
      <Carousel>
        <img src={image1} alt = "nature" style={{width : '100%',height : '100%'}} />
        <img src={image2} alt = "nature" style={{width : '100%',height : '100%'}} />
        <img src={image3} alt = "nature" style={{width : '100%',height : '100%'}} />
        <img src={image4} alt = "nature" style={{width : '100%',height : '100%'}} />
        <img src={image5} alt = "nature" style={{width : '100%',height : '100%'}} />
      </Carousel>
    </div>
  );
}

export default App;
