require('dotenv').config();
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
 service: 'gmail',
 auth: {
 user: process.env.EMAIL_USER,
 pass: process.env.EMAIL_PASS
 }
});
const mailOptions = {
 from: process.env.EMAIL_USER,
 to: 'recipient@example.com',
 subject: 'Automated Email from Node.js Lab',
 text: 'This is a plain-text fallback message.',
 html: '<h2>Hello!</h2><p>This email was sent automatically using <b>Nodemailer</b>from a Node.js application.</p>'
};

transporter.sendMail(mailOptions, (err, info) => {
 if (err) {
 console.error('Error sending email:', err);
 } else {
 console.log('Email sent successfully:', info.response);
 }
}); 