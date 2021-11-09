require("dotenv").config();
const axios = require("axios");

module.exports = (req, res) => {
  const { authorizationCode, type } = req.body;
  let url = "";
  let client_id = "";
  let client_secret = "";
  let state = "";
  const redirect_uri = "http://localhost:3000";
  if (type === "naver") {
    client_id = process.env.NAVER_CLIENT_ID;
    client_secret = process.env.NAVER_CLIENT_SECRET;
    state = "RANDOM_STATE";
    url = `https://nid.naver.com/oauth2.0/token?client_id=${client_id}&client_secret=${client_secret}&grant_type=authorization_code&state=${state}&code=${authorizationCode}`;
  } else if (type === "kakao") {
    client_id = process.env.KAKAO_CLIENT_ID;
    client_secret = process.env.KAKAO_CLIENT_SECRET;
    url = `https://kauth.kakao.com/oauth/token?client_id=${client_id}&client_secret=${client_secret}&grant_type=authorization_code&code=${authorizationCode}&redirect_uri=${redirect_uri}`;
  }
  axios({
    method: "GET",
    url,
  }).then((resp) => {
    res.send({ access_token: resp.data.access_token });
  });
};
