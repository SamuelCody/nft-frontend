import React from "react";
import styled from "styled-components";
import ModalCmp from "../ModalCmp/ModalCmp";
import { LazyLoadImage } from "react-lazy-load-image-component";
import SolidButton from "../Buttons/SolidButton";

const Wrapper = styled.div`
  text-align: center;
  padding: ${(props) =>
    props.wrapperPadding ? props.wrapperPadding : "2rem 1rem"};
`;

const SuccessImgWrapper = styled.div`
  padding-bottom: 1.5rem;
`;

const SuccessImg = styled(LazyLoadImage)`
  width: 300px;
  aspect-ratio: 1;
`;

const Title = styled.h2`
  color: #1d1e2c;
  font-weight: 800;
  font-size: 18px;
  padding-bottom: 0.8px;
`;

const Text = styled.p`
  font-weight: 400;
  color: #1d1e2c;
  font-size: 14px;
  max-width: ${(props) =>
    props.titleMaxWidth ? props.titleMaxWidth : "300px"};
  margin: 0 auto;
`;

const ButtonWrapper = styled.div`
  padding-top: 1rem;
`;

const SuccessModal = (props) => {
  return (
    <>
      <ModalCmp
        isOpen={props.isOpen}
        onRequestClose={props.onRequestClose}
        contentStyles={{ maxWidth: props.maxWidth || "350px" }}
        shouldFocusAfterRender={false}
        contentLabel="Success"
        id="success"
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={false}
        showCloseIcon={props.showCloseIcon}
      >
        <Wrapper wrapperPadding={props.wrapperPadding}>
          <SuccessImgWrapper>
            <SuccessImg src={props.img} alt="NFT" effect="blur" />
          </SuccessImgWrapper>
          {props.heading && <Title>{props.heading}</Title>}
          <Text titleMaxWidth={props.titleMaxWidth}>{props.title}</Text>
          <Text titleMaxWidth={props.titleMaxWidth}>
            Owner's Address: {props.address}
          </Text>
          <ButtonWrapper>
            <SolidButton
              onClick={() => {
                window.open(props.href, "_blank");
              }}
              text={"Buy NFT"}
              type="submit"
              weighty="500"
              textFontSize="14px"
              specifyPadding="0.8rem 1.5rem"
              color="#fff"
              widthWebkit={props.actionButtonWidth || "150px"}
              widthMoz={props.actionButtonWidth || "150px"}
              widthNormal={props.actionButtonWidth || "150px"}
              borderRadius="8px"
              backColor="#01525f"
              backgroundHoverColor="#01525f"
              textHoverColor="#fff"
              margin="0rem auto 0"
            />
          </ButtonWrapper>
        </Wrapper>
      </ModalCmp>
    </>
  );
};

export default SuccessModal;
