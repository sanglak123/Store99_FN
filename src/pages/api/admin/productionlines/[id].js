import { ControllerAdmin } from "controller/admin"

export default async function handler(req, res) {
    if (req.method === "GET") {
        const { id } = req.query;
        return res.status(200).json({ mess: "Edit + Delete product line API", id });
    } else if (req.method === "DELETE") {
        await ControllerAdmin.ProductionLines.Delete(req, res);
    } else if (req.method === "PUT") {
        await ControllerAdmin.ProductionLines.Edit(req, res)
    }
}