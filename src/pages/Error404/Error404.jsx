import "./Error404.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Error404 = () => {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    if (count !== 0) {
      setTimeout(() => {
        setCount(count - 1);
      }, 1000);
    } else {
      setCount(0);
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  }, [count, navigate]);

  return (
    <div className="error">
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 10, opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="error__container"
      >
        <h1>Sorry, page not found</h1>
        <div className="error__svg">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
            <g id="_404-browser" data-name="404-browser">
              <g id="browser">
                <path
                  d="M4,50H48a2,2,0,0,0,2-2V12H2V48A2,2,0,0,0,4,50Z"
                  fill="#fff"
                />
                <path
                  d="M48,2H4A2,2,0,0,0,2,4v8H50V4A2,2,0,0,0,48,2Z"
                  fill="#40495a"
                />
                <rect x="6" y="6" width="6" height="2" fill="#748191" />
                <rect x="16" y="6" width="30" height="2" fill="#748191" />
              </g>
              <rect x="4" y="14" width="44" height="34" fill="#fff" />
              <rect x="28" y="17" width="18" height="2" fill="#8bc6ec" />
              <rect x="6" y="17" width="18" height="2" fill="#8bc6ec" />
              <rect x="25" y="17" width="2" height="2" fill="#7cb7df" />
              <rect x="29" y="43" width="18" height="2" fill="#8bc6ec" />
              <rect x="6" y="43" width="18" height="2" fill="#8bc6ec" />
              <rect x="25" y="43" width="2" height="2" fill="#7cb7df" />
              <path
                d="M19.84,31.28H21v1.55H19.84V35H17.78V32.83H13.5v-1.2L17.76,25h2.08Zm-4.47,0h2.41V27.64h0l-.21.45Z"
                fill="#9599e2"
              />
              <path
                d="M29.75,31.34a3.52,3.52,0,0,1-1,2.68A3.77,3.77,0,0,1,26,35a3.81,3.81,0,0,1-2.73-1,3.52,3.52,0,0,1-1-2.68V28.67a3.54,3.54,0,0,1,1-2.68A3.77,3.77,0,0,1,26,25a3.79,3.79,0,0,1,2.72,1,3.53,3.53,0,0,1,1,2.68Zm-2.22-2.88A2.28,2.28,0,0,0,27.13,27a1.5,1.5,0,0,0-2.26,0,2.3,2.3,0,0,0-.4,1.45v3.06a2.32,2.32,0,0,0,.4,1.46A1.37,1.37,0,0,0,26,33.5,1.35,1.35,0,0,0,27.13,33a2.34,2.34,0,0,0,.4-1.46Z"
                fill="#9599e2"
              />
              <path
                d="M37.34,31.28H38.5v1.55H37.34V35H35.28V32.83H31v-1.2L35.26,25h2.08Zm-4.47,0h2.41V27.64h0l-.21.45Z"
                fill="#9599e2"
              />
            </g>
          </svg>
        </div>
        <p>
          Redirect to home page in <span>{count}s</span>
        </p>
      </motion.div>
    </div>
  );
};

export default Error404;
