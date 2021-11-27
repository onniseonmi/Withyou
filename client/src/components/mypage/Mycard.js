import React, { useEffect, useState } from 'react';
import '../../css/mypage/Mycard.css';
import axios from 'axios';
const server_url = 'http://localhost:4000';

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
      <div className='mypage-title'>⭐️ My Card</div>
      {editBtn ? (
        <div>
          <div>
            <div className='card-box'>
              {cards.map((el, idx) => (
                <div key={idx} className='card-container'>
                  <img src={el.card} className='cardImg' alt='card' />
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
          </div>
          <div className='edit-image mypage-button'>
            <button id='btn-editImg' onClick={editHandler}>
              Save
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div>
            <div className='card-box'>
              {cards.map((el, idx) => (
                <div key={idx} className='card-container'>
                  <img src={el.card} className='cardImg' alt='card' />
                </div>
              ))}
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
