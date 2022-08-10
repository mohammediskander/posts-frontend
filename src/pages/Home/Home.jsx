import "./Home.css";
import { PostForm, Post, UserInfo, Spinner } from "../../components";
import { useEffect, useRef, useState } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { reset } from "../../app/redux/auth/authSlice";
import { resetAll } from "../../app/redux/post/postSlice";
import { toast } from "react-toastify";
import * as api from "../../app/api";
import {
  getPosts,
  reset as resetPosts,
} from "../../app/redux/posts/postsSlice";
import { AnimatePresence, motion } from "framer-motion";

const Home = () => {
  const posts = useSelector((state) => state.posts);
  const [topUsers, setTopUsers] = useState([]);

  const { user, isError, message, isSuccess } = useSelector(
    (state) => state.auth
  );
  const [myUsername, setMyUsername] = useState(user?.username);
  const dispatch = useDispatch();
  const effectRun = useRef(false);

  useEffect(() => {
    if (effectRun.current === true) {
      if (isError) {
        toast.error(message);
        setMyUsername(user.username);
      }
      if (isSuccess) {
        toast.success(message);
      }

      dispatch(reset());
    }
    return () => {
      effectRun.current = true;
    };
  }, [dispatch, isError, isSuccess, message, user?.username]);

  // Get posts
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  // Reset Posts slice
  useEffect(() => {
    if (effectRun.current === true) {
      if (posts.isError) {
        toast.error(posts.message);
      }
      if (posts.isSuccess && posts.message !== "") {
        toast.success(posts.message);
      }

      dispatch(resetPosts());
    }
    return () => {
      effectRun.current = true;
    };
  }, [dispatch, posts.isError, posts.isSuccess, posts.message]);

  // Get top 5 users
  useEffect(() => {
    const getUsers = async () => {
      const { data } = await api.fetchUsers();
      setTopUsers(data.slice(0, 5));
    };
    getUsers();
  }, []);

  useEffect(() => {
    dispatch(resetAll());
  }, [dispatch]);

  return (
    <motion.div
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="home"
    >
      <div className="maxWidthScreen">
        <PostForm />
        <div className="home__feed">
          <div className="home__left">
            <h1>
              Explore
              <span> Adi</span>
              <span>Blog </span>
            </h1>
            {!posts.posts ? (
              <Spinner />
            ) : (
              <>
                <AnimatePresence>
                  {posts.posts.slice(0, 10).map((post, i) => {
                    return <Post post={post} key={post._id} />;
                  })}
                </AnimatePresence>
              </>
            )}
          </div>
          <div className="home__right">
            <div className="home__users">
              <h3>Recent 5 users, Welcome..</h3>
              <div className="home__users-container">
                {!topUsers ? (
                  <Spinner />
                ) : (
                  <>
                    {topUsers.map((user, i) => (
                      <div className="home__user" key={user._id}>
                        <span>
                          <span className="home__user-index">{i + 1}</span>
                          {user.username}
                        </span>
                        <span>
                          {moment(new Date(user.createdAt)).fromNow()}
                        </span>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
            <div className="home__userInfo">
              <UserInfo myUsername={myUsername} setMyUsername={setMyUsername} />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Home;
