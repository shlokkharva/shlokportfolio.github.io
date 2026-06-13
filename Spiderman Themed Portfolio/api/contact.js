import nodemailer from "nodemailer";

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // Create transporter using the provided credentials
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "shlokkharva@gmail.com",
      pass: process.env.GMAIL_APP_PASSWORD, // Using environment variable for safety on Vercel
    },
  });

  const mailOptions = {
    from: email,
    to: "shlokkharva@gmail.com",
    subject: `New Portfolio Message from ${name}`,
    text: `You have received a new message from your portfolio website.\n\nName: ${name}\nEmail: ${email}\nMessage:\n${message}`,
    html: `<p>You have received a new message from your portfolio website.</p>
           <p><strong>Name:</strong> ${name}</p>
           <p><strong>Email:</strong> ${email}</p>
           <p><strong>Message:</strong><br/>${message.replace(/\n/g, '<br/>')}</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({ error: "Failed to send email" });
  }
}
