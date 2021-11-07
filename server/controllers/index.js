module.exports = {
  signin: require('./user/signin.js'),
  signup: require('./user/signup.js'),
  signout: require('./user/signout.js'),
  deleteAccount: require('./user/delete.js'),
  github: require('./auth/github.js'),
  // naver: require('./auth/naver.js'),
  // kakao: require('./auth/kakao.js'),
};
