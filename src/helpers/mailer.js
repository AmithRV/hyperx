import { createTransport } from 'nodemailer';

export const sendEmail = async ({
  email = '',
  subject = '',
  text = '',
  html = '',
}) => {
  try {
    const transport = createTransport({
      host: process.env.MAILTRAP_HOST,
      port: process.env.MAILTRAP_PORT,
      auth: {
        user: process.env.MAILTRAP_USER_ID,
        pass: process.env.MAILTRAP_PASS,
      },
    });

    const mailOptions = {
      from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>',
      to: email,
      subject,
      text,
      html,
    };

    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (error) {
    throw new Error(error.message);
  }
};
