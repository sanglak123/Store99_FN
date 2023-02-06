
const { Trademarks, Colors, Imgs, Memmorys, Productions, TypePhones, SystemMaintenances, ProductLines } = require("../../src/db/models");
export const DataController = async (req, res) => {
    try {
        const listTradeMark = await Trademarks.findAll({ include: [{ model: ProductLines }] });
        const listProctLine = await ProductLines.findAll({ include: [{ model: Trademarks }] });
        const listTypePhone = await TypePhones.findAll();
        const listColor = await Colors.findAll();
        const maintance = await SystemMaintenances.findOne();
        const listMemory = await Memmorys.findAll();
        const listProduct = await Productions.findAll({
            include: [{ model: TypePhones, include: [{ model: ProductLines, include: [{ model: Trademarks }] }] }, { model: Memmorys }, { model: Colors }, { model: Imgs }]
        });        

        return res.status(200).json({
            Trademarks: listTradeMark,
            ProductLines: listProctLine,
            TypePhones: listTypePhone,
            Productions: listProduct,
            Colors: listColor,
            Maintance: maintance,
            Memmorys: listMemory
        });
    } catch (error) {
        return res.status(500).json(error);
    }
}