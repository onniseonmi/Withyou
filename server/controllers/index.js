module.exports = {
  signin: require("./user/signin.js"),
  signup: require("./user/signup.js"),
  signout: require("./user/signout.js"),
  deleteAccount: require("./user/delete.js"),
  callback: require("./user/oauth/callback"),
  kakao: require("./user/oauth/kakao"),
  naver: require("./user/oauth/naver"),
  edit: require("./user/edit"),
};
