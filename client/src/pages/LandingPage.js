import React from "react";
import { Link } from "react-router-dom";
import "../css/LandingPage.css";
import weddingarch from "../images/weddingarch.mp4";

// import footer

const LandingPage = () => {
  return (
    <div>
      <div className="landing">
        <div className="video-box">
          <video
            id="landing-video"
            autoplay="autoplay"
            loop="Loop"
            muted
            volume="0"
          >
            <source src={weddingarch} type="video/mp4"></source>
          </video>
          <div className="landing-title">
            세상에 없던 단 하나뿐인
            <br />
            청첩장, 쉬운 디자인을 도와드립니다.
          </div>
          <div className="main-get-started">
              <a className="start" href="/editpage">
              <button className="main-get-started-btn">시작하기
              </button>
              </a>
          </div>
        </div>
      </div>

      <div className="section1">
        <div>
          <div className="content1">
            <div className="title">
              세상에 없던 단 하나뿐인
              <br />
              청첩장, 쉬운 디자인을 도와드립니다.
            </div>

            <div className="content">
              곳으로 인생에 뜨거운지라, 위하여서 눈이 어디 방황하였으며,
              부패뿐이다.
              <br />
              몸이 인도하겠다는 청춘은 새가 미인을 품고 무엇을 인간이 만물은
              황금시대다.
            </div>
            <button className="get-started-btn">
              <a className="start" to="/editpage">시작하기</a>
            </button>
            <button className="see-more-btn">자세히 알아보기</button>
          </div>
        </div>
      </div>

      <div className="section2">
        <div>
          <div className="title">
            세상에 없던 단 하나뿐인
            <br />
            청첩장, 쉬운 디자인을 도와드립니다.
          </div>
          <div className="content">
            앞이 피에 우리 밥을 가치를 구하지 인간의 같은 말이다. 않는 생의 별과
            황금시대의 봄바람이다.
          </div>

          <div className="content">
            것은 아름답고 얼마나 석가는 있는 찾아다녀도, 무엇이 굳세게
            봄바람이다. 그것은 무한한 피부가 이상은 인류의 예가 그들의
            인도하겠다는 그러므로 사막이다. 크고 청춘의 방황하여도, 힘차게
            풀밭에 이상, 청춘의 관현악이며, 아름다우냐?
          </div>

          <div className="content">
            곳으로 인생에 뜨거운지라, 위하여서 눈이 어디 방황하였으며,
            부패뿐이다. 몸이 인도하겠다는 청춘은 새가 미인을 품고 무엇을 인간이
            만물은 황금시대다.
          </div>
          <button className="get-started-btn">시작하기</button>
          <button className="see-more-btn">자세히 알아보기</button>
        </div>
      </div>

      <div className="section3">
        <div className="title">
          세상에 없던 단 하나뿐인
          <br />
          청첩장, 쉬운 디자인을 도와드립니다.
        </div>

        <div className="content">
          앞이 피에 우리 밥을 가치를 구하지 인간의 같은 말이다. 않는 생의 별과
          황금시대의 봄바람이다.
        </div>

        <div className="content">
          것은 아름답고 얼마나 석가는 있는 찾아다녀도, 무엇이 굳세게 봄바람이다.
          그것은 무한한 피부가 이상은 인류의 예가 그들의 인도하겠다는 그러므로
          사막이다. 크고 청춘의 방황하여도, 힘차게 풀밭에 이상, 청춘의
          관현악이며, 아름다우냐?
        </div>

        <div className="content">
          곳으로 인생에 뜨거운지라, 위하여서 눈이 어디 방황하였으며, 부패뿐이다.
          몸이 인도하겠다는 청춘은 새가 미인을 품고 무엇을 인간이 만물은
          황금시대다.
        </div>
      </div>

      <div className="section4">
        <div className="background-image">
          <div>
            <div className="title">Get Started !</div>

            <div className="content">
              앞이 피에 우리 밥을 가치를 구하지 인간의 같은 말이다. 않는 생의
              별과 황금시대의 봄바람이다.
            </div>

            <div className="content">
              것은 아름답고 얼마나 석가는 있는 찾아다녀도, 무엇이 굳세게
              봄바람이다. 그것은 무한한 피부가 이상은 인류의 예가 그들의
              인도하겠다는 그러므로 사막이다. 크고 청춘의 방황하여도, 힘차게
              풀밭에 이상, 청춘의 관현악이며, 아름다우냐?
            </div>

            <div className="content">
              곳으로 인생에 뜨거운지라, 위하여서 눈이 어디 방황하였으며,
              부패뿐이다. 몸이 인도하겠다는 청춘은 새가 미인을 품고 무엇을
              인간이 만물은 황금시대다.
            </div>
            <button className="get-started-btn">
              <a className="start" to="/editpage">시작하기</a>
            </button>
            <button className="see-more-btn">자세히 알아보기</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
