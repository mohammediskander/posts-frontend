import React, { useRef, useState } from "react";
import "./Navbar.css";
import { FaSearch, FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import useClickOutside from "./../../hooks/useClickOutside";
import UserInfo from "./../UserInfo/UserInfo";
import { useDispatch, useSelector } from "react-redux";
import { logout, reset } from "../../app/redux/auth/authSlice";

const Navbar = () => {
  const [input, setInput] = useState("");
  const [toggleBar, setToggleBar] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const ref = useRef(null);
  useClickOutside(ref, () => setToggleBar(false));

  const onSubmit = (e) => {
    e.preventDefault();
    setInput("");
  };

  const onLogout = () => {
    setToggleBar(false);
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  const onLogin = () => {
    setToggleBar(false);
  };

  return (
    <nav ref={ref} className="navbar">
      <div className="navbar__maxWidth">
        <Link to="/" className="navbar__logo">
          <h1>
            <span>I</span>
            <span>Blog</span>
          </h1>
        </Link>
        <div className="navbar__divform">
          <form
            style={{
              opacity: `${user ? 1 : 0.7}`,
              cursor: `${user ? "" : "not-allowed"}`,
            }}
            onSubmit={onSubmit}
            className="navbar__form"
          >
            <FaSearch />
            <input
              disabled={!user}
              type="text"
              placeholder={
                user ? `Search for posts by username` : `Login to use search`
              }
              value={input}
              onChange={(e) => setInput(e.target.value)}
              style={{
                cursor: `${user ? "" : "not-allowed"}`,
              }}
            />
            {input && (
              <div className="navbar__divform-message">
                Still in development.. :(
              </div>
            )}
          </form>
        </div>
        <ul className="navbar__right lg">
          {user ? (
            <>
              <li>
                <span onClick={onLogout}>
                  <FaSignOutAlt /> Logout
                </span>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" onClick={onLogin}>
                  <FaSignInAlt /> Login
                </Link>
              </li>
              <li>
                <Link to="/register">
                  <FaUser /> Register
                </Link>
              </li>
            </>
          )}
        </ul>
        <div className="navbar__right mob">
          {/* Do for mobile design */}
          <div
            onClick={() => setToggleBar(!toggleBar)}
            className={`navbar__bars ${toggleBar ? "active" : ""}`}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className={`navbar__mobile ${toggleBar ? "active" : ""}`}>
            {user ? (
              <>
                <div>
                  <span className="info">
                    <UserInfo />
                  </span>
                </div>
                <div>
                  <span onClick={onLogout}>
                    <FaSignOutAlt /> Logout
                  </span>
                </div>
              </>
            ) : (
              <>
                <div>
                  <Link to="/login" onClick={onLogin}>
                    <FaSignInAlt /> Login
                  </Link>
                </div>
                <div>
                  <Link to="/register" onClick={() => setToggleBar(false)}>
                    <FaUser /> Register
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
