import React from "react";

export default function MenuBarElement({
  id,
  className,
  imgId,
  imgClassName,
  imgAlt,
  src,
  handleClick,
}) {
  return (
    <div id={id} className={className}>
      {
        <img
          id={imgId}
          className={imgClassName}
          alt={imgAlt}
          src={src}
          onClick={(e) => handleClick(e)}
        />
      }
    </div>
  );
}
