import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const {
    name,
    phone,
    address,
    email,
    property_type,
    driveway_type
  } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: `"Snow Plow Inquiry" <${process.env.EMAIL_USER}>`,
      to: "info@tfls.ca",
      subject: "New Snow Plowing Inquiry",
      text: `
New Snow Plowing Inquiry

Name: ${name}
Phone: ${phone}
Address: ${address}
Property Type: ${property_type}
Driveway Type: ${driveway_type}
      `
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Email failed to send" });
  }
}
