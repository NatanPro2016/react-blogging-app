import React, { useRef, useState } from "react";
import Resizer from "react-image-file-resizer";

import axios from "axios";
import style from "../assets/css/CreatePost.module.css";

import { Link } from "react-router-dom";
import SideNav from "../components/SideNav";
import RecentUser from "../components/RecentUser";
import upload from "../lib/upload";
import Loading from "../components/Loading";
import { encodeImageToBlurhash } from "../lib/blurHash";

const CreatePost = () => {
  const [response, setResponse] = useState("");
  const [error, setError] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");
  const [bluredHash, setBluredHash] = useState("");

  const [post, setPost] = useState({
    title: "",
    des: "",
    category: "",
    img: null,
  });
  const [focused, setFocused] = useState({
    title: false,
    des: false,
    category: false,
  });
  const imgRef = useRef(null);
  const dragRef = useRef(null);
  const resizeFile = (file) => {
    setLoading(true);
    Resizer.imageFileResizer(
      file,
      900,
      900,
      "JPEG",
      100,
      0,
      (uri) => {
        const imgUrl = URL.createObjectURL(uri);
        setImage(imgUrl);

        encodeImageToBlurhash(imgUrl)
          .then((data) => {
            setBluredHash(data);
            setLoading(false);
          })
          .catch((e) => {
            console.log(e);
            setLoading(false);
          });
        setPost({ ...post, img: uri });
      },
      "file"
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!post.img) {
      dragRef.current.classList.add(style.invalid);
    } else {
      setLoading(true);

      upload(post.img)
        .then(({ downloadURL, rename }) => {
          axios
            .post("/api/posts/create", {
              ...post,
              img: downloadURL,
              rename,
              bluredHash,
            })
            .then((data) => {
              console.log(data.data);
              dragRef.current.classList.remove(style.invalid);
              setResponse("Successfully Posted ");
              setLoading(false);
              setPost({
                title: "",
                des: "",
                category: "",
                img: "",
              });
              setImage("");
              setFocused({
                title: false,
                des: false,
                category: false,
              });
            })
            .catch((e) => {
              setError(true);
              console.log(e);
              setLoading(false);
            });
        })
        .catch((err) => {
          console.log(e);
          setError(true);
          setResponse("something went wrong");
          setLoading(false);
        });
    }
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
    e.dataTransfer.dropEffect = " ";
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };
  const handleDrop = async (e) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files[0].type.split("/")[0] === "image") {
      resizeFile(e.dataTransfer.files[0]);
    } else {
    }
  };
  const handleSelect = () => {
    imgRef.current.click();
  };
  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };
  const handleFocuse = (e) => {
    setFocused({ ...focused, [e.target.name]: true });
  };
  const handleChangeImg = async (e) => {
    if (e.target.files[0].type.split("/")[0] === "image") {
      resizeFile(e.target.files[0]);
    }
  };
  return (
    <section className={style.createPost}>
      <SideNav saved={true} search={true} />

      <form method="POST" onSubmit={handleSubmit} className={style.form}>
        {response && <div className={style.success_message}>{response}</div>}
        {error && !response && (
          <div className={style.error_message}> Some went wrong try agan</div>
        )}
        {loading && (
          <div>
            <Loading type={"mini"} /> Loading ..
          </div>
        )}
        <input
          type="text"
          placeholder="Title"
          onChange={handleChange}
          name="title"
          value={post.title}
          className={style.input}
          focused={focused.title.toString()}
          onBlur={handleFocuse}
          required
          pattern={`^[A-Za-z0-9 !"'@#$%^&*-_]{3,20}$`}
        />
        <span className={style.title_error}>
          Title cannot be empty and 3 to 20 caracters
        </span>
        <input
          type="text"
          placeholder="Description"
          onChange={handleChange}
          name="des"
          className={style.input}
          focused={focused.des.toString()}
          onBlur={handleFocuse}
          required
          value={post.des}
          pattern={`^[A-Za-z0-9 !"'@#$%^&*-_]{3,255}$`}
        />
        <span className={style.des_error}>
          Description cannot be empty and 3 to 255aracters
        </span>
        <input
          type="text"
          placeholder="Category"
          onChange={handleChange}
          name="category"
          className={style.input}
          focused={focused.category.toString()}
          onBlur={handleFocuse}
          required
          value={post.category}
          pattern={`^[A-Za-z0-9 !"'@#$%^&*-_]{3,20}$`}
        />
        <span className={style.category_error}>
          Category cannot be empty and 3 to 15 caracters
        </span>
        <div
          className={style.card}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          role="button"
          ref={dragRef}
          onClick={handleSelect}
        >
          <div className={style.top}>
            <svg
              width="43"
              height="40"
              viewBox="0 0 43 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.21216 0.00493743C7.52347 0.00412144 7.83478 0.00305015 8.14608 0.00174454C8.98715 -0.000984175 9.82817 6.10473e-05 10.6692 0.00197248C11.5519 0.00350121 12.4346 0.00208122 13.3173 0.001139C14.7993 4.69212e-05 16.2812 0.00148186 17.7632 0.00435023C19.4734 0.00762222 21.1835 0.00656211 22.8937 0.00325203C24.3655 0.000518114 25.8372 0.000140933 27.309 0.00171193C28.1865 0.00264645 29.064 0.00278233 29.9415 0.000788055C30.7667 -0.000956584 31.5919 0.000270016 32.4171 0.00373092C32.7188 0.00452189 33.0206 0.00430471 33.3224 0.00297169C35.2161 -0.00461877 36.8301 0.0548932 38.4468 1.12247C39.5735 2.3016 40.014 3.6 40.0103 5.21269C40.0103 5.43735 40.0103 5.662 40.0103 5.89346C40.0092 6.13484 40.0082 6.37621 40.0071 6.6249C40.0067 6.9969 40.0067 6.9969 40.0063 7.37641C40.0053 8.03409 40.0035 8.69177 40.0013 9.34945C39.9993 10.0212 39.9984 10.693 39.9973 11.3648C39.9951 12.6817 39.9918 13.9985 39.9876 15.3154C39.6616 15.1351 39.3366 14.953 39.0159 14.7636C38.7149 14.5892 38.4079 14.4249 38.097 14.2688C36.8776 13.5927 36.8776 13.5927 36.6199 12.8438C36.559 12.2707 36.5568 11.7232 36.5748 11.1471C36.5738 10.9407 36.5729 10.7342 36.5719 10.5215C36.5704 9.86432 36.5812 9.20801 36.5928 8.55091C36.597 7.89116 36.5987 7.23147 36.5986 6.5717C36.5994 6.1617 36.6031 5.75169 36.61 5.34174C36.6118 5.15705 36.6136 4.97237 36.6155 4.78208C36.6183 4.61925 36.6211 4.45642 36.6239 4.28865C36.6171 3.84415 36.6171 3.84415 36.1794 3.49005C35.6004 3.42877 35.6004 3.42877 34.9088 3.43915C34.777 3.43852 34.6452 3.4379 34.5093 3.43725C34.0655 3.43565 33.6218 3.43692 33.178 3.43818C32.8607 3.43764 32.5434 3.43693 32.226 3.43605C31.3626 3.43422 30.4993 3.43494 29.6358 3.43621C28.7338 3.43722 27.8317 3.43628 26.9296 3.43565C25.4145 3.43492 23.8994 3.43588 22.3843 3.43779C20.6307 3.43997 18.8772 3.43927 17.1236 3.43706C15.6201 3.43524 14.1166 3.43498 12.6131 3.43603C11.7142 3.43666 10.8153 3.43674 9.91641 3.43542C9.07148 3.43426 8.22658 3.43506 7.38165 3.43738C7.07089 3.43791 6.76014 3.43775 6.44938 3.43687C6.02647 3.43578 5.60363 3.43714 5.18072 3.43915C4.82511 3.43938 4.82511 3.43938 4.46231 3.43961C3.8814 3.4333 3.8814 3.4333 3.50929 3.89091C3.47155 4.47667 3.45884 5.04329 3.46378 5.62911C3.46372 5.80902 3.46366 5.98893 3.4636 6.1743C3.46388 6.77079 3.46701 7.36723 3.47014 7.96371C3.47089 8.37656 3.47146 8.78941 3.47186 9.20225C3.47339 10.2903 3.47733 11.3783 3.48176 12.4663C3.48586 13.576 3.48769 14.6857 3.48971 15.7954C3.49402 17.9737 3.50086 20.1521 3.50929 22.3305C3.82855 21.9801 4.14771 21.6296 4.46681 21.279C4.64455 21.0838 4.82229 20.8886 5.00542 20.6875C5.53059 20.107 6.04684 19.5195 6.56037 18.9286C6.97544 18.4552 7.39666 17.9876 7.81853 17.5202C8.47223 16.7958 9.11804 16.0655 9.75864 15.3295C10.3355 14.6734 10.9235 14.0275 11.51 13.38C11.8575 12.989 12.1896 12.5921 12.5161 12.1837C12.6525 12.0266 12.7889 11.8695 12.9295 11.7077C13.0618 11.7077 13.1941 11.7077 13.3304 11.7077C13.5989 11.9809 13.5989 11.9809 13.9191 12.3716C14.5296 13.0919 15.1755 13.7644 15.8483 14.426C16.6579 15.2267 17.4178 16.0396 18.1407 16.9189C17.8295 17.9145 17.2366 18.7585 16.5372 19.5245C16.405 19.5245 16.2727 19.5245 16.1364 19.5245C15.8397 19.223 15.8397 19.223 15.4975 18.8104C14.8131 18.0038 14.0883 17.2552 13.3304 16.518C12.4675 16.8335 11.9902 17.4961 11.4263 18.1841C10.5929 19.1796 9.74403 20.1535 8.85827 21.1028C8.11178 21.9042 7.3754 22.7116 6.65902 23.5401C6.09973 24.1809 5.5264 24.8091 4.95458 25.4387C4.80834 25.6035 4.66211 25.7684 4.51144 25.9382C4.32981 26.1206 4.14817 26.303 3.96104 26.491C3.37554 27.3332 3.37798 27.8973 3.4216 28.8946C3.42276 29.0483 3.42393 29.202 3.42512 29.3604C3.41809 30.2494 3.41809 30.2494 3.91015 30.949C4.39226 31.0085 4.39226 31.0085 4.95805 30.997C5.17678 30.9977 5.39551 30.9985 5.62087 30.9992C5.97663 30.998 5.97663 30.998 6.33958 30.9967C6.83792 30.9998 7.33625 31.0031 7.83458 31.0065C8.6233 31.0098 9.41193 31.0116 10.2006 31.0102C10.9598 31.0097 11.7187 31.0153 12.4778 31.0218C12.7145 31.0197 12.9513 31.0177 13.1952 31.0156C13.4146 31.0182 13.634 31.0209 13.86 31.0236C14.1499 31.0238 14.1499 31.0238 14.4457 31.024C14.9338 31.1494 14.9338 31.1494 15.2897 31.6316C15.5002 32.0776 15.702 32.516 15.8733 32.9783C15.9237 33.1111 15.9741 33.2439 16.026 33.3807C16.1364 33.755 16.1364 33.755 16.1364 34.3563C14.6518 34.3656 13.1673 34.3727 11.6827 34.377C10.9932 34.3791 10.3037 34.382 9.61423 34.3865C8.81968 34.3918 8.02513 34.3937 7.23055 34.3954C6.98558 34.3975 6.74061 34.3996 6.48822 34.4017C4.40938 34.402 2.64165 34.2799 1.10413 32.7528C0.322379 31.7067 0.078165 30.7359 0.0724791 29.4532C0.071045 29.2307 0.0696109 29.0082 0.0681333 28.7789C0.0675943 28.5357 0.0670554 28.2925 0.0665001 28.0419C0.0651831 27.785 0.063866 27.5281 0.062509 27.2634C0.0582999 26.4119 0.0562154 25.5605 0.0542179 24.709C0.0534063 24.4152 0.0525807 24.1214 0.0517422 23.8276C0.047925 22.4467 0.0450729 21.0657 0.0434022 19.6848C0.0414457 18.0942 0.036176 16.5037 0.0280693 14.9132C0.0220091 13.6817 0.0190552 12.4501 0.0183927 11.2186C0.0179232 10.4841 0.0161483 9.74961 0.0110849 9.01513C0.00551766 8.19431 0.00638904 7.37361 0.00778037 6.55278C0.00521285 6.31198 0.00264532 6.07118 0 5.82308C0.00965648 4.25574 0.181024 2.77483 1.20255 1.51929C2.89224 -0.0791899 5.02263 -0.00473466 7.21216 0.00493743Z"
                fill="#A3A3A3"
              />
              <path
                d="M38.0459 17.0693C40.4231 19.0992 42.3105 21.953 42.6569 25.1174C42.688 25.739 42.6971 26.3557 42.6934 26.9781C42.6924 27.1981 42.6914 27.4181 42.6903 27.6448C42.6135 31.2397 41.1275 34.047 38.5845 36.5611C37.3127 37.7362 36.0041 38.5728 34.3755 39.1667C34.2343 39.2188 34.0931 39.2708 33.9475 39.3244C32.5861 39.7843 31.3215 39.8693 29.8909 39.8557C29.6693 39.8543 29.4478 39.853 29.2195 39.8516C27.6458 39.8205 26.3802 39.6684 24.9553 38.9663C24.6999 38.8574 24.6999 38.8574 24.4394 38.7463C21.0326 37.2073 18.8708 34.3532 17.5057 30.9702C16.5085 27.6977 16.9703 23.995 18.4789 20.9777C19.1555 19.8199 20.0031 18.8679 20.9467 17.9211C21.0847 17.7785 21.2226 17.6359 21.3648 17.489C25.9551 13.0523 33.1481 13.3713 38.0459 17.0693ZM21.9849 21.1672C20.3512 23.4576 19.8213 26.1957 20.2374 28.9565C20.7934 31.4716 22.0753 33.7593 24.2924 35.1742C26.8334 36.6401 29.3867 37.1773 32.2929 36.6238C33.6983 36.2279 34.8279 35.6476 35.979 34.7573C36.1815 34.6167 36.3841 34.4762 36.5928 34.3314C38.4376 32.7178 39.433 30.3517 39.6619 27.9583C39.7903 25.1624 38.9993 22.6749 37.2332 20.497C35.4538 18.5699 33.1621 17.5041 30.5673 17.2643C27.1306 17.1524 24.172 18.5295 21.9849 21.1672Z"
                fill="#A3A3A3"
              />
              <path
                d="M28.3626 19.9253C29.3548 19.9253 30.3469 19.9253 31.3691 19.9253C31.3691 21.7773 31.3691 23.6292 31.3691 25.5373C33.207 25.5294 33.207 25.5294 35.0449 25.5193C35.2723 25.5188 35.4996 25.5183 35.7339 25.5178C36.085 25.5162 36.085 25.5162 36.4432 25.5146C36.9811 25.5373 36.9811 25.5373 37.1815 25.7378C37.1815 26.6638 37.1815 27.5897 37.1815 28.5438C35.2634 28.5438 33.3453 28.5438 31.3691 28.5438C31.377 30.3817 31.377 30.3817 31.3871 32.2196C31.3876 32.447 31.3881 32.6744 31.3886 32.9086C31.3897 33.1427 31.3907 33.3767 31.3918 33.6179C31.3691 34.1558 31.3691 34.1558 31.1686 34.3563C30.7348 34.3761 30.3002 34.3823 29.8658 34.3813C29.6281 34.3818 29.3905 34.3823 29.1456 34.3829C28.5631 34.3563 28.5631 34.3563 28.3626 34.1558C28.3451 33.7404 28.3412 33.3244 28.343 32.9086C28.3435 32.6812 28.344 32.4539 28.3446 32.2196C28.3464 31.9284 28.3482 31.6373 28.3501 31.3373C28.3542 30.4154 28.3584 29.4936 28.3626 28.5438C26.5106 28.5438 24.6587 28.5438 22.7506 28.5438C22.7506 27.5517 22.7506 26.5595 22.7506 25.5373C24.6026 25.5373 26.4545 25.5373 28.3626 25.5373C28.3626 23.6854 28.3626 21.8334 28.3626 19.9253Z"
                fill="#A3A3A3"
              />
              <path
                d="M29.5652 5.89514C30.4531 6.32322 31.0075 6.77506 31.3691 7.69901C31.507 8.71579 31.4881 9.46942 31.0183 10.3923C30.2583 11.2579 29.68 11.658 28.5129 11.7702C27.3274 11.6714 26.6615 11.2402 25.8698 10.3672C25.4651 9.5093 25.3908 8.83203 25.5566 7.89944C26.4766 6.09361 27.6095 5.61084 29.5652 5.89514Z"
                fill="#A3A3A3"
              />
            </svg>
          </div>
          <input
            type="file"
            ref={imgRef}
            onChange={handleChangeImg}
            className={style.file}
          />
          {isDragging ? (
            <p>Drop Images here</p>
          ) : (
            <p> Drag and drop Image here or browse</p>
          )}

          {image && (
            <img
              className={style.postimg}
              src={image}
              height={75}
              width={75}
              alt=""
            />
          )}
        </div>
        <span className={style.img_error}> Please insert image </span>
        <input
          type="submit"
          value={loading ? "Loading.." : "Post"}
          className={!loading ? style.input : style.desibledInput}
          disabled={loading}
        />
      </form>
      <RecentUser />
    </section>
  );
};

export default CreatePost;
