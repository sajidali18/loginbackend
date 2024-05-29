const user = require('../../models/UserSchema')

const deleteaddress = async (req,res) => {
    try {
        const { userid } = req.body;
        const userInfo = await user.findById(userid);

        if (!userInfo) {
            res.status(500).json({ message: "user id not found" });
        }
        res.status(200).json({ message: "user founnd" });
        console.log(userInfo);
    }
    catch (err) {
        console.log(err);
        console.err("error",err,message)
    }
}

module.exports = deleteaddress;