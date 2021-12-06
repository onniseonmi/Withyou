export default function TextOnCanvas({
  id,
  currentText,
  setCurrentText,
  modifyText,
  style,
  textStyle,
  textSize,
  textColor,
  isDragging,
  onMove,
  setOnMove,
  onClickObjcet,
  setMouseInitLocation,
  onDragAndDrop,
  controlCursorStyle,
  onDragEnd,
  onDragAndDropMobile,
  opacityOnObject,
}) {
  return (
    <input
      key={id}
      id={id}
      size={currentText.length * 2}
      placeholder={currentText} // innerHTML of the editable div
      disabled={false} // use true to disable editing
      onChange={(e) => {
        setCurrentText(e.target.value);
        modifyText(e.target.value);
      }} // handle innerHTML change
      tagname='article' // Use a custom HTML tag (uses a div by default)
      style={{
        ...style,
        display: 'inline-block',
        border: 'none',
        padding: 'auto',
        height: 'auto',
        fontFamily: textStyle,
        fontSize: textSize,
        background: 'transparent',
        color: textColor,
        textAlign: 'center',
      }}
      className='image-element'
      draggable={false}
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
        controlCursorStyle(e, 'grab');
        onDragEnd();
      }}
      onTouchEnd={(e) => {
        controlCursorStyle(e, 'grab');
        onDragEnd();
        document.body.style.overflow = null;
      }}
      onTouchMove={(e) => {
        document.body.style.overflow = 'hidden';
        document.querySelector('html').scrollTop = window.scrollY;
        if (isDragging) {
          onDragAndDropMobile(e.touches[0]);
        }
      }}
      onMouseOver={(e) => {
        controlCursorStyle(e, 'grab');
        opacityOnObject(e, 0.5);
      }}
      onMouseOut={(e) => {
        opacityOnObject(e, 1);
        if (onMove) {
          onDragAndDrop(e);
        }
      }}
    ></input>
  );
}
