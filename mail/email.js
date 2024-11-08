import ejs from "ejs";
import path from "path";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: true,
  auth: {
    user: "admin@airwayhorizons.com",
    pass: "vyvsxcyrykobyrlg",
  },
});

export const sendTemplatedEmail = async (to, subject, username, logoUrl) => {
  try {
    const templatePath = path.join(__dirname, "cleanTemplate.ejs");
    const html = await ejs.renderFile(templatePath, { username, logoUrl });

    const mailOptions = {
      from: "admin@airwayhorizons.com",
      to,
      subject,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
