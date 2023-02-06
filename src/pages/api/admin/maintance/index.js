import { ControllerAdmin } from "controller/admin"


export default async function handler(req, res) {
    if (req.method === "GET") {
        return res.status(200).json({ mess: "Bảo trì hệ thống" })
    } else if (req.method === "PUT") {
        await ControllerAdmin.MaintanceSystem.Edit(req, res)
    }
}