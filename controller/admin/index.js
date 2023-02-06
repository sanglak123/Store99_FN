import { baseURL } from "@/callApi/apiConfig";
import { SystemMaintenances, Trademarks, ProductLines, Productions, Colors, Memmorys, Imgs, Orders } from "@/db/models";
import { Op } from "sequelize";

const path = require("path");
const fs = require('fs');

const dotenv = require("dotenv");
dotenv.config();

export const ControllerAdmin = {
    Authen: {
        Login: async (req, res) => {
            const { userName, pass, key } = req.body;
            try {
                if (userName === process.env.USER_NAME) {
                    if (pass === process.env.PASS) {
                        if (key === process.env.KEY_ADMIN) {
                            return res.status(200).json({ mess: "Login success!" });
                        } else {
                            return res.status(400).json({ error: "Key admin wrong!" })
                        }
                    } else {
                        return res.status(400).json({ error: "Password wrong!" })
                    }
                } else {
                    return res.status(400).json({ error: "Username wrong!" })
                }
            } catch (error) {
                return res.status(500).json(error);
            }
        }
    },
    MaintanceSystem: {
        Edit: async (req, res) => {
            try {
                const Maintance = await SystemMaintenances.findOne();

                if (Maintance.active) {
                    Maintance.active = false;
                    await Maintance.save();
                    return res.status(200).json({ mess: "Cập nhật thành công!", Maintance: Maintance })
                } else {
                    Maintance.active = true;
                    await Maintance.save();
                    return res.status(200).json({ mess: "Cập nhật thành công!", Maintance: Maintance })
                }

            } catch (error) {
                return res.status(500).json(error);
            }
        }
    },
    TradeMarks: {
        Add: async (req, res) => {
            const pathImage = baseURL + '/img/logo/' + req.file.filename;
            const { nameTrade } = req.body;
            try {
                const oldTrade = await Trademarks.findOne({
                    where: {
                        name: nameTrade
                    }
                });
                if (oldTrade) {
                    return res.status(400).json({ error: "TradeMark already exits!" })
                } else {
                    const href = `/${nameTrade.replace(/\s/g, '')}`;
                    const newTrade = await Trademarks.create({
                        name: nameTrade,
                        logo: pathImage,
                        href: href,
                        fileName: req.file.filename
                    });
                    return res.status(201).json({ mess: "Add trademark success", newTrade: newTrade })
                }
            } catch (error) {
                return res.status(500).json(error);
            }
        },
        Delete: async (req, res) => {
            const { id } = req.query;
            try {
                const oldTrade = await Trademarks.findOne({
                    where: {
                        id: id
                    }
                });
                if (oldTrade) {
                    const unLoad = path.join(__dirname, "../../../../../../public/img/logo/");
                    fs.unlink(unLoad + oldTrade.fileName, async (err) => {
                        if (err) {
                            console.log(err)
                            return res.status(400).json(err)
                        } else {
                            await oldTrade.destroy();
                            return res.status(200).json({ mess: "Delete TradeMark success!" })
                        }
                    })
                } else {
                    return res.status(404).json({ mess: "Trademark not found!" })
                }
            } catch (error) {
                return res.status(500).json(error);
            }
        },
        Edit: async (req, res) => {
            const { id } = req.query;
            const { nameTradeEdit } = req.body;

            const pathImage = baseURL + '/img/logo/' + req.file.filename;
            try {
                const oldTrade = await Trademarks.findOne({
                    where: {
                        id: id
                    }
                });
                if (oldTrade) {
                    const unLoad = path.join(__dirname, "../../../../../../public/img/logo/");
                    fs.unlink(unLoad + oldTrade.fileName, async (err) => {
                        if (err) {
                            return res.status(500).json(err)
                        } else {
                            const href = `/${nameTradeEdit.replace(/\s/g, '')}`;
                            oldTrade.fileName = req.file.filename;
                            oldTrade.name = nameTradeEdit;
                            oldTrade.href = href;
                            oldTrade.logo = pathImage;
                            await oldTrade.save();
                            return res.status(200).json({ mess: "Edit TradeMark success!" })
                        }
                    })
                } else {
                    return res.status(404).json({ mess: "Trademark not found!" })
                }
            } catch (error) {
                return res.status(500).json(error);
            }
        }
    },
    ProductionLines: {
        Add: async (req, res) => {
            const { name, idTrade, href } = req.body;
            try {
                const oldLine = await ProductLines.findOne({
                    where: {
                        [Op.and]: [
                            { name: name },
                            { href: href }
                        ]
                    }
                });
                if (oldLine) {
                    return res.status(400).json({ error: "ProductLine already exits!" })
                } else {
                    await ProductLines.create({
                        name: name,
                        idTradeMark: idTrade,
                        href: href
                    })
                    return res.status(200).json({ mess: "Add product line success!" })
                }

            } catch (error) {
                return res.status(500).json(error);
            }
        },
        Delete: async (req, res) => {
            const { id } = req.query;
            try {
                const oldProductline = await ProductLines.findOne({
                    where: {
                        id: id
                    }
                });
                if (oldProductline) {
                    await oldProductline.destroy();
                    return res.status(200).json({ mess: "Delete production line success!" })
                } else {
                    return res.status(404).json({ error: "ProductLine not found!" })
                }
            } catch (error) {
                return res.status(500).json(error);
            }
        },
        Edit: async (req, res) => {
            const { id } = req.query;
            const { name, href } = req.body;
            try {
                const oldProductline = await ProductLines.findOne({
                    where: {
                        id: id
                    }
                });
                if (oldProductline) {
                    oldProductline.name = name;
                    oldProductline.href = href;
                    await oldProductline.save();
                    return res.status(200).json({ mess: "Update success!" })
                } else {
                    return res.status(404).json({ error: "ProductLine not found!" })
                }
            } catch (error) {
                return res.status(500).json(error);
            }
        }
    },
    Products: {
        Add: async (req, res) => {
            const pathImage = baseURL + '/img/product/' + req.file.filename;
            const { idTypePhone, idMemory, idColor, price, prepay, discount, count } = req.body;
            try {
                const oldProduct = await Productions.findOne({
                    where: {
                        [Op.and]: [
                            { idTypePhone: idTypePhone },
                            { idMemory: idMemory },
                            { idColor: idColor }
                        ]
                    }
                });
                if (oldProduct) {
                    const unLoad = path.join(__dirname, "../../../../../../public/img/product/");
                    fs.unlink(unLoad + req.file.filename, async (err) => {
                        if (err) {
                            return res.status(500).json(err)
                        } else {
                            return res.status(400).json({ error: "Product already exits!" })
                        }
                    })

                } else {
                    const newProduct = await Productions.create({
                        idTypePhone: idTypePhone,
                        idMemory: idMemory,
                        idColor: idColor,
                        price: price,
                        prepay: prepay,
                        discount: discount,
                        count: count
                    });
                    await Imgs.create({
                        url: pathImage,
                        idProduction: newProduct.id,
                        name: "frontside"
                    });
                    return res.status(201).json({ mess: "Add product success!" })
                }
            } catch (error) {
                return res.status(500).json(error);
            }
        },
        Edit: async (req, res) => {
            const { id, price, discount, prepay, count, hot } = req.body;
            try {
                const product = await Productions.findOne({
                    where: {
                        id: id
                    }
                });
                if (product) {
                    product.price = price;
                    product.discount = discount;
                    product.prepay = prepay;
                    product.count = count;
                    product.hot = hot;
                    await product.save();
                    return res.status(200).json({ mess: "Update success!" })

                } else {
                    return res.status(404).json({ error: "Product not found!" })
                }
            } catch (error) {
                return res.status(500).json(error);
            }
        },
        AddImageByIdProduct: async (req, res) => {
            const { id } = req.query;
            const { typeImage } = req.body;

            const pathImage = baseURL + '/img/product/' + req.file.filename;
            try {
                const product = await Productions.findOne({
                    where: {
                        id: id
                    }
                });
                if (product) {
                    const oldImage = await Imgs.findOne({
                        where: {
                            [Op.and]: [
                                { name: typeImage },
                                { idProduction: product.id }
                            ]
                        }
                    });
                    if (oldImage) {
                        return res.status(400).json({ error: "Image already exits!" })
                    } else {
                        await Imgs.create({
                            url: pathImage,
                            idProduction: product.id,
                            name: typeImage,
                            fileName: req.file.filename
                        });
                        return res.status(201).json({ mess: "Add image success!" })
                    }
                } else {
                    return res.status(404).json({ error: "Product not found!" })
                }
            } catch (error) {
                return res.status(500).json(error);
            }
        }
    },
    Imgs: {
        Add: async (req, res) => {

        },
        Delete: async (req, res) => {
            const { id } = req.query;
            try {
                const oldImage = await Imgs.findOne({
                    where: {
                        id: id
                    }
                });
                if (oldImage) {
                    await oldImage.destroy();
                    return res.status(200).json({ mess: "Delete image success!" })
                } else {
                    return res.status(404).json({ error: "Image not found!" })
                }
            } catch (error) {
                return res.status(500).json(error);
            }
        },
        Edit: async (req, res) => {
            const { id } = req.query;
            const pathImage = baseURL + '/img/product/' + req.file.filename;
            try {
                const imgEdit = await Imgs.findOne({
                    where: {
                        id: id
                    }
                });
                if (imgEdit) {
                    const unLoad = path.join(__dirname, "../../../../../../public/img/product/");
                    fs.unlink(unLoad + imgEdit.fileName, async (err) => {
                        if (err) {
                            return res.status(500).json(err);
                        } else {
                            imgEdit.url = pathImage;
                            imgEdit.fileName = req.file.filename;
                            await imgEdit.save();
                            return res.status(200).json({ mess: "Edit Image success!", img: imgEdit })
                        }
                    })
                } else {
                    const unLoad = path.join(__dirname, "../../../../../../public/img/product/");
                    fs.unlink(unLoad + req.file.filename, async (err) => {
                        if (err) {
                            return res.status(500).json(err);
                        } else {
                            return res.status(404).json({ error: "Image not found!" })
                        }
                    })
                }
            } catch (error) {

            }
        }
    },
    Memmorys: {
        Add: async (req, res) => {
            const { name } = req.body;
            try {
                const oldMem = await Memmorys.findOne({
                    where: {
                        name: name
                    }
                });
                if (oldMem) {
                    return res.status(400).json({ error: "Memmory already exits!" })
                } else {
                    await Memmorys.create({
                        name: name
                    });
                    return res.status(201).json({ mess: "Add success!" })
                }
            } catch (error) {
                return res.status(500).json(error);
            }
        },
        Delete: async (req, res) => {
            const { id } = req.query;
            try {

            } catch (error) {
                return res.status(500).json(error);
            }
        }
    },
    Orders: {
        LoadOrders: async (req, res) => {
            try {
                const list = await Orders.findAll({
                    where: {
                        status: "Pending"
                    }
                });
                return res.status(200).json({ Orders: list })
            } catch (error) {
                return res.status(500).json(error);
            }
        }
    }
}

