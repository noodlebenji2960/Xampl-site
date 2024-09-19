import "./App.css";
import Header from "./components/Header";
import Carousel from "./components/Carousel";
import Footer from "./components/Footer";
import CTA from "./components/CTA";
import FAQ from "./components/FAQ";
import ContactUs from "./components/ContactUs"; // Import the ContactUs component

import React from "react";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaGithub,
  FaInstagram,
  FaPinterest,
  FaSnapchat,
  FaReddit,
  FaTumblr,
  FaWhatsapp,
  FaYoutube,
  FaTwitch,
  FaCog,
  FaUsers,
  FaRocket,
} from "react-icons/fa";
import {
  AiFillApple,
  AiFillAndroid,
  AiFillAmazonCircle,
  AiFillFacebook,
  AiFillGoogleCircle,
} from "react-icons/ai";
import {
  DiGithubBadge,
  DiJenkins,
  DiDocker,
  DiPython,
  DiJavascript1,
} from "react-icons/di";
import { GiFox, GiNinjaHead, GiBrain } from "react-icons/gi";

import image1 from "./assets/mainImageCarousel/1.jpg";
import image2 from "./assets/mainImageCarousel/2.jpg";
import image3 from "./assets/mainImageCarousel/3.jpg";
import image4 from "./assets/mainImageCarousel/4.jpg";
import image5 from "./assets/mainImageCarousel/5.jpg";

import profile1 from "./assets/profile1.png";
import profile2 from "./assets/profile2.png";
import profile3 from "./assets/profile3.png";
import profile4 from "./assets/profile4.png";

import SideWaysScrollSlide from "./components/SideWaysScrollSlide";
import ChatNow from "./components/ChatNow";
import TeamMembers from "./components/TeamMembers";
import ScrollIndicator from "./components/ScrollIndicator";
import { ScrollProvider } from "./contexts/ScrollContext";
import StickyButtons from "./components/StickyButtons";

import HorizontalScrollComponent from "./components/HorizontalScroll";
import { WindowSizeProvider } from "./contexts/WindowSizeContext";
import Marquee from "react-fast-marquee";
import Logo from "./components/Logo";
import CTA2 from "./components/CTA2";

function App() {
  return (
    <WindowSizeProvider>
      <ScrollProvider>
        <Header />
        <main>
          <StickyButtons />
          <Carousel images={[image1, image2, image3, image4, image5]} />
          <section>
            <div className="cards">
              <div className="card">
                <span>
                  <FaCog size={40} />
                  <h3>Service One</h3>
                </span>
                <p>
                  Detail about service one, highlighting its benefits and
                  features.
                </p>
              </div>
              <div className="card">
                <span>
                  <FaUsers size={40} />
                  <h3>Service Two</h3>
                </span>
                <p>
                  Detail about service two, emphasizing what sets it apart from
                  the rest.
                </p>
              </div>
              <div className="card">
                <span>
                  <FaRocket size={40} />
                  <h3>Service Three</h3>
                </span>
                <p>
                  Detail about service three, including any special offers or
                  unique aspects.
                </p>
              </div>
            </div>
          </section>
          <section className="features-section">
            <h2>Why Us?</h2>
            <div className="features-cards">
              <div className="feature-card">
                <h3>Expert Team</h3>
                <p>
                  Our team consists of highly skilled professionals with years
                  of experience in the industry, ensuring top-quality service
                  every time.
                </p>
              </div>
              <div className="feature-card">
                <h3>Customer Focused</h3>
                <p>
                  We prioritize our clients' needs, delivering personalized
                  solutions that meet and exceed expectations.
                </p>
              </div>
              <div className="feature-card">
                <h3>Innovative Solutions</h3>
                <p>
                  Using the latest technology, we offer cutting-edge services
                  that keep you ahead of the curve.
                </p>
              </div>
            </div>
          </section>
          <section className="testimonials">
            <h2>What Our Clients Say:</h2>
            <HorizontalScrollComponent>
              <div className="testimonial-card">
                <img src={profile1} className="profilePicture" />
                <div>
                  <p>"Fantastic service! Highly recommend to everyone."</p>
                  <footer>- Client A, January 2024</footer>
                </div>
              </div>
              <div className="testimonial-card">
                <img src={profile2} className="profilePicture" />
                <div>
                  <p>"A truly exceptional experience from start to finish."</p>
                  <footer>- Client B, February 2024</footer>
                </div>
              </div>
              <div className="testimonial-card">
                <img src={profile3} className="profilePicture" />
                <div>
                  <p>"Professional, courteous, and top-notch service."</p>
                  <footer>- Client C, March 2024</footer>
                </div>
              </div>
              <div className="testimonial-card">
                <img src={profile4} className="profilePicture" />
                <div>
                  <p>
                    "Exceeded all my expectations with their attention to
                    detail."
                  </p>
                  <footer>- Client D, April 2024</footer>
                </div>
              </div>
            </HorizontalScrollComponent>
          </section>
          <section className="partners">
            <h2>Sponserd by:</h2>
            <Marquee direction={"right"}>
              <FaFacebook className="icon" />
              <FaTwitter className="icon" />
              <FaLinkedin className="icon" />
              <FaGithub className="icon" />
              <FaInstagram className="icon" />
              <FaPinterest className="icon" />
              <FaSnapchat className="icon" />
              <FaReddit className="icon" />
              <FaTumblr className="icon" />
              <FaWhatsapp className="icon" />
              <FaYoutube className="icon" />
              <FaTwitch className="icon" />
              <AiFillApple className="icon" />
              <AiFillAndroid className="icon" />
              <AiFillAmazonCircle className="icon" />
              <AiFillFacebook className="icon" />
              <AiFillGoogleCircle className="icon" />
              <DiGithubBadge className="icon" />
              <DiJenkins className="icon" />
              <DiDocker className="icon" />
              <DiPython className="icon" />
              <DiJavascript1 className="icon" />
              <GiFox className="icon" />
              <GiNinjaHead className="icon" />
              <GiBrain className="icon" />
            </Marquee>
            <span>
              <p>
                We proudly collaborate with a diverse range of leading
                organizations and innovative brands. Explore our valued partners
                below to see the companies and technologies we work with, or
                <a href="/contact-us">{" contact us"}</a> to learn more about potential collaborations.
              </p>
            </span>
          </section>
          <section className="team-section">
            <TeamMembers />
          </section>
          <section>
            <CTA />
          </section>
          <section>
            <FAQ />
          </section>
          <section>
            <CTA2/>
          </section>
        </main>
        <Footer />
      </ScrollProvider>
    </WindowSizeProvider>
  );
}

export default App;
