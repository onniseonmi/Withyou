import React from "react";
import { Link } from "react-router-dom";
import "../css/LandingPage.css";
// import weddingarch from "../videos/weddingarch.mp4";
import Footer from "../components/Footer";
import landingVideo from "../videos/landingVideo.mp4";
// import landingVideo from "../videos/landingVideo.gif";

const LandingPage = (landingOn, setLandingOn) => {
  return (
    <div className="ladning-body">
      <div className="landing">
        <div className="video-box">
          <video
            id="landing-video"
            // autoplay="autoplay"
            // loop="Loop"
            muted
            volume="0"
          >
            <source src={landingVideo} type="video/mp4" />
          </video>
          <div className="landing-container">
            <div className="landing-title">
              <div>세상에 없던 단 하나뿐인</div>
              <div>청첩장, 쉬운 디자인을 도와드립니다.</div>
              <a className="phone-start" href="/editpage">
                <div className="main-get-started" onClick={() => setLandingOn(false)}>시작하기</div>
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="phone-landing">
        <div className="phone-landing-logo">
          <div className="first-box">
            <div className="f-left">W</div>
            <div className="f-right">
              <div className="sec-top">For your wedding</div>
              <div className="sec-bot">ithyou</div>
            </div>
          </div>
          <div className="second-box">
            <div>
              <div className="second-box-top">
                Make your own wedding invitation
                Make your own wedding invitation
              </div>
              <div className="second-box-bottom">
                <a href="/editpage">
                  <div>Start</div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      <div className="landing-footer">
        <Footer />
      </div>
    </div>
  );
};

export default LandingPage;
