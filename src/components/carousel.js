import { useCallback, useEffect, useRef, useState } from "react";
import "../styles/carousel.css";

  const Carousel = ({ children }) => {
  const containerRef = useRef();
  // 'current' is like an index to update the slide in carousel 
  const [current, setCurrent] = useState(0);
  // 'translateX' is to update the amount it should move
  const [translateX, setTranslateX] = useState(0);

  // previous and next buttons
  const btnHandler = useCallback((direction)=>{
    containerRef.current.style.transitionDuration = "400ms";
    //logic for previous button
    if(direction === 'prev') {
        if(current <= 0){
            setTranslateX(containerRef.current.clientWidth * (children.length - 1));
            setCurrent(children.length - 1)
        } else {
            setTranslateX(containerRef.current.clientWidth * (current - 1));
            setCurrent(current - 1);
        }// logic for next button
    } else if( direction === 'next'){
        if(current === children.length-1){
            setTranslateX(0)
            setCurrent(0)
        } else {
            setTranslateX(containerRef.current.clientWidth * (current +1));
            setCurrent(current + 1);
        }
    }
  },[current,children])

// auto scroll with 5s interval
useEffect(()=> { setInterval(()=>{ btnHandler("next") },5000) },[btnHandler]);


//to display slides in carouse
  const slides = () => {
    if (children.length > 1) {
      let items = children.map((child, index) => {
          return (<li key={index} className="slide">
            {child}
          </li>)
      }
      );
      console.log(items)
      return [
        ...items
      ];
    }
  }


  return (
    <section className="section">
      <ul
      ref={containerRef}
        className="container"
        style={{ transform: `translate3d(${-translateX}px, 0, 0)` }}
      >
        {slides()}
      </ul>
      <button className="btn left" onClick={() => btnHandler('prev')} >{"<"}</button>
        <button className="btn right" onClick={() => btnHandler('next')} >{">"}</button>
    </section>
  );
};

export default Carousel;
