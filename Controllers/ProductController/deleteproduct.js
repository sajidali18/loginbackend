const Product = require('../../models/ProductSchema');

const deleteProduct = async (req, res) => {
    try {
        const productid = req.params.id;
        const product = await Product.findOne({ id: productid });
        if (!product) return res.status(400).json({ message: "product not found" });

        await Product.findOneAndDelete({ id: productid });
        res.status(200).json({ message: "product deleted succesfully" });
    }
    catch (err) {
        console.error(`error occured : ${err}`);
        res.status(500).json({ message: "internal server error" });
    }
}
module.exports = deleteProduct;