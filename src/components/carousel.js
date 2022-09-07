import { Children, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import "../styles/carousel.css";

const Carousel = ({ children }) => {
  const containerRef = useRef();

  const [current, setCurrent] = useState(1);
  const [translateX, setTranslateX] = useState(0);

  // previous and next buttons
  const btnHandler = useCallback((direction)=>{
    containerRef.current.style.transitionDuration = "400ms";
    if(direction === 'prev') {
        if(current <= 1){
            setTranslateX(0);
            setCurrent(children.length)
        } else {
            setTranslateX(containerRef.current.clientWidth * (current -1));
            setCurrent(current - 1);
        }
    } else if( direction === 'next'){
        if(current >= children.length){
            setTranslateX(containerRef.current.clientWidth * (children.length + 1));
            setCurrent(1)
        } else {
            setTranslateX(containerRef.current.clientWidth * (current +1));
            setCurrent(current + 1);
        }

    }
  },[current,children])

// auto scroll
useEffect(()=> { setInterval(()=>{ btnHandler("next") },2000) },[btnHandler]);

  const slides = useMemo(() => {
    if (children.length > 1) {
      let items = Children.map(children, (child, index) => (
        <li key={index} className="slide">
          {child}
        </li>
      ));
      return [
        <li key={children.length + 1} className="slide">
          {children[children.length - 1]}
        </li>,
        ...items,
      ];
    }
  }, [children]);

  useLayoutEffect(() => {
    setTranslateX(containerRef.current.clientWidth * current)
  });

  return (
    <section className="section">
      <ul
      ref={containerRef}
        className="container"
        style={{ transform: `translate3d(${-translateX}px, 0, 0)` }}
      >
        {slides}
      </ul>
      <button className="btn left" onClick={() => btnHandler('prev')} >{"<"}</button>
        <button className="btn right" onClick={() => btnHandler('next')} >{">"}</button>
    </section>
  );
};

export default Carousel;
