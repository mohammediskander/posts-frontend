import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { reset } from "../app/redux/auth/authSlice";

const LoginRegister = (Component) =>
  function HOC() {
    const { user, isSuccess, isError, message } = useSelector(
      (state) => state.auth
    );

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
      if (isError) {
        toast.error(message);
      }
      if (isSuccess || user) {
        navigate("/");
      }
      dispatch(reset());
    }, [user, isSuccess, isError, message, navigate, dispatch]);

    return <Component />;
  };

export default LoginRegister;
