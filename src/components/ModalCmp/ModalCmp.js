import React from "react";
import ReactModal from "react-modal";
import styled from "styled-components";
import "./ModalCmp.css";
import { Times } from "@styled-icons/fa-solid";

ReactModal.setAppElement("#root");

ReactModal.defaultStyles.content = {
  backgroundColor: "#ffffff",
  width: "100%",
  margin: "1rem",
  borderRadius: "11px",
  border: "none",
  boxShadow: "1px 1px 17px rgba(218, 216, 216, 0.33)",
};

const CloseWrapper = styled.div`
  text-align: right;
  padding: 1rem;
  display: flex;
  justify-content: flex-end;
`;

const IconWrapper = styled.div`
  border-radius: 50%;
  background-color: rgba(194, 193, 193, 0.3);
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const ModalCmp = (props) => {
  return (
    <>
      <ReactModal
        isOpen={props.isOpen}
        onAfterOpen={props.onAfterOpen}
        onAfterClose={props.onAfterClose}
        onRequestClose={props.onRequestClose}
        contentLabel={props.contentLabel}
        id={props.id}
        shouldFocusAfterRender={props.shouldFocusAfterRender}
        shouldCloseOnOverlayClick={props.shouldCloseOnOverlayClick}
        shouldCloseOnEsc={props.shouldCloseOnEsc}
        shouldReturnFocusAfterClose={props.shouldReturnFocusAfterClose}
        preventScroll={props.preventScroll}
        ariaHideApp={false}
        style={{ content: { ...props.contentStyles } }}
        // overlayClassName="JessieModal__Overlay"
        // className="JessieModal__Content"
        // htmlOpenClassName="JessieModal__Html--open"
        // bodyOpenClassName="JessieModal__Body--open"
      >
        {props.showCloseIcon && (
          <CloseWrapper>
            <IconWrapper onClick={props.onRequestClose}>
              <Times color={"#8C8686"} size={14} />
            </IconWrapper>
          </CloseWrapper>
        )}
        {props.children}
      </ReactModal>
    </>
  );
};

export default ModalCmp;
