import { Orders, Productions } from "../../src/db/models";

export const ControllerOrders = {
    Create: async (req, res) => {
        const { keyorder } = req.query;
        const { idProduct, count, email, phone, note, adress } = req.body;
        try {
            const product = await Productions.findOne({
                where: {
                    id: idProduct
                }
            });
            if (product) {
                const newOrder = await Orders.create({
                    idProduct: idProduct,
                    count: count,
                    email: email,
                    phone: phone,
                    key: keyorder,
                    note: note,
                    adress: adress,
                    status: "Pending"
                });
                return res.status(201).json({ mess: "Create order success!", Order: newOrder });

            } else {
                return res.status(404).json({ error: "Product not found!" })
            }
        } catch (error) {
            return res.status(500).json(error)
        }
    },
    Edit: async (req, res) => {

    }
}