import React from "react";
import { Link } from "react-router-dom";
import "../css/LandingPage.css";
import landing from "../images/landing.jpg";
import section_1 from "../images/section_1.png"
import section_2 from "../images/section_2.png"
import section_3 from "../images/section_3.png"
import section_4 from "../images/section_4.jpg"


const LandingPage = () => {
  return (
  <div>
      <div className="landing">
      <img className="landing_img" src={landing} alt="landing"></img>
      <div className="main-get-started">
           <button className="main-get-started-btn">
            <Link to="/editpage">시작하기</Link>
           </button>
        </div>
      </div>

      <div className="section1">
      <div>
      <div className="img">
      <img className="section1_img" src={section_1} alt="section_1"></img>
      </div>

            <div className="title">
              세상에 없던 단 하나뿐인<br/>청첩장, 쉬운 디자인과 생성을 도와드립니다.
            </div>
            
            <div className="content">
            앞이 피에 우리 밥을 가치를 구하지 인간의 같은 말이다. 않는 생의 별과 황금시대의 봄바람이다.
            </div>

            <div className="content">
            것은 아름답고 얼마나 석가는 있는 찾아다녀도, 무엇이 굳세게 봄바람이다. 그것은 무한한 피부가 이상은 인류의 예가 그들의 인도하겠다는 그러므로 사막이다. 크고 청춘의 방황하여도, 힘차게 풀밭에 이상, 청춘의 관현악이며, 아름다우냐?
            </div>
            
            <div className="content">
            곳으로 인생에 뜨거운지라, 위하여서 눈이 어디 방황하였으며, 부패뿐이다. 몸이 인도하겠다는 청춘은 새가 미인을 품고 무엇을 인간이 만물은 황금시대다.
            </div>

            <button className="get-started-btn">
            <Link to="/editpage">시작하기</Link>
            </button>
            <button className="see-more-btn">
              자세히 알아보기
            </button>
          </div>
      </div>

      <div className="section2">
        <img className="section2_img" src={section_2} alt="section_2"></img>
          <div>
            <div className="title">
              세상에 없던 단 하나뿐인<br/>청첩장, 쉬운 디자인과 생성을 도와드립니다.
            </div>
            <div className="content">
            앞이 피에 우리 밥을 가치를 구하지 인간의 같은 말이다. 않는 생의 별과 황금시대의 봄바람이다.
            </div>

            <div className="content">
            것은 아름답고 얼마나 석가는 있는 찾아다녀도, 무엇이 굳세게 봄바람이다. 그것은 무한한 피부가 이상은 인류의 예가 그들의 인도하겠다는 그러므로 사막이다. 크고 청춘의 방황하여도, 힘차게 풀밭에 이상, 청춘의 관현악이며, 아름다우냐?
            </div>
            
            <div className="content">
            곳으로 인생에 뜨거운지라, 위하여서 눈이 어디 방황하였으며, 부패뿐이다. 몸이 인도하겠다는 청춘은 새가 미인을 품고 무엇을 인간이 만물은 황금시대다.
            </div>

            <button className="get-started-btn">
            시작하기
            </button>
            <button className="see-more-btn">
              자세히 알아보기
            </button>
          </div>
      </div>

      <div className="section3">
      <img className="section3_img" src={section_3} alt="section_3"></img>
            <div className="title">
              세상에 없던 단 하나뿐인<br/>청첩장, 쉬운 디자인과 생성을 도와드립니다.
            </div>

            <div className="content">
            앞이 피에 우리 밥을 가치를 구하지 인간의 같은 말이다. 않는 생의 별과 황금시대의 봄바람이다.
            </div>

            <div className="content">
            것은 아름답고 얼마나 석가는 있는 찾아다녀도, 무엇이 굳세게 봄바람이다. 그것은 무한한 피부가 이상은 인류의 예가 그들의 인도하겠다는 그러므로 사막이다. 크고 청춘의 방황하여도, 힘차게 풀밭에 이상, 청춘의 관현악이며, 아름다우냐?
            </div>
            
            <div className="content">
            곳으로 인생에 뜨거운지라, 위하여서 눈이 어디 방황하였으며, 부패뿐이다. 몸이 인도하겠다는 청춘은 새가 미인을 품고 무엇을 인간이 만물은 황금시대다.
            </div>
      </div>

          
    <div className="section4">
    <div className="background-image">
    <img className="section4_img" src={section_4} alt="section_4"></img>
          <div>
            <div className="title">
              Get Started !
            </div>

            <div className="content">
            앞이 피에 우리 밥을 가치를 구하지 인간의 같은 말이다. 않는 생의 별과 황금시대의 봄바람이다.
            </div>

            <div className="content">
            것은 아름답고 얼마나 석가는 있는 찾아다녀도, 무엇이 굳세게 봄바람이다. 그것은 무한한 피부가 이상은 인류의 예가 그들의 인도하겠다는 그러므로 사막이다. 크고 청춘의 방황하여도, 힘차게 풀밭에 이상, 청춘의 관현악이며, 아름다우냐?
            </div>
            
            <div className="content">
            곳으로 인생에 뜨거운지라, 위하여서 눈이 어디 방황하였으며, 부패뿐이다. 몸이 인도하겠다는 청춘은 새가 미인을 품고 무엇을 인간이 만물은 황금시대다.
            </div>
            <button className="get-started-btn">
            <Link to="/editpage">시작하기</Link>
            </button>
            <button className="see-more-btn">
              자세히 알아보기
            </button>
          </div>
        </div>
    </div>

  </div>
  );
};

export default LandingPage;
