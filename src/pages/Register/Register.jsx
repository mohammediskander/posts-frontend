import { useEffect, useRef, useState } from "react";
import "./Register.css";
import { Link } from "react-router-dom";
import { log3 } from "../../images";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { register, reset } from "../../app/redux/auth/authSlice";
import { Spinner } from "./../../components";
import LoginRegister from "../../HOC/LoginRegister";
import { motion } from "framer-motion";

const Register = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
  });
  const effectRun = useRef(false);

  const { username, email, confirmEmail, password, confirmPassword } = formData;
  const { isLoading, message, isSuccess } = useSelector((state) => state.auth);

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (effectRun.current === true) {
      if (isSuccess) {
        toast.success(message);
      }

      dispatch(reset());
    }
    return () => {
      effectRun.current = true;
    };
  }, [dispatch, isSuccess, message]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Password do not match!");
    } else if (email.toLowerCase() !== confirmEmail.toLowerCase()) {
      toast.error("Email do not match!");
    } else {
      const newUser = {
        username,
        email,
        password,
      };
      dispatch(register(newUser));
    }
  };

  return (
    <div className="register">
      <div className="register__left">
        {isLoading ? (
          <Spinner />
        ) : (
          <motion.form
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onSubmit={onSubmit}
            className="register__box"
          >
            <h3>
              - Register <span>new</span> account
            </h3>
            <div className="register__inputs">
              <input
                type="text"
                id="username"
                placeholder="Display name"
                name="username"
                onChange={onChange}
                value={username}
                required
                maxLength={11}
              />
              <input
                type="email"
                placeholder="Email"
                name="email"
                onChange={onChange}
                value={email}
                required
              />
              <input
                type="email"
                placeholder="Confirm email"
                name="confirmEmail"
                onChange={onChange}
                value={confirmEmail}
                required
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={onChange}
                value={password}
                required
              />
              <input
                type="password"
                placeholder="ConfirmPassword"
                name="confirmPassword"
                onChange={onChange}
                value={confirmPassword}
                required
              />
            </div>
            <p>
              You are registering to a website, created by{" "}
              <a
                target="_blank"
                rel="noreferrer"
                href="https://twitter.com/iAdelDev"
              >
                Adel
              </a>{" "}
              with the MERN stack technology, take a look and enjoy.
            </p>
            <div className="register__btns">
              <button type="submit">register</button>
              <Link to="/login">already have an account</Link>
            </div>
          </motion.form>
        )}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="register__right"
      >
        <img src={log3} alt="pic1" />
      </motion.div>
    </div>
  );
};

export default LoginRegister(Register);
