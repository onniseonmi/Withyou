export default function TemplateOnCanvas({
  id,
  src,
  style,
  isSelected,
  setObjectStyle,
  onClickObjcet,
  controlCursorStyle,
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
        onClickObjcet(e);
      }}
      onTouchStart={(e) => {
        onClickObjcet(e);
      }}
      onMouseUp={(e) => {
        controlCursorStyle(e, "grab");
      }}
      onTouchEnd={(e) => {
        controlCursorStyle(e, "grab");
        document.body.style.overflow = null;
      }}
      onMouseOver={(e) => {
        controlCursorStyle(e, "grab");
      }}
    />
  );
}
