import React, { useRef, useEffect, useCallback, ReactNode, useState } from "react";
import { useScroll } from "../contexts/ScrollContext";
import './HorizontalScroll.css'; // Make sure to import the CSS file

interface HorizontalScrollProps {
  children: ReactNode;
}

const HorizontalScroll: React.FC<HorizontalScrollProps> = ({ children }) => {
  const { observeElement, unobserveElement } = useScroll();
  const [disabledButtons, setDisabledButtons] = useState({ left: true, right: true });
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollableRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollableRef.current) {
      observeElement(scrollableRef.current);
    }
    return () => {
      if (scrollableRef.current) {
        unobserveElement(scrollableRef.current);
      }
    };
  }, [observeElement, unobserveElement]);

  const updateButtonState = () => {
    if (scrollableRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollableRef.current;
      
      // Update button states
      setDisabledButtons({
        left: scrollLeft === 0,
        right: scrollLeft + clientWidth >= scrollWidth,
      });
  
      // Calculate new index based on scroll position
      const newIndex = (scrollLeft / clientWidth).toFixed(0);
  
      // Set the active index if it's different from the current one
      if (newIndex !== activeIndex) {
        setActiveIndex(newIndex);
      }
    }
  };
  

  const scrollLeft = useCallback(() => {
    if (scrollableRef.current) {
      scrollableRef.current.scrollTo({
        left: scrollableRef.current.scrollLeft - scrollableRef.current.clientWidth,
        behavior: 'smooth'
      });
      updateButtonState();
    }
  }, [activeIndex]);

  const scrollRight = useCallback(() => {
    if (scrollableRef.current) {
      scrollableRef.current.scrollTo({
        left: scrollableRef.current.scrollLeft + scrollableRef.current.clientWidth,
        behavior: 'smooth'
      });
      updateButtonState();
    }
  }, [activeIndex]);

  const handleDotClick = (index: number) => {
    if (scrollableRef.current) {
      scrollableRef.current.scrollTo({
        left: scrollableRef.current.clientWidth * index,
        behavior: 'smooth'
      });
      updateButtonState();
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      updateButtonState();
    };

    if (scrollableRef.current) {
      scrollableRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (scrollableRef.current) {
        scrollableRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    updateButtonState(); // Initial check on mount
  }, []);

  const childElements = React.Children.map(children, (child, index) => (
    <div className={`slide ${index == activeIndex ? "activeSlide" : ""}`} key={index}>
      {child}
    </div>
  ));

  return (<>
      <div className="sideways-scroll-slide-container">
        <div
          ref={scrollableRef}
          className="sideways-scroll-slide"
        >
          {childElements}
        </div>
        <button
          className="scroll-button left"
          onClick={scrollLeft}
          disabled={disabledButtons.left}
        >
          &#10094;
        </button>
        <button
          className="scroll-button right"
          onClick={scrollRight}
          disabled={disabledButtons.right}
        >
          &#10095;
        </button>
      </div>
      <div className="dots-indicator">
        {React.Children.map(children, (child, index) => (
          <div
            className={`dot ${index === activeIndex ? 'active' : ''}`} 
            onClick={() => handleDotClick(index)}
            key={index}
          />
        ))}
      </div>
      </>);
};

export default HorizontalScroll;
