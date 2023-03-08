import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import styled from "styled-components";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip as ReactTooltip } from "react-tooltip";

const Wrapper = styled.div`
  /* border: 1px solid #d1d1d1; */
  padding: 10px;
  /* max-width: 250px; */
  width: ${(props) => (props.width ? props.width : "24%")};
  border-radius: 12.1385px;
  flex-basis: ${(props) => (props.width ? props.width : "24%")};
  background-color: #fff;
  cursor: pointer;

  @media only screen and (max-width: 995px) {
    flex-basis: ${(props) => (props.width ? props.width : "32%")};
    width: ${(props) => (props.width ? props.width : "32%")};
  }

  @media only screen and (max-width: 757px) {
    flex-basis: ${(props) => (props.width ? props.width : "49%")};
    width: ${(props) => (props.width ? props.width : "49%")};
  }

  @media only screen and (max-width: 547px) {
    flex-basis: 100%;
    width: 100%;
    border: none;
  }
`;

const ContentHolder = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media only screen and (max-width: 547px) {
    flex-direction: row;
    align-items: center;
  }
`;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Image = styled(LazyLoadImage)`
  /* width: 100%; */
  width: 205px;
  aspect-ratio: 1;

  @media only screen and (max-width: 547px) {
    aspect-ratio: 1;
    width: 72px;
  }
`;

const TextWrapper = styled.div`
  @media only screen and (max-width: 547px) {
    width: 100%;
  }
`;

const ProductName = styled.h2`
  font-weight: 700;
  font-size: 18px;
  color: #1d1e2c;
  margin: 0;
`;

const ProductDescription = styled.p`
  font-weight: 400;
  font-size: 12px;
  color: #7c7c84;
  margin: 0;
  padding-top: 6px;
`;

const ItemCardCmp = ({
  productName,
  imageUrl,
  id,
  description,
  width,
  onClick,
}) => {
  return (
    <>
      <Wrapper width={width} onClick={onClick}>
        <ContentHolder>
          <ImageWrapper>
            <Image src={imageUrl} alt={productName} effect="blur" />
          </ImageWrapper>
          <TextWrapper>
            {productName && (
              <>
                <ProductName id={`nft-product-${id}`}>
                  {productName.length > 22
                    ? `${productName.slice(0, 19)}...`
                    : productName}
                </ProductName>
                {productName.length > 22 && (
                  <ReactTooltip
                    anchorId={`nft-product-${id}`}
                    place="bottom"
                    content={productName}
                    style={{ top: "10px", width: "200px" }}
                  />
                )}
              </>
            )}
            {description && (
              <>
                <ProductDescription id={`product-description-${id}`}>
                  {description.length > 40
                    ? `${description.slice(0, 37)}...`
                    : description}
                </ProductDescription>
                {description.length > 40 && (
                  <ReactTooltip
                    anchorId={`product-description-${id}`}
                    place="bottom"
                    content={description}
                    style={{ top: "10px", width: "250px" }}
                  />
                )}
              </>
            )}
          </TextWrapper>
        </ContentHolder>
      </Wrapper>
    </>
  );
};

export default ItemCardCmp;
