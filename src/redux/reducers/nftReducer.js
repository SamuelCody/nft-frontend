import { NFT_ERROR, NFT_LOADING, NFT_SUCCESS } from "./types";

const initialState = {
  nftLoading: null,
  nftSuccess: null,
  nftError: null,
};

export default function nftReducer(state = initialState, action) {
  switch (action.type) {
    case NFT_LOADING:
      return { ...state, nftLoading: action.payload };
    case NFT_SUCCESS:
      return { ...state, nftSuccess: action.payload };
    case NFT_ERROR:
      return { ...state, nftError: action.payload };
    default:
      return state;
  }
}
