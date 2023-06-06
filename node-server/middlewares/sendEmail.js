const nodemailer = require("nodemailer");

function sendEmail(req, res, next) {
    const { email, message, subject } = req.info || {}
    console.log(req.info)
    if (email && subject && message) {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        const mailOptions = {
            from: process.env.EMAIL,
            to: email, // friend email
            subject,
            text: message
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                res.status(500).json({
                    success: false,
                    error: {
                        message: "Oops! An Error Occurred. Email is not send."
                    }
                })
                next(error);
            } else {
                console.log('Email sent: ' + info.response);
                console.log(info)
                res.status(201).json({
                    success: true,
                    payload: info
                })
            }
        });
    } else {
        res.status(500).json({
            success: false,
            error: {
                message: "Oops! An Error Occurred. Email, Message and subject is required."
            }
        })
    }
}

module.exports = sendEmail
