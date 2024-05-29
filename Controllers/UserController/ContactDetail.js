const user = require('../../models/UserSchema');

const ContactDetail = async (req,res) => {
    try {
        const {  userid, item} = req.body;
        // console.log(item);
        const userInfo = await user.findById(userid);

        if (!userInfo) {
            res.status(500).json({
                message:"user id not found",error
            })
        }
       const id = userInfo.contact.map((item) => item._id);
        if (id) {
            res.status(300).json({ message: "address already saved in database" });
        }
        userInfo.contact.push(item);
        await userInfo.save();
        
        res.status(200).json({ message:"address saved successfully", userInfo})
    }
    catch(Error){
        console.log("error in pickup data",Error);
    }
}

module.exports = ContactDetail;