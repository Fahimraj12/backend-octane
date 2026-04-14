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
    from: `"Octane Fit City Admin" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: "🔐 Your Admin Login Credentials - Octane Fit City",
    html: `
      <div style="background-color: #f4f4f5; padding: 30px 15px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #333;">
        
        <div style="max-width: 500px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
          
          <div style="background-color: #111827; padding: 25px 20px; text-align: center;">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_wVPzF1uPzu3sR6Nr80C8MfMONnXm8go8_g&s" alt="Company Logo" style="height: 50px; margin-bottom: 12px; display: inline-block; object-fit: contain; border-radius: 4px;">
            <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 800; letter-spacing: 1px;">OCTANE FIT CITY</h1>
            <p style="color: #9ca3af; margin: 5px 0 0 0; font-size: 13px; font-weight: 500;">Admin Panel Access 🛡️</p>
          </div>

          <div style="padding: 30px 25px;">
            <p style="font-size: 16px; margin: 0 0 20px 0; color: #374151;">Hi <strong>Admin</strong>,</p>
            <p style="font-size: 15px; color: #4b5563; margin: 0 0 25px 0; line-height: 1.5;">
              Welcome to the Octane FitCity Admin Panel. Your account has been successfully configured. Below are your secure login credentials:
            </p>

            <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin-bottom: 25px;">
              
              <div style="margin-bottom: 15px;">
                <p style="font-size: 12px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 4px 0; font-weight: 600;">Email Address</p>
                <p style="font-size: 16px; color: #111827; margin: 0; font-weight: 700; word-break: break-all;">${toEmail}</p>
              </div>

              <div style="border-top: 1px dashed #d1d5db; margin: 15px 0;"></div>

              <div>
                <p style="font-size: 12px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 4px 0; font-weight: 600;">Temporary Password</p>
                <p style="font-size: 18px; color: #e63946; margin: 0; font-weight: 800; font-family: monospace; letter-spacing: 1px;">${password}</p>
              </div>

            </div>

            <p style="font-size: 13px; color: #ef4444; background-color: #fef2f2; padding: 12px; border-radius: 6px; margin: 0 0 25px 0; border: 1px solid #fee2e2;">
              <strong>⚠️ Security Notice:</strong> Please do not share these credentials with anyone. For your security, we recommend changing your password after your first login.
            </p>

            <p style="font-size: 15px; color: #4b5563; margin: 0; line-height: 1.5;">
              Cheers,<br><strong>Octane FitCity Tech Team</strong>
            </p>
          </div>
          
          <div style="background-color: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #f3f4f6;">
            <p style="font-size: 11px; color: #d1d5db; margin: 0;">© ${new Date().getFullYear()} Octane FitCity. All rights reserved.</p>
            <p style="font-size: 11px; color: #d1d5db; margin: 5px 0 0 0;">Strictly Confidential</p>
          </div>

        </div>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};
// utils/mail.util.js

// 👇 UPDATED ZOMATO-STYLE RECEIPT FUNCTION 👇
exports.sendMembershipReceipt = async (toEmail, memberName, invoiceNo, packageName, startDate, endDate, amountPaid, paymentMode, netAmount) => {
  
  // Pending amount calculate karna
  const dueAmount = netAmount - amountPaid;
  
  // Agar due amount hai toh Red me dikhega, warna Green me 'Fully Paid'
  const balanceHtml = dueAmount > 0 
    ? `<tr>
         <td style="padding: 12px 0; color: #dc2626; font-weight: 700;">Pending Balance</td>
         <td style="padding: 12px 0; text-align: right; font-weight: 800; color: #dc2626; font-size: 16px;">₹${dueAmount}</td>
       </tr>`
    : `<tr>
         <td style="padding: 12px 0; color: #16a34a; font-weight: 700;">Payment Status</td>
         <td style="padding: 12px 0; text-align: right; font-weight: 800; color: #16a34a; font-size: 15px;">Fully Paid 🎉</td>
       </tr>`;

  const mailOptions = {
    from: `"Octane Fit City" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: `Payment Receipt: ${packageName} - Octane Fit City`,
    html: `
      <div style="background-color: #f4f4f5; padding: 30px 15px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #333;">
        
        <div style="max-width: 500px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
          
          <div style="background-color: #e63946; padding: 25px 20px; text-align: center;">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_wVPzF1uPzu3sR6Nr80C8MfMONnXm8go8_g&s" alt="Octane Gym Logo" style="height: 55px; margin-bottom: 12px; display: inline-block; object-fit: contain;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 900; letter-spacing: 1px;">OCTANE FIT CITY</h1>
            <p style="color: #ffe4e6; margin: 5px 0 0 0; font-size: 14px; font-weight: 500;">Payment Receipt 🧾</p>
          </div>

          <div style="padding: 30px 25px;">
            <p style="font-size: 16px; margin: 0 0 25px 0; color: #374151;">Hi <strong>${memberName}</strong>,</p>
            
            <div style="text-align: center; margin-bottom: 30px;">
              <p style="font-size: 12px; color: #6b7280; text-transform: uppercase; letter-spacing: 1px; margin: 0; font-weight: 600;">Amount Paid Now</p>
              <h2 style="font-size: 42px; color: #111827; margin: 5px 0 0 0;">₹${amountPaid}</h2>
            </div>

            <div style="border-top: 2px dashed #e5e7eb; margin: 20px 0;"></div>

            <table width="100%" style="font-size: 14px; color: #374151; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px 0; color: #6b7280;">Invoice No.</td>
                <td style="padding: 12px 0; text-align: right; font-weight: 700; color: #111827;">${invoiceNo}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; color: #6b7280;">Package Plan</td>
                <td style="padding: 12px 0; text-align: right; font-weight: 600;">${packageName}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; color: #6b7280;">Validity</td>
                <td style="padding: 12px 0; text-align: right; font-weight: 600;">${startDate} <span style="color:#9ca3af;">to</span> ${endDate}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; color: #6b7280;">Payment Mode</td>
                <td style="padding: 12px 0; text-align: right; font-weight: 600; text-transform: capitalize;">${paymentMode || 'Cash'}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; color: #6b7280;">Date</td>
                <td style="padding: 12px 0; text-align: right; font-weight: 600;">${new Date().toLocaleDateString('en-IN')}</td>
              </tr>
              
              <tr>
                <td colspan="2" style="padding: 0;">
                  <div style="border-top: 1px solid #e5e7eb; margin: 10px 0;"></div>
                </td>
              </tr>
              <tr>
                <td style="padding: 12px 0; color: #4b5563; font-weight: 600;">Total Net Price</td>
                <td style="padding: 12px 0; text-align: right; font-weight: 600; color: #4b5563;">₹${netAmount}</td>
              </tr>
              
              ${balanceHtml} </table>

            <div style="border-top: 2px dashed #e5e7eb; margin: 20px 0;"></div>
            
            <p style="text-align: center; font-size: 15px; color: #4b5563; margin-top: 25px; line-height: 1.5;">
              Keep pushing your limits! 💪<br><br>
              <strong>Octane Fit City</strong>
            </p>
          </div>
          
          <div style="background-color: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #f3f4f6;">
            <p style="font-size: 12px; color: #9ca3af; margin: 0;">Have any questions? Reach out to us at the front desk.</p>
            <p style="font-size: 11px; color: #d1d5db; margin: 8px 0 0 0;">© ${new Date().getFullYear()} Octane Fit City. All rights reserved.</p>
          </div>

        </div>
      </div>
    `
  };

  await transporter.sendMail(mailOptions);
};