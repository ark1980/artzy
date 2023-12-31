import React from "react";
import { useModal } from "../../context/Modal";

function OpenModalButton({
  modalComponent, // component to render inside the modal
  buttonText, // text of the button that opens the modal
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose, // optional: callback function that will be called once the modal is closed
}) {
  const { setModalContent, setOnModalClose } = useModal();
  const btnStyle = {
    border: "none",
    backgroundColor: "transparent",
    margin: "10px 10px 10px 0",
    fontSize: "1rem",
    color: "#4fc883",
    cursor: "pointer",
  };

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (onButtonClick) onButtonClick();
  };

  return (
    <button style={btnStyle} onClick={onClick}>
      {buttonText}
    </button>
  );
}

export default OpenModalButton;
