import nodemailer from 'nodemailer';

const sendEmail=async(options)=>{

    const transporter=nodemailer.createTransport({
        host:process.env.EMAIL_HOST,
    })

}