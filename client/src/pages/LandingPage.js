import React from "react";
import "../css/LandingPage.css";
import Footer from "../components/Footer";
import landingVideo from "../videos/landingVideo.mp4";
import { Link } from "react-router-dom";

const LandingPage = ({ landingOn, setLandingOn }) => {
  return (
    <div className="ladning-body">
      <div className="landing">
        <div className="video-box">
          <video
            id="landing-video"
            autoplay="autoplay"
            loop="Loop"
            muted
            volume="0"
          >
            <source src={landingVideo} type="video/mp4" />
          </video>
          <div className="landing-container">
            <div className="landing-title">
              <div>세상에 없던 단 하나뿐인</div>
              <div>청첩장, 쉬운 디자인을 도와드립니다.</div>
              <Link to="/editpage" className="phone-start">
                <div
                  className="main-get-started"
                  onClick={() => setLandingOn(false)}
                >
                  시작하기
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div
        className="landing-footer"
        style={{
          backgroundColor: `${landingOn ? "transparent" : "#f2f0ec"}`,
        }}
      >
        <Footer />
      </div>
    </div>
  );
};

export default LandingPage;
