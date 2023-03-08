import React from "react";
import styled from "styled-components";
import { Container } from "react-bootstrap";

const FooterContainer = styled(Container)`
  background-color: #f1f4f7;
  padding: 4rem 3rem;

  @media only screen and (max-width: 760px) {
    padding: 4rem 1rem;
  }
`;

const FooterWrapper = styled.div`
  max-width: calc(1100px + 5rem);
  margin: 0 auto;

  @media only screen and (max-width: 500px) {
    max-width: calc(1000px + 1rem);
  }
`;

const CopyrightFooter = styled.p`
  text-align: center;
  color: #1d1e2c;
  font-size: 12px;
  margin: 0;
  font-weight: 400;
  padding: 1rem 0;
`;

function ShopFooterCmp() {
  return (
    <>
      <FooterContainer fluid>
        <FooterWrapper>
          <CopyrightFooter>
            Developed by{" "}
            <a href="https://www.twitter.com/alakowe_dev">Ayinde Samuel</a>
          </CopyrightFooter>
        </FooterWrapper>
      </FooterContainer>
    </>
  );
}

export default ShopFooterCmp;
