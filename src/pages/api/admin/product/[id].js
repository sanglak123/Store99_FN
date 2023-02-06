import nextConnect from "next-connect";
import multer from "multer";
import { ControllerAdmin } from "controller/admin";

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            return cb(null, "./public/img/product")
        },
        filename: (req, file, cb) => {
            const fileName = file.originalname.toLowerCase().split(' ').join('-');
            cb(null, fileName)
        }
    }),
});

const apiRoute = nextConnect({
    onError(error, req, res) {
        res
            .status(501)
            .json({ error: `Sorry something Happened! ${error.message}` });
    },
    onNoMatch(req, res) {
        res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    },
});

apiRoute.get((req, res) => {
    const { id } = req.query;
    return res.status(200).json({ mess: "Add image by idproduct", idProduct: id })
});

// apiRoute.put(ControllerAdmin.Products.Edit);

apiRoute.use(upload.single("photo"));

apiRoute.post(ControllerAdmin.Products.AddImageByIdProduct)


export default apiRoute;

export const config = {
    api: {
        bodyParser: false, // Disallow body parsing, consume as stream
    },
};