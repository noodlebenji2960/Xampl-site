import { useEffect, useRef, useState } from "react";
import "./CTA.css";
import { useWindowSize } from "../contexts/WindowSizeContext";
import ContactUs from "./ContactUs";

function CTA2() {
  return (
    <section className={`cta2`}>
      <div className="cta-content2">
        <h2>
          What are you waiting for?
        </h2>
        <p>
          Start your journey with us today and unlock endless possibilities.
          Whether you’re looking to grow your business, advance your career, or
          simply learn something new, we’re here to guide you every step of the
          way. Don’t wait—your future is waiting!
        </p>
        <ContactUs/>
      </div>
    </section>
  );
}

export default CTA2;
