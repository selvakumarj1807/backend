const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const smtpTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'selvakumarj1807@gmail.com', // Sender email address
        pass: 'bffnoatyszeuclqx' // Sender app password
    }
});

app.post('/send-email', (req, res) => {
    const { to, subject, text } = req.body;

    const mailOptions = {
        from: 'selvakumarj1807@gmail.com',
        to,
        subject,
        text,
    };

    smtpTransport.sendMail(mailOptions, (error, response) => {
        if (error) {
            res.status(500).send({ message: 'Error sending email', error });
        } else {
            res.status(200).send({ message: 'Email sent successfully' });
        }
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});