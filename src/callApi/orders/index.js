import { toast } from "react-toastify";
import { rootApi } from "../apiConfig"

export const ApiOrders = {
    Create: async (idProduct, count, email, phone, key, note, adress) => {
        await rootApi({
            method: "POST",
            url: `/orders/${key}`,
            data: {
                idProduct: idProduct,
                count: count,
                email: email,
                phone: phone,
                note: note, 
                adress: adress
            }
        }).then((res) => {
           
        }).catch((err) => {
            if (err.response) {
                toast.error(err?.response?.data?.error);
            } else {
                toast.error(err);
            }
        })
    }
}