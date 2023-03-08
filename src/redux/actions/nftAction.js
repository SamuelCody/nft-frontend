import axios from "axios";
import { toast } from "react-toastify";
import { NFT_ERROR, NFT_LOADING, NFT_SUCCESS } from "../reducers/types";
import { apiBaseUrl } from "../../constants/url";

export const getNfts = (data) => async (dispatch) => {
  dispatch({ type: NFT_LOADING, payload: true });
  dispatch({ type: NFT_ERROR, payload: null });
  try {
    const response = await axios.get(`${apiBaseUrl}/all-nfts/${data}`);
    dispatch({ type: NFT_LOADING, payload: null });

    if (response.data.status !== 200) {
      return toast.error(response.data.message || "Invalid address");
    }
    dispatch({ type: NFT_SUCCESS, payload: response.data });
    return response.data;
  } catch (err) {
    dispatch({ type: NFT_LOADING, payload: null });

    if (err.response.status === 422) {
      return toast.error(`Validation error`);
    } else {
      return toast.error(err.response?.data?.message);
    }
  }
};
