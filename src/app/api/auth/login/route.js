import { NextResponse } from 'next/server';
import connect from '@/dbConfig/dbConfig';
import User from '@/models/userModal';
import { sign } from 'jsonwebtoken';
import { compare } from 'bcryptjs';
import { sendEmail } from '@/helpers/mailer';

connect();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { userid, password } = reqBody;

    // Check if user exists
    const user = await User.findOne({ userid });
    if (!user) {
      return NextResponse.json(
        { error: 'User does not exist' },
        { status: 400 }
      );
    }

    //check if password is correct
    const response = compare(password, user.password).then((valid) => {
      if (valid) {
        // Create token data
        const tokenData = {
          id: user._id,
          userid: user.userid,
        };

        //Create token
        const token = sign(tokenData, process.env.TOKEN_SECRET, {
          expiresIn: '1d',
        });

        //Create response
        const response = NextResponse.json({
          userId: user._id,
          success: true,
        });
        response.cookies.set('token', token, { httpOnly: true });

        //  send verification mail

        return response;
      }
      return NextResponse.json({ error: 'Invalid password' }, { status: 400 });
    });

    const loginSecurityAlert = `
        <div style="width: 100vw; height: 100vh; background-color: white; display: flex; flex-direction: column;justify-content: center; align-items: center;">
            <p style="font-size: 18px;font-weight: 500;font-family: cursive;">
                Hello ${user.userid},
                <br />
                We noticed a new login to your account on [platform].
            </p>

            <div style="border: 1px solid black; border-radius: 6px; width: 300px; color: red; display: flex; justify-content: center; align-items: center; font-size: 18px; font-weight: 600;">
                A new sign-in on Windows
            </div>
        </div>
    `;

    await sendEmail({
      email: user.email,
      subject: 'Security Alert',
      text: `Hello ${user.userid}, \n We noticed a new login to your account on [Platform Name].`,
      html: loginSecurityAlert,
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
