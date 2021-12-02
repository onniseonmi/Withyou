export default function ImageOnCanvas({
  id,
  src,
  style,
  isSelected,
  isDragging,
  onMove,
  setOnMove,
  setObjectStyle,
  onClickObjcet,
  setMouseInitLocation,
  onDragAndDrop,
  controlCursorStyle,
  onDragEnd,
  onDragAndDropMobile,
  opacityOnObject,
}) {
  return (
    <img
      key={id}
      id={id}
      className="image-element"
      draggable={false}
      src={src}
      style={setObjectStyle(style, isSelected)}
      onMouseDown={(e) => {
        setOnMove(true);
        onClickObjcet(e);
        setMouseInitLocation(e.clientX, e.clientY);
      }}
      onTouchStart={(e) => {
        const target = e.touches[0];
        onClickObjcet(e);
        setMouseInitLocation(target.clientX, target.clientY);
      }}
      onMouseMove={(e) => {
        if (isDragging) {
          onDragAndDrop(e);
        }
      }}
      onMouseUp={(e) => {
        setOnMove(false);
        controlCursorStyle(e, "grab");
        onDragEnd();
      }}
      onTouchEnd={(e) => {
        controlCursorStyle(e, "grab");
        onDragEnd();
        document.body.style.overflow = null;
      }}
      onTouchMove={(e) => {
        document.body.style.overflow = "hidden";
        document.querySelector("html").scrollTop = window.scrollY;
        if (isDragging) {
          onDragAndDropMobile(e.touches[0]);
        }
      }}
      onMouseOver={(e) => {
        controlCursorStyle(e, "grab");
        opacityOnObject(e, 0.5);
      }}
      onMouseOut={(e) => {
        opacityOnObject(e, 1);
        if (onMove) {
          onDragAndDrop(e);
        }
      }}
    />
  );
}
