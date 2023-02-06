import { toast } from "react-toastify";
import { rootApi } from "../apiConfig"

export const ApiAdmins = {
    Authen: {
        Login: async (userName, pass, key, router) => {
            await rootApi({
                method: "POST",
                url: "/admin/authen/login",
                data: {
                    userName: userName,
                    pass: pass,
                    key: key
                }
            }).then((res) => {
                toast.success(res.data.mess);
                router.replace("/admin/dashboard")
            }).catch((err) => {
                if (err.response) {
                    toast.error(err?.response?.data?.error);
                } else {
                    toast.error(err);
                }
            })
        }
    },
    MaintanceSystem: {
        Edit: async (setCheck) => {
            await rootApi({
                method: "PUT",
                url: "/admin/maintance",
            }).then((res) => {
                setCheck(res?.data?.Maintance?.active);
                toast.success(res?.data?.mess)
            }).catch((err) => {
                if (err.response) {
                    toast.error(err?.response?.data?.error);
                } else {
                    toast.error(err);
                }
            })
        }
    },
    TradeMarks: {
        Add: async (nameTrade, photo) => {
            const formData = new FormData();
            formData.append('photo', photo);
            formData.append('nameTrade', nameTrade);
            await rootApi({
                method: "POST",
                url: "/admin/trademarks",
                data: formData
            }).then((res) => {
                toast.success(res?.data?.mess)
            }).catch((err) => {
                if (err.response) {
                    toast.error(err?.response?.data?.error);
                } else {
                    toast.error(err);
                }
            })
        },
        Delete: async (id) => {
            await rootApi({
                method: "DELETE",
                url: `/admin/trademarks/${id}`,
            }).then((res) => {
                toast.success(res?.data?.mess)
            }).catch((err) => {
                if (err.response) {
                    toast.error(err?.response?.data?.error);
                } else {
                    toast.error(err);
                }
            })
        },
        Edit: async (id, nameTradeEdit, photo) => {
            const formData = new FormData();
            formData.append('photo', photo);
            formData.append('nameTradeEdit', nameTradeEdit);

            await rootApi({
                method: "PUT",
                url: `/admin/trademarks/${id}`,
                data: formData
            }).then((res) => {
                toast.success(res?.data?.mess)
            }).catch((err) => {
                if (err.response) {
                    toast.error(err?.response?.data?.error);
                } else {
                    toast.error(err);
                }
            })
        }
    },
    ProductionLines: {
        Add: async (name, idTrade, href) => {
            await rootApi({
                method: "POST",
                url: "/admin/productionlines",
                data: {
                    name: name, idTrade: idTrade, href: href
                }
            }).then((res) => {
                toast.success(res?.data?.mess)
            }).catch((err) => {
                if (err.response) {
                    toast.error(err?.response?.data?.error);
                } else {
                    toast.error(err);
                }
            })
        },
        Delete: async (id) => {
            await rootApi({
                method: "DELETE",
                url: `/admin/productionlines/${id}`
            }).then((res) => {
                toast.success(res?.data?.mess)
            }).catch((err) => {
                if (err.response) {
                    toast.error(err?.response?.data?.error);
                } else {
                    toast.error(err);
                }
            })
        },
        Edit: async (id, name, href) => {
            await rootApi({
                method: "PUT",
                url: `/admin/productionlines/${id}`,
                data: {
                    name: name,
                    href: href
                }
            }).then((res) => {
                toast.success(res?.data?.mess)
            }).catch((err) => {
                if (err.response) {
                    toast.error(err?.response?.data?.error);
                } else {
                    toast.error(err);
                }
            })
        },
    },
    Productions: {
        Add: async (photo, idTypePhone, idMemory, idColor, price, prepay, discount, count) => {
            const formData = new FormData();
            formData.append('photo', photo);
            formData.append('idTypePhone', idTypePhone);
            formData.append('idMemory', idMemory);
            formData.append('idColor', idColor);
            formData.append('price', price);
            formData.append('prepay', prepay);
            formData.append('discount', discount);
            formData.append('count', count);

            await rootApi({
                method: "POST",
                url: "/admin/product",
                data: formData
            }).then((res) => {
                toast.success(res?.data?.mess)
            }).catch((err) => {
                if (err.response) {
                    toast.error(err?.response?.data?.error);
                } else {
                    toast.error(err);
                }
            })
        },
        Edit: async (id, price, discount, prepay, count, hot) => {
            await rootApi({
                method: "PUT",
                url: "/admin/product/editProduct",
                data: { id, price, discount, prepay, count, hot }
            }).then((res) => {
                toast.success(res?.data?.mess)
            }).catch((err) => {
                if (err.response) {
                    toast.error(err?.response?.data?.error);
                } else {
                    toast.error(err);
                }
            })
        },
        AddImageByIdProduct: async (photo, id, typeImage) => {
            const formData = new FormData();
            formData.append('photo', photo);
            formData.append('typeImage', typeImage);
            await rootApi({
                method: "POST",
                url: `/admin/product/${id}`,
                data: formData
            }).then((res) => {
                toast.success(res?.data?.mess)
            }).catch((err) => {
                if (err.response) {
                    toast.error(err?.response?.data?.error);
                } else {
                    toast.error(err);
                }
            })
        }
    },
    Imgs: {
        Add: async () => {

        },
        Delete: async (id) => {
            await rootApi({
                method: "DELETE",
                url: `/admin/imgs/${id}`
            }).then((res) => {
                toast.success(res?.data?.mess);
            }).catch((err) => {
                if (err.response) {
                    toast.error(err?.response?.data?.error);
                } else {
                    toast.error(err);
                }
            })
        },
        Edit: async (photo, id) => {
            const formData = new FormData();
            formData.append('photo', photo);
            await rootApi({
                method: "PUT",
                url: `/admin/imgs/${id}`,
                data: formData
            }).then((res) => {
                toast.success(res?.data?.mess);
            }).catch((err) => {
                if (err.response) {
                    toast.error(err?.response?.data?.error);
                } else {
                    toast.error(err);
                }
            })
        }
    },
    Memmorys: {
        Add: async (memmory) => {
            await rootApi({
                method: "POST",
                url: "/admin/memmory",
                data: {
                    name: memmory
                }
            }).then((res) => {
                toast.success(res?.data?.mess);
            }).catch((err) => {
                if (err.response) {
                    toast.error(err?.response?.data?.error);
                } else {
                    toast.error(err);
                }
            })
        }
    },
    Orders: {
        LoadOrders: async (dispatch, LoadOrderSuccess) => {
            await rootApi({
                method: "GET",
                url: "/admin/data/orders",
            }).then((res) => {
                dispatch(LoadOrderSuccess(res.data.Orders))
            }).catch((err) => {
                if (err.response) {
                    toast.error(err?.response?.data?.error);
                } else {
                    toast.error(err);
                }
            })
        }
    }
}