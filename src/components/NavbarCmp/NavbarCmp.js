import { Formik } from "formik";
import React, { useState } from "react";
import styled from "styled-components";
import CustomInputCmp from "../InputsCmp/CustomInputCmp";
import ProfilePicture from "../../assets/profile-pic.jpg";
import CustomInputSelectCmp from "../InputsCmp/CustomInputSelectCmp";
import SolidButton from "../Buttons/SolidButton";
import nftValidatorSchema from "../../validators/nftValidator";
import { connect } from "react-redux";
import { getNfts } from "../../redux/actions/nftAction";
import SpinnerCmp from "../SpinnerCmp/SpinnerCmp";

const NavbarContainer = styled.div`
  background: ${(props) =>
    props.navBarState || props.type
      ? "rgba(245, 246, 248, 0.8)"
      : "transparent"};
  backdrop-filter: blur(3px);
  /* height: 80px; */
  /* margin-top: -80px; */
  display: flex;
  align-items: center;
  padding: 1rem 3rem;

  /* position: relative; */
  position: sticky;
  top: 0;
  z-index: 10;
  transition: 0.8s all ease;

  @media only screen and (max-width: 760px) {
    padding: 1rem;
    flex-direction: column;
    gap: 20px;
  }
`;

const NavbarWrapper = styled.div`
  width: 100%;
  max-width: calc(1100px + 5rem);
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;

  @media only screen and (max-width: 500px) {
    max-width: calc(1000px + 1rem);
  }
`;

const ShopName = styled.h2`
  color: #01525f;
  font-weight: 700;
  font-size: 20px;
  margin: 0;
`;

const ButtonWrapperDesktop = styled.div``;

const ProfilePic = styled.img`
  width: 30px;
  aspect-ratio: 1;
  border-radius: 50%;
`;

const InputWrapper = styled.div``;

const FormWrapper = styled.div`
  display: flex;
  gap: 10px;

  @media only screen and (max-width: 760px) {
    flex-direction: column;
  }
`;

const SearchFormWrapperDesktop = styled.div`
  max-width: 500px;
  width: 100%;

  @media only screen and (max-width: 760px) {
    display: none;
  }
`;

const SearchFormWrapperMobile = styled.div`
  display: none;

  @media only screen and (max-width: 760px) {
    display: unset;
    width: 100%;
  }
`;

const NavbarCmp = ({ setGetAllNfts, loading, error, nfts, ...props }) => {
  const [navbarStateScroll, setNavbarStateScroll] = useState(false);

  const changeBackgroundColor = () => {
    if (window.scrollY >= 10) {
      setNavbarStateScroll(true);
    } else {
      setNavbarStateScroll(false);
    }
  };

  window.addEventListener("scroll", changeBackgroundColor);

  const SearchFormCmp = () => {
    return (
      <>
        <Formik
          validationSchema={nftValidatorSchema}
          initialValues={{
            address: "",
            chain: "",
          }}
          onSubmit={async (values, { resetForm }) => {
            const response = await setGetAllNfts(
              `${values.address}/${values.chain}`
            );

            if (
              response &&
              response.status === 200 &&
              response.message === "Success"
            ) {
              // setCursor()
              props.setInputVals(values);
              resetForm();
            }
          }}
        >
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            setFieldValue,
            values,
            touched,
            isValid,
            errors,
          }) => (
            <>
              <form noValidate onSubmit={handleSubmit}>
                <FormWrapper>
                  <InputWrapper>
                    <CustomInputCmp
                      value={values.address}
                      onChange={handleChange}
                      name="address"
                      placeholder="Enter nft address"
                      message={`${errors["address"] ? errors["address"] : ""}`}
                      padding="0.5rem 1.8rem 0.5rem 1rem"
                    />
                  </InputWrapper>
                  <InputWrapper>
                    <CustomInputSelectCmp
                      background="rgba(225, 235, 245, 0.1)"
                      required={true}
                      name="chain"
                      values={values}
                      onChange={handleChange}
                      placeholder="Select Chain"
                      data={[
                        "ETHEREUM",
                        "GOERLI",
                        "SEPOLIA",
                        "POLYGON",
                        "MUMBAI",
                        "AVALANCHE",
                        "FUJI",
                        "BSC_TESTNET",
                        "BSC",
                        "FANTOM",
                        "CRONOS",
                        "CRONOS_TESTNET",
                        "PALM",
                        "ARBITRUM",
                      ]}
                      message={`${errors["chain"] ? errors["chain"] : ""}`}
                      showMessage={false}
                      padding="0.5rem 0.6rem"
                    />
                  </InputWrapper>
                  <SolidButton
                    text={
                      loading ? (
                        <>
                          <SpinnerCmp
                            enabled={true}
                            color={"#fff"}
                            size={20}
                            secondaryColor={"black"}
                          />
                        </>
                      ) : (
                        "Check"
                      )
                    }
                    type="submit"
                    weighty="500"
                    textFontSize="14px"
                    specifyPadding="0.8rem 1.5rem"
                    color="#fff"
                    widthWebkit={"150px"}
                    widthMoz={"150px"}
                    widthNormal={"150px"}
                    borderRadius="8px"
                    backColor="#01525f"
                    backgroundHoverColor="#01525f"
                    textHoverColor="#fff"
                    margin="0rem auto 0"
                    disabled={loading ? true : false}
                  />
                </FormWrapper>
              </form>
            </>
          )}
        </Formik>
      </>
    );
  };

  return (
    <>
      <NavbarContainer navBarState={navbarStateScroll}>
        <NavbarWrapper>
          <ShopName>NFT Checker</ShopName>
          <SearchFormWrapperDesktop>
            <SearchFormCmp />
          </SearchFormWrapperDesktop>
          <ButtonWrapperDesktop>
            <ProfilePic src={ProfilePicture} alt="Picture" />
          </ButtonWrapperDesktop>
        </NavbarWrapper>
        <SearchFormWrapperMobile>
          <SearchFormCmp />
        </SearchFormWrapperMobile>
      </NavbarContainer>
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

export default connect(mapState, mapDispatch)(NavbarCmp);
