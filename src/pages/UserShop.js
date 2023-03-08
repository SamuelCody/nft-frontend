import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import styled from "styled-components";
import ShopFooterCmp from "../components/FooterCmp/ShopFooterCmp";
import ItemCardCmp from "../components/ItemCardCmp/ItemCardCmp";
import PaginationCmp from "../components/PaginationCmp/PaginationCmp";
import ScrollToTop from "react-scroll-to-top";
import { ArrowIosUpwardOutline } from "@styled-icons/evaicons-outline";
import NavbarCmp from "../components/NavbarCmp/NavbarCmp";
import { getNfts } from "../redux/actions/nftAction";
import { connect } from "react-redux";
import NftPlaceholder from "../assets/nft-placeholder.svg";
import SuccessModal from "../components/Modals/SuccessModal";

const PageWrapper = styled(Container)`
  background-color: #f8f9fb !important;
  padding: 0;
`;

const ProductDisplayWrapper = styled.div`
  /* background-color: #fff; */
  padding: 2rem 0rem;
  width: 100%;
  max-width: calc(1100px + 5rem);
  margin: 1rem auto 5rem;

  @media only screen and (max-width: 1247px) {
    padding: 2rem 1.5rem;
  }

  @media only screen and (max-width: 760px) {
    margin: 1rem auto 4rem;
    max-width: calc(1000px + 1rem);
  }

  @media only screen and (max-width: 547px) {
    margin: 1rem auto 3rem;
    padding: 0rem 1rem;
    background-color: transparent;
  }
`;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-bottom: 16px;
`;

const ProductItemsConatiner = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  column-gap: 10px;
  row-gap: 25px;

  @media only screen and (max-width: 547px) {
    position: relative;
    width: 100vw;
    left: calc(-50vw + 50%);
  }
`;

const ScrollTopWrapper = styled.div``;

const UserShop = ({ setGetAllNfts, loading, error, nfts }) => {
  const [inputVals, setInputVals] = useState({});
  const [cursor, setCursor] = useState(null);
  const [activeData, setActiveData] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [emptyText, setEmptyText] = useState(
    "Provide an address to get all NFTs in that address"
  );
  useEffect(() => {
    setCursor(nfts?.data?.cursor);
    if (nfts && nfts?.data?.result && nfts?.data?.result?.length === 0) {
      setEmptyText("No NFT in this address");
    }
  }, [nfts]);
  return (
    <>
      <PageWrapper fluid>
        <NavbarCmp setInputVals={setInputVals} />
        <ProductDisplayWrapper>
          {!nfts || nfts?.data?.result?.length === 0 ? (
            <div style={{ textAlign: "center", height: "27vh" }}>
              {emptyText}
            </div>
          ) : (
            <>
              <PaginationWrapper>
                <PaginationCmp
                  totalSize={nfts?.data?.total}
                  limit={nfts?.data?.page_size}
                  pageClick={async () => {
                    await setGetAllNfts(
                      `${inputVals.address}/${inputVals.chain}${
                        cursor ? `?cursor=${cursor}` : ""
                      }`
                    );
                  }}
                />
              </PaginationWrapper>
              <ProductItemsConatiner>
                {nfts?.data?.result?.map((v, i) => {
                  return (
                    <ItemCardCmp
                      onClick={() => {
                        setActiveData(v);
                        setOpenModal(true);
                      }}
                      imageUrl={
                        v.normalized_metadata?.image &&
                        v.normalized_metadata?.image.includes("ipfs://")
                          ? v.normalized_metadata?.image.replace(
                              "ipfs://",
                              "https://ipfs.io/ipfs/"
                            )
                          : !v.normalized_metadata?.image
                          ? NftPlaceholder
                          : v.normalized_metadata?.image
                      }
                      productName={v.normalized_metadata.name || v.name}
                      description={
                        v.normalized_metadata.description ||
                        "No description for this NFT"
                      }
                      id={v.normalized_metadata.name}
                      key={i}
                    />
                  );
                })}
              </ProductItemsConatiner>
            </>
          )}
        </ProductDisplayWrapper>
        <ShopFooterCmp />
      </PageWrapper>
      <SuccessModal
        title={
          activeData?.normalized_metadata?.description ||
          "No description for this NFT"
        }
        titleMaxWidth="500px"
        maxWidth="550px"
        // wrapperPadding={"2rem 1rem 2rem"}
        showCloseIcon={true}
        isOpen={openModal}
        heading={activeData?.normalized_metadata?.name || activeData?.name}
        address={activeData?.owner_of}
        href={`${
          [
            "goerli",
            "fuji",
            "bsc_testnet",
            "cronos_testnet",
            "mumbai",
          ].includes(inputVals?.chain?.toLowerCase())
            ? `https://testnets.opensea.io/assets/${inputVals?.chain?.toLowerCase()}/${
                activeData?.token_address
              }/${activeData?.token_id}`
            : `https://opensea.io/assets/${inputVals?.chain?.toLowerCase()}/${
                activeData?.token_address
              }/${activeData?.token_id}`
        }`}
        img={
          activeData?.normalized_metadata?.image &&
          activeData?.normalized_metadata?.image.includes("ipfs://")
            ? activeData?.normalized_metadata?.image.replace(
                "ipfs://",
                "https://ipfs.io/ipfs/"
              )
            : !activeData?.normalized_metadata?.image
            ? NftPlaceholder
            : activeData?.normalized_metadata?.image
        }
        onRequestClose={() => {
          setOpenModal(false);
        }}
        actionButtonWidth="160px"
      />
      <ScrollTopWrapper>
        <ScrollToTop
          smooth
          component={<ArrowIosUpwardOutline size={30} />}
          style={{
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#fff",
            backgroundColor: "#016170",
            boxShadow: "0px 8px 24px 2px rgba(1, 97, 112, 0.2)",
            bottom: "20px",
            right: "35px",
          }}
        />
      </ScrollTopWrapper>
    </>
  );
};

const mapState = (state) => ({
  loading: state.nfts.nftLoading,
  error: state.nfts.nftError,
  nfts: state.nfts.nftSuccess,
});

const mapDispatch = (dispatch) => ({
  setGetAllNfts: (data) => dispatch(getNfts(data)),
});

export default connect(mapState, mapDispatch)(UserShop);
