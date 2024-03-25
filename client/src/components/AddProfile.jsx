import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

const AddProfile = ({ setNotify }) => {
  const [clicked, setClicked] = useState(false);
  const [img, setImg] = useState("");
  const inputRef = useRef();
  const submitRef = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("/api/user/addprofile", { img })
      .then((res) => {
        console.log(res);
        setNotify("success");
      })
      .catch((e) => {
        setNotify("fell");
      });
  };
  const handleChange = (e) => {
    setNotify("loading");
    if (e.target.files[0].type.split("/")[0] === "image") {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
        setImg(reader.result);
      };
      reader.onerror = (error) => {
        setNotify("fell");
      };
    }
    setNotify("not an image");
  };
  const handleClick = () => {
    if (!clicked) {
      console.log("hande");
    }
    setClicked(!clicked);
    inputRef.current.click();
  };
  useEffect(() => {
    if (img) {
      submitRef.current.click();
    }
  }, [img]);
  return (
    <div onClick={handleClick}>
      <svg
        style={{ fill: "var(--white)" }}
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          style={{ fill: "#78C8E0" }}
          width="22"
          height="22"
          rx="11"
          fill="#78C8E0"
        />
        <path
          style={{ fill: "var(--white)" }}
          d="M16.1429 9.71429H12.2857V5.85714C12.2857 5.38384 11.9019 5 11.4286 5H10.5714C10.0981 5 9.71429 5.38384 9.71429 5.85714V9.71429H5.85714C5.38384 9.71429 5 10.0981 5 10.5714V11.4286C5 11.9019 5.38384 12.2857 5.85714 12.2857H9.71429V16.1429C9.71429 16.6162 10.0981 17 10.5714 17H11.4286C11.9019 17 12.2857 16.6162 12.2857 16.1429V12.2857H16.1429C16.6162 12.2857 17 11.9019 17 11.4286V10.5714C17 10.0981 16.6162 9.71429 16.1429 9.71429Z"
          fill="#E8E8E8"
        />
      </svg>
      <form method="POST" onSubmit={handleSubmit}>
        <input
          type="file"
          onChange={handleChange}
          ref={inputRef}
          style={{ display: "none" }}
        />
        <input type="submit" ref={submitRef} style={{ display: "none" }} />
      </form>
    </div>
  );
};

export default AddProfile;
