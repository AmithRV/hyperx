import { createTransport } from 'nodemailer';

export const sendEmail = async ({ email, userId = '' }) => {
  try {
    const transport = createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: 'b3845e70582851',
        pass: 'ec8823ab3daaf3',
      },
    });

    const mailOptions = {
      from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>',
      to: email,
      subject: 'TestMaiil',
      text: 'Hello world?', // plain text body
      html: `<a href="${process.env.domain}/verifyemail">Hello ${userId}</a>`,
    };

    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (error) {
    throw new Error(error.message);
  }
};
