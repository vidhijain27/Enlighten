import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'alayna.kling@ethereal.email',
        pass: 'tpxxnM9jpEp9NQVEBx'
    }
});


export const SendEmail = async(name:string, email:string, token:string) => {
    const info = await transporter.sendMail({
        from: 'vidhi@gmail.com', // sender address
        to: email, // list of receivers
        subject: "Forget password", // Subject line
        // text: "Hello world?", // plain text body
        html:`
        hey, ${name}
        click here
        <a href = "http://localhost:3000/update-password?token=${token}"> Click here to update </a>
        `, // html body
    });
}