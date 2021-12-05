import React from 'react';
import '../css/LandingPage.css';
import Footer from '../components/Footer';
import landingVideo from '../videos/landingVideo.mp4';
import { Link } from 'react-router-dom';
import landingVideo2 from '../videos/landingVideo.gif';

const LandingPage = ({ landingOn, setLandingOn }) => {
  return (
    <div className='landing-container'>
      <div className='landing-box video-box'>
        <video
          id='landing-video'
          autoplay='autoplay'
          loop='Loop'
          muted='false'
          volume='0.5'
        >
          <source src={landingVideo} type='video/mp4' alt={landingVideo} />
        </video>
        <img id='landing2-video' src={landingVideo2} alt={landingVideo2} />
      </div>
      <div className='landing-box landing-title-box'>
        <div>세상에 없던 단 하나뿐인</div>
        <div>청첩장, 쉬운 디자인을 도와드립니다.</div>
        <Link to='/editpage' className='phone-start'>
          <div className='main-get-started' onClick={() => setLandingOn(false)}>
            시작하기
          </div>
        </Link>
      </div>
      <div className='landing-footer'>
        <Footer landingOn={landingOn} />
      </div>
    </div>
  );
};

export default LandingPage;
