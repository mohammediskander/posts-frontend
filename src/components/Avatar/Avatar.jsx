import React from "react";
import "./Avatar.css";

const Avatar = ({ seed, size }) => {
  return (
    <div
      className="avatar"
      style={{
        width: size,
        height: size,
      }}
    >
      <img
        src={`https://avatars.dicebear.com/api/avataaars/${seed}.svg`} // change avatar on user ID
        alt="user-avatar"
      />
    </div>
  );
};

export default Avatar;
