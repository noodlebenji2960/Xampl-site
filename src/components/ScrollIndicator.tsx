import React, { useLayoutEffect, useState } from "react";
import "./ScrollIndicator.css";
import { AiOutlineArrowUp } from "react-icons/ai";
import { useScroll } from "../contexts/ScrollContext";

function ScrollIndicator({ locked, unlock }) {
  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(false);

  useLayoutEffect(() => {
      setIsVisible(scrollY > 100);
  }, [scrollY]);

  return (
    <div className={`scroll-indicator-container ${isVisible ? "fade-in" : ""}`}>
      <div
        className="padlock"
        title={`Scrolling ${locked ? "locked" : "unlocked"}`}
        onClick={() => unlock((prev) => !prev)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48px"
          height="48px"
          className={`${!locked ? "latch-open" : "latch-closed"}`}
        >
          <path id="latch" />
          <rect
            x="12"
            y="16"
            width="24"
            height="21"
            rx="3"
            fill="transparent"
            strokeWidth="3"
          />
        </svg>
      </div>
      <AiOutlineArrowUp
        className="ScrollToTopArrow"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      />
    </div>
  );
}

export default ScrollIndicator;
