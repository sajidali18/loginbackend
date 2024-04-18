//    const obj =[ {
// "id": 1,
// "Product_Name": "latest men's sneaker",
// "category": "sneaker",
// "price": 25,
// "del_price": 35,
// "image_link": "https://themewagon.github.io/eiser/img/product/feature-product/f-p-1.jpg"
//    },
//        {
//            "id": 2,
//            "Product_Name": "latest  women's purse",
//            "category": "purse",
//            "price": 35,
//            "del_price": 40,
//            "image_link": "https://themewagon.github.io/eiser/img/product/feature-product/f-p-2.jpg"
//        },
//        {
//            "id": 3,
//            "Product_Name": "latest men's watch",
//            "category": "watch",
//            "price": 25,
//            "del_price": 50,
//            "image_link": "https://themewagon.github.io/eiser/img/product/feature-product/f-p-3.jpg"
//        }

//    ]

// Function to generate a random OTP of specified length

// let otp = '';
// let length = 6;
// let character = '012456789'
// characterlength = character.length;
// for (let i = 0; i <length; i++){
//     otp += Math.floor(Math.random() * characterlength);
// }
// console.log(otp)

const twilio = require('twilio');

const accountsid = 'AC4dcdfe3868820d978d731c4a5d7dd7d7';
const authtoken = 'fcf743e55618d3296ecafe3583b8d838';

const client = twilio(accountsid, authtoken);

client.messages.create({
    body: "hello from mr khadus",
    from: '+12565948603',
    to: '+919887305930'
})
.then(message => console.log("message has been sent to the successfully",message.sid))
.catch(error => console.error(error));
