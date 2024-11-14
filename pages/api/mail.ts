import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from 'nodemailer';
import type Mail from 'nodemailer/lib/mailer';

type Data = {
  message?: string;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { email, name, message, subject } = req.body as {
    email: string;
    name: string;
    message: string;
    subject: string;
  };

  console.log("Email", email);
  console.log("Name", name);
  console.log("Message", message);
  console.log("Subject", subject);

  const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MY_EMAIL,
      pass: process.env.MY_PASSWORD,
    },
  });

  const mailOptions: Mail.Options = {
    from: process.env.MY_EMAIL,
    to: process.env.MY_EMAIL,
    subject: subject,
    text: `Message from ${email}, ${name} \n${message}`,
  };

  const sendMailPromise = () =>
    new Promise<string>((resolve, reject) => {
      transport.sendMail(mailOptions, function (err) {
        if (!err) {
          resolve('Email sent');
        } else {
          reject(err.message);
        }
      });
    });


    try {
      await sendMailPromise();
      res.status(200).json({ message: 'Email sent' });
    } catch (err) {
      console.log("err", err)
      res.status(500).json({ error: "Internal server error" });
    }
}
