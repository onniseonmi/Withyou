module.exports = {
  loadingOn: (setLoading) => {
    const body = document.body;
    const spinner = document.querySelector("#spinner");
    body.style.opacity = 0.6;
    setLoading(true);
    // body.style.backgroundColor = "rgba(0, 0, 0, 0.2)";
  },
  loadingOff: (setLoading) => {
    const body = document.body;
    setLoading(false);
    body.style.opacity = "unset";
  },
};
