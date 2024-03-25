import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import style from "../assets/css/Post.module.css";
import user_icon from "/img/user.svg";

import axios from "axios";

const Post = ({ post, ref_ }) => {
  const [isSaved, setIsSeved] = useState(false);
  const [user, setUser] = useState();

  useEffect(() => {
    axios.get("/api/user").then((res) => {
      setUser(res.data);
    });
  }, []);
  useEffect(() => {
    if (user) {
      user.saved.map((saved) => {
        if (saved == post._id) {
          setIsSeved(true);
        }
      });
    }
  }, [user]);
  const handleSave = () => {
    axios
      .post("/api/posts/save", { id: post._id })
      .then((data) => {
        console.log(data.data);
        setIsSeved(!isSaved);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <div ref={ref_} className={style.post}>
      <div className={style.user}>
        <div>
          {post.user.profile ? (
            <img
              className={style.userImg}
              src={post.user.profile}
              alt="user_profile"
            />
          ) : (
            <img className={style.userImg} src={user_icon} alt="user-img" />
          )}
        </div>
        <div>
          <p className={style.bold}> {post.user.name}</p>
          <p> {post.user.date.substring(0, 10)}</p>
        </div>
        <Link to={`/user/id/${post.user._id}`} className={style.gotouser}>
          <svg
            width="11"
            height="16"
            viewBox="0 0 11 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.74365 8.64502L3.10303 15.2856C2.64404 15.7446 1.90186 15.7446 1.44775 15.2856L0.344238 14.1821C-0.114746 13.7231 -0.114746 12.981 0.344238 12.5269L5.05127 7.81982L0.344238 3.11279C-0.114746 2.65381 -0.114746 1.91162 0.344238 1.45752L1.44287 0.344238C1.90186 -0.114746 2.64404 -0.114746 3.09814 0.344238L9.73877 6.98486C10.2026 7.44385 10.2026 8.18604 9.74365 8.64502Z"
              fill="black"
            />
          </svg>
        </Link>
      </div>
      <div className={style.link}>
        <Link to={`/posts/post/${post._id}`}>
          <img src={post.img} alt="post-imgae" className={style.post_img} />
        </Link>
        <div className={style.flex}>
          <div className={style.category}>{post.category}</div>
          {isSaved ? (
            <svg
              width="28"
              height="30"
              viewBox="0 0 28 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={handleSave}
              className={style.save}
            >
              <path
                d="M5.76573 2.83435C5.95735 2.8334 6.14896 2.83245 6.34638 2.83147C6.98123 2.82868 7.61608 2.82738 8.25094 2.82633C8.69251 2.82523 9.13407 2.82413 9.57564 2.82303C10.5024 2.82102 11.4291 2.81991 12.3558 2.81924C13.5408 2.8182 14.7258 2.81361 15.9109 2.80817C16.8236 2.80461 17.7362 2.80362 18.6489 2.80333C19.0856 2.80275 19.5223 2.80122 19.959 2.79871C20.5716 2.79544 21.184 2.79581 21.7966 2.79705C21.9756 2.79529 22.1546 2.79353 22.339 2.79172C23.7265 2.80044 24.9743 2.99929 26.0642 3.80803C26.1841 3.938 26.3041 4.06798 26.4276 4.2019C26.5515 4.33188 26.6754 4.46185 26.8031 4.59577C27.3033 5.22301 27.3455 5.75255 27.3508 6.49418C27.3527 6.6915 27.3546 6.88883 27.3565 7.09213C27.3574 7.30851 27.3584 7.5249 27.3593 7.74783C27.362 8.08977 27.362 8.08977 27.3648 8.43862C27.3702 9.19442 27.3739 9.95022 27.377 10.706C27.3782 10.9663 27.3793 11.2266 27.3805 11.4868C27.3852 12.5692 27.3893 13.6516 27.3918 14.734C27.3954 16.2851 27.4026 17.8362 27.4151 19.3874C27.4236 20.4782 27.4279 21.569 27.429 22.6599C27.4298 23.3115 27.4325 23.9629 27.4395 24.6145C27.4464 25.341 27.4465 26.0674 27.4449 26.794C27.4485 27.01 27.452 27.2259 27.4557 27.4485C27.4424 28.902 27.4424 28.902 26.7969 29.5503C26.2224 29.7917 26.2224 29.7917 25.6609 29.7775C25.103 29.5925 24.7234 29.3895 24.2587 29.0644C24.0991 28.9542 23.9395 28.844 23.7751 28.7305C23.6073 28.612 23.4395 28.4935 23.2666 28.3714C22.9109 28.1249 22.5551 27.8785 22.1993 27.6321C22.0257 27.511 21.8521 27.3899 21.6733 27.2652C20.823 26.6746 19.9576 26.1016 19.0938 25.5262C18.4965 25.1259 17.9079 24.7167 17.3201 24.3058C17.0538 24.1212 17.0538 24.1212 16.7821 23.9328C16.4309 23.6892 16.0811 23.444 15.7327 23.1973C15.5724 23.0865 15.4121 22.9758 15.2469 22.8616C15.1045 22.7618 14.9621 22.6619 14.8154 22.559C14.3544 22.279 14.3544 22.279 13.5236 22.3439C13.1091 22.5435 13.1091 22.5435 12.7145 22.8348C12.5598 22.9417 12.405 23.0486 12.2456 23.1587C12.0803 23.2758 11.915 23.3929 11.7447 23.5136C11.3898 23.7598 11.0348 24.006 10.6799 24.2521C10.4982 24.3791 10.3166 24.506 10.1294 24.6368C9.11097 25.3457 8.07934 26.0399 7.04947 26.7361C6.29606 27.2458 5.54466 27.7572 4.79999 28.2766C4.67082 28.3658 4.54164 28.455 4.40855 28.5468C4.06678 28.7829 3.72646 29.0205 3.38626 29.2583C2.77531 29.6123 2.43431 29.7947 1.70055 29.7917C1.12842 29.5494 1.12842 29.5494 0.605828 29.0278C0.435308 28.2849 0.456437 27.547 0.464177 26.7916C0.462259 26.563 0.46034 26.3343 0.458364 26.0988C0.454371 25.4721 0.455308 24.8456 0.458779 24.219C0.461554 23.5621 0.458979 22.9053 0.457261 22.2484C0.45527 21.1446 0.457894 20.0407 0.463108 18.9369C0.469055 17.6633 0.467144 16.3899 0.461108 15.1164C0.456127 14.0213 0.455446 12.9262 0.458305 11.8311C0.460006 11.1778 0.460255 10.5246 0.456622 9.87136C0.453835 9.14173 0.458091 8.41239 0.464177 7.68279C0.461961 7.46806 0.459745 7.25333 0.457462 7.03209C0.47735 5.74196 0.678952 4.79428 1.70055 3.81996C2.98996 2.97281 4.19757 2.8362 5.76573 2.83435ZM12.0152 20.0989C11.7631 20.5387 3.4512 25.7375 3.42487 6.86043C3.40527 -7.19274 3.42518 7.23632 3.42487 7.40738C3.42566 7.58994 4.50461 7.72989 4.50542 7.91797C4.50539 8.10988 4.50546 8.32566 4.50542 8.52339C4.50558 9.1599 4.50371 9.23484 4.50542 9.87136C4.50583 10.3118 5.99204 8.61273 4.71185 11.8311C4.28275 12.9099 5.82469 13.3977 5.82711 14.5586C5.82935 15.7427 7.04837 16.9332 7.04947 18.1172C7.05182 20.4416 8.71182 24.8528 3.45211 25.7813C2.44832 25.9586 5.18792 24.7477 6.02472 24.182C6.14359 24.1018 6.26246 24.0216 6.38494 23.939C7.1284 23.4369 4.96992 19.3566 5.71182 18.8528C5.88391 18.736 8.53451 20.4732 8.71182 20.3528C9.04823 20.1243 9.23955 19.1658 9.57564 18.9369C9.89079 18.7226 9.39503 17.7671 9.71185 17.5546C10.0243 17.3425 11.7108 20.3198 12.0152 20.0989C12.6795 19.6297 13.5868 3.97734 14.4317 3.81996C15.2674 3.98741 21.3379 24.1637 15.9867 20.1716C10.4679 16.0546 20.8171 20.0989 16.7932 20.749C16.6192 20.7771 17.0788 20.9557 17.2259 21.0622C18.0449 21.6472 18.8849 22.2089 19.7225 22.7736C20.041 22.9894 20.3594 23.2052 20.6778 23.4211C20.8321 23.5253 20.9863 23.6296 21.1453 23.737C21.4817 23.9656 21.8168 24.1958 22.1508 24.427C22.3235 24.5461 22.4961 24.6651 22.6739 24.7877C22.8295 24.8957 22.9851 25.0037 23.1453 25.115C23.5738 25.386 24.9566 25.9539 24.4708 25.7813C21.6733 24.7877 15.9819 23.6169 15.9867 21.0622C15.989 19.876 16.1035 17.1738 16.1085 15.9877C16.1132 14.8435 20.4502 11.8501 20.4513 10.706C20.4521 10.2689 22.1485 9.70057 22.1508 9.26344C22.154 8.65254 24.5207 8.59316 24.5205 7.98225C24.5229 7.70945 24.5229 7.70945 24.5253 7.43114C24.5247 7.26485 24.5241 7.09856 24.5235 6.92723C24.5241 6.71044 24.5241 6.71044 24.5247 6.48928C24.4949 6.05049 24.4949 6.05049 24.0329 5.53869C23.201 5.23346 22.2518 5.31952 21.3633 5.31998C21.0929 5.31902 20.0013 14.7764 19.7255 14.7754C19.1303 14.7736 15.8421 9.26365 15.2469 9.26344C14.833 9.26283 17.7667 4.90046 17.7897 5.31372C17.9557 8.29172 13.5236 10.706 15.188 5.31233C15.5158 4.25003 24.0296 5.25581 25.1085 4.98766C33.2147 2.97289 13.1002 20.3527 12.2456 20.3528C11.8356 20.3526 6.35978 7.74783 8.05922 5.3015C8.38605 4.83103 12.2834 18.8517 11.7106 18.8528C11.4563 18.8512 5.07288 6.29169 5.82711 5.29808C6.52062 4.38446 13.0243 19.673 12.0152 20.0989Z"
                fill="#171717"
              />
            </svg>
          ) : (
            <svg
              width="27"
              height="27"
              viewBox="0 0 27 27"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={handleSave}
              className={style.save}
            >
              <path
                d="M5.30998 0.0426311C5.5016 0.0416829 5.69321 0.0407348 5.89063 0.0397579C6.52548 0.0369656 7.16033 0.0356665 7.79519 0.0346119C8.23676 0.0335133 8.67832 0.0324138 9.11989 0.0313133C10.0466 0.029306 10.9733 0.0281905 11.9 0.0275252C13.0851 0.0264794 14.2701 0.0218944 15.4551 0.0164543C16.3678 0.0128897 17.2805 0.0119028 18.1932 0.0116106C18.6299 0.011034 19.0666 0.00950532 19.5033 0.00699202C20.1159 0.00371905 20.7283 0.00409678 21.3409 0.00533253C21.5198 0.00357279 21.6988 0.00181306 21.8832 0C23.2708 0.00872671 24.5186 0.207572 25.6084 1.01631C25.7284 1.14629 25.8483 1.27627 25.9719 1.41018C26.0958 1.54016 26.2197 1.67014 26.3474 1.80405C26.8476 2.4313 26.8898 2.96082 26.8951 3.70245C26.8969 3.89978 26.8988 4.0971 26.9008 4.30041C26.9017 4.51679 26.9026 4.73317 26.9036 4.95611C26.9063 5.29805 26.9063 5.29805 26.909 5.64689C26.9145 6.40269 26.9181 7.15849 26.9212 7.9143C26.9224 8.17457 26.9236 8.43484 26.9248 8.69511C26.9295 9.77748 26.9336 10.8599 26.9361 11.9422C26.9396 13.4934 26.9469 15.0445 26.9594 16.5956C26.9678 17.6865 26.9721 18.7773 26.9733 19.8682C26.9741 20.5197 26.9767 21.1712 26.9838 21.8227C26.9907 22.5493 26.9907 23.2756 26.9891 24.0022C26.9927 24.2182 26.9963 24.4342 27 24.6568C26.9866 26.1103 26.9866 26.1103 26.3411 26.7585C25.7666 27 25.7666 27 25.2052 26.9857C24.6472 26.8008 24.2676 26.5978 23.803 26.2726C23.6434 26.1625 23.4838 26.0523 23.3193 25.9388C23.1515 25.8203 22.9838 25.7018 22.8109 25.5796C22.4551 25.3332 22.0994 25.0867 21.7435 24.8404C21.57 24.7193 21.3964 24.5982 21.2175 24.4735C20.3673 23.8829 19.5019 23.3099 18.6381 22.7345C18.0407 22.3342 17.4521 21.925 16.8643 21.5141C16.598 21.3295 16.598 21.3295 16.3263 21.1411C15.9752 20.8974 15.6253 20.6523 15.277 20.4056C15.1166 20.2948 14.9563 20.184 14.7912 20.0699C14.6488 19.97 14.5064 19.8702 14.3596 19.7673C13.8987 19.4873 13.8987 19.4873 13.0678 19.5522C12.6533 19.7517 12.6533 19.7517 12.2588 20.043C12.104 20.1499 11.9493 20.2568 11.7898 20.367C11.6245 20.4841 11.4592 20.6012 11.2889 20.7219C10.934 20.9681 10.5791 21.2143 10.2241 21.4604C10.0425 21.5873 9.86081 21.7143 9.67365 21.8451C8.65522 22.554 7.6236 23.2481 6.59372 23.9443C5.84031 24.4541 5.08891 24.9655 4.34424 25.4849C4.21507 25.5741 4.08589 25.6632 3.9528 25.7551C3.61103 25.9912 3.27071 26.2288 2.93051 26.4666C2.31956 26.8206 1.97856 27.003 1.2448 27C0.672672 26.7577 0.672672 26.7577 0.150079 26.2361C-0.0204416 25.4932 0.000687014 24.7553 0.00842743 23.9999C0.00650912 23.7712 0.00459081 23.5426 0.00261438 23.3071C-0.001379 22.6804 -0.000441603 22.0539 0.00302948 21.4272C0.00580442 20.7704 0.00322941 20.1136 0.0015119 19.4567C-0.000479874 18.3528 0.00214411 17.249 0.00735836 16.1452C0.013305 14.8716 0.0113946 13.5982 0.00535887 12.3246C0.000377836 11.2295 -0.0003031 10.1345 0.00255508 9.0394C0.00425605 8.38612 0.00450547 7.73291 0.000872967 7.07963C-0.00191433 6.35001 0.00234121 5.62067 0.00842743 4.89107C0.00621145 4.67633 0.00399548 4.4616 0.00171235 4.24036C0.0216008 2.95023 0.223202 2.00257 1.2448 1.02824C2.53421 0.181093 3.74182 0.0444786 5.30998 0.0426311ZM3.21531 2.93793C2.96319 3.37773 2.96935 3.6235 2.97003 4.11254C2.96973 4.27857 2.96943 4.4446 2.96912 4.61566C2.96991 4.79821 2.9707 4.98076 2.97151 5.16885C2.97148 5.36075 2.97144 5.55266 2.97141 5.75038C2.97156 6.3869 2.97327 7.02341 2.97498 7.65992C2.97539 8.10038 2.9757 8.54083 2.97592 8.98129C2.97676 10.1423 2.97891 11.3033 2.98133 12.4642C2.98357 13.6483 2.98457 14.8323 2.98567 16.0163C2.98802 18.3407 2.99176 20.6652 2.99636 22.9896C3.87917 22.4801 4.73217 21.956 5.56897 21.3903C5.68784 21.3101 5.80671 21.2299 5.92919 21.1473C6.67265 20.6452 7.41421 20.141 8.15611 19.6372C8.3282 19.5204 8.50029 19.4036 8.6776 19.2832C9.01402 19.0546 9.35028 18.826 9.68637 18.5971C10.0015 18.3828 10.3175 18.1694 10.6343 17.9569C10.9467 17.7448 11.2551 17.528 11.5595 17.3072C12.2237 16.838 12.6848 16.5273 13.5297 16.3699C14.3654 16.5373 14.8952 16.9037 15.531 17.3799C15.7996 17.5726 16.0684 17.765 16.3375 17.9573C16.4802 18.0606 16.623 18.164 16.7701 18.2704C17.5892 18.8555 18.4292 19.4172 19.2667 19.9819C19.5852 20.1976 19.9037 20.4135 20.222 20.6294C20.3763 20.7336 20.5306 20.8379 20.6895 20.9453C21.026 21.1739 21.3611 21.404 21.6951 21.6353C21.8677 21.7543 22.0403 21.8734 22.2182 21.996C22.3738 22.104 22.5293 22.212 22.6896 22.3233C23.118 22.5942 23.5402 22.7889 24.0151 22.9896C24.0252 20.4349 24.033 17.8802 24.0378 15.3255C24.0401 14.1393 24.0432 12.9531 24.0481 11.7669C24.0529 10.6228 24.0555 9.4787 24.0566 8.33458C24.0574 7.89745 24.059 7.46032 24.0614 7.0232C24.0645 6.4123 24.065 5.80144 24.0648 5.19053C24.0672 4.91773 24.0672 4.91773 24.0696 4.63942C24.069 4.47312 24.0684 4.30683 24.0677 4.1355C24.0683 3.91872 24.0683 3.91872 24.069 3.69755C24.0392 3.25877 24.0392 3.25877 23.5772 2.74696C22.7452 2.44173 21.7961 2.5278 20.9075 2.52825C20.6372 2.52729 20.6372 2.52729 20.3613 2.52631C19.7661 2.5245 19.1709 2.52412 18.5757 2.52392C18.1618 2.5233 17.7479 2.52266 17.334 2.52199C16.4667 2.52085 15.5995 2.52049 14.7323 2.52061C13.6205 2.52063 12.5088 2.51802 11.3971 2.51473C10.5425 2.51261 9.68788 2.51222 8.83327 2.51232C8.42333 2.51209 8.0134 2.51125 7.60347 2.50977C7.03062 2.50791 6.45783 2.50845 5.88498 2.5096C5.63074 2.50799 5.63074 2.50799 5.37136 2.50635C4.22436 2.51202 4.22436 2.51202 3.21531 2.93793Z"
                fill="#171717"
              />
            </svg>
          )}
        </div>
        <p className={style.bold}> {post.title}</p>
        <p>
          {post.des.substring(0, 40)} {post.des.length >= 39 ? "..." : ""}
        </p>
      </div>
    </div>
  );
};

export default Post;
