import React, { useEffect, useState } from "react";
import "./Post.css";
import { AiOutlineDelete } from "react-icons/ai";
import { placeholder } from "../../images";
import Avatar from "../Avatar/Avatar";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchUserById } from "../../app/api";
import { deletePost } from "../../app/redux/posts/postsSlice";
import { motion } from "framer-motion";
import Spinner from "../Spinner/Spinner";

const Post = ({ post }) => {
  const [sureDelete, setSureDelete] = useState(false);
  const [userPost, setUserPost] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const { isLoading } = useSelector((state) => state.posts);
  const [myUser, setMyUser] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const getUserPost = async () => {
      const { data } = await fetchUserById(post.userID);
      setUserPost(data);
    };
    getUserPost();
  }, [post.userID, user?.username]);

  useEffect(() => {
    if (user?._id === post.userID || user?.isAdmin) {
      setMyUser(true);
    } else {
      setMyUser(false);
    }

    if (!user) {
      setSureDelete(false);
    }
  }, [post.userID, user, user?._id]);

  const animations = {
    initial: { x: -35, opacity: 0 },
    animate: { x: 0, opacity: 1, transition: { duration: 0.5 } },
    exit: {
      scale: 0.7,
      opacity: 0,
      transition: { duration: 0.25 },
    },
  };

  return (
    <motion.div {...animations} layout className="post-wrapper">
      <Link to={`/post/${post._id}`} className="post">
        {!userPost ? (
          <Spinner />
        ) : (
          <>
            <img
              src={post.postImage ? post.postImage : placeholder}
              alt="post-img"
            />

            <div className="post__info">
              <div className="post__username">
                <div className="post__username-f">
                  <Avatar
                    seed={userPost ? userPost.username : "x"}
                    size="40px"
                  />
                  <h3>{userPost ? userPost.username : "Loading.."}</h3>
                </div>
              </div>
              {post.description.length >= 50 ? (
                <p>- {post.description.substring(0, 50)}...</p>
              ) : (
                <p>- {post.description}</p>
              )}

              <div className="post__like">
                <span>{post.likes} likes</span>
              </div>
            </div>
          </>
        )}
      </Link>
      {myUser && <AiOutlineDelete onClick={() => setSureDelete(true)} />}
      {sureDelete && (
        <div className="post__sureDelete">
          {isLoading ? (
            <Spinner />
          ) : (
            <>
              <h3>Are you sure ?</h3>
              <div>
                <button
                  onClick={() => dispatch(deletePost(post._id))}
                  className="delete"
                >
                  Delete
                </button>
                <button onClick={() => setSureDelete(false)} className="cancel">
                  Cancel
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default Post;
