import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../css/mypage/Mycard.css';
import Footer from '../Footer';
import addPage from '../../images/Add NewImg.png';
import axios from 'axios';
axios.default.withCredentials = true;
const server_url_1 = 'http://localhost:4000';
const server_url_2 =
  'http://ec2-3-24-168-238.ap-southeast-2.compute.amazonaws.com:4000';

const Mycard = ({ editCardBtn, setCardEditBtn, setProfileEditBtn }) => {
  const accessToken = sessionStorage.getItem('accessTokenSession');
  const [cards, setCards] = useState([]);

  useEffect(async () => {
    if (accessToken) {
      const loginType = sessionStorage.getItem('loginType');
      try {
        const card = await axios.get(`${server_url_2}/mycard`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const cardImage = card.data;
        setCards([...cardImage]);
      } catch (err) {
        console.log(err);
      }
    }
  }, []);

  const editHandler = () => {
    editCardBtn ? setCardEditBtn(false) : setCardEditBtn(true);
    setProfileEditBtn(false);
  };
  const deleteCard = (card) => {
    axios.get(`${server_url_2}/mycard/delete/${card.id}`);
    setCards(cards.filter((el) => el.id !== card.id));
  };

  return (
    <div>
      <div className='mypage-title'>⭐️ My Card</div>
      {editCardBtn ? (
        <div>
          <div className='card-box-container'>
            <div className='card-box'>
              <div className='card-container'>
                <Link to='/editpage'>
                  <img
                    id='move-to-editpage'
                    src={addPage}
                    alt='card'
                    download='card.png'
                  />
                </Link>
              </div>
              {cards.map((el, idx) => (
                <div key={idx} className='card-container'>
                  <div id={`downloadImg${idx}`}>
                    <img
                      src={el.card}
                      className='cardImg'
                      alt='card'
                      download='card.png'
                    />
                  </div>
                  <div id='delete-box'>
                    <a
                      id={`${idx}`}
                      href={el.card}
                      download='card-download.png'
                    >
                      다운로드
                    </a>
                    <button
                      className='deleteCard'
                      key={idx}
                      onClick={() => {
                        deleteCard(el);
                      }}
                    >
                      X
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className='button-box-edit'>
            <div className='edit-image mypage-button'>
              <button id='btn-edit' onClick={editHandler}>
                Save
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className='card-box-container'>
            <div className='card-box'>
              <div className='card-container'>
                <Link to='/editpage'>
                  <img
                    id='move-to-editpage'
                    src={addPage}
                    alt='card'
                    download='card.png'
                  />
                </Link>
              </div>
              {cards.map((el, idx) => (
                <div key={idx} className='card-container'>
                  <img
                    src={el.card}
                    className='cardImg'
                    alt='card'
                    draggable={false}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className='button-box-edit'>
            <div className='edit-image mypage-button'>
              <button id='btn-edit' onClick={editHandler}>
                Edit
              </button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Mycard;
