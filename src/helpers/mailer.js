import { createTransport } from 'nodemailer';

export const sendEmail = async ({ email = '', userId = '' }) => {
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
      subject: 'TestMaiil',
      text: 'Hello world?', // plain text body
      html: `
            <div style="width: 100vw; height: 100vh; background-color: white; display: flex; justify-content: center; align-items: center;">
                <div style="border: 1px solid black; border-radius: 6px; width: 300px; color: red; display: flex; justify-content: center; align-items: center; font-size: 18px; font-weight: 600;">
                    A new sign-in on Windows
                </div>
            </div>`,
    };

    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (error) {
    throw new Error(error.message);
  }
};
