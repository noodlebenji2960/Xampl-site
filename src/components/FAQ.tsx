import React, { useState, useRef, useEffect } from "react";
import "./FAQ.css"; // Add styles for the FAQ section
import ContactUs from "./ContactUs";
import { useScroll } from "../contexts/ScrollContext";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [findUsIsActive, setFindUsIsActive] = useState(false);
  const faqRefs = useRef([]);
  const { scrollY } = useScroll();

  const faqs = [
    {
      question: "What services do you offer?",
      answer:
        "We offer a range of services including web development, graphic design, and digital marketing.",
    },
    {
      question: "What is your refund policy?",
      answer:
        "We offer a 30-day money-back guarantee on most of our services. For detailed information, please refer to our refund policy page.",
    },
    {
      question: "Do you offer custom solutions?",
      answer:
        "Yes, we provide custom solutions tailored to your specific needs. Please get in touch with us to discuss your requirements.",
    },
    {
      question: "How can I contact support?",
      answer: (
        <div>
          We are available 24/7 to solve any issue! You can contact our support
          team via email at support@xample.com or if you would just like to say
          hey, drop us a message!
          <ContactUs />
        </div>
      ),
    },
    {
      question: "Where are you located?",
      answer: (
        <div onClick={(e) => e.stopPropagation()}>
          <p>
            Feel free to drop by during our{" "}
            <a
              onClick={(e) => {
                setFindUsIsActive((prev) => !prev);
              }}
            >
              business hours
            </a>{" "}
            or give us a call to schedule an appointment. For your convenience,
            you can also find our location on the map below. We look forward to
            seeing you soon!
          </p>
          <div className={`find-us ${findUsIsActive ? "active" : ""}`}>
            <div className="find-us-content">
              <p>
                We’d love to welcome you to our office! Whether you’re a
                long-time customer or a new visitor, we’re here to assist you
                and answer any questions you may have.
              </p>
              <p>
                <strong>Location:</strong>
                <br />
                123 Business Lane
                <br />
                Business City, BC 12345
                <br />
                Country
              </p>
              <p>
                <strong>Opening Hours:</strong>
                <br />
                Monday - Friday: 9:00 AM - 5:00 PM
                <br />
                Saturday: 10:00 AM - 3:00 PM
                <br />
                Sunday: Closed
              </p>
            </div>
            <iframe
              title="Google Maps"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7263.502959402366!2d54.3786068!3d24.4594062!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5e689d36038049%3A0x54e5fc8a8a7bbdff!2sFake%20company!5e0!3m2!1sen!2ses!4v1726623319899!5m2!1sen!2ses"
              width="600"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      ),
    },
  ];

  const toggleFAQ = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  const isElementInViewport = (el) => {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 50 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  };
  let timeout;
  useEffect(() => {
    timeout = setTimeout(()=>{
      if (activeIndex !== null && faqRefs.current[activeIndex]) {
        const activeFAQ = faqRefs.current[activeIndex];
        if (!isElementInViewport(activeFAQ)) {
          setActiveIndex(null);
        }
      }
    },500)

    return ()=>clearTimeout(timeout)

  }, [activeIndex, scrollY, timeout]);

  useEffect(() => {
    const hijackWheel = e => e.preventDefault()
    if (activeIndex !== null && faqRefs.current[activeIndex]) {
      const activeFAQ = faqRefs.current[activeIndex];
      setTimeout(() => {
        if (!isElementInViewport(activeFAQ)) {
          window.addEventListener("wheel", hijackWheel)
          activeFAQ.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
        setTimeout(()=>window.removeEventListener("scroll", hijackWheel),1000)
      }, 200);
    }
  }, [activeIndex]);

  return (
    <section className="faq">
      {faqs.map((faq, index) => (
        <div
          className={`faq-item ${activeIndex === index ? "active" : ""}`}
          key={index}
          onClick={() => toggleFAQ(index)}
          ref={(el) => (faqRefs.current[index] = el)}
        >
          <h3 className="faq-question">{faq.question}</h3>
          {typeof faq.answer === "string" ? (
            <p className="faq-answer">{faq.answer}</p>
          ) : (
            <div className="faq-answer">{faq.answer}</div>
          )}
        </div>
      ))}
    </section>
  );
};

export default FAQ;
