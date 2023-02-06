import { ControllerAdmin } from "controller/admin";


export default async function handler(req, res) {
    if (req.method === "GET") {
        await ControllerAdmin.Orders.LoadOrders(req, res);
    }
}