import { ControllerOrders } from "controller/orders"

export default async function handler(req, res) {
    if (req.method === "GET") {
        const { keyorder } = req.query;
        return res.status(200).json({ mess: "Create Orders", keyorder: keyorder })
    } else if (req.method === "POST") {
        await ControllerOrders.Create(req, res)
    }
}