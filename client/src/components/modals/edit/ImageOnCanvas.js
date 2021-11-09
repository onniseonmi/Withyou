import React from "react";

export default function ImageOnCanvas({ src, clickOn, setClickOn, style }) {
  // const [clickOn, setClickOn] = useState(false);
  console.log(clickOn);
  return (
    <img
      src={src}
      style={style}
      onMouseDown={(e) => {
        // console.log(clickOn);
        setClickOn(true); // 비동기
        // console.log(clickOn);
        e.target.classList = "selected";
        e.target.style.cursor = "grabbing";
      }}
      onMouseUp={(e) => {
        //  ? clickOn = false;
        e.target.classList = "";
        e.target.style.cursor = "grab";
        // ? clickOn = true;
      }}
      onMouseMove={(e) => {
        // 로컬변수로 푼다? -> 위에처럼
        // 상태를 바꾸면 리렌더링 -> 상태 바꾸면 이미지가 새로 생김?
        if (clickOn) {
          e.target.style.left =
            e.nativeEvent.pageX - e.target.offsetWidth / 2 + "px";
          e.target.style.top =
            e.nativeEvent.pageY - e.target.offsetHeight / 2 + "px";
        }
      }}
      onMouseOver={(e) => {
        e.target.style.cursor = "grab";
        e.target.style.border = "dashed 0.1rem black";
      }}
      onMouseOut={(e) => {
        e.target.style.border = "solid 0.1rem white";
      }}
    />
  );
}
