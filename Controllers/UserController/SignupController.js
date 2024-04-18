const user = require('../../models/UserSchema');
const bcrypt = require("bcrypt");
const validator = require('validator')

const { info } = require('console');

const isvalid = (passward) => {
    const passwardReg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwardReg.test(passward);
}

const hashPassward = async (passward) => {
    const saltRound = 10;
    return await bcrypt.hash(passward, saltRound);
}

const PhoneNumber = (number) => {
    const numberReg = /^(?:\+?91|0)?[6789]\d{9}$/
    return numberReg.test(number);
}





// const otpLimiter = rateLimit({
//     windowMs: 5 * 60 * 1000, // 5 minutes
//     max: 1, // Limit each IP to 1 request per windowMs
//     message: "Too many OTP requests from this IP, please try again later",
// });







const UserSignup = async (req, res) => {
    try {
        const { id, user_name, email, passward, phone_number } = req.body;

        // Check if the user already exists
        const existingUser = await user.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }

        // Validate password, email format, and phone number
        if (!isvalid(passward)) {
            return res.status(400).json({
                message: "Invalid password format. Create a strong password with minimum 8 characters, including letters, numbers, and symbols.",
                success: false
            });
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Invalid email format. Please provide a valid email.", success: false });
        }
        if (!PhoneNumber(phone_number)) {
            return res.status(400).json({ message: "Invalid mobile number. Please provide a valid mobile number.", success: false });
        }

        // Hash password
        const hashedPassword = await hashPassward(passward);

        // Create a new user document
        const newUser = new user({
            id,
            user_name,
            email,
            passward: hashedPassword,
            phone_number,
            otp: {
                code: null,
                createdAt: null
            }
        });

        // Save the new user
        await newUser.save();

        res.status(200).json({ message: `Signed up Successfully. Please Login to Continue`, success: true });
    } catch (err) {
        console.error(`Error in signup: ${err}`);
        res.status(500).json({ message: "Internal server error", error: err });
    }
};

module.exports = { UserSignup };
