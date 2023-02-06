import { ControllerAdmin } from "controller/admin"

export default async function handler(req, res) {
    if (req.method === "GET") {
        return res.status(200).json({ mess: "Login Admin" })
    } else if (req.method === "POST") {
        await ControllerAdmin.Authen.Login(req, res)
    }
}