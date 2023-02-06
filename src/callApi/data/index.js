import { toast } from "react-toastify";
import { rootApi } from "../apiConfig";

export const ApiData = {
    GetData: async (dispatch, LoadDataSuccess) => {
        await rootApi({
            method: "GET",
            url: "/data"
        }).then((res) => {
            dispatch(LoadDataSuccess(res?.data))
        }).catch((err) => {
            if (err.response) {
                toast.error(err?.response?.data?.error);
            } else {
                toast.error(err);
            }
        })
    }
}