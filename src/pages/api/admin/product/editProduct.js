import { ControllerAdmin } from "controller/admin";

export default async function handler(req, res) {
    if (req.method === "PUT") {
        await ControllerAdmin.Products.Edit(req, res)
    }
}