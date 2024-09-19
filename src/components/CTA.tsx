import { useEffect, useRef, useState } from "react";
import "./CTA.css";
import { useWindowSize } from "../contexts/WindowSizeContext";

function CTA() {
  const [isVisible, setIsVisible] = useState(false);
  const ctaRef = useRef(null);
  const cursorRef = useRef(null);
  const cursorTargetRef = useRef(null);
  const { windowSize } = useWindowSize();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0.1 } // Adjust as needed
    );

    if (ctaRef.current) {
      observer.observe(ctaRef.current);
    }

    return () => {
      if (ctaRef.current) {
        observer.unobserve(ctaRef.current);
      }
    };
  }, []);

  return (
    <section ref={ctaRef} className={`cta ${isVisible ? "animate" : ""}`}>
      <div ref={cursorRef} className={`cursor ${isVisible ? "animate" : ""}`} />
      <svg width="0" height="0" xmlns="http://www.w3.org/2000/svg">
        <path
          id="ctaPath"
          d="M0,300 C50,250 150,50 300,100"
          fill="transparent"
          stroke="transparent"
        />
      </svg>

      <div className="cta-content">
        <h2>
          Ready {windowSize && windowSize.width>600 && "to Get Started"}
          <div className="question-mark">
            <svg
              width="65mm"
              height="85mm"
              viewBox="0 0 65 85"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="m 8.1879003,35.373587 c 0.04762,-11.04638 1.655701,-18.25869 8.8699317,-22.84957 4.552295,-2.9319802 8.558718,-4.3979802 15.194267,-4.3979802 8.718804,0 12.458784,2.0832602 16.938064,6.2497702 4.88491,4.64547 7.62189,10.33911 7.62189,18.51781 0,5.01524 -1.78298,9.23962 -4.2906,12.67313 -1.46599,2.08325 -4.8114,4.74519 -8.97791,7.9858 l -4.63781,3.18275 c -2.23757,1.73605 -3.72285,3.76143 -4.45585,6.07616 -0.40246,1.27443 -0.64455,3.16113 -0.7263,5.6601 -0.0123,0.37561 -0.0209,12.9359 -0.026,13.33918" />
            </svg>
          </div>
        </h2>
        <p>
          Join us today and take the first step towards achieving your goals.
          Whether you're looking to enhance your business or improve your
          skills, we have the resources and support you need to succeed.
        </p>
        <button ref={cursorTargetRef} href="/signup" className="cta-button">
          Sign up now!
        </button>
      </div>
    </section>
  );
}

export default CTA;
