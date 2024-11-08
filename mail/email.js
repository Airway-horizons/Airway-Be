import ejs from "ejs";
import path from "path";
import nodemailer from "nodemailer";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Get the current directory in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: true,
  auth: {
    user: process.env.EMAIL_USER, // Email user from environment variable
    pass: process.env.EMAIL_PASS, // Email password from environment variable
  },
});

/**
 * Sends a templated email with custom data.
 * @param {string} to - Recipient email address.
 * @param {string} subject - Subject of the email.
 * @param {string} username - Username to include in the template.
 * @param {string} logoUrl - URL of the logo to include in the template.
 */
export const sendTemplatedEmail = async (to, subject, username, logoUrl) => {
  try {
    // Construct the path to the EJS template using the current directory
    const templatePath = path.join(__dirname, "cleanTemplate.ejs");

    // Render the HTML content from the EJS template
    const html = await ejs.renderFile(templatePath, { username, logoUrl });

    // Prepare the email options
    const mailOptions = {
      from: "admin@airwayhorizons.com",
      to,
      subject,
      html,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info?.response);
  } catch (error) {
    console.error("Error sending email:", error.message || error);
  }
};
