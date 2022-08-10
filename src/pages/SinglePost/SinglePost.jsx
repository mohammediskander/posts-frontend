import { useEffect, useState } from "react";
import "./SinglePost.css";
import { useNavigate, useParams } from "react-router-dom";
import * as api from "../../app/api";
import { placeholder } from "../../images";
import { Avatar, Spinner } from "../../components";
import moment from "moment";
import { BsThreeDotsVertical } from "react-icons/bs";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, getPostById, reset } from "../../app/redux/post/postSlice";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const SinglePost = () => {
  const { id } = useParams();
  const [userPost, setUserPost] = useState(null);
  const [isOptions, setIsOptions] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [sureDelete, setSureDelete] = useState(false);
  const [myPost, setMyPost] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { post, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.post
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get post
  useEffect(() => {
    dispatch(getPostById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (isError && !post) {
      toast.error(message);
      navigate("/404");
    }
    dispatch(reset());
  }, [dispatch, isError, message, navigate, post]);

  useEffect(() => {
    const getUser = async () => {
      if (post) {
        const { data } = await api.fetchUserById(post.userID);
        setUserPost(data);
      }
    };
    getUser();
  }, [post, post?.userID]);

  useEffect(() => {
    if (user && userPost) {
      if (user._id === userPost._id || user.isAdmin) {
        setMyPost(true);
      } else {
        setMyPost(false);
      }
    }
  }, [user, user?._id, user?.isAdmin, userPost, userPost?._id]);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleDelete = () => {
    dispatch(deletePost(post._id));
    setTimeout(() => {
      navigate("/");
    }, 1000);
    if (isSuccess) {
      toast.success("Post was deleted successfully");
    }
    if (isError) {
      toast.error("Can't do this action now..");
    }
  };

  return (
    <div className="singlePost">
      {!userPost || !post || isLoading ? (
        <Spinner />
      ) : (
        <>
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.5 } }}
            exit={{ opacity: 0, transition: { duration: 0.25 } }}
            src={post.postImage ? post.postImage : placeholder}
            className="singlePost__imageLg"
            alt="post-img"
          />
          <div className="maxWidthScreen">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.5 } }}
              exit={{ opacity: 0, transition: { duration: 0.25 } }}
              className="singlePost__topMobile"
            >
              <div className="singlePost__info">
                <div className="singlePost__info-avatar">
                  <Avatar size="4rem" seed={userPost.username} />
                </div>
                <div className="singlePost__info-username">
                  <p>{userPost.username}</p>
                  <p>{moment(new Date(post.createdAt)).fromNow()}</p>
                </div>
                {myPost && (
                  <div
                    onClick={() => setIsOptions(!isOptions)}
                    className={
                      isOptions
                        ? "singlePost__info-dots active"
                        : "singlePost__info-dots"
                    }
                  >
                    <BsThreeDotsVertical />
                    <div className="singlePost__info-opt">
                      <button disabled={true}>edit</button>
                      <button onClick={() => setSureDelete(true)}>
                        delete
                      </button>
                    </div>
                  </div>
                )}
                {sureDelete && (
                  <div className="singlePost__sureDelete">
                    <h3>Are you sure ?</h3>
                    <div>
                      <button onClick={handleDelete} className="delete">
                        Delete
                      </button>
                      <button
                        onClick={() => setSureDelete(false)}
                        className="cancel"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <img
                src={post.postImage ? post.postImage : placeholder}
                alt="post-img"
              />
              <div className="singlePost__desc">
                <p>{post.description}</p>
                <div className="singlePost__desc-icons">
                  <div onClick={handleLike} className="singlePost__desc-icon">
                    <span>{post.likes}</span>
                    {isLiked ? <AiFillHeart /> : <AiOutlineHeart />}
                  </div>
                </div>
              </div>
              <div className="singlePost__comments">
                <p>Comments, soon..!</p>
              </div>
            </motion.div>
            {/* larg screen */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.5 } }}
              exit={{ opacity: 0, transition: { duration: 0.25 } }}
              className="singlePost__lgContainer"
            >
              <div className="singlePost__left">
                <div className="singlePost__leftHeader">
                  <div className="singlePost__infoLg-avatar">
                    <Avatar size="6rem" seed={userPost.username} />
                  </div>
                  <div className="singlePost__info-username">
                    <p>{userPost.username}</p>
                    <p>{moment(new Date(post.createdAt)).fromNow()}</p>
                  </div>
                  {myPost && (
                    <div
                      onClick={() => setIsOptions(!isOptions)}
                      className={
                        isOptions
                          ? "singlePost__info-dots active"
                          : "singlePost__info-dots"
                      }
                    >
                      <BsThreeDotsVertical />
                      <div className="singlePost__info-opt">
                        <button disabled={true}>edit</button>
                        <button onClick={() => setSureDelete(true)}>
                          delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                <div className="singlePost__descP">
                  <p>{post.description}</p>
                </div>
                {user && (
                  <div className="singlePost__desc-icons">
                    <div onClick={handleLike} className="singlePost__desc-icon">
                      <span>{post.likes}</span>
                      {isLiked ? <AiFillHeart /> : <AiOutlineHeart />}
                    </div>
                  </div>
                )}
              </div>
              <div className="singlePost__right">
                <h3>Comments</h3>
                <p>Comming soon..!</p>
              </div>
            </motion.div>

            {sureDelete && (
              <div className="singlePost__sureDelete lg">
                <h3>Are you sure ?</h3>
                <div>
                  <button onClick={handleDelete} className="delete">
                    Delete
                  </button>
                  <button
                    onClick={() => setSureDelete(false)}
                    className="cancel"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/*  */}
          </div>
        </>
      )}
    </div>
  );
};

export default SinglePost;
