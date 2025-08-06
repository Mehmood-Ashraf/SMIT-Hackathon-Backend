import nodemailer from 'nodemailer'
import dotenv from "dotenv"

dotenv.config()


const emailConfig = {
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, //NODEMAILER_MAIL
        pass: process.env.EMAIL_PASS, //NODEMAILER_PASSWORD
    },
};

const mailSubject = "OTP Verification"

export const sendMail = async (email, otp, text, subject = mailSubject ) => {
    console.log("Send Mail chala=====>")
    const transporter = nodemailer.createTransport(emailConfig)

    const mailOptions = {
        from : process.env.EMAIL_USER,
        to : email,
        subject : subject,
        html : text
    }

    try {
        const transport = await transporter.sendMail(mailOptions)
        console.log('OTP sent successfully')
        return `OTP sent successfully`
    } catch (error) {
        console.error(`Error sending OTP to ${email} via email`, error)
        throw `Failed to send OTP email to ${email}`
    }
}