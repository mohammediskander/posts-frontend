import React, { useRef, useState } from "react";
import "./UserInfo.css";
import moment from "moment";
import Spinner from "../Spinner/Spinner";
import Avatar from "../Avatar/Avatar";
import { FaRegEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { FaArrowDown } from "react-icons/fa";
import { updateUser } from "../../app/redux/auth/authSlice";
import { deleteUser } from "./../../app/redux/auth/authSlice";

const UserInfo = ({ myUsername, setMyUsername }) => {
  const { user, isLoading } = useSelector((state) => state.auth);
  const [edit, setEdit] = useState(false);
  const inputRef = useRef(null);
  const [toggleArrow, setToggleArrow] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const dispatch = useDispatch();

  const handleClick = () => {
    setEdit(!edit);
    setMyUsername(user.username);
    if (edit) {
      inputRef.current.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newName = inputRef.current.value;
    dispatch(updateUser({ username: newName }));
    setEdit(false);
  };

  const handleDelete = () => {
    dispatch(deleteUser(user._id));

    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  return (
    <div className={toggleArrow ? "userInfo active" : "userInfo"}>
      {user ? (
        <>
          {isLoading ? (
            <Spinner />
          ) : (
            <>
              <h3>User info</h3>
              <div>
                <Avatar seed={user.username} size="6.25rem" />
              </div>
              <form
                onSubmit={handleSubmit}
                type="submit"
                className="userInfo__username"
              >
                {!edit ? (
                  <p className="userInfo__username-p">
                    {myUsername || user.username}
                  </p>
                ) : (
                  <input
                    ref={inputRef}
                    className="userInfo__username-input"
                    type="text"
                    value={myUsername}
                    onChange={(e) => setMyUsername(e.target.value)}
                  />
                )}
                <FaRegEdit
                  style={{ color: `${edit ? "#7693fc" : "#777"}` }}
                  onClick={handleClick}
                />
              </form>
              <div
                className={toggleArrow ? "arrowIcon active" : "arrowIcon"}
                onClick={() => setToggleArrow(!toggleArrow)}
              >
                <FaArrowDown />
              </div>
              <div
                className={
                  toggleArrow ? "userInfo__mini active" : "userInfo__mini"
                }
              >
                <p>
                  <span>Username:</span> {myUsername}
                </p>
                <p>
                  <span>Email:</span> {user.email}
                </p>
                <p>
                  <span>Created in:</span>{" "}
                  {moment(new Date(user.createdAt)).format("MM/DD/YYYY")}
                </p>
                <p>
                  <span>Last update:</span>{" "}
                  {moment(new Date(user.updatedAt)).fromNow()}
                </p>
                {isDelete ? (
                  <div className="userInfo__delete active">
                    <p>Are you sure you want to delete.?</p>
                    <div>
                      <button onClick={handleDelete}>Delete</button>
                      <button onClick={() => setIsDelete(false)}>Cancel</button>
                    </div>
                  </div>
                ) : (
                  <div className="userInfo__delete">
                    <p>Delete account: </p>
                    <button onClick={() => setIsDelete(true)}>Delete</button>
                  </div>
                )}
              </div>
            </>
          )}
        </>
      ) : (
        <h3>Please login for user info</h3>
      )}
    </div>
  );
};

export default UserInfo;
