const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const User = require("../../models/UserSchema");
const Payment = require('../../models/PaymentSchema');

exports.processPayment = async (req, res, next) => {
    try {
        // Extract necessary fields from req.body
        const { amount, firstName, lastName, email, address, city, state, postalCode, cardNumber, expMonth, expYear, cvc } = req.body;

        // Convert the amount to paise (smallest currency unit for INR)
        const amountInPaise = amount * 100;

        // Prepare customer name and address
        const customerName = `${firstName} ${lastName}`;
        const customerAddress = {
            line1: address,
            city,
            state,
            postal_code: postalCode,
            country: 'IN' // Assuming customers are from India
        };

        // Optionally, create a customer in Stripe
        const customer = await stripe.customers.create({
            name: customerName,
            email: email,
            address: customerAddress
        });

        // Create a payment method with billing details
        const paymentMethod = await stripe.paymentMethods.create({
            type: 'card',
            card: {
                number: cardNumber,
                exp_month: expMonth,
                exp_year: expYear,
                cvc: cvc,
            },
            billing_details: {
                name: customerName,
                email: email,
                address: customerAddress
            }
        });

        // Process payment using the extracted data and customer information
        const myPayment = await stripe.paymentIntents.create({
            amount: amountInPaise,
            description: 'Test description',
            currency: "inr",
            metadata: {
                company: "Shemnu",
            },
            receipt_email: email, // Optional: Provide customer's email for receipt
            shipping: { // Include shipping information
                name: customerName,
                address: customerAddress,
            },
            customer: customer.id // Link the payment intent to the created customer
        });

        // Send the response
        res.status(200).json({ success: true, client_secret: myPayment.client_secret });
    } catch (error) {
        // Log the error for debugging purposes
        console.error("Error processing payment:", error);

        // Send an informative error message to the client
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

exports.sendStripeApiKey = (req, res, next) => {
    res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
};

