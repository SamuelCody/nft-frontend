import React from "react";
import { Form } from "react-bootstrap";
import styled from "styled-components";

const Input = styled(Form.Control)`
  padding: ${(props) => (props.padding ? props.padding : "0.8rem 1rem")};
  border: ${(props) => (props.message ? "1px solid red" : "1px solid #ADB5BD")};
  background: ${(props) => (props.background ? props.background : "#fff")};
  border-radius: 8px;
  color: #374151;
  font-weight: 400;
  font-size: 15px;
  &:focus {
    box-shadow: none;
    border: 1px solid #01525f;
    background: rgba(243, 244, 246, 0.7);
  }
  &:disabled {
    background: #f4f7fd;
  }
  &::placeholder {
    color: rgba(107, 114, 128, 0.3);
    font-weight: 400;
    font-size: 14px;
  }
  &:-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: rgba(107, 114, 128, 0.3);
    font-weight: 400;
    font-size: 14px;
  }

  &::-ms-input-placeholder {
    /* Microsoft Edge */
    color: rgba(107, 114, 128, 0.3);
    font-weight: 400;
    font-size: 14px;
  }

  @media only screen and (max-width: 500px) {
    &::placeholder,
    &::-ms-input-placeholder,
    &:-ms-input-placeholder {
      font-size: 12px;
    }
  }
`;

const ErrorMessageWrapper = styled.div`
  text-align: left;
`;

const ErrorMessage = styled.p`
  color: red;
  font-weight: 300;
  font-size: 13px;
  padding: 0;
  padding-top: 0.5rem;
  margin: 0;
`;

function CustomInputCmp(props) {
  return (
    <>
      <Input
        background={props.background}
        required={props.required ? true : false || false}
        type={props.type}
        name={props.name}
        disabled={props.disabled}
        value={props.values ? props.values[props.name] : props.value}
        placeholder={props.placeholder}
        onChange={props.onChange || null}
        message={props.message || null}
        padding={props?.padding}
      />

      {props.showMessage && (
        <ErrorMessageWrapper>
          <ErrorMessage>{props.showMessage ? props.message : ""}</ErrorMessage>
        </ErrorMessageWrapper>
      )}
    </>
  );
}

export default CustomInputCmp;
