import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import '../../css/mypage/Mycard.css';
import addPage from '../../images/addPage.svg';
import axios from 'axios';
import html2canvse from 'html2canvas';

// const server_url = 'http://localhost:4000';
const server_url =
  'http://ec2-3-26-161-132.ap-southeast-2.compute.amazonaws.com:4000';
const Mycard = () => {
  const accessToken = sessionStorage.getItem('accessTokenSession');
  const [cards, setCards] = useState([]);
  const [editBtn, setEditBtn] = useState(false);

  useEffect(async () => {
    if (accessToken) {
      const loginType = sessionStorage.getItem('loginType');
      try {
        if (loginType === null) {
          const card = await axios.get(`${server_url}/mycard`, {
            headers: { Authorization: `Bearer ${accessToken}` },
          });
          const cardImage = card.data;
          setCards([...cardImage]);
        }
      } catch (err) {
        console.log(err);
      }
    }
  }, []);

  const editHandler = () => {
    editBtn ? setEditBtn(false) : setEditBtn(true);
  };
  const deleteCard = (card) => {
    axios.get(`${server_url}/mycard/delete/${card.id}`);
    setCards(cards.filter((el) => el.id !== card.id));
  };

  return (
    <div>
      {console.log(document.querySelector('.cardImg'))}
      <div className='mypage-title'>⭐️ My Card</div>
      {editBtn ? (
        <div>
          <div className='card-box-container'>
            <div className='card-box'>
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
                  <a id={`${idx}`} href={el.card} download='card-download.png'>
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
              ))}
            </div>
            <div className='card-page-container'>
              <Link to='/editpage'>
                <div className='card-page-box'>
                  <img id='image' src={addPage} alt='#' />
                </div>
              </Link>
            </div>
          </div>
          <div className='edit-image mypage-button'>
            <button id='btn-editImg' onClick={editHandler}>
              Save
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className='card-box-container'>
            <div className='card-box'>
              {cards.map((el, idx) => (
                <div key={idx} className='card-container'>
                  <img src={el.card} className='cardImg' alt='card' />
                </div>
              ))}
            </div>
            <div className='card-page-container'>
              <Link to='/editpage'>
                <div className='card-page-box'>
                  <img id='image' src={addPage} alt='#' />
                </div>
              </Link>
            </div>
          </div>
          <div className='edit-image mypage-button'>
            <button id='btn-editImg' onClick={editHandler}>
              Edit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Mycard;
