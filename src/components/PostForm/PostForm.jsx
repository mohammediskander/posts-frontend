import "./PostForm.css";
import { pic1, pic2, pic3, pic4, pic5, pic6 } from "../../images";
import { useEffect, useRef, useState } from "react";
import { FaImage } from "react-icons/fa";
import Avatar from "../Avatar/Avatar";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../app/redux/posts/postsSlice";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./../../firebase";
import { toast } from "react-toastify";
import Spinner from "./../Spinner/Spinner";

const PostForm = () => {
  const [randomImg, setRandomImg] = useState(null);
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [fileSizeError, setFileSizeError] = useState(false);
  const fileRef = useRef();
  const [uploading, setUploading] = useState(false);

  const pickImage = () => {
    const imagesArr = [pic1, pic2, pic3, pic4, pic5, pic6];
    const index = Math.floor(Math.random() * imagesArr.length);
    setRandomImg(imagesArr[index]);
  };

  useEffect(() => {
    pickImage();
  }, []);

  const ifStatement = (type) => {
    const maxFileSize = 1024 * 1024 * 5;
    return file?.size <= maxFileSize && file?.type === `image/${type}`;
  };

  const onSubmit = (e) => {
    e.preventDefault();

    // No Image
    if (!file && desc !== "") {
      const newPost = {
        description: desc,
        userID: user._id,
      };
      dispatch(createPost(newPost));
      setDesc("");
    }

    // With image
    if (file) {
      if (ifStatement("jpeg") || ifStatement("png") || ifStatement("gif")) {
        const fileName = `${Date.now()}_${file.name.replace(/\s+/g, "-")}`;
        const imageRef = ref(storage, `images/${fileName}`);
        setUploading(true);

        uploadBytes(imageRef, file).then(() => {
          getDownloadURL(ref(storage, `images/${fileName}`)).then((url) => {
            const newPost = {
              description: desc,
              userID: user._id,
              postImage: url,
            };

            dispatch(createPost(newPost));
            toast.success(`Post successfully`);
            setUploading(false);
            setDesc("");
            setFile(null);
            setFileSizeError(false);
            fileRef.current.value = null;
          });
        });
      } else {
        setFileSizeError(true);
        setTimeout(() => {
          setFileSizeError(false);
        }, [2000]);
      }
    }
  };

  return (
    <div className="postForm">
      {user ? (
        <form className="postForm__left" onSubmit={onSubmit}>
          <div className="postForm__leftPadding">
            <div className="postForm__avatar">
              <Avatar seed={user.username} size="50px" />
            </div>
            {uploading ? (
              <Spinner />
            ) : (
              <div className="postForm__inputs">
                <div className="postForm__input">
                  <textarea
                    id="inputText"
                    rows={5}
                    type="text"
                    className="postForm__inputText"
                    placeholder="What do you wanna talk about.?"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                  />
                </div>
                <div className="postForm__input">
                  <div className="postForm__input-wrapper">
                    <label htmlFor="inputImg">
                      <FaImage />
                    </label>
                    <input
                      ref={fileRef}
                      id="inputImg"
                      type="file"
                      className="postForm__inputImg"
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                  </div>
                  <span className={fileSizeError ? "fileSizeError" : ""}>
                    Max 5 MB - (jpeg, png, gif) only.
                  </span>
                </div>
                <button
                  disabled={!desc.trim()}
                  style={{
                    opacity: !desc && 0.4,
                    cursor: !desc && "not-allowed",
                  }}
                  type="submit"
                >
                  post
                </button>
              </div>
            )}
          </div>
        </form>
      ) : (
        <div className="postForm__left div">
          <h3>
            Please <span>login</span> for better experience <br />
          </h3>
        </div>
      )}
      <div onClick={pickImage} className="postForm__right">
        <img src={randomImg || pic1} alt="Random-gif-img" />
      </div>
    </div>
  );
};

export default PostForm;
