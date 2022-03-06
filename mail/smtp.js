"use strict";
const nodemailer = require("nodemailer");

module.exports = async function main({ from, to, subject, html }) {
    let transporter = nodemailer.createTransport({
        host: process.env.SMTP_SERVER,
        port: 587,
        secure: false,
        auth: {
            user: process.env.SMTP_LOGIN,
            pass: process.env.SMTP_MASTER_PASSWORD,
        },
    });

    let info = await transporter.sendMail({
        from,
        to,
        subject,
        html
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}
