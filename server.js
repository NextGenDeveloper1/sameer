// server.js
const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const port = 3000;

// Middleware to parse JSON data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: 'Gmail', // You can use any email service provider
  auth: {
    user: 'your-email@gmail.com', // Replace with your email
    pass: 'your-email-password'   // Replace with your email password or app-specific password
  }
});

// Endpoint to handle form submission
app.post('/submit-booking', (req, res) => {
  const { name, email, phone, address } = req.body;

  // Email content
  const mailOptions = {
    from: 'wajidsajid802115@gmail.com', // Replace with your email
    to: 'wajidsajid802115@gmail.com',   // Replace with the email where you want to receive the details
    subject: 'New Booking Request',
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nAddress: ${address}`
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Booking received successfully and email sent!');
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
