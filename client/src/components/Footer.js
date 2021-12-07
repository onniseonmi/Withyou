import React from "react";
import "../css/Footer.css";
import githubIcon from "../images/github.png";
const Footer = ({ landingOn }) => {
  const dev1 = `nick0726`;
  const dev2 = `Melona0105`;
  const dev3 = `onniseonmi`;
  const dev4 = `allendy11`;

  return (
    <div
      id="footer"
      style={{
        backgroundColor: `${landingOn ? "transparent" : "#f2f0ec"}`,
        borderTop: `${landingOn ? "transparent" : "solid 1px lightgray"}`,
        textShadow: `${landingOn ? "1px 1px 5px #212121" : "none"}`,
      }}
    >
      <div>
        <div id="footer-title">
          <a
            href="https://github.com/codestates/Withyou"
            rel="noreferrer"
            target="_blank"
          >
            <span
              style={{
                color: `${landingOn ? "#f2f0ec" : "black"}`,
              }}
            >
              Made by
            </span>
            <span
              style={{
                color: `${landingOn ? "#f2f0ec" : "black"}`,
              }}
            >
              Withyou
            </span>
          </a>
        </div>
        <div className="footer-contact">
          <div>
            <img id="githubIcon" src={githubIcon} alt="github"></img>
            <div
              id="githubTitle"
              style={{
                color: `${landingOn ? "#f2f0ec" : "black"}`,
              }}
            >
              GITHUB
            </div>
          </div>
          <div className="footer-developer">
            <div className="footer-row">
              <a
                href={`https://github.com/${dev1}`}
                rel="noreferrer"
                target="_blank"
              >
                <span
                  style={{
                    color: `${landingOn ? "#f2f0ec" : "black"}`,
                  }}
                >
                  김남현
                </span>
              </a>
              <a
                href={`https://github.com/${dev2}`}
                rel="noreferrer"
                target="_blank"
              >
                <span
                  style={{
                    color: `${landingOn ? "#f2f0ec" : "black"}`,
                  }}
                >
                  박덕원
                </span>
              </a>
            </div>
            <div className="footer-row">
              <a
                href={`https://github.com/${dev3}`}
                rel="noreferrer"
                target="_blank"
              >
                <span
                  style={{
                    color: `${landingOn ? "#f2f0ec" : "black"}`,
                  }}
                >
                  최선미
                </span>
              </a>
              <a
                href={`https://github.com/${dev4}`}
                rel="noreferrer"
                target="_blank"
              >
                <span
                  style={{
                    color: `${landingOn ? "#f2f0ec" : "black"}`,
                  }}
                >
                  윤대희
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
