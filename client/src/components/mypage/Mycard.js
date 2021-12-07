import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../css/mypage/Mycard.css";
import Footer from "../Footer";
import addPage from "../../images/Add NewImg.png";
import axios from "axios";
import { loadingOn, loadingOff } from "../loading/Loading";
axios.default.withCredentials = true;
const server_url_1 = "http://localhost:4000";
const server_url_2 =
  "http://ec2-3-24-168-238.ap-southeast-2.compute.amazonaws.com:4000";

const Mycard = ({
  editCardBtn,
  setCardEditBtn,
  setProfileEditBtn,
  setLoading,
}) => {
  const accessToken = sessionStorage.getItem("accessTokenSession");
  const [cards, setCards] = useState([]);

  useEffect(async () => {
    if (accessToken) {
      const loginType = sessionStorage.getItem("loginType");
      try {
        await loadingOn(setLoading);
        const card = await axios.get(`${server_url_2}/mycard`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const cardImage = card.data;
        setCards([...cardImage]);
        await loadingOff(setLoading);
      } catch (err) {
        console.log(err);
      }
    }
  }, []);

  // const editHandler = () => {
  //   editCardBtn ? setCardEditBtn(false) : setCardEditBtn(true);
  //   setProfileEditBtn(false);
  // };
  const deleteCard = (card) => {
    axios.get(`${server_url_2}/mycard/delete/${card.id}`);
    setCards(cards.filter((el) => el.id !== card.id));
  };

  return (
    <div>
      <div className="mypage-title">⭐️ My Card</div>

      <div className="card-box-container">
        <div className="card-container">
          <Link to="/editpage">
            <img
              id="move-to-editpage"
              src={addPage}
              alt="card"
              download="card.png"
            />
          </Link>
        </div>
        {cards.map((el, idx) => (
          <div key={idx} className="card-container">
            <div id={`downloadImg${idx}`}>
              <img
                src={el.card}
                className="cardImg"
                alt="card"
                download="card.png"
              />
            </div>
            <div id="card-menu">
              <div className="card-download">
                <a id={`${idx}`} href={el.card} download="card-download.png">
                  다운로드
                </a>
              </div>
              <div className="card-delete">
                <div
                  className="deleteCard"
                  key={idx}
                  onClick={() => {
                    deleteCard(el);
                  }}
                >
                  삭제
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Mycard;
