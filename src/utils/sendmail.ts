import nodemailer from 'nodemailer';

export default async (text: string): Promise<{ ok: boolean }> => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: `"Game shops parser" <${process.env.MAIL_USER}>`,
    to: process.env.MAIL_TO,
    subject: `Game shops parsing statistic`,
    text,
  });

  return { ok: true };
};
