import { ControllerAdmin } from "controller/admin"

export default async function handler(req, res) {
    if (req.method === "GET") {
        return res.status(200).json({ mess: "ProductionLines API" });
    } else if (req.method === "POST") {
        await ControllerAdmin.ProductionLines.Add(req, res);
    }
}