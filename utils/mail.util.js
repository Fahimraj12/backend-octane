// utils/mail.util.js
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,     // your email
    pass: process.env.EMAIL_PASS      // app password
  }
});

exports.sendAdminCredentials = async (toEmail, password) => {
  const mailOptions = {
    from: `"Admin Panel" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: "Your Admin Login Credentials",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 10px; overflow: hidden;">
        
        <!-- Header with Logo -->
        <div style="background-color: #4CAF50; padding: 20px; text-align: center; color: white;">
          <img src="./images/logo.svg" alt="Company Logo" style="height: 50px; margin-bottom: 10px;">
          <h2 style="margin: 0;">Welcome to Octane FitCity Admin Panel</h2>
        </div>

        <!-- Body -->
        <div style="padding: 20px; color: #333;">
          <p>Hi Admin,</p>
          <p>Your login credentials for the admin panel are as follows:</p>

          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Email</td>
              <td style="padding: 10px; border: 1px solid #ddd;">${toEmail}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Password</td>
              <td style="padding: 10px; border: 1px solid #ddd;">${password}</td>
            </tr>
          </table>

          <p style="color: #555;">Thank You for registration!!</p>
          <p style="margin-top: 30px;">Cheers,<br>Octane FitCity Team</p>
        </div>

        <!-- Footer -->
        <div style="background-color: #f5f5f5; padding: 10px; text-align: center; font-size: 12px; color: #777;">
          © ${new Date().getFullYear()} Octane FitCity. All rights reserved.
        </div>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};
